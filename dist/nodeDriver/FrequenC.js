"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractNodeDriver_1 = __importDefault(require("./AbstractNodeDriver"));
const ws_1 = __importDefault(require("ws"));
const node_1 = require("../typings/node");
const utils_1 = require("../utils");
class FrequenC extends AbstractNodeDriver_1.default {
    clientId = "";
    type = node_1.NodeType.NodeLink;
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
        return new Promise((resolve, reject) => {
            if (!this.isRegistered)
                return reject(new Error("Node is not registered. Please register it by using <AbstractNodeDriver>.init()"));
            if (!this.manager?.isReady || !this.manager.library.userID)
                return reject(new Error("User ID is not set. Please set it before connecting. Is this really a valid library?"));
            const headers = {
                Authorization: this.node.options.password,
                "User-Id": this.manager.library.userID,
                "Client-Info": this.clientId,
            };
            const ws = new ws_1.default(`${this.wsUrl}/v4/websocket`, { headers });
            this.wsClient = ws;
            this.wsClient.on("open", this.openHandler.bind(this));
            this.wsClient.on("message", this.eventHandler.bind(this));
            this.wsClient.on("error", this.errorHandler.bind(this));
            this.wsClient.on("close", this.closeHandler.bind(this));
            return resolve(ws);
        });
    }
    ;
    async request(options) {
        if (!this.isRegistered)
            throw new Error("Node is not registered. Please register it by using <AbstractNodeDriver>.init()");
        if (options.path.includes("/sessions") && this.sessionId === null)
            throw new Error(`[HarmonyLink] [Node ${this.node?.options.name}] Session ID is not set. Please wait for FrequenC to be connected.`);
        if (options.path.startsWith("/version")) {
            const url = `${this.httpUrl}${options.path}`;
            const response = await globalThis.fetch(url, {
                method: "GET",
                headers: this.defaultHeaders
            });
            return response.headers.get("content-type") === "application/json" ? await response.json() : await response.text();
        }
        ;
        const url = new URL(`${this.httpUrl}/v1${options.path}`);
        if (options.params)
            url.search = new URLSearchParams(options.params).toString();
        else if (options.data) {
            const conv = (0, utils_1.camelToSnake)(options.data);
            options.body = JSON.stringify(conv);
        }
        ;
        const headers = {
            ...this.defaultHeaders,
            ...options.headers
        };
        if (options.path === "/decodetrack" || options.path === "/decodetracks") {
            const data = [];
            const failedTracks = [];
            if (options.data) {
                options.data.map((track) => {
                    const trackData = this.decoder(track);
                    if (trackData)
                        data.push(trackData);
                    else
                        failedTracks.push(track);
                });
            }
            else {
                const trackData = this.decoder(options.params.encodedTrack);
                if (trackData)
                    data.push(trackData);
                else
                    failedTracks.push(options.params.encodedTrack);
            }
            ;
            if (failedTracks.length > 0) {
                const res = await globalThis.fetch(new URL(`${this.httpUrl}/v1/decodetracks`), {
                    method: "POST",
                    headers,
                    body: JSON.stringify(failedTracks)
                });
                (await res.json()).map((track) => {
                    const trackInfo = (0, utils_1.snakeToCamel)(track.info);
                    data.push({
                        ...track,
                        info: trackInfo
                    });
                });
            }
            ;
            return data;
        }
        ;
        if (options.body && JSON.stringify(options.body) === '{}')
            delete options.body;
        const res = await globalThis.fetch(url, {
            ...options,
            method: options.method,
            headers
        });
        switch (res.status) {
            case 204:
                {
                    this.manager?.emit("debug", `[HarmonyLink] [Node Driver ${this.node?.options.name}] ${options.method} request to ${options.path} returned 204 No Content. payload=${options.body ? String(options.body) : "{}"}`);
                    return undefined;
                }
                ;
            case 200:
                {
                    const data = res.headers.get("content-type") === "application/json" ? (await res.json()) : await res.text();
                    this.manager?.emit("debug", `[HarmonyLink] [Node Driver ${this.node?.options.name}] ${options.method} request to ${options.path} returned 200 OK. payload=${options.body ? String(options.body) : "{}"}`);
                    return data;
                }
                ;
            default:
                {
                    this.manager?.emit("debug", `[HarmonyLink] [Node Driver ${this.node?.options.name}] ${options.method} request to ${options.path} returned ${res.status} ${res.statusText}. payload=${options.body ? String(options.body) : "{}"}`);
                    return undefined;
                }
                ;
        }
        ;
    }
    ;
    async updateSessions() {
        return new Promise((resolve) => {
            this.manager?.emit("debug", `[HarmonyLink] [Node ${this.node?.options.name}] FrequenC's do not support resuming yet, so set resume to true is useless.`);
            resolve();
        });
    }
    ;
    wsClose(withoutEmit = false) {
        if (withoutEmit) {
            this.wsClient?.close(1006, "Self Closed");
            this.manager?.emit("nodeDisconnect", this.node);
        }
        ;
        this.wsClient?.removeAllListeners();
        this.wsClient = undefined;
    }
    ;
    async eventHandler(data) {
        return new Promise((resolve) => {
            if (!this.node)
                return resolve(false);
            return resolve(this.node.emit("lavalinkEvent", data.toString(), utils_1.snakeToCamel));
        });
    }
    ;
}
exports.default = FrequenC;
;
//# sourceMappingURL=FrequenC.js.map