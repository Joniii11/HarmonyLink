"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
/* eslint-disable @typescript-eslint/no-unused-expressions, @typescript-eslint/no-unsafe-declaration-merging, no-sequences, @typescript-eslint/naming-convention */
const events_1 = require("events");
// Types
const player_1 = require("../typings/player");
const connection_1 = require("../typings/player/connection");
// Structures
const Queue_1 = require("./Queue");
const Connection_1 = require("./Connection");
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
    /* public async play(): Promise<Player> {
        if (!this.queue.length || this.queue.length === 0) return this;

        this.queue.currentTrack = this.queue.shift() ?? null;


    }*/
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
    async disconnect() {
        if (!this.voiceChannelId)
            return this;
        this.queue._cleanUp();
        await this.skip();
        this.isConnected = false;
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
                        return; // TODO: play function
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
                                return; // TODO: play function
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
                                return; // TODO: play function
                            }
                            ;
                        case "NONE":
                        case player_1.PlayerLoop.NONE:
                            {
                                if (!this.queue.length || this.queue.length === 0)
                                    return this.manager.emit("queueEmpty", this);
                                this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Track ended for player ${this.guildId}`);
                                this.manager.emit("trackEnd", this, this.queue.previousTrack);
                                return; // TODO: play function
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
                    // EXPERIMENTAL WITH 4006 CODE
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