"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-expressions */
const AbstractNodeDriver_1 = __importDefault(require("./AbstractNodeDriver"));
const ws_1 = require("ws");
const node_1 = require("../typings/node");
const neverthrow_1 = require("neverthrow");
class LavalinkV4 extends AbstractNodeDriver_1.default {
    clientId = "";
    type = node_1.NodeType.LavaLinkV4;
    wsUrl = "";
    httpUrl = "";
    manager = null;
    node = null;
    sessionId = null;
    wsClient = undefined;
    get isRegistered() {
        return (this.manager !== null && this.node !== null && this.wsUrl.length !== 0 && this.httpUrl.length !== 0);
    }
    ;
    init(manager, node) {
        this.manager = manager;
        this.clientId = `${manager.config.name}/${manager.config.version} (${manager.config.github})`;
        this.node = node;
        this.wsUrl = `${(node.options.secure) ? "wss" : "ws"}://${node.options.host}:${node.options.port}`;
        this.httpUrl = `${(node.options.secure) ? "https" : "http"}://${node.options.host}:${node.options.port}`;
    }
    ;
    async connect() {
        return await (0, neverthrow_1.fromPromise)(new Promise((resolve, reject) => {
            if (!this.isRegistered)
                return reject(new Error("Node is not registered. Please register it by using <AbstractNodeDriver>.init()"));
            if (!this.manager?.isReady || !this.manager.library.userID)
                return reject(new Error("User ID is not set. Please set it before connecting. Is this really a valid library?"));
            const shouldResume = this.manager.options.resume;
            const headers = {
                Authorization: this.node.options.password,
                "User-Id": this.manager.library.userID,
                "Client-Name": this.clientId,
            };
            if (shouldResume && this.sessionId)
                headers["Session-Id"] = this.sessionId;
            const ws = new ws_1.WebSocket(`${this.wsUrl}/v4/websocket`, { headers });
            this.wsClient = ws;
            this.wsClient.on("open", this.openHandler.bind(this));
            this.wsClient.on("message", this.eventHandler.bind(this));
            this.wsClient.on("error", this.errorHandler.bind(this));
            this.wsClient.on("close", this.closeHandler.bind(this));
            return resolve(ws);
        }), (error) => error instanceof Error ? error : new Error(String(error)));
    }
    ;
    wsClose(withoutEmit = false) {
        if (this.wsClient) {
            this.wsClient.close(1000, "Connection closed"); // Use proper close code
            if (!withoutEmit && this.node) {
                this.manager?.emit("nodeDisconnect", this.node, 1000);
            }
        }
        this.wsClient?.removeAllListeners();
        this.wsClient = undefined;
    }
    ;
    async request(options) {
        if (!this.isRegistered)
            return (0, neverthrow_1.err)(new Error("Node is not registered. Please register it by using <AbstractNodeDriver>.init()"));
        if (options.path.includes("/sessions") && this.sessionId === null)
            return (0, neverthrow_1.err)(new Error(`[HarmonyLink] [Node ${this.node?.options.name}] Session ID is not set. Please wait for LavaLinkV4 to be connected.`));
        if (options.path.startsWith("/version")) {
            const fetchResult = await (0, neverthrow_1.fromPromise)(globalThis.fetch(`${this.httpUrl}${options.path}`, {
                method: "GET",
                headers: this.defaultHeaders
            }), (error) => error instanceof Error ? error : new Error(String(error)));
            return fetchResult.asyncMap(async (response) => response.headers.get("content-type") === "application/json" ? await response.json() : await response.text());
        }
        const url = new URL(`${this.httpUrl}/v4${options.path}`);
        if (options.params)
            url.search = new URLSearchParams(options.params).toString();
        if (options.data)
            options.body = JSON.stringify(options.data);
        const headers = {
            ...this.defaultHeaders,
            ...options.headers
        };
        if (options.path === "/decodetrack" || options.path === "/decodetracks") {
            const data = [];
            const failedTracks = [];
            if (options.data) {
                options.data.map((track) => {
                    const trackResult = this.decoder(track);
                    trackResult.match((trackData) => data.push(trackData), () => failedTracks.push(track));
                });
            }
            else {
                const trackResult = this.decoder(options.params.encodedTrack);
                trackResult.match((trackData) => data.push(trackData), () => failedTracks.push(options.params.encodedTrack));
            }
            if (failedTracks.length > 0) {
                const fetchResult = await (0, neverthrow_1.fromPromise)(globalThis.fetch(new URL(`${this.httpUrl}/v4/decodetracks`), {
                    method: "POST",
                    headers,
                    body: JSON.stringify(failedTracks)
                }), (error) => error instanceof Error ? error : new Error(String(error)));
                const jsonResult = await fetchResult.asyncMap(async (response) => await response.json());
                return jsonResult.map((additionalData) => {
                    data.push(...additionalData);
                    return data;
                }).mapErr((error) => error);
            }
            return (0, neverthrow_1.ok)(data);
        }
        const fetchResult = await (0, neverthrow_1.fromPromise)(globalThis.fetch(url, {
            ...options,
            method: options.method,
            headers
        }), (error) => error instanceof Error ? error : new Error(String(error)));
        return fetchResult.asyncMap(async (res) => {
            switch (res.status) {
                case 204: {
                    this.manager?.emit("debug", `[HarmonyLink] [Node Driver ${this.node?.options.name}] ${options.method} request to ${options.path} returned 204 No Content. payload=${options.body ? String(options.body) : "{}"}`);
                    return undefined;
                }
                case 200: {
                    const data = res.headers.get("content-type") === "application/json" ? await res.json() : await res.text();
                    this.manager?.emit("debug", `[HarmonyLink] [Node Driver ${this.node?.options.name}] ${options.method} request to ${options.path} returned 200 OK. payload=${options.body ? String(options.body) : "{}"}`);
                    return data;
                }
                default: {
                    this.manager?.emit("debug", `[HarmonyLink] [Node Driver ${this.node?.options.name}] ${options.method} request to ${options.path} returned ${res.status} ${res.statusText}. payload=${options.body ? String(options.body) : "{}"}`);
                    return undefined;
                }
            }
        });
    }
    async updateSessions(sessionId, mode, timeout) {
        const options = {
            path: `/sessions/${sessionId}`,
            method: "PATCH",
            data: {
                resuming: mode,
                timeout
            }
        };
        const requestResult = await this.request(options);
        return requestResult.map(() => { this.manager?.emit("debug", `[HarmonyLink] [Node ${this.node?.options.name}] Updated the session.`); }).mapErr((error) => {
            this.manager?.emit("debug", `[HarmonyLink] [Node ${this.node?.options.name}] Failed to update session: ${error.message}`);
            return error;
        });
    }
    ;
}
exports.default = LavalinkV4;
//# sourceMappingURL=LavalinkV4.js.map