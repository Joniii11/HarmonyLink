"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-expressions */
const AbstractNodeDriver_1 = __importDefault(require("./AbstractNodeDriver"));
const ws_1 = __importDefault(require("ws"));
const node_1 = require("../typings/node");
const utils_1 = require("../utils");
const neverthrow_1 = require("neverthrow");
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
        return await (0, neverthrow_1.fromPromise)(new Promise((resolve, reject) => {
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
        }), (error) => error instanceof Error ? error : new Error(String(error)));
    }
    ;
    async request(options) {
        if (!this.isRegistered)
            return (0, neverthrow_1.err)(new Error("Node is not registered. Please register it by using <AbstractNodeDriver>.init()"));
        if (options.path.includes("/sessions") && this.sessionId === null)
            return (0, neverthrow_1.err)(new Error(`[HarmonyLink] [Node ${this.node?.options.name}] Session ID is not set. Please wait for FrequenC to be connected.`));
        if (options.path.startsWith("/version")) {
            try {
                const response = await globalThis.fetch(`${this.httpUrl}${options.path}`, {
                    method: "GET",
                    headers: this.defaultHeaders
                });
                const data = response.headers.get("content-type") === "application/json" ?
                    await response.json() : await response.text();
                return (0, neverthrow_1.ok)(data);
            }
            catch (error) {
                return (0, neverthrow_1.err)(error instanceof Error ? error : new Error(String(error)));
            }
        }
        else if (options.path.startsWith("/routeplanner")) {
            return (0, neverthrow_1.ok)({
                timestamp: Date.now(),
                status: 404,
                error: "Not found.",
                message: "The specified node is a FrequenC Node. FrequenC Nodes do not have the routeplanner feature.",
                path: `/v4${options.path}`,
                trace: new Error().stack
            });
        }
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
                    const trackDataResult = this.decoder(track);
                    trackDataResult.match((trackData) => data.push(trackData), () => failedTracks.push(track));
                });
            }
            else {
                const trackDataResult = this.decoder(options.params.encodedTrack);
                trackDataResult.match((trackData) => data.push(trackData), () => failedTracks.push(options.params.encodedTrack));
            }
            if (failedTracks.length > 0) {
                const res = await globalThis.fetch(new URL(`${this.httpUrl}/v1/decodetracks`), {
                    method: "POST",
                    headers,
                    body: JSON.stringify(failedTracks)
                });
                (await res.json()).map((track) => {
                    const trackInfo = (0, utils_1.snakeToCamel)(track.info);
                    data.push({
                        encoded: track.encoded,
                        info: trackInfo,
                        pluginInfo: (0, utils_1.snakeToCamel)(track.plugin_info),
                        userData: (0, utils_1.snakeToCamel)(track.user_data)
                    });
                });
            }
            ;
            return (0, neverthrow_1.ok)(data);
        }
        ;
        if (options.body && JSON.stringify(options.body) === '{}')
            delete options.body;
        const res = await globalThis.fetch(url, {
            ...options,
            method: options.method,
            headers
        }).catch((error) => ({ status: 500, statusText: error }));
        switch (res.status) {
            case 204: {
                this.manager?.emit("debug", `[HarmonyLink] [Node Driver ${this.node?.options.name}] ${options.method} request to ${options.path} returned 204 No Content. payload=${options.body ? String(options.body) : "{}"}`);
                return (0, neverthrow_1.ok)(undefined);
            }
            case 200: {
                if (!(res instanceof Response)) {
                    this.manager?.emit("debug", `[HarmonyLink] [Node Driver ${this.node?.options.name}] ${options.method} request to ${options.path} returned ${res.status} ${res.statusText}. payload=${options.body ? String(options.body) : "{}"}`);
                    return (0, neverthrow_1.ok)(undefined);
                }
                try {
                    const data = res.headers.get("content-type") === "application/json" ? (await res.json()) : await res.text();
                    this.manager?.emit("debug", `[HarmonyLink] [Node Driver ${this.node?.options.name}] ${options.method} request to ${options.path} returned 200 OK. payload=${options.body ? String(options.body) : "{}"}`);
                    return (0, neverthrow_1.ok)(data);
                }
                catch (error) {
                    return (0, neverthrow_1.err)(error instanceof Error ? error : new Error(String(error)));
                }
            }
            default: {
                this.manager?.emit("debug", `[HarmonyLink] [Node Driver ${this.node?.options.name}] ${options.method} request to ${options.path} returned ${res.status} ${res.statusText}. payload=${options.body ? String(options.body) : "{}"}`);
                return (0, neverthrow_1.ok)(undefined);
            }
        }
    }
    ;
    async updateSessions(_sessionId, _mode, _timeout) {
        this.manager?.emit("debug", `[HarmonyLink] [Node ${this.node?.options.name}] FrequenC's do not support resuming yet, so set resume to true is useless.`);
        return await (0, neverthrow_1.ok)(undefined);
    }
    ;
    wsClose(withoutEmit = false) {
        if (this.wsClient) {
            this.wsClient.close(1000, "Connection closed");
            if (!withoutEmit && this.node) {
                this.manager?.emit("nodeDisconnect", this.node, 1000);
            }
        }
        this.wsClient?.removeAllListeners();
        this.wsClient = undefined;
    }
    ;
    eventHandler(data) {
        if (!this.node)
            return (0, neverthrow_1.err)(new Error("Node is not registered. Please register it by using <AbstractNodeDriver>.init()"));
        return (0, neverthrow_1.ok)(this.node.emit("lavalinkEvent", data.toString(), utils_1.snakeToCamel));
    }
    ;
}
exports.default = FrequenC;
;
//# sourceMappingURL=FrequenC.js.map