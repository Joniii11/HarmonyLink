/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable max-lines, @typescript-eslint/no-unused-expressions, @typescript-eslint/no-unsafe-declaration-merging, no-sequences, @typescript-eslint/naming-convention */
import { EventEmitter } from "events"

// Classes
import { Queue } from './Queue';
import { ConnectionHandler } from "./Connection";
import { Track } from "./Track";
import { Response } from "./Response";

// Types
import { PlayerConnectionState, PlayerOptions, VoiceConnectionState, PlayerEvents, PlayerLoop, ResolveOptions } from "@t/player";
import { DiscordVoiceStates } from "@t/player/connection";
import { Node } from "@/node/Node";
import { HarmonyLink } from "@/HarmonyLink"
import { LavalinkEventPacket } from "@t/node";
import { Filters } from "./Filters";
import { TrackData } from "@/typings/track";

export declare interface Player {
    on: <K extends keyof PlayerEvents>(event: K, listener: PlayerEvents[K]) => this;
    once: <K extends keyof PlayerEvents>(event: K, listener: PlayerEvents[K]) => this;
    emit: <K extends keyof PlayerEvents>(
        event: K,
        ...args: Parameters<PlayerEvents[K]>
    ) => boolean;
    off: <K extends keyof PlayerEvents>(event: K, listener: PlayerEvents[K]) => this;
}

export class Player extends EventEmitter {
    public readonly node: Node;
    public readonly manager: HarmonyLink;
    public readonly ConnectionHandler: ConnectionHandler
    public readonly queue: Queue;
    public filters: Filters;

    public voiceChannelId: string;
    public textChannelId: string;
    public guildId: string;
    public shardId: string;
    public isConnected: boolean;
    public isPlaying: boolean;
    public isPaused: boolean;
    public state: PlayerConnectionState;
    public voiceState: VoiceConnectionState;
    public loop: PlayerLoop | "NONE" | "QUEUE" | "TRACK";
    public isAutoplay: boolean;
    public volume: number;

    /**
     * The ping of the node to the Discord voice server in milliseconds (-1 if not connected)
     */
    public ping: number;
    public timestamp: number;
    
    // Track Related
    public position: number;
    
