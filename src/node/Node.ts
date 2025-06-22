/* eslint-disable @typescript-eslint/no-invalid-void-type, @typescript-eslint/no-unsafe-declaration-merging */
import EventEmitter from "events";
import NodeEventHandler from "./NodeEventHandler";

import { HarmonyLink } from "@/HarmonyLink";
import { NodeOptions, NodeGroup, NodeStats, NodeEvents } from "@t/node";
import { getDefaultNodeStats } from "@/constants";
import Rest from "./Rest";
import { parseOptions } from "@/utils";
import AbstractNodeDriver from "@/nodeDriver/AbstractNodeDriver";
import LavalinkV4 from "@/nodeDriver/LavalinkV4";
import { WebSocket } from "ws";
import { Player } from "@/player/Player";
import { Snowflake } from "@/typings";
import { ErrorResponses, RoutePlannerStatus } from "@/typings/exporter";
import { Result } from "neverthrow";

export declare interface Node {
    on: <K extends keyof NodeEvents>(event: K, listener: NodeEvents[K]) => this;
    once: <K extends keyof NodeEvents>(event: K, listener: NodeEvents[K]) => this;
    emit: <K extends keyof NodeEvents>(
        event: K,
        ...args: Parameters<NodeEvents[K]>
    ) => boolean;
    off: <K extends keyof NodeEvents>(event: K, listener: NodeEvents[K]) => this;
}

export class Node extends EventEmitter {
    public options: Required<NodeOptions>
    public stats: NodeStats = getDefaultNodeStats()
    public isConnected: boolean = false;

    public readonly manager: HarmonyLink;
    public readonly rest: Rest
    public readonly driver: AbstractNodeDriver;
    public readonly players = new Map<Snowflake, Player>();

    protected readonly NodeEventsHandler: NodeEventHandler;

    public constructor(manager: HarmonyLink, options: NodeGroup) {
        super();
        this.manager = manager;
        this.options = parseOptions(options, this.manager.options);
        this.rest = new Rest(manager, this);
        this.NodeEventsHandler = new NodeEventHandler(this)

        const getDriver = this.manager.drivers.filter(driver => driver.type === options.type) as AbstractNodeDriver[] | undefined;

        if (!getDriver || getDriver.length === 0) {
            this.manager.emit("debug", `[HarmonyLink] [Node ${this.options.name}] No driver found for the node type [${this.options.type}]. Using default driver LavalinkV4.`)
            this.driver = new LavalinkV4();
        } else {
            this.manager.emit("debug", `[HarmonyLink] [Node ${this.options.name}] Driver found for the node type [${this.options.type}].`)
            this.driver = getDriver[0];
        };

        this.driver.init(this.manager, this);
    };

    /**
     * This method is used to check if the node is ready.
     */
    public get isReady(): boolean {
        return this.rest.isReady && this.isConnected;
    };

    /**
     * This method is used to set the session id.
     * @param {string} sessionId The session id.
     */
    public setSessionId(sessionId: string): void {
        this.rest.setSessionId(sessionId);
        this.driver.setSessionId(sessionId);
    };

    /**
     * This method is used to connect to the node.
     * @returns {Promise<WebSocket>} The websocket connection.
     */
    public async connect(): Promise<Result<WebSocket, Error>> {
        const ws = await this.driver.connect();
        if (ws.isErr()) {
            this.manager.emit("debug", `[HarmonyLink] [Node ${this.options.name}] Failed to connect to the node. Error: ${ws.error.message}`);
            throw ws.error;
        }


        this.isConnected = true;
        this.options.currentAttempts = 0;

        return ws;
    };

    /**
     * This method is used to disconnect from the node.
     * @returns {void} Resolves once the node is disconnected.
     */
    public disconnect(): void {
        if (!this.isConnected) return;

        this.manager.emit("debug", `[HarmonyLink] [Node ${this.options.name}] Disconnecting from the node.`);
        this.isConnected = false;
        this.driver.wsClose(true);
    };

    /**
     * This method is used to reconnect to the node.
     * @returns {Promise<void>} Resolves once the node is reconnected.
     */
    public async reconnect(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.options.reconnectAttemptTimeout = setTimeout(async () => {
                if (this.options.currentAttempts > this.options.reconnectTries) return reject(new Error(`[HarmonyLink] [Node ${this.options.name}] Reconnect attempts exceeded the limit [${this.options.reconnectTries}]`));

                this.isConnected = false;
                this.driver.wsClose(false);

                this.manager.emit("nodeReconnect", this);
                this.manager.emit("debug", `[HarmonyLink] [Node ${this.options.name}] Reconnecting to the node.`)

                await this.connect();
                this.options.currentAttempts++;
            }, this.options.reconnectTimeout)

            resolve()
        })
    };

    /**
     * This method is used to get the node stats.
     * @returns {Promise<NodeStats>} The node stats.
     */
    public async getStats(): Promise<NodeStats> {
        const stats = await this.rest.getStats();

        this.stats = {
            ...this.stats,
            ...stats
        };

        return this.stats;
    };

    /**
     * This method is used to get the route planner status.
     * @returns {Promise<RoutePlannerStatus>} The route planner status.
     * 
     * @see https://lavalink.dev/api/rest.html#get-routeplanner-status
     */
    public async getRoutePlannerStatus(): Promise<RoutePlannerStatus> {
        return this.rest.getRoutePlannerStatus()
    };

    /**
     * This method is used to unmark all failed addresses.
     * @returns {Promise<Result<undefined, Error | ErrorResponses>>} 204 - No content.
     * 
     * @see https://lavalink.dev/api/rest.html#unmark-all-failed-address
     */
    public async unmarkAllFailingAddresses(): Promise<Result<undefined, Error | ErrorResponses>> {
        return this.rest.unmarkAllFailedAddresses()
    };

    /**
     * This method is used to unmark a failed address.
     * @param {string} address The address to unmark.
     * @returns {Promise<Result<undefined, Error | ErrorResponses>>} 204 - No content.
     * 
     * @see https://lavalink.dev/api/rest.html#unmark-a-failed-address
     */
    public async unmarkFailingAddress(address: string): Promise<Result<undefined, Error | ErrorResponses>> {
        return this.rest.unmarkFailedAddress(address)
    };
}