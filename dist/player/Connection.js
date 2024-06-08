"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionHandler = void 0;
const connection_1 = require("@t/player/connection");
const player_1 = require("@/constants/player");
const player_2 = require("@/typings/player");
class ConnectionHandler {
    player;
    options;
    constructor(player) {
        this.player = player;
        this.options = (0, player_1.getDefaultConnectionOptions)();
    }
    ;
    /**
     * Updates the voice server of the player.
     * @param {VoiceServer} data The incoming data from the voice server from discord.
     */
    async setServersUpdate(data) {
        if (!data.endpoint) {
            this.player.emit('connectionUpdate', connection_1.DiscordVoiceStates.SESSION_ENDPOINT_MISSING);
            return;
        }
        ;
        if (!data.sessionId) {
            this.player.emit('connectionUpdate', connection_1.DiscordVoiceStates.SESSION_ID_MISSING);
            return;
        }
        ;
        this.options.voice.endpoint = data.endpoint;
        this.options.voice.token = data.token;
        this.options.voiceRegion = data.endpoint.split(".").shift()?.replace(/[0-9]/g, "") ?? null;
        await this.player.node.rest.updatePlayer({
            guildId: this.player.guildId,
            playerOptions: {
                voice: {
                    endpoint: this.options.voice.endpoint,
                    token: this.options.voice.token,
                    sessionId: this.options.voice.sessionId,
                },
            },
        });
        this.player.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Updated voice server for player ${this.player.guildId} in the region ${this.options.voiceRegion}.`);
    }
    ;
    /**
     * Updates the state of the player.
     * @param {SetStateUpdate} data The incoming data from the voice server from discord.
     */
    setStateUpdate(data) {
        const { session_id, channel_id, self_deaf, self_mute } = data;
        if (this.player.voiceChannelId && channel_id && this.player.voiceChannelId !== channel_id) {
            this.player.voiceChannelId = channel_id;
        }
        ;
        if (!session_id) {
            this.player.voiceState = player_2.VoiceConnectionState.DISCONNECTED;
        }
        ;
        this.options.selfDeaf = self_deaf;
        this.options.selfMute = self_mute;
        this.options.voice.sessionId = session_id || null;
    }
    ;
}
exports.ConnectionHandler = ConnectionHandler;
//# sourceMappingURL=Connection.js.map