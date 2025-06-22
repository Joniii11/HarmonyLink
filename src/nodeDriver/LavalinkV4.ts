/* eslint-disable @typescript-eslint/no-unused-expressions */
import AbstractNodeDriver from "./AbstractNodeDriver";

import { WebSocket } from "ws";
import { HarmonyLinkRequesterOptions, NodeType } from "@t/node";

import { HarmonyLink } from "@/HarmonyLink";
import { Node } from "@/node/Node";
import { TrackData } from '@t/track';
import { Result, ok, err, fromPromise } from 'neverthrow';

export default class LavalinkV4 extends AbstractNodeDriver {
    public clientId = "";
    public type = NodeType.LavaLinkV4;
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

    public async connect(): Promise<Result<WebSocket, Error>> {
        return await fromPromise(
            new Promise<WebSocket>((resolve, reject) => {
                if (!this.isRegistered) return reject(new Error("Node is not registered. Please register it by using <AbstractNodeDriver>.init()"));
                if (!this.manager?.isReady || !this.manager.library.userID) return reject(new Error("User ID is not set. Please set it before connecting. Is this really a valid library?"));
                const shouldResume = this.manager.options.resume;

                const headers: Record<string, string> = {
                    Authorization: this.node!.options.password,
                    "User-Id": this.manager.library.userID,
                    "Client-Name": this.clientId,
                };                if (shouldResume && this.sessionId) headers["Session-Id"] = this.sessionId;

                const ws = new WebSocket(`${this.wsUrl}/v4/websocket`, { headers });

                this.wsClient = ws;
                this.wsClient.on("open", this.openHandler.bind(this));
                this.wsClient.on("message", this.eventHandler.bind(this));
                this.wsClient.on("error", this.errorHandler.bind(this));
                this.wsClient.on("close", this.closeHandler.bind(this));

                return resolve(ws);
            }),
            (error) => error instanceof Error ? error : new Error(String(error))
        );
    };

    public wsClose(withoutEmit: boolean = false): void {
        if (this.wsClient) {
            this.wsClient.close(1000, "Connection closed"); // Use proper close code
            
            if (!withoutEmit && this.node) {
                this.manager?.emit("nodeDisconnect", this.node, 1000);
            }
        }

        this.wsClient?.removeAllListeners();
        this.wsClient = undefined;
    };

    public async request<T = unknown>(options: HarmonyLinkRequesterOptions): Promise<Result<T | undefined, Error>> {
        if (!this.isRegistered) return err(new Error("Node is not registered. Please register it by using <AbstractNodeDriver>.init()"));
        if (options.path.includes("/sessions") && this.sessionId === null) return err(new Error(`[HarmonyLink] [Node ${this.node?.options.name}] Session ID is not set. Please wait for LavaLinkV4 to be connected.`));

        if (options.path.startsWith("/version")) {
            const fetchResult = await fromPromise(
                globalThis.fetch(`${this.httpUrl}${options.path}`, {
                    method: "GET",
                    headers: this.defaultHeaders
                }),
                (error) => error instanceof Error ? error : new Error(String(error))
            );

            return fetchResult.asyncMap(async (response) => response.headers.get("content-type") === "application/json" ? await response.json() as T : await response.text() as T);
        }

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
                    const trackResult = this.decoder(track);
                    trackResult.match(
                        (trackData) => data.push(trackData),
                        () => failedTracks.push(track)
                    );
                }) 
            } else {
                const trackResult = this.decoder((options.params as Record<string, string>).encodedTrack);
                trackResult.match(
                    (trackData) => data.push(trackData),
                    () => failedTracks.push((options.params as Record<string, string>).encodedTrack)
                );
            }

            if (failedTracks.length > 0) {
                const fetchResult = await fromPromise(
                    globalThis.fetch(new URL(`${this.httpUrl}/v4/decodetracks`), {
                        method: "POST",
                        headers,
                        body: JSON.stringify(failedTracks)
                    }),
                    (error) => error instanceof Error ? error : new Error(String(error))
                );

                const jsonResult = await fetchResult.asyncMap(async (response) => await response.json() as TrackData[]);
                
                return jsonResult.map((additionalData) => {
                    data.push(...additionalData);
                    return data as T;
                }).mapErr((error) => error);
            }

            return ok(data as T);
        }

        const fetchResult = await fromPromise(
            globalThis.fetch(url, {
                ...options,
                method: options.method,
                headers
            }),
            (error) => error instanceof Error ? error : new Error(String(error))
        );

        return fetchResult.asyncMap(async (res) => {
            switch (res.status) {
                case 204: {
                    this.manager?.emit("debug", `[HarmonyLink] [Node Driver ${this.node?.options.name}] ${options.method} request to ${options.path} returned 204 No Content. payload=${options.body ? String(options.body) : "{}"}`);
                    return undefined;
                }

                case 200: {
                    const data = res.headers.get("content-type") === "application/json" ? await res.json() : await res.text();
                    this.manager?.emit("debug", `[HarmonyLink] [Node Driver ${this.node?.options.name}] ${options.method} request to ${options.path} returned 200 OK. payload=${options.body ? String(options.body) : "{}"}`);
                    return data as T;
                }

                default: {
                    this.manager?.emit("debug", `[HarmonyLink] [Node Driver ${this.node?.options.name}] ${options.method} request to ${options.path} returned ${res.status} ${res.statusText}. payload=${options.body ? String(options.body) : "{}"}`);
                    return undefined;
                }
            }
        });
    }

    public async updateSessions(sessionId: string, mode: boolean, timeout: number): Promise<Result<void, Error>> {
        const options: HarmonyLinkRequesterOptions = {
            path: `/sessions/${sessionId}`,
            method: "PATCH",
            data: {
                resuming: mode,
                timeout
            }
        };

        const requestResult = await this.request<{ resuming: boolean, timeout: number}>(options);

        return requestResult.map(
            () => { this.manager?.emit("debug", `[HarmonyLink] [Node ${this.node?.options.name}] Updated the session.`) },
        ).mapErr((error) => {
            this.manager?.emit("debug", `[HarmonyLink] [Node ${this.node?.options.name}] Failed to update session: ${error.message}`);
            return error;
        })
    };
}