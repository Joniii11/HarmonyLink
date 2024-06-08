/// <reference types="node" />
import EventEmitter from "events";
import NodeEventHandler from "./NodeEventHandler";
import { HarmonyLink } from "@/HarmonyLink";
import { NodeOptions, NodeGroup, NodeStats, NodeEvents } from "@t/node";
import Rest from "./Rest";
import AbstractNodeDriver from "@/nodeDriver/AbstractNodeDriver";
import { WebSocket } from "ws";
import { Player } from "@/player/Player";
export declare interface Node {
    on: <K extends keyof NodeEvents>(event: K, listener: NodeEvents[K]) => this;
    once: <K extends keyof NodeEvents>(event: K, listener: NodeEvents[K]) => this;
    emit: <K extends keyof NodeEvents>(event: K, ...args: Parameters<NodeEvents[K]>) => boolean;
    off: <K extends keyof NodeEvents>(event: K, listener: NodeEvents[K]) => this;
}
export declare class Node extends EventEmitter {
    options: Required<NodeOptions>;
    stats: NodeStats;
    isConnected: boolean;
    readonly manager: HarmonyLink;
    readonly rest: Rest;
    readonly driver: AbstractNodeDriver;
    readonly players: Map<string, Player>;
    protected readonly NodeEventsHandler: NodeEventHandler;
    constructor(manager: HarmonyLink, options: NodeGroup);
    get isReady(): boolean;
    setSessionId(sessionId: string): void;
    connect(): Promise<WebSocket>;
    disconnect(): Promise<void>;
    reconnect(): Promise<void>;
    getStats(): Promise<NodeStats>;
}
