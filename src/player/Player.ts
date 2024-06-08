/* eslint-disable @typescript-eslint/no-unused-expressions, no-sequences, @typescript-eslint/naming-convention */
import { EventEmitter } from "events"

import { HarmonyLink } from "@/HarmonyLink"
import { Node } from "@/node/Node";
import { PlayerConnectionState, PlayerOptions, VoiceConnectionState } from "@t/player";
import { ConnectionHandler } from "./Connection";
import { DiscordVoiceStates } from "@/typings/player/connection";

export class Player extends EventEmitter {
    public readonly node: Node;
    public readonly manager: HarmonyLink;
    public readonly ConnectionHandler: ConnectionHandler

    public voiceChannelId: string;
    public guildId: string;
    public shardId: string;
    public isConnected: boolean
    public state: PlayerConnectionState
    public voiceState: VoiceConnectionState
    
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

        // Handlers
        this.ConnectionHandler = new ConnectionHandler(this)
    };

    public async connect(): Promise<Player> {
		if (this.state === PlayerConnectionState.CONNECTED || !this.voiceChannelId) return this;
		if (this.voiceState === VoiceConnectionState.CONNECTING || this.voiceState === VoiceConnectionState.CONNECTED) return this;

		// Sending a voice update to discord
        this.voiceState = VoiceConnectionState.CONNECTING;
		this.sendVoiceUpdate();

        // Requesting a voice connection
		this.manager.emit("debug", `[HarmonyLink] [Player] [Connection] Requesting voice connection for player ${  this.guildId  } in the region ${  this.ConnectionHandler.options.voiceRegion  }.`);

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
};