    public constructor(manager: HarmonyLink, node: Node, options: PlayerOptions) {
        super();

        this.node = node;
        this.manager = manager;
        this.voiceChannelId = options.voiceId,
        this.guildId = options.guildId;
        this.shardId = options.shardId ?? String(manager.library.shardID(this.guildId)) as string | undefined ?? "0";
        this.textChannelId = options.textId

        // States
        this.voiceState = VoiceConnectionState.DISCONNECTED;
        this.state = PlayerConnectionState.DESTROYED
        this.isConnected = false;
        this.isPlaying = false;
        this.isPaused = true;
        this.position = 0;
        this.isAutoplay = false;
        this.ping = -1;
        this.timestamp = 0;
        this.loop = PlayerLoop.NONE;
        this.volume = 100;

        // Handlers
        this.ConnectionHandler = new ConnectionHandler(this, options)
        this.queue = new Queue();
        this.filters = new Filters(this)

        this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Player created for guild ${this.guildId} on node ${this.node.options.name}.`);
        this.manager.emit("playerCreate", this);

        this.on("playerUpdate", (packet) => {
            this.isConnected = packet.state.connected;
            this.position = packet.state.position;
            this.ping = packet.state.ping;
            this.timestamp = packet.state.time;

            this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Player update for guild ${this.guildId}.`);
            this.manager.emit("playerUpdate", this, packet);
        });

        this.on("event", this._eventHandler.bind(this));
    };

    /**
     * Connects the player to the voice channel.
     * 
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    public async connect(): Promise<Player> {
		if (this.state === PlayerConnectionState.CONNECTED || !this.voiceChannelId) return this;
		if (this.voiceState === VoiceConnectionState.CONNECTING || this.voiceState === VoiceConnectionState.CONNECTED) return this;

		// Sending a voice update to discord
        this.voiceState = VoiceConnectionState.CONNECTING;
		this.sendVoiceUpdate();

        // Requesting a voice connection
		this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Requesting voice connection for player ${this.guildId} in the region ${this.ConnectionHandler.options.voiceRegion}.`);

		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), this.manager.options.voiceConnectionTimeout);

		try {
			const [status] = await Player.once(this, 'connectionUpdate', { signal: controller.signal });

			if (status !== DiscordVoiceStates.SESSION_READY) {
				switch (status) {
                    case DiscordVoiceStates.SESSION_ID_MISSING: {
                        throw new Error('[HarmonyLink] [Player] [Connection] The voice connection is not established due to missing session id');
                    };

                    case DiscordVoiceStates.SESSION_ENDPOINT_MISSING: {
                        throw new Error('[HarmonyLink] [Player] [Connection] The voice connection is not established due to missing connection endpoint');
                    };
				};
			};

			this.voiceState = VoiceConnectionState.CONNECTED;
		} catch (error) {
            this.manager.emit("debug", "[HarmonyLink] [Player] [Connection] Request Connection Failed");

			if ((error as Error).name === 'AbortError')
				throw new Error(`[HarmonyLink] [Player] [Connection] The voice connection is not established in ${this.manager.options.voiceConnectionTimeout}ms`,);

			throw error;
		} finally {
			clearTimeout(timeout);

			this.state = PlayerConnectionState.CONNECTED;

            this.manager.emit('debug', '[HarmonyLink] [Player] [Connection] Player connected');

            this.node.players.set(this.guildId, this);
		};

		return this;
	};

    /**
     * Reconnects the player to the voice channel.
     * @param {boolean} [restartSong=true] - Whether to restart the current song or not.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    public async reconnect(restartSong: boolean = true): Promise<Player> {
        try {
            const currentTrack = this.queue.currentTrack;
        
            // Disconnect the player and not clean up the queue
            await this.disconnect(false)

            // Reconnect
            await this.connect()

            // Restart the music if it was playing
            if (currentTrack && restartSong) {
                this.queue.unshift(currentTrack);
                await this.node.rest.updatePlayer({
                    guildId: this.guildId,
                    playerOptions: {
                        track: {
                            encoded: currentTrack.track,
                        },
                        position: this.position,
                    }
                });

                this.isPlaying = true;
                this.isPaused = false;
            };

            return this;   
        } catch (err) {
            this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Reconnect failed for player ${this.guildId} because of ${err}`);
            
            this.isConnected = false;
            this.state = PlayerConnectionState.DISCONNECTED;
            this.voiceState = VoiceConnectionState.DISCONNECTED;
            await this.destroy();
            
            return this;
        }
    };

    /**
     * Decodes a or multiple encoded tracks.
     * @param {string | string[]} tracks - The track to decode.
     * @returns {Promise<TrackData[]>} - A Promise that resolves to the decoded track.
     */
    public async decodeTracks(tracks: string[] | string): Promise<TrackData[]> {
        if (!Array.isArray(tracks)) tracks = [tracks];

        return this.node.rest.decodeTracks(tracks);
    };

    /**
     * Sets the loop mode for the player.
     * @param {PlayerLoop | "NONE" | "QUEUE" | "TRACK"} mode - The loop mode to set.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    public async setLoop(mode?: PlayerLoop | "NONE" | "QUEUE" | "TRACK"): Promise<Player> {
        return new Promise<this>((resolve) => {
            if (mode) this.loop = mode;
            else {
                switch (this.loop) {
                    case "NONE":
                    case PlayerLoop.NONE: {
                        this.loop = PlayerLoop.TRACK;
                        break;
                    };

                    case "TRACK":
                    case PlayerLoop.TRACK: {
                        this.loop = PlayerLoop.QUEUE;
                        break;
                    };

                    case "QUEUE":
                    case PlayerLoop.QUEUE: {
                        this.loop = PlayerLoop.NONE;
                        break;
                    };
                };
            };

            return resolve(this);
        });
    };

    /**
     * Sets the voice channel for the player.
     * @param {string} channelId - The channel ID to set for the player.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    public async setTextChannel(channelId: string): Promise<Player> {
        return new Promise<this>((resolve) => {
            this.textChannelId = channelId;
            return resolve(this);
        })
    };

    /**
     * Sets a new voice channel for the player.
     * @param {string} channelId - The channel ID to set for the player.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    public async setVoiceChannel(channelId: string): Promise<Player> {
        await this.disconnect(false)
        this.voiceChannelId = channelId;
        await this.connect().catch(() => this.destroy());
        
        this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] New Voice channel set for player ${this.guildId}`)

        return this;
    }

    /**
     * Sets the autoplay mode for the player.
     * @param {boolean} [toggle] - Whether to enable or disable autoplay.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    public async setAutoplay(toggle?: boolean): Promise<Player> {
        return new Promise<this>((resolve) => {
            if (toggle) this.isAutoplay = toggle;
            else this.isAutoplay = !this.isAutoplay;

            return resolve(this);
        });
    };

    /**
     * Sets the volume for the player.
     * @param {number} volume - The volume to set. Must be between 0 and 1000.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    public async setVolume(volume: number): Promise<Player> {
        if (volume < 0 || volume > 1000) throw new RangeError("[HarmonyLink] [Player] [Connection] Volume must be between 0 and 1000");

        await this.node.rest.updatePlayer({
            guildId: this.guildId,
            playerOptions: {
                volume,
            }
        });

        this.volume = volume;

        return this;
    };

    /**
     * Seeks to a position in the current track.
     * @param {number} position - The position to seek to in milliseconds. Must be between 0 and `<Track>.info.length`
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    public async seekTo(position: number): Promise<Player> {
        if (!this.queue.currentTrack) throw new Error("[HarmonyLink] [Player] [Connection] No track is currently playing");
        if (!this.queue.currentTrack.info.isSeekable) throw new Error("[HarmonyLink] [Player] [Connection] The current track is not seekable");
        
        position = Number(position);

        if (isNaN(position)) throw new TypeError("[HarmonyLink] [Player] [Connection] Position must be a number");
        if (position < 0 || position > this.queue.currentTrack.info.length) position = Math.max(Math.min(position, this.queue.currentTrack.info.length), 0);

        await this.node.rest.updatePlayer({
            guildId: this.guildId,
            playerOptions: {
                position,
            }
        });

        this.position = position;
    
        return this;
    };

    /**
     * Plays the current track in the queue.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    public async play(): Promise<Player> {
        if (!this.queue.length || this.queue.length === 0) return this;

        this.queue.currentTrack = this.queue.shift() ?? null;
        if (this.queue.currentTrack && !this.queue.currentTrack.track) this.queue.currentTrack = await this.queue.currentTrack.resolve(this.manager);

        await this.node.rest.updatePlayer({
            guildId: this.guildId,
            playerOptions: {
                track: {
                    encoded: this.queue.currentTrack?.track ?? null
                }
            }
        });

        this.isPlaying = true;
        this.position = 0;
        this.isPaused = false;

        return this;
    };

    /**
     * Destroys the player and cleans up associated resources.
     * @returns {Promise<boolean>} - A Promise that resolves to a boolean which is true if an element in the Map existed and has been removed, or false if the element does not exist.
     */
    public async destroy(): Promise<boolean> {
        await this.disconnect(true);
        await this.node.rest.destroyPlayer(this.guildId);

        this.manager.emit("debug", this.guildId, "[HarmonyLink] [Player] [Connection] Player destroyed");
        this.manager.emit("playerDestroy", this);

        this.node.players.delete(this.guildId);

        return this.manager.playerManager.delete(this.guildId);
    };

    /**
     * Skips the current track.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    public async skip(): Promise<Player> {
        this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Skipping track for player ${this.guildId}`);

        this.position = 0;
        this.isPlaying = false;
        this.isPaused = true;

        await this.node.rest.updatePlayer({
            guildId: this.guildId,
            playerOptions: {
                track: {
                    encoded: null,
                }
            }
        });

        return this;
    };

    /**
     * Pauses the current track.
     * @param {boolean} [toggle=true] - Whether to pause or resume the track.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    public async pause(toggle: boolean = true): Promise<Player> {
        await this.node.rest.updatePlayer({
            guildId: this.guildId,
            playerOptions: {
                paused: toggle,
            }
        });

        this.isPaused = toggle;
        this.isPlaying = !toggle;

        return this;
    };

    /**
     * Resolves a track.
     * @param {ResolveOptions} [options] - Options for resolving tracks.
     * @param {Node} [node] - Node to use for resolution.
     * @returns {Promise<Response>} The response containing resolved tracks.
     */
    public async resolve({ query, source, requester}: ResolveOptions, node?: Node): Promise<Response> {
        if (!node) node = this.node;

        return this.manager.resolve({ query, source, requester }, node);
    };

    /**
     * Autoplays a track.
     * @param {Track | null} [previousTrack = null] The previous track to use for autoplay 
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    public async autoplay(previousTrack: Track | null = null): Promise<Player> {
        try {
            if (this.manager.options.customAutoplay) {
                const resolvedData = await this.manager.options.customAutoplay(this);
    
                if (resolvedData && resolvedData instanceof Player) return resolvedData;
            };

            const prevTrack = previousTrack ?? this.queue.previousTrack;
            if (!prevTrack) return this;

            switch (prevTrack.info.sourceName) {
                case "soundcloud": {
                    const response = await this.resolve({ query: `${prevTrack.info.title}`, requester: prevTrack.info.requester, source: "scsearch" });
                
                    if (!response.tracks.length || response.tracks.length === 0 || ["error", "empty"].includes(response.loadType)) return await this.skip();

                    this.queue.add(response.tracks[Math.floor(Math.random() * Math.floor(response.tracks.length))]);
                    return await this.play();
                };

                case "youtube":
                default: {
                    const searchedURL = `https://www.youtube.com/watch?v=${prevTrack.info.identifier || this.queue.currentTrack?.info.identifier}&list=RD${prevTrack.info.identifier || this.queue.currentTrack?.info.identifier}`;
                    const response = await this.resolve({ query: searchedURL, requester: prevTrack.info.requester, source: "ytmsearch" });

                    if (!response.tracks.length || response.tracks.length === 0 || ["error", "empty"].includes(response.loadType)) return await this.skip();
                
                    response.tracks.shift();
                
                    const track = response.tracks[Math.floor(Math.random() * Math.floor(response.tracks.length))];
                    this.queue.add(track);

                    return await this.play();
                };
            }
        } catch {
            return this.skip()
        }
    };

    /**
     * Sets the mute state for the player.
     * @param {boolean} mute - Whether to mute or unmute the player in the voice channel.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    public async setMute(mute: boolean): Promise<Player> {
        return new Promise<Player>((resolve) => {
            this.ConnectionHandler.options.selfMute = mute;
            this.sendVoiceUpdate();

            return resolve(this);
        });
    };

    /**
     * Sets the deaf state for the player.
     * @param {boolean} deaf - Whether to deafen or undeafen the player in the voice channel.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    public async setDeaf(deaf: boolean): Promise<Player> {
        return new Promise<Player>((resolve) => {
            this.ConnectionHandler.options.selfDeaf = deaf;
            this.sendVoiceUpdate();

            return resolve(this);
        });
    };

    protected async disconnect(cleanQueue: boolean = false): Promise<Player> {
        if (!this.voiceChannelId || this.voiceState === VoiceConnectionState.DISCONNECTED) return this;
        if (cleanQueue) this.queue._cleanUp()
        await this.skip();
        
        this.isConnected = false;
        this.state = PlayerConnectionState.DISCONNECTED;
        this.voiceState = VoiceConnectionState.DISCONNECTED;

        this.sendToDiscord({
            guild_id: this.guildId,
            channel_id: null,
            self_deaf: false,
            self_mute: false,
        });

        return this;
    };

    protected checkDestroyed(): void {
		if (this.state === PlayerConnectionState.DESTROYED) throw new Error('[HarmonyLink] [Player] [Connection] Player is already destroyed');
	};

    private sendVoiceUpdate(): void {
		return this.sendToDiscord({
			guild_id: this.guildId,
			channel_id: this.voiceChannelId,
			self_deaf: this.ConnectionHandler.options.selfDeaf,
			self_mute: this.ConnectionHandler.options.selfMute,
		});
	};

    private sendToDiscord(data: Record<string, unknown>): void {
        return this.manager.library.sendPacket(Number(this.shardId), { op: 4, d: data }, false)
    };

    private async _eventHandler(data: LavalinkEventPacket): Promise<unknown> {
        this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Event received for player ${this.guildId}`);

        switch (data.type) {
            case "TrackStartEvent": {
                this.isPlaying = true;
                this.isPaused = false;
                this.position = 0;
                
                this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Track started for player ${this.guildId}`)
                this.manager.emit("trackStart", this, this.queue.currentTrack!);

                break;
            };

            case "TrackEndEvent": {
                this.isPlaying = false;
                this.isPaused = true;

                if (this.queue.currentTrack) this.queue.previousTrack = this.queue.currentTrack;
                this.queue.currentTrack = null;

                if (data.reason === "replaced") {
                    this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Track replaced for player ${this.guildId}`)
                    return this.manager.emit("trackEnd", this, this.queue.previousTrack!, data);
                };

                if (["loadFailed", "cleanup"].includes(data.reason)) {
                    if (!this.queue.length || this.queue.length === 0) return this.manager.emit("queueEmpty", this);

                    this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Track ended for player ${this.guildId}`)
                    this.manager.emit("trackEnd", this, this.queue.previousTrack!);

                    return this.play();
                };

                switch (this.loop) {
                    case "TRACK":
                    case PlayerLoop.TRACK: {
                        if (!this.queue.previousTrack) return this.manager.emit("queueEmpty", this);

                        this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Track looped for player ${this.guildId}`)
                        this.manager.emit("trackEnd", this, this.queue.previousTrack);

                        this.queue.unshift(this.queue.previousTrack);

                        return this.play()
                    };

                    case "QUEUE":
                    case PlayerLoop.QUEUE: {
                        if (!this.queue.previousTrack) return this.manager.emit("queueEmpty", this);
                        
                        this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Queue looped for player ${this.guildId}`)
                        this.manager.emit("trackEnd", this, this.queue.previousTrack);

                        this.queue.push(this.queue.previousTrack);

                        return this.play()
                    };

                    case "NONE":
                    case PlayerLoop.NONE: {
                        if (this.isAutoplay) return this.autoplay()

                        if (!this.queue.length || this.queue.length === 0) return this.manager.emit("queueEmpty", this);

                        this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Track ended for player ${this.guildId}`);
                        this.manager.emit("trackEnd", this, this.queue.previousTrack!);

                        return this.play()
                    };

                    default: {
                        this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Unknown Loop Mode ${this.loop}. These are all of the valid loops: "NONE", "TRACK", "QUEUE", PlayerLoop.TRACK, PlayerLoop.QUEUE, PlayerLoop.NONE`);

                        return this.loop = PlayerLoop.NONE;   
                    };
                };

                // Because ESLint would cry for no-fallthrough.
                break;
            };

            case "TrackStuckEvent": {
                this.manager.emit("trackError", this, this.queue.currentTrack!, data);

                await this.skip();
                break;
            };

            case "TrackExceptionEvent": {
                this.manager.emit("trackError", this, this.queue.previousTrack!, data);

                await this.skip();
                break;
            };

            case "WebSocketClosedEvent": {
                // ! EXPERIMENTAL WITH 4006 CODE
                if ([4015, 4009, 4006].includes(data.code)) {
                    return this.reconnect(!this.isPaused).catch(() => this.destroy())
                };

                this.manager.emit("socketClose", this, this.queue.currentTrack!, data);
                this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Websocket closed for player ${this.guildId} with status code ${data.code}`);
                
                await this.pause(true);

                break;
            };
        };
    } 
};