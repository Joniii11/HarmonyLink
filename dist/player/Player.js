"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
/* eslint-disable max-lines, @typescript-eslint/no-unused-expressions, @typescript-eslint/no-unsafe-declaration-merging, no-sequences, @typescript-eslint/naming-convention */
const events_1 = require("events");
// Classes
const Queue_1 = require("./Queue");
const Connection_1 = require("./Connection");
const Response_1 = require("./Response");
// Types
const player_1 = require("../typings/player");
const connection_1 = require("../typings/player/connection");
class Player extends events_1.EventEmitter {
    node;
    manager;
    ConnectionHandler;
    queue;
    voiceChannelId;
    guildId;
    shardId;
    isConnected;
    isPlaying;
    isPaused;
    state;
    voiceState;
    loop;
    isAutoplay;
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
        this.voiceChannelId = options.voiceId,
            this.guildId = options.guildId;
        this.shardId = options.shardId;
        // States
        this.voiceState = player_1.VoiceConnectionState.DISCONNECTED;
        this.state = player_1.PlayerConnectionState.DESTROYED;
        this.isConnected = false;
        this.isPlaying = false;
        this.isPaused = false;
        this.position = 0;
        this.isAutoplay = false;
        this.ping = -1;
        this.timestamp = 0;
        this.loop = player_1.PlayerLoop.NONE;
        // Handlers
        this.ConnectionHandler = new Connection_1.ConnectionHandler(this);
        this.queue = new Queue_1.Queue();
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
    async connect() {
        if (this.state === player_1.PlayerConnectionState.CONNECTED || !this.voiceChannelId)
            return this;
        if (this.voiceState === player_1.VoiceConnectionState.CONNECTING || this.voiceState === player_1.VoiceConnectionState.CONNECTED)
            return this;
        // Sending a voice update to discord
        this.voiceState = player_1.VoiceConnectionState.CONNECTING;
        this.sendVoiceUpdate();
        // Requesting a voice connection
        this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Requesting voice connection for player ${this.guildId} in the region ${this.ConnectionHandler.options.voiceRegion}.`);
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), this.manager.options.voiceConnectionTimeout);
        try {
            const [status] = await Player.once(this, 'connectionUpdate', { signal: controller.signal });
            if (status !== connection_1.DiscordVoiceStates.SESSION_READY) {
                switch (status) {
                    case connection_1.DiscordVoiceStates.SESSION_ID_MISSING:
                        {
                            throw new Error('[HarmonyLink] [Player] [Connection] The voice connection is not established due to missing session id');
                        }
                        ;
                    case connection_1.DiscordVoiceStates.SESSION_ENDPOINT_MISSING:
                        {
                            throw new Error('[HarmonyLink] [Player] [Connection] The voice connection is not established due to missing connection endpoint');
                        }
                        ;
                }
                ;
            }
            ;
            this.voiceState = player_1.VoiceConnectionState.CONNECTED;
        }
        catch (error) {
            this.manager.emit("debug", "[HarmonyLink] [Player] [Connection] Request Connection Failed");
            if (error.name === 'AbortError')
                throw new Error(`[HarmonyLink] [Player] [Connection] The voice connection is not established in ${this.manager.options.voiceConnectionTimeout}ms`);
            throw error;
        }
        finally {
            clearTimeout(timeout);
            this.state = player_1.PlayerConnectionState.CONNECTED;
            this.manager.emit('debug', '[HarmonyLink] [Player] [Connection] Player connected');
        }
        ;
        return this;
    }
    ;
    /**
     * Sets the loop mode for the player.
     * @param {PlayerLoop | "NONE" | "QUEUE" | "TRACK"} mode - The loop mode to set.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    async setLoop(mode) {
        return new Promise((resolve) => {
            if (mode)
                this.loop = mode;
            else {
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
            }
            ;
            return resolve(this);
        });
    }
    ;
    async setAutoplay(toggle) {
        return new Promise((resolve) => {
            if (toggle)
                this.isAutoplay = toggle;
            else
                this.isAutoplay = !this.isAutoplay;
            return resolve(this);
        });
    }
    ;
    /**
     * Plays the current track in the queue.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    async play() {
        if (!this.queue.length || this.queue.length === 0)
            return this;
        this.queue.currentTrack = this.queue.shift() ?? null;
        if (this.queue.currentTrack && !this.queue.currentTrack.track)
            this.queue.currentTrack = await this.queue.currentTrack.resolve(this.manager);
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
    }
    ;
    /**
     * Destroys the player and cleans up associated resources.
     * @returns {Promise<boolean>} - A Promise that resolves to a boolean which is true if an element in the Map existed and has been removed, or false if the element does not exist.
     */
    async destroy() {
        await this.disconnect();
        await this.node.rest.destroyPlayer(this.guildId);
        this.manager.emit("debug", this.guildId, "[HarmonyLink] [Player] [Connection] Player destroyed");
        this.manager.emit("playerDestroy", this.guildId);
        return this.manager.playerManager.delete(this.guildId);
    }
    ;
    /**
     * Skips the current track.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    async skip() {
        if (!this.queue.length || this.queue.length === 0)
            return this; // TODO: Emit an event here for queue empty?
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
    }
    ;
    /**
     * Pauses the current track.
     * @param {boolean} [toggle=true] - Whether to pause or resume the track.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    async pause(toggle = true) {
        await this.node.rest.updatePlayer({
            guildId: this.guildId,
            playerOptions: {
                paused: toggle,
            }
        });
        this.isPaused = toggle;
        this.isPlaying = !toggle;
        return this;
    }
    ;
    /**
     * Resolves a track.
     * @param {ResolveOptions} [options] - Options for resolving tracks.
     * @param {Node} [node] - Node to use for resolution.
     * @returns {Promise<Response>} The response containing resolved tracks.
     */
    async resolve({ query, source, requester }, node) {
        if (!node)
            node = this.node;
        const result = await node.rest.loadTrack(query, source);
        return new Response_1.Response(result, requester);
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
                    return resolvedData;
            }
            ;
            const prevTrack = previousTrack ?? this.queue.previousTrack;
            if (!prevTrack)
                return this;
            switch (prevTrack.info.sourceName) {
                case "soundcloud":
                    {
                        const response = await this.resolve({ query: `${prevTrack.info.title}`, requester: prevTrack.info.requester, source: "scsearch" });
                        if (!response.tracks.length || response.tracks.length === 0 || ["error", "empty"].includes(response.loadType))
                            return await this.skip();
                        this.queue.add(response.tracks[Math.floor(Math.random() * Math.floor(response.tracks.length))]);
                        return await this.play();
                    }
                    ;
                case "youtube":
                default:
                    {
                        const searchedURL = `https://www.youtube.com/watch?v=${prevTrack.info.identifier || this.queue.currentTrack?.info.identifier}&list=RD${prevTrack.info.identifier || this.queue.currentTrack?.info.identifier}`;
                        const response = await this.resolve({ query: searchedURL, requester: prevTrack.info.requester, source: "ytmsearch" });
                        if (!response.tracks.length || response.tracks.length === 0 || ["error", "empty"].includes(response.loadType))
                            return await this.skip();
                        response.tracks.shift();
                        const track = response.tracks[Math.floor(Math.random() * Math.floor(response.tracks.length))];
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
    async disconnect() {
        if (!this.voiceChannelId)
            return this;
        this.queue._cleanUp();
        await this.skip();
        this.isConnected = false;
        this.state = player_1.PlayerConnectionState.DISCONNECTED;
        this.voiceState = player_1.VoiceConnectionState.DISCONNECTED;
        this.sendToDiscord({
            guild_id: this.guildId,
            channel_id: null,
            self_deaf: false,
            self_mute: false,
        });
        return this;
    }
    ;
    checkDestroyed() {
        if (this.state === player_1.PlayerConnectionState.DESTROYED)
            throw new Error('[HarmonyLink] [Player] [Connection] Player is already destroyed');
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
        return this.manager.library.sendPacket(Number(this.shardId), { op: 4, d: data }, false);
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
                        return this.manager.emit("trackEnd", this, data);
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
                    }
                    ;
                    // Because ESLint would cry for no-fallthrough.
                    break;
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
                        this.sendVoiceUpdate();
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