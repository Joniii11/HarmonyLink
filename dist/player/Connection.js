"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionHandler = void 0;
const connection_1 = require("../typings/player/connection");
const player_1 = require("../constants/player");
const player_2 = require("../typings/player");
const neverthrow_1 = require("neverthrow");
class ConnectionHandler {
    player;
    options;
    constructor(player, options) {
        this.player = player;
        this.options = (0, player_1.getDefaultConnectionOptions)(options);
    }
    ;
    /**
     * Updates the voice server of the player.
     * @param {VoiceServer} data The incoming data from the voice server from discord.
     */
    async setServersUpdate(data) {
        if (!data.endpoint) {
            this.player.emit('connectionUpdate', connection_1.DiscordVoiceStates.SESSION_ENDPOINT_MISSING);
            return (0, neverthrow_1.err)(new Error("[HarmonyLink] [Player] [Connection] Voice server endpoint is missing."));
        }
        ;
        this.options.voice.endpoint = data.endpoint;
        this.options.voice.token = data.token;
        this.options.voiceRegion = data.endpoint.split(".").shift()?.replace(/[0-9]/g, "") ?? null;
        const playerResult = await this.player.node.rest.updatePlayer({
            guildId: this.player.guildId,
            playerOptions: {
                voice: {
                    endpoint: this.options.voice.endpoint,
                    token: this.options.voice.token,
                    sessionId: this.options.voice.sessionId,
                },
            },
        });
        if (playerResult.isErr()) {
            this.player.emit("connectionUpdate", connection_1.DiscordVoiceStates.SESSION_FAILED_UPDATE);
            return (0, neverthrow_1.err)(playerResult.error);
        }
        ;
        setTimeout(async () => {
            await this.player.node.rest.updatePlayer({
                guildId: this.player.guildId,
                playerOptions: {
                    paused: false
                }
            });
        }, 1000);
        this.player.emit("connectionUpdate", connection_1.DiscordVoiceStates.SESSION_READY);
        this.player.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Updated voice server for player ${this.player.guildId} in the region ${this.options.voiceRegion}.`);
        return (0, neverthrow_1.ok)();
    }
    ;
    /**
     * Updates the state of the player.
     * @param {SetStateUpdate} data The incoming data from the voice server from discord.
     */
    setStateUpdate(data) {
        // eslint-disable-next-line camelcase
        const { session_id: sessionId, channel_id: channelId, self_deaf: selfDeaf, self_mute: selfMute } = data;
        if (this.player.voiceChannelId && channelId && this.player.voiceChannelId !== channelId) {
            this.player.voiceChannelId = channelId;
        }
        ;
        if (!sessionId) {
            this.player.voiceState = player_2.VoiceConnectionState.DISCONNECTED;
        }
        ;
        this.options.selfDeaf = selfDeaf;
        this.options.selfMute = selfMute;
        this.options.voice.sessionId = sessionId || null;
    }
    ;
}
exports.ConnectionHandler = ConnectionHandler;
//# sourceMappingURL=Connection.js.map