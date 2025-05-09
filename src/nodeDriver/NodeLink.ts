/* eslint-disable @typescript-eslint/no-unused-expressions */
import AbstractNodeDriver from "./AbstractNodeDriver";

import { WebSocket } from "ws";
import { HarmonyLinkRequesterOptions, NodeType } from "@t/node";

import { HarmonyLink } from "@/HarmonyLink";
import { Node } from "@/node/Node";
import { NodeLinkV2LoadTypes, LavaLinkLoadTypes } from "@t/node/rest";
import { TrackData } from "@t/track"

export default class NodeLink extends AbstractNodeDriver {
    public clientId = "";
    public type = NodeType.NodeLink;
    public wsUrl = "";
    public httpUrl = "";
    public manager: HarmonyLink | null = null;

    protected node: Node | null = null;
    protected sessionId: string | null = null;
    protected wsClient: WebSocket | undefined = undefined;

    public get isRegistered(): boolean {
        return (this.manager !== null && this.node !== null && this.wsUrl.length !== 0 && this.httpUrl.length !== 0);
    };

    public init(manager: HarmonyLink, node: Node): void {
        this.manager = manager;
        this.clientId = `${manager.config.name}/${manager.config.version} (${manager.config.github})`;
        this.node = node;

        this.wsUrl = `${(node.options.secure) ? "wss" : "ws"}://${node.options.host}:${node.options.port}`;
        this.httpUrl = `${(node.options.secure) ? "https" : "http"}://${node.options.host}:${node.options.port}`;
    };

    public async connect(): Promise<WebSocket> {
        return new Promise<WebSocket>((resolve, reject) => {
            if (!this.isRegistered) return reject(new Error("Node is not registered. Please register it by using <AbstractNodeDriver>.init()"));
            if (!this.manager?.isReady || !this.manager.library.userID) return reject(new Error("User ID is not set. Please set it before connecting. Is this really a valid library?"));

            const headers: Record<string, string> = {
                Authorization: this.node!.options.password,
                "User-Id": this.manager.library.userID,
                "Client-Name": this.clientId,
            };

            const ws = new WebSocket(`${this.wsUrl}/v4/websocket`, { headers });

            this.wsClient = ws;
            this.wsClient.on("open", this.openHandler.bind(this));
            this.wsClient.on("message", this.eventHandler.bind(this));
            this.wsClient.on("error", this.errorHandler.bind(this));
            this.wsClient.on("close", this.closeHandler.bind(this));

            return resolve(ws);
        });
    };

    public async request<T = unknown>(options: HarmonyLinkRequesterOptions): Promise<T | undefined> {
        if (!this.isRegistered) throw new Error("Node is not registered. Please register it by using <AbstractNodeDriver>.init()");
        if (options.path.includes("/sessions") && this.sessionId === null) throw new Error(`[HarmonyLink] [Node ${this.node?.options.name}] Session ID is not set. Please wait for LavaLinkV4 to be connected.`);

        if (options.path.startsWith("/version")) {
            const url = `${this.httpUrl}${options.path}`;

            const response = await globalThis.fetch(url, {
                method: "GET",
                headers: this.defaultHeaders
            });

            return response.headers.get("content-type") === "application/json" ? await response.json() as T : await response.text() as T
        } else if (options.path.startsWith("/routeplanner")) {
            return {
                timestamp: Date.now(),
                status: 404,
                error: "Not found.",
                message: "The specified node is a NodeLink. NodeLink's do not have the routeplanner feature.",
                path: `/v4${options.path}`,
                trace: new Error().stack
            } as unknown as T;
        };

        const url = new URL(`${this.httpUrl}/v4${options.path}`);

        if (options.params) url.search = new URLSearchParams(options.params).toString();
        if (options.data) options.body = JSON.stringify(options.data);

        const headers = {
            ...this.defaultHeaders,
            ...options.headers
        };

        if (options.path === "/decodetrack" || options.path === "/decodetracks") {
            const data: TrackData[] = [];
            const failedTracks: string[] = [];

            if (options.data) {
                (options.data as string[]).map((track) => {
                    const trackData = this.decoder(track);
                    if (trackData) data.push(trackData);
                    else failedTracks.push(track);
                }) 
            } else {
                const trackData = this.decoder((options.params as Record<string, string>).encodedTrack);

                if (trackData) data.push(trackData);
                else failedTracks.push((options.params as Record<string, string>).encodedTrack);
            };

            if (failedTracks.length > 0) {
                const res = await globalThis.fetch(new URL(`${this.httpUrl}/v4/decodetracks`), {
                    method: "POST",
                    headers,
                    body: JSON.stringify(failedTracks)
                });

                data.push(...(await res.json() as TrackData[]))
            };

            return data as T;
        };

        const res = await globalThis.fetch(url, {
            ...options,
            method: options.method,
            headers
        }).catch((err) => ({ status: 500, statusText: err }));

        switch (res.status) {
            case 204: {
                this.manager?.emit("debug", `[HarmonyLink] [Node Driver ${this.node?.options.name}] ${options.method} request to ${options.path} returned 204 No Content. payload=${options.body ? String(options.body) : "{}"}`);
                return undefined
            };

            case 200: {
                if (!(res instanceof Response)) {
                    this.manager?.emit("debug", `[HarmonyLink] [Node Driver ${this.node?.options.name}] ${options.method} request to ${options.path} returned ${res.status} ${res.statusText}. payload=${options.body ? String(options.body) : "{}"}`);
                    return undefined; 
                };

                const data = res.headers.get("content-type") === "application/json" ? await res.json() : await res.text();

                this.manager?.emit("debug", `[HarmonyLink] [Node Driver ${this.node?.options.name}] ${options.method} request to ${options.path} returned 200 OK. payload=${options.body ? String(options.body) : "{}"}`);

                if ("loadType" in (data as Record<string, unknown>)) {
                    (data as Record<string, unknown>).loadType = NodeLink.convertNodelinkResponseToLavalink((data as Record<string, unknown>).loadType as NodeLinkV2LoadTypes);
                };

                return data as T;
            };

            default: {
                this.manager?.emit("debug", `[HarmonyLink] [Node Driver ${this.node?.options.name}] ${options.method} request to ${options.path} returned ${res.status} ${res.statusText}. payload=${options.body ? String(options.body) : "{}"}`);
                return undefined;
            };
        };
    }

    public async updateSessions(): Promise<void> {
        return new Promise<void>((resolve) => {
            this.manager?.emit("debug", `[HarmonyLink] [Node ${this.node?.options.name}] NodeLink's do not support resuming, so set resume to true is useless.`);
            
            resolve();
        })
    };

    public wsClose(withoutEmit: boolean = false): void {
        if (withoutEmit) {
            this.wsClient?.close(1000, "Self Closed");
            this.node ? this.manager?.emit("nodeDisconnect", this.node, 1006) : null;
        };

        this.wsClient?.removeAllListeners()
        this.wsClient = undefined;
    };

    private static convertNodelinkResponseToLavalink(loadType: LavaLinkLoadTypes | NodeLinkV2LoadTypes): LavaLinkLoadTypes {
        switch (loadType) {
            case "short": return "track";
    
            case "artist":
            case "episode":
            case "station":
            case "podcast":
            case "show":
            case "album": return "playlist";
    
            default: return loadType;
        };
    };
}