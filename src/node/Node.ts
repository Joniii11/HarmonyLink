/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
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

    public get isReady(): boolean {
        return this.rest.isReady && this.isConnected;
    };

    public setSessionId(sessionId: string): void {
        this.rest.setSessionId(sessionId);
        this.driver.setSessionId(sessionId);
    };

    public async connect(): Promise<WebSocket> {
        const ws = await this.driver.connect();

        this.isConnected = true;
        this.options.currentAttempts = 0;

        return ws;
    };

    public async disconnect(): Promise<void> {
        return new Promise<void>((resolve) => {
            if (!this.isConnected) return resolve();
            this.isConnected = false;

            this.driver.wsClose(true);

            resolve();
        });
    };

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

    public async getStats(): Promise<NodeStats> {
        const stats = await this.rest.getStats();

        this.stats = {
            ...this.stats,
            ...stats
        };

        return this.stats;
    };
}