/// <reference types="node" />
import { EventEmitter } from "events";
import { PlayerConnectionState, PlayerOptions, VoiceConnectionState, PlayerEvents, PlayerLoop } from "../typings/player";
import { Node } from "../node/Node";
import { HarmonyLink } from "../HarmonyLink";
import { Queue } from './Queue';
import { ConnectionHandler } from "./Connection";
export declare interface Player {
    on: <K extends keyof PlayerEvents>(event: K, listener: PlayerEvents[K]) => this;
    once: <K extends keyof PlayerEvents>(event: K, listener: PlayerEvents[K]) => this;
    emit: <K extends keyof PlayerEvents>(event: K, ...args: Parameters<PlayerEvents[K]>) => boolean;
    off: <K extends keyof PlayerEvents>(event: K, listener: PlayerEvents[K]) => this;
}
export declare class Player extends EventEmitter {
    readonly node: Node;
    readonly manager: HarmonyLink;
    readonly ConnectionHandler: ConnectionHandler;
    readonly queue: Queue;
    voiceChannelId: string;
    guildId: string;
    shardId: string;
    isConnected: boolean;
    isPlaying: boolean;
    isPaused: boolean;
    state: PlayerConnectionState;
    voiceState: VoiceConnectionState;
    loop: PlayerLoop | "NONE" | "QUEUE" | "TRACK";
    /**
     * The ping of the node to the Discord voice server in milliseconds (-1 if not connected)
     */
    ping: number;
    timestamp: number;
    position: number;
    constructor(manager: HarmonyLink, node: Node, options: PlayerOptions);
    connect(): Promise<Player>;
    /**
     * Destroys the player and cleans up associated resources.
     * @returns {Promise<boolean>} - A Promise that resolves to a boolean which is true if an element in the Map existed and has been removed, or false if the element does not exist.
     */
    destroy(): Promise<boolean>;
    /**
     * Skips the current track.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    skip(): Promise<Player>;
    /**
     * Pauses the current track.
     * @param {boolean} [toggle=true] - Whether to pause or resume the track.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    pause(toggle?: boolean): Promise<Player>;
    protected disconnect(): Promise<Player>;
    protected checkDestroyed(): void;
    private sendVoiceUpdate;
    private sendToDiscord;
    private _eventHandler;
}
