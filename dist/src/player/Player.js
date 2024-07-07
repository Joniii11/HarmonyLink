"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
/* eslint-disable @typescript-eslint/no-unused-expressions, no-sequences, @typescript-eslint/naming-convention */
const events_1 = require("events");
const player_1 = require("@t/player");
const Connection_1 = require("./Connection");
const connection_1 = require("@/typings/player/connection");
class Player extends events_1.EventEmitter {
    node;
    manager;
    ConnectionHandler;
    voiceChannelId;
    guildId;
    shardId;
    isConnected;
    state;
    voiceState;
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
        // Handlers
        this.ConnectionHandler = new Connection_1.ConnectionHandler(this);
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
}
exports.Player = Player;
;
//# sourceMappingURL=Player.js.map