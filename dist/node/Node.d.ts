/// <reference types="node" />
import EventEmitter from "events";
import NodeEventHandler from "./NodeEventHandler";
import { HarmonyLink } from "../HarmonyLink";
import { NodeOptions, NodeGroup, NodeStats, NodeEvents } from "../typings/node";
import Rest from "./Rest";
import AbstractNodeDriver from "../nodeDriver/AbstractNodeDriver";
import { WebSocket } from "ws";
import { Player } from "../player/Player";
import { ErrorResponses, RoutePlannerStatus } from "../typings/exporter";
import { Result } from "neverthrow";
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
    /**
     * This method is used to check if the node is ready.
     */
    get isReady(): boolean;
    /**
     * This method is used to set the session id.
     * @param {string} sessionId The session id.
     */
    setSessionId(sessionId: string): void;
    /**
     * This method is used to connect to the node.
     * @returns {Promise<WebSocket>} The websocket connection.
     */
    connect(): Promise<Result<WebSocket, Error>>;
    /**
     * This method is used to disconnect from the node.
     * @returns {void} Resolves once the node is disconnected.
     */
    disconnect(): void;
    /**
     * This method is used to reconnect to the node.
     * @returns {Promise<void>} Resolves once the node is reconnected.
     */
    reconnect(): Promise<void>;
    /**
     * This method is used to get the node stats.
     * @returns {Promise<NodeStats>} The node stats.
     */
    getStats(): Promise<NodeStats>;
    /**
     * This method is used to get the route planner status.
     * @returns {Promise<RoutePlannerStatus>} The route planner status.
     *
     * @see https://lavalink.dev/api/rest.html#get-routeplanner-status
     */
    getRoutePlannerStatus(): Promise<RoutePlannerStatus>;
    /**
     * This method is used to unmark all failed addresses.
     * @returns {Promise<Result<undefined, Error | ErrorResponses>>} 204 - No content.
     *
     * @see https://lavalink.dev/api/rest.html#unmark-all-failed-address
     */
    unmarkAllFailingAddresses(): Promise<Result<undefined, Error | ErrorResponses>>;
    /**
     * This method is used to unmark a failed address.
     * @param {string} address The address to unmark.
     * @returns {Promise<Result<undefined, Error | ErrorResponses>>} 204 - No content.
     *
     * @see https://lavalink.dev/api/rest.html#unmark-a-failed-address
     */
    unmarkFailingAddress(address: string): Promise<Result<undefined, Error | ErrorResponses>>;
}
