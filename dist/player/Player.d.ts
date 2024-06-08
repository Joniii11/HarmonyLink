/// <reference types="node" />
import { EventEmitter } from "events";
import { HarmonyLink } from "@/HarmonyLink";
import { Node } from "@/node/Node";
import { PlayerConnectionState, PlayerOptions, VoiceConnectionState } from "@t/player";
import { ConnectionHandler } from "./Connection";
export declare class Player extends EventEmitter {
    readonly node: Node;
    readonly manager: HarmonyLink;
    readonly ConnectionHandler: ConnectionHandler;
    voiceChannelId: string;
    guildId: string;
    shardId: string;
    isConnected: boolean;
    state: PlayerConnectionState;
    voiceState: VoiceConnectionState;
    constructor(manager: HarmonyLink, node: Node, options: PlayerOptions);
    connect(): Promise<Player>;
    protected checkDestroyed(): void;
    private sendVoiceUpdate;
    private sendToDiscord;
}
