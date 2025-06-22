"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable max-lines, @typescript-eslint/no-unused-expressions, @typescript-eslint/no-unsafe-declaration-merging, no-sequences, @typescript-eslint/naming-convention */
const events_1 = require("events");
// Classes
const Queue_1 = require("./Queue");
const Connection_1 = require("./Connection");
// Types
const player_1 = require("../typings/player");
const connection_1 = require("../typings/player/connection");
const Filters_1 = require("./Filters");
const neverthrow_1 = require("neverthrow");
class Player extends events_1.EventEmitter {
    node;
    manager;
    ConnectionHandler;
    queue;
    filters;
    voiceChannelId;
    textChannelId;
    guildId;
    shardId;
    isConnected;
    isPlaying;
    isPaused;
    state;
    voiceState;
    loop;
    isAutoplay;
    volume;
    /**
     * The ping of the node to the Discord voice server in milliseconds (-1 if not connected)
     */
    ping;
    timestamp;
    // Track Related
    position;
    constructor(manager, node, options) {
        super();
        this.node = node;
        this.manager = manager;
        this.voiceChannelId = options.voiceId;
        this.guildId = options.guildId;
        this.shardId = options.shardId ?? String(manager.library.shardID(this.guildId)) ?? "0";
        this.textChannelId = options.textId;
        // States
        this.voiceState = player_1.VoiceConnectionState.DISCONNECTED;
        this.state = player_1.PlayerConnectionState.DESTROYED;
        this.isConnected = false;
        this.isPlaying = false;
        this.isPaused = true;
        this.position = 0;
        this.isAutoplay = false;
        this.ping = -1;
        this.timestamp = 0;
        this.loop = player_1.PlayerLoop.NONE;
        this.volume = 100;
        // Handlers
        this.ConnectionHandler = new Connection_1.ConnectionHandler(this, options);
        this.queue = new Queue_1.Queue();
        this.filters = new Filters_1.Filters(this);
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
    }
    ;
    handleConnnectionError(e) {
        if (!(e instanceof Error))
            return new Error(`[HarmonyLink] [Player] [Connection] An unknown error occurred while connecting the player ${this.guildId} in the voice channel ${this.voiceChannelId}`);
        this.manager.emit("debug", "[HarmonyLink] [Player] [Connection] Request Connection Failed");
        if (e.name === "AbortError")
            return new Error(`[HarmonyLink] [Player] [Connection] The voice connection is not established in ${this.manager.options.voiceConnectionTimeout}ms`);
        return new Error(`[HarmonyLink] [Player] [Connection] Failed to connect player ${this.guildId} in the voice channel ${this.voiceChannelId} because of ${e.message}`);
    }
    ;
    /**
     * Connects the player to the voice channel.
     *
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    async connect() {
        if (this.state === player_1.PlayerConnectionState.CONNECTED || !this.voiceChannelId)
            return (0, neverthrow_1.ok)(this);
        if (this.voiceState === player_1.VoiceConnectionState.CONNECTING || this.voiceState === player_1.VoiceConnectionState.CONNECTED)
            return (0, neverthrow_1.ok)(this);
        // Sending a voice update to discord
        this.voiceState = player_1.VoiceConnectionState.CONNECTING;
        // eslint-disable-next-line neverthrow/must-use-result
        const voiceUpdateResult = await this.sendVoiceUpdate();
        if (voiceUpdateResult.isErr()) {
            this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Failed to send voice update for player ${this.guildId} in the voice channel ${this.voiceChannelId} because of ${voiceUpdateResult.error.message}`);
            return (0, neverthrow_1.err)(voiceUpdateResult.error);
        }
        this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Voice update sent for player ${this.guildId} in the voice channel ${this.voiceChannelId}.`);
        // Requesting a voice connection
        this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Requesting voice connection for player ${this.guildId} in the region ${this.ConnectionHandler.options.voiceRegion}.`);
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), this.manager.options.voiceConnectionTimeout);
        // eslint-disable-next-line neverthrow/must-use-result
        const connectionResult = await (0, neverthrow_1.fromPromise)(Player.once(this, 'connectionUpdate', { signal: controller.signal }), (e) => this.handleConnnectionError(e));
        clearTimeout(timeout);
        if (connectionResult.isErr()) {
            this.manager.emit("debug", "[HarmonyLink] [Player] [Connection] Request Connection Failed");
            return (0, neverthrow_1.err)(connectionResult.error);
        }
        const [status] = connectionResult.value;
        if (status !== connection_1.DiscordVoiceStates.SESSION_READY) {
            switch (status) {
                case connection_1.DiscordVoiceStates.SESSION_ID_MISSING:
                    {
                        return (0, neverthrow_1.err)(new Error('[HarmonyLink] [Player] [Connection] The voice connection is not established due to missing session id'));
                    }
                    ;
                case connection_1.DiscordVoiceStates.SESSION_ENDPOINT_MISSING:
                    {
                        return (0, neverthrow_1.err)(new Error('[HarmonyLink] [Player] [Connection] The voice connection is not established due to missing connection endpoint'));
                    }
                    ;
            }
            ;
        }
        ;
        this.voiceState = player_1.VoiceConnectionState.CONNECTED;
        this.state = player_1.PlayerConnectionState.CONNECTED;
        this.manager.emit('debug', '[HarmonyLink] [Player] [Connection] Player connected');
        this.node.players.set(this.guildId, this);
        return (0, neverthrow_1.ok)(this);
    }
    ;
    /**
     * Reconnects the player to the voice channel.
     * @param {boolean} [restartSong=true] - Whether to restart the current song or not.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    async reconnect(restartSong = true) {
        const currentTrack = this.queue.currentTrack;
        const savedPosition = this.position;
        // Disconnect the player and not clean up the queue
        await this.disconnect(false); // Reconnect
        const reconnectResult = await this.connect();
        if (reconnectResult.isErr()) {
            this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Failed to reconnect player ${this.guildId} because of ${reconnectResult.error.message}`);
            this.isConnected = false;
            this.state = player_1.PlayerConnectionState.DISCONNECTED;
            this.voiceState = player_1.VoiceConnectionState.DISCONNECTED;
            await this.destroy();
            return (0, neverthrow_1.err)(reconnectResult.error);
        }
        ;
        this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Player ${this.guildId} reconnected successfully`);
        // Restart the music if it was playing
        if (currentTrack && restartSong) {
            this.queue.unshift(currentTrack);
            return (await this.node.rest.updatePlayer({
                guildId: this.guildId,
                playerOptions: {
                    track: {
                        encoded: currentTrack.track,
                    },
                    position: savedPosition,
                }
            })).match(() => {
                this.isPlaying = true;
                this.isPaused = false;
                return (0, neverthrow_1.ok)(this);
            }, (e) => (0, neverthrow_1.err)(e));
        }
        ;
        return (0, neverthrow_1.ok)(this);
    }
    ;
    /**
     * Decodes a or multiple encoded tracks.
     * @param {string | string[]} tracks - The track to decode.
     * @returns {Promise<Result<TrackData[], Error>>} - A Promise that resolves to the decoded track.
     */
    decodeTracks(tracks) {
        if (!Array.isArray(tracks))
            tracks = [tracks];
        return this.node.rest.decodeTracks(tracks);
    }
    ;
    /**
     * Sets the loop mode for the player.
     * @param {PlayerLoop | "NONE" | "QUEUE" | "TRACK"} mode - The loop mode to set.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    setLoop(mode) {
        if (mode) {
            this.loop = mode;
            return this;
        }
        ;
        switch (this.loop) {
            case "NONE":
            case player_1.PlayerLoop.NONE:
                {
                    this.loop = player_1.PlayerLoop.TRACK;
                    break;
                }
                ;
            case "TRACK":
            case player_1.PlayerLoop.TRACK:
                {
                    this.loop = player_1.PlayerLoop.QUEUE;
                    break;
                }
                ;
            case "QUEUE":
            case player_1.PlayerLoop.QUEUE:
                {
                    this.loop = player_1.PlayerLoop.NONE;
                    break;
                }
                ;
        }
        ;
        return this;
    }
    ;
    /**
     * Sets the voice channel for the player.
     * @param {string} channelId - The channel ID to set for the player.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    setTextChannel(channelId) {
        this.textChannelId = channelId;
        return this;
    }
    ;
    /**
     * Sets a new voice channel for the player.
     * @param {string} channelId - The channel ID to set for the player.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    async setVoiceChannel(channelId) {
        await this.disconnect(false);
        this.voiceChannelId = channelId;
        return (await this.connect()).match((t) => (0, neverthrow_1.ok)(t), (e) => {
            this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Failed to set voice channel for player ${this.guildId} because of ${e.message}`);
            return (0, neverthrow_1.err)(e);
        });
    }
    ;
    /**
     * Sets the autoplay mode for the player.
     * @param {boolean} [toggle] - Whether to enable or disable autoplay.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    setAutoplay(toggle) {
        if (toggle)
            this.isAutoplay = toggle;
        else
            this.isAutoplay = !this.isAutoplay;
        return this;
    }
    ;
    /**
     * Sets the volume for the player.
     * @param {number} volume - The volume to set. Must be between 0 and 1000.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    async setVolume(volume) {
        if (volume < 0 || volume > 1000)
            return (0, neverthrow_1.err)(new RangeError("[HarmonyLink] [Player] [Connection] Volume must be between 0 and 1000"));
        const playerResult = await this.node.rest.updatePlayer({
            guildId: this.guildId,
            playerOptions: {
                volume,
            }
        });
        if (playerResult.isErr()) {
            this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Failed to set volume for player ${this.guildId} because of ${playerResult.error.message}`);
            return (0, neverthrow_1.err)(playerResult.error);
        }
        ;
        this.volume = volume;
        return (0, neverthrow_1.ok)(this);
    }
    ;
    /**
     * Seeks to a position in the current track.
     * @param {number} position - The position to seek to in milliseconds. Must be between 0 and `<Track>.info.length`
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    async seekTo(position) {
        if (!this.queue.currentTrack)
            return (0, neverthrow_1.err)(new Error("[HarmonyLink] [Player] [Connection] No track is currently playing"));
        if (!this.queue.currentTrack.info.isSeekable)
            return (0, neverthrow_1.err)(new Error("[HarmonyLink] [Player] [Connection] The current track is not seekable"));
        position = Number(position);
        if (isNaN(position))
            return (0, neverthrow_1.err)(new TypeError("[HarmonyLink] [Player] [Connection] Position must be a number"));
        if (position < 0 || position > this.queue.currentTrack.info.length)
            position = Math.max(Math.min(position, this.queue.currentTrack.info.length), 0);
        const playerResult = await this.node.rest.updatePlayer({
            guildId: this.guildId,
            playerOptions: {
                position,
            }
        });
        if (playerResult.isErr()) {
            this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Failed to seek to position ${position} for player ${this.guildId} because of ${playerResult.error.message}`);
            return (0, neverthrow_1.err)(playerResult.error);
        }
        ;
        this.position = position;
        return (0, neverthrow_1.ok)(this);
    }
    ;
    /**
     * Plays the current track in the queue.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    async play() {
        if (!this.queue.length || this.queue.length === 0)
            return (0, neverthrow_1.ok)(this);
        this.queue.currentTrack = this.queue.shift() ?? null;
        if (this.queue.currentTrack && !this.queue.currentTrack.track)
            this.queue.currentTrack = (await this.queue.currentTrack.resolve(this.manager)).unwrapOr(null);
        const playResult = await this.node.rest.updatePlayer({
            guildId: this.guildId,
            playerOptions: {
                track: {
                    encoded: this.queue.currentTrack?.track ?? null
                }
            }
        });
        if (playResult.isErr()) {
            this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Failed to play track for player ${this.guildId} because of ${playResult.error.message}`);
            return (0, neverthrow_1.err)(playResult.error);
        }
        ;
        this.isPlaying = true;
        this.position = 0;
        this.isPaused = false;
        return (0, neverthrow_1.ok)(this);
    }
    ;
    /**
     * Destroys the player and cleans up associated resources.
     * @returns {Promise<boolean>} - A Promise that resolves to a boolean which is true if an element in the Map existed and has been removed, or false if the element does not exist.
     */
    async destroy() {
        await this.disconnect(true);
        await this.node.rest.destroyPlayer(this.guildId);
        this.manager.emit("debug", this.guildId, "[HarmonyLink] [Player] [Connection] Player destroyed");
        this.manager.emit("playerDestroy", this);
        this.node.players.delete(this.guildId);
        return (0, neverthrow_1.ok)(this.manager.playerManager.delete(this.guildId));
    }
    ;
    /**
     * Skips the current track.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    async skip() {
        this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Skipping track for player ${this.guildId}`);
        this.position = 0;
        this.isPlaying = false;
        this.isPaused = true;
        return (await this.node.rest.updatePlayer({
            guildId: this.guildId,
            playerOptions: {
                track: {
                    encoded: null,
                }
            }
        })).match(() => (0, neverthrow_1.ok)(this), (e) => {
            this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Failed to skip track for player ${this.guildId} because of ${e.message}`);
            return (0, neverthrow_1.err)(e);
        });
    }
    ;
    /**
     * Pauses the current track.
     * @param {boolean} [toggle=true] - Whether to pause or resume the track.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    async pause(toggle = true) {
        this.isPaused = toggle;
        this.isPlaying = !toggle;
        return (await this.node.rest.updatePlayer({
            guildId: this.guildId,
            playerOptions: {
                paused: toggle,
            }
        })).match(() => (0, neverthrow_1.ok)(this), (e) => {
            this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Failed to pause player ${this.guildId} because of ${e.message}`);
            return (0, neverthrow_1.err)(e);
        });
    }
    ;
    /**
     * Resolves a track.
     * @param {ResolveOptions} [options] - Options for resolving tracks.
     * @param {Node} [node] - Node to use for resolution.
     * @returns {Promise<Response>} The response containing resolved tracks.
     */
    resolve({ query, source, requester }, node) {
        if (!node)
            node = this.node;
        return this.manager.resolve({ query, source, requester }, node);
    }
    ;
    /**
     * Autoplays a track.
     * @param {Track | null} [previousTrack = null] The previous track to use for autoplay
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    async autoplay(previousTrack = null) {
        try {
            if (this.manager.options.customAutoplay) {
                const resolvedData = await this.manager.options.customAutoplay(this);
                if (resolvedData && resolvedData instanceof Player)
                    return (0, neverthrow_1.ok)(resolvedData);
            }
            ;
            const prevTrack = previousTrack ?? this.queue.previousTrack;
            if (!prevTrack)
                return (0, neverthrow_1.ok)(this);
            switch (prevTrack.info.sourceName) {
                case "soundcloud":
                    {
                        const response = await this.resolve({ query: `${prevTrack.info.title}`, requester: prevTrack.info.requester, source: "scsearch" });
                        if (response.isErr())
                            return this.skip();
                        if (!response.value.tracks.length || response.value.tracks.length === 0 || ["error", "empty"].includes(response.value.loadType))
                            return this.skip();
                        this.queue.add(response.value.tracks[Math.floor(Math.random() * Math.floor(response.value.tracks.length))]);
                        return await this.play();
                    }
                    ;
                case "youtube":
                default:
                    {
                        const searchedURL = `https://www.youtube.com/watch?v=${prevTrack.info.identifier || this.queue.currentTrack?.info.identifier}&list=RD${prevTrack.info.identifier || this.queue.currentTrack?.info.identifier}`;
                        const response = await this.resolve({ query: searchedURL, requester: prevTrack.info.requester, source: "ytmsearch" });
                        if (response.isErr())
                            return this.skip();
                        if (!response.value.tracks.length || response.value.tracks.length === 0 || ["error", "empty"].includes(response.value.loadType))
                            return this.skip();
                        response.value.tracks.shift();
                        const track = response.value.tracks[Math.floor(Math.random() * Math.floor(response.value.tracks.length))];
                        this.queue.add(track);
                        return await this.play();
                    }
                    ;
            }
        }
        catch {
            return this.skip();
        }
    }
    ;
    /**
     * Sets the mute state for the player.
     * @param {boolean} mute - Whether to mute or unmute the player in the voice channel.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    async setMute(mute) {
        this.ConnectionHandler.options.selfMute = mute;
        // 
        // eslint-disable-next-line neverthrow/must-use-result
        const voiceUpdateResult = await this.sendVoiceUpdate();
        if (voiceUpdateResult.isErr()) {
            this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Failed to update mute state for player ${this.guildId} because of ${voiceUpdateResult.error.message}`);
            return (0, neverthrow_1.err)(voiceUpdateResult.error);
        }
        this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Player ${this.guildId} mute state updated to ${mute}`);
        return (0, neverthrow_1.ok)(this);
    }
    ;
    /**
     * Sets the deaf state for the player.
     * @param {boolean} deaf - Whether to deafen or undeafen the player in the voice channel.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    async setDeaf(deaf) {
        this.ConnectionHandler.options.selfDeaf = deaf;
        return await this.sendVoiceUpdate().match(() => (0, neverthrow_1.ok)(this), (e) => {
            this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Failed to update deaf state for player ${this.guildId} because of ${e.message}`);
            return (0, neverthrow_1.err)(e);
        });
    }
    ;
    async disconnect(cleanQueue = false) {
        if (!this.voiceChannelId || this.voiceState === player_1.VoiceConnectionState.DISCONNECTED)
            return (0, neverthrow_1.ok)(this);
        if (cleanQueue)
            this.queue._cleanUp();
        await this.skip();
        this.isConnected = false;
        this.state = player_1.PlayerConnectionState.DISCONNECTED;
        this.voiceState = player_1.VoiceConnectionState.DISCONNECTED;
        return await this.sendToDiscord({
            guild_id: this.guildId,
            channel_id: null,
            self_deaf: false,
            self_mute: false,
        }).match(() => (0, neverthrow_1.ok)(this), (e) => {
            this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Failed to disconnect player ${this.guildId} from voice channel ${this.voiceChannelId} because of ${e.message}`);
            return (0, neverthrow_1.err)(e);
        });
    }
    ;
    checkDestroyed() {
        if (this.state === player_1.PlayerConnectionState.DESTROYED)
            return (0, neverthrow_1.err)(new Error('[HarmonyLink] [Player] [Connection] Player is already destroyed'));
        return (0, neverthrow_1.ok)();
    }
    ;
    sendVoiceUpdate() {
        return this.sendToDiscord({
            guild_id: this.guildId,
            channel_id: this.voiceChannelId,
            self_deaf: this.ConnectionHandler.options.selfDeaf,
            self_mute: this.ConnectionHandler.options.selfMute,
        });
    }
    ;
    sendToDiscord(data) {
        return (0, neverthrow_1.fromThrowable)(() => this.manager.library.sendPacket(Number(this.shardId), { op: 4, d: data }, false), (e) => e)();
    }
    ;
    async _eventHandler(data) {
        this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Event received for player ${this.guildId}`);
        switch (data.type) {
            case "TrackStartEvent":
                {
                    this.isPlaying = true;
                    this.isPaused = false;
                    this.position = 0;
                    this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Track started for player ${this.guildId}`);
                    this.manager.emit("trackStart", this, this.queue.currentTrack);
                    break;
                }
                ;
            case "TrackEndEvent":
                {
                    this.isPlaying = false;
                    this.isPaused = true;
                    if (this.queue.currentTrack)
                        this.queue.previousTrack = this.queue.currentTrack;
                    this.queue.currentTrack = null;
                    if (data.reason === "replaced") {
                        this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Track replaced for player ${this.guildId}`);
                        return this.manager.emit("trackEnd", this, this.queue.previousTrack, data);
                    }
                    ;
                    if (["loadFailed", "cleanup"].includes(data.reason)) {
                        if (!this.queue.length || this.queue.length === 0)
                            return this.manager.emit("queueEmpty", this);
                        this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Track ended for player ${this.guildId}`);
                        this.manager.emit("trackEnd", this, this.queue.previousTrack);
                        return this.play();
                    }
                    ;
                    switch (this.loop) {
                        case "TRACK":
                        case player_1.PlayerLoop.TRACK:
                            {
                                if (!this.queue.previousTrack)
                                    return this.manager.emit("queueEmpty", this);
                                this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Track looped for player ${this.guildId}`);
                                this.manager.emit("trackEnd", this, this.queue.previousTrack);
                                this.queue.unshift(this.queue.previousTrack);
                                return this.play();
                            }
                            ;
                        case "QUEUE":
                        case player_1.PlayerLoop.QUEUE:
                            {
                                if (!this.queue.previousTrack)
                                    return this.manager.emit("queueEmpty", this);
                                this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Queue looped for player ${this.guildId}`);
                                this.manager.emit("trackEnd", this, this.queue.previousTrack);
                                this.queue.push(this.queue.previousTrack);
                                return this.play();
                            }
                            ;
                        case "NONE":
                        case player_1.PlayerLoop.NONE:
                            {
                                if (this.isAutoplay)
                                    return this.autoplay();
                                if (!this.queue.length || this.queue.length === 0)
                                    return this.manager.emit("queueEmpty", this);
                                this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Track ended for player ${this.guildId}`);
                                this.manager.emit("trackEnd", this, this.queue.previousTrack);
                                return this.play();
                            }
                            ;
                        default:
                            {
                                this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Unknown Loop Mode ${this.loop}. These are all of the valid loops: "NONE", "TRACK", "QUEUE", PlayerLoop.TRACK, PlayerLoop.QUEUE, PlayerLoop.NONE`);
                                return this.loop = player_1.PlayerLoop.NONE;
                            }
                            ;
                    }
                    ;
                }
                ;
            case "TrackStuckEvent":
                {
                    this.manager.emit("trackError", this, this.queue.currentTrack, data);
                    await this.skip();
                    break;
                }
                ;
            case "TrackExceptionEvent":
                {
                    this.manager.emit("trackError", this, this.queue.previousTrack, data);
                    await this.skip();
                    break;
                }
                ;
            case "WebSocketClosedEvent":
                {
                    // ! EXPERIMENTAL WITH 4006 CODE
                    if ([4015, 4009, 4006].includes(data.code)) {
                        return this.reconnect(!this.isPaused).catch(() => this.destroy());
                    }
                    ;
                    this.manager.emit("socketClose", this, this.queue.currentTrack, data);
                    this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Websocket closed for player ${this.guildId} with status code ${data.code}`);
                    await this.pause(true);
                    break;
                }
                ;
        }
        ;
    }
}
exports.Player = Player;
;
//# sourceMappingURL=Player.js.map