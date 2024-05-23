import EventEmitter from "events";
import NodeEventHandler from "./NodeEventHandler";

import type { HarmonyLink } from "@/HarmonyLink";
import { NodeOptions, type NodeGroup, type NodeStats, type NodeEvents } from "@t/node";
import { getDefaultNodeStats } from "@/constants";
import Rest from "./Rest";
import { parseOptions } from "@/utils";
import AbstractNodeDriver from "@/nodeDriver/AbstractNodeDriver";
import LavalinkV4 from "@/nodeDriver/LavalinkV4";
import { WebSocket } from "ws";

export declare interface Node {
    on<K extends keyof NodeEvents>(event: K, listener: NodeEvents[K]): this;
    once<K extends keyof NodeEvents>(event: K, listener: NodeEvents[K]): this;
    emit<K extends keyof NodeEvents>(
        event: K,
        ...args: Parameters<NodeEvents[K]>
    ): boolean;
    off<K extends keyof NodeEvents>(event: K, listener: NodeEvents[K]): this;
}

export class Node extends EventEmitter {
    public manager: HarmonyLink;
    public options: Required<NodeOptions>
    public stats: NodeStats = getDefaultNodeStats()
    public driver: AbstractNodeDriver;
    public isConnected: boolean = false;
    public readonly rest: Rest

    protected readonly NodeEventsHandler: NodeEventHandler = new NodeEventHandler(this);

    constructor(manager: HarmonyLink, options: NodeGroup) {
        super();
        this.manager = manager;
        this.options = parseOptions(options, this.manager.options);
        this.rest = new Rest(manager, this);

        const getDriver = this.manager.drivers.filter(driver => driver.type === options.type)
        if (!getDriver || getDriver.length === 0) {
            this.manager.emit("debug", `[HarmonyLink] [Node ${this.options.name}] No driver found for the node type [${this.options.type}]. Using default driver LavalinkV4.`)
            this.driver = new LavalinkV4();
        } else {
            this.manager.emit("debug", "[HarmonyLink] [Node ${this.options.name}] Driver found for the node type [${this.options.type}].")
            this.driver = getDriver[0];
        };

        this.driver.init(this.manager, this);
    };

    public get isReady(): boolean {
        return this.rest.isReady && this.isConnected;
    };

    public setSessionId(sessionId: string): void {
        this.rest.setSessionId(sessionId);
    };

    public async connect(): Promise<WebSocket> {
        return await this.driver.connect();
    };

    public async disconnect(): Promise<void> {
        return new Promise<void>((resolve) => {
            if (!this.isConnected) return resolve();

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
    }
}