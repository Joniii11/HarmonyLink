"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
/* eslint-disable @typescript-eslint/no-invalid-void-type, @typescript-eslint/no-unsafe-declaration-merging */
const events_1 = __importDefault(require("events"));
const NodeEventHandler_1 = __importDefault(require("./NodeEventHandler"));
const constants_1 = require("../constants");
const Rest_1 = __importDefault(require("./Rest"));
const utils_1 = require("../utils");
const LavalinkV4_1 = __importDefault(require("../nodeDriver/LavalinkV4"));
class Node extends events_1.default {
    options;
    stats = (0, constants_1.getDefaultNodeStats)();
    isConnected = false;
    manager;
    rest;
    driver;
    players = new Map();
    NodeEventsHandler;
    constructor(manager, options) {
        super();
        this.manager = manager;
        this.options = (0, utils_1.parseOptions)(options, this.manager.options);
        this.rest = new Rest_1.default(manager, this);
        this.NodeEventsHandler = new NodeEventHandler_1.default(this);
        const getDriver = this.manager.drivers.filter(driver => driver.type === options.type);
        if (!getDriver || getDriver.length === 0) {
            this.manager.emit("debug", `[HarmonyLink] [Node ${this.options.name}] No driver found for the node type [${this.options.type}]. Using default driver LavalinkV4.`);
            this.driver = new LavalinkV4_1.default();
        }
        else {
            this.manager.emit("debug", `[HarmonyLink] [Node ${this.options.name}] Driver found for the node type [${this.options.type}].`);
            this.driver = getDriver[0];
        }
        ;
        this.driver.init(this.manager, this);
    }
    ;
    /**
     * This method is used to check if the node is ready.
     */
    get isReady() {
        return this.rest.isReady && this.isConnected;
    }
    ;
    /**
     * This method is used to set the session id.
     * @param {string} sessionId The session id.
     */
    setSessionId(sessionId) {
        this.rest.setSessionId(sessionId);
        this.driver.setSessionId(sessionId);
    }
    ;
    /**
     * This method is used to connect to the node.
     * @returns {Promise<WebSocket>} The websocket connection.
     */
    async connect() {
        const ws = await this.driver.connect();
        this.isConnected = true;
        this.options.currentAttempts = 0;
        return ws;
    }
    ;
    /**
     * This method is used to disconnect from the node.
     * @returns {Promise<void>} Resolves once the node is disconnected.
     */
    async disconnect() {
        return new Promise((resolve) => {
            if (!this.isConnected)
                return resolve();
            this.isConnected = false;
            this.driver.wsClose(true);
            resolve();
        });
    }
    ;
    /**
     * This method is used to reconnect to the node.
     * @returns {Promise<void>} Resolves once the node is reconnected.
     */
    async reconnect() {
        return new Promise((resolve, reject) => {
            this.options.reconnectAttemptTimeout = setTimeout(async () => {
                if (this.options.currentAttempts > this.options.reconnectTries)
                    return reject(new Error(`[HarmonyLink] [Node ${this.options.name}] Reconnect attempts exceeded the limit [${this.options.reconnectTries}]`));
                this.isConnected = false;
                this.driver.wsClose(false);
                this.manager.emit("nodeReconnect", this);
                this.manager.emit("debug", `[HarmonyLink] [Node ${this.options.name}] Reconnecting to the node.`);
                await this.connect();
                this.options.currentAttempts++;
            }, this.options.reconnectTimeout);
            resolve();
        });
    }
    ;
    /**
     * This method is used to get the node stats.
     * @returns {Promise<NodeStats>} The node stats.
     */
    async getStats() {
        const stats = await this.rest.getStats();
        this.stats = {
            ...this.stats,
            ...stats
        };
        return this.stats;
    }
    ;
    /**
     * This method is used to get the route planner status.
     * @returns {Promise<RoutePlannerStatus>} The route planner status.
     *
     * @see https://lavalink.dev/api/rest.html#get-routeplanner-status
     */
    async getRoutePlannerStatus() {
        return this.rest.getRoutePlannerStatus();
    }
    ;
    /**
     * This method is used to unmark all failed addresses.
     * @returns {Promise<ErrorResponses | void>} 204 - No content.
     *
     * @see https://lavalink.dev/api/rest.html#unmark-all-failed-address
     */
    async unmarkAllFailingAddresses() {
        return this.rest.unmarkAllFailedAddresses();
    }
    ;
    /**
     * This method is used to unmark a failed address.
     * @param {string} address The address to unmark.
     * @returns {Promise<ErrorResponses | void>} 204 - No content.
     *
     * @see https://lavalink.dev/api/rest.html#unmark-a-failed-address
     */
    async unmarkFailingAddress(address) {
        return this.rest.unmarkFailedAddress(address);
    }
    ;
}
exports.Node = Node;
//# sourceMappingURL=Node.js.map