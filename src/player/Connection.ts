import { DiscordVoiceStates, ConnectionOptions, SetStateUpdate, VoiceServer } from "@t/player/connection";
import { Player } from "./Player";
import { getDefaultConnectionOptions } from "@/constants/player";
import { PlayerOptions, VoiceConnectionState } from "@/typings/player";
import { err, ok, Result } from "neverthrow";

export class ConnectionHandler {
    public readonly player: Player;
    public options: ConnectionOptions

    public constructor(player: Player, options: PlayerOptions) {
        this.player = player;
        this.options = getDefaultConnectionOptions(options);
    };

    /**
     * Updates the voice server of the player.
     * @param {VoiceServer} data The incoming data from the voice server from discord.
     */
    public async setServersUpdate(data: VoiceServer): Promise<Result<void, Error>> {
        if (!data.endpoint) {
            this.player.emit('connectionUpdate', DiscordVoiceStates.SESSION_ENDPOINT_MISSING);
            return err(new Error("[HarmonyLink] [Player] [Connection] Voice server endpoint is missing."));
        };

        this.options.voice.endpoint = data.endpoint!;
        this.options.voice.token = data.token;
        this.options.voiceRegion = data.endpoint.split(".").shift()?.replace(/[0-9]/g, "") ?? null;

        const playerResult = await this.player.node.rest.updatePlayer({
            guildId: this.player.guildId,
            playerOptions: {
                voice: {
                    endpoint: this.options.voice.endpoint,
                    token: this.options.voice.token,
                    sessionId: this.options.voice.sessionId!,
                },
            },
        });

        if (playerResult.isErr()) {
            this.player.emit("connectionUpdate", DiscordVoiceStates.SESSION_FAILED_UPDATE);
            return err(playerResult.error);
        };

        setTimeout(async () => {
            await this.player.node.rest.updatePlayer({
                guildId: this.player.guildId,
                playerOptions: {
                    paused: false
                }
            });
        }, 1000);

        this.player.emit("connectionUpdate", DiscordVoiceStates.SESSION_READY)
        this.player.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Updated voice server for player ${this.player.guildId} in the region ${this.options.voiceRegion}.`);

        return ok();
    };

    /**
     * Updates the state of the player.
     * @param {SetStateUpdate} data The incoming data from the voice server from discord.
     */
    public setStateUpdate(data: SetStateUpdate): void {
        // eslint-disable-next-line camelcase
        const { session_id: sessionId, channel_id: channelId, self_deaf: selfDeaf, self_mute: selfMute } = data;

        if (this.player.voiceChannelId && channelId && this.player.voiceChannelId !== channelId) {
            this.player.voiceChannelId = channelId;
        };

        if (!sessionId) {
            this.player.voiceState = VoiceConnectionState.DISCONNECTED
        };

        this.options.selfDeaf = selfDeaf;
        this.options.selfMute = selfMute;
        this.options.voice.sessionId = sessionId || null;
    };
}