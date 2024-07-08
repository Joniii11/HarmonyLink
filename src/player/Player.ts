/* eslint-disable @typescript-eslint/no-unused-expressions, @typescript-eslint/no-unsafe-declaration-merging, no-sequences, @typescript-eslint/naming-convention */
import { EventEmitter } from "events"

// Types
import { PlayerConnectionState, PlayerOptions, VoiceConnectionState, PlayerEvents, PlayerLoop } from "@t/player";
import { DiscordVoiceStates } from "@/typings/player/connection";
import { Node } from "@/node/Node";
import { HarmonyLink } from "@/HarmonyLink"

// Structures
import { Queue } from './Queue';
import { ConnectionHandler } from "./Connection";
import { LavalinkEventPacket } from "@/typings/node";

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

    public voiceChannelId: string;
    public guildId: string;
    public shardId: string;
    public isConnected: boolean;
    public isPlaying: boolean;
    public isPaused: boolean;
    public state: PlayerConnectionState;
    public voiceState: VoiceConnectionState;
    public loop: PlayerLoop | "NONE" | "QUEUE" | "TRACK";

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
        this.shardId = options.shardId;

        // States
        this.voiceState = VoiceConnectionState.DISCONNECTED;
        this.state = PlayerConnectionState.DESTROYED
        this.isConnected = false;
        this.isPlaying = false;
        this.isPaused = false;
        this.position = 0;
        this.ping = -1;
        this.timestamp = 0;
        this.loop = PlayerLoop.NONE;

        // Handlers
        this.ConnectionHandler = new ConnectionHandler(this)
        this.queue = new Queue();

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
		};

		return this;
	};

    /* public async play(): Promise<Player> {
        if (!this.queue.length || this.queue.length === 0) return this;

        this.queue.currentTrack = this.queue.shift() ?? null;


    }*/

    /**
     * Destroys the player and cleans up associated resources.
     * @returns {Promise<boolean>} - A Promise that resolves to a boolean which is true if an element in the Map existed and has been removed, or false if the element does not exist.
     */
    public async destroy(): Promise<boolean> {
       await this.disconnect();
       await this.node.rest.destroyPlayer(this.guildId);

       this.manager.emit("debug", this.guildId, "[HarmonyLink] [Player] [Connection] Player destroyed");
       this.manager.emit("playerDestroy", this.guildId);

       return this.manager.playerManager.delete(this.guildId);
    };

    /**
     * Skips the current track.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    public async skip(): Promise<Player> {
        if (!this.queue.length || this.queue.length === 0) return this; // TODO: Emit an event here for queue empty?

        this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Skipping track for player ${this.guildId}`);
        // TODO: Emit an event here for track skipped

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

    protected async disconnect(): Promise<Player> {
        if (!this.voiceChannelId) return this;
        this.queue._cleanUp()
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
                this.manager.emit("trackStart", this, this.queue.currentTrack);

                break;
            };

            case "TrackEndEvent": {
                this.isPlaying = false;
                this.isPaused = true;

                if (this.queue.currentTrack) this.queue.previousTrack = this.queue.currentTrack;
                this.queue.currentTrack = null;

                if (data.reason === "replaced") {
                    this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Track replaced for player ${this.guildId}`)
                    return this.manager.emit("trackEnd", this, data);
                };

                if (["loadFailed", "cleanup"].includes(data.reason)) {
                    if (!this.queue.length || this.queue.length === 0) return this.manager.emit("queueEmpty", this);

                    this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Track ended for player ${this.guildId}`)
                    this.manager.emit("trackEnd", this, this.queue.previousTrack);

                    return // TODO: play function
                };

                switch (this.loop) {
                    case "TRACK":
                    case PlayerLoop.TRACK: {
                        if (!this.queue.previousTrack) return this.manager.emit("queueEmpty", this);

                        this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Track looped for player ${this.guildId}`)
                        this.manager.emit("trackEnd", this, this.queue.previousTrack);

                        this.queue.unshift(this.queue.previousTrack);

                        return // TODO: play function
                    };

                    case "QUEUE":
                    case PlayerLoop.QUEUE: {
                        if (!this.queue.previousTrack) return this.manager.emit("queueEmpty", this);
                        
                        this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Queue looped for player ${this.guildId}`)
                        this.manager.emit("trackEnd", this, this.queue.previousTrack);

                        this.queue.push(this.queue.previousTrack);

                        return // TODO: play function
                    };

                    case "NONE":
                    case PlayerLoop.NONE: {
                        if (!this.queue.length || this.queue.length === 0) return this.manager.emit("queueEmpty", this);

                        this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Track ended for player ${this.guildId}`);
                        this.manager.emit("trackEnd", this, this.queue.previousTrack);

                        return // TODO: play function
                    };
                };

                // Because ESLint would cry for no-fallthrough.
                break;
            };

            case "TrackStuckEvent": {
                this.manager.emit("trackError", this, this.queue.currentTrack, data);

                await this.skip();
                break;
            };

            case "TrackExceptionEvent": {
                this.manager.emit("trackError", this, this.queue.previousTrack, data);

                await this.skip();
                break;
            };

            case "WebSocketClosedEvent": {
                // EXPERIMENTAL WITH 4006 CODE
                if ([4015, 4009, 4006].includes(data.code)) {
                    this.sendVoiceUpdate();
                };

                this.manager.emit("socketClose", this, this.queue.currentTrack, data);
                this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Websocket closed for player ${this.guildId} with status code ${data.code}`);
                
                await this.pause(true);

                break;
            };
        };
    } 
};