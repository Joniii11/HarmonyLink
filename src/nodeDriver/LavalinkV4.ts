import AbstractNodeDriver from "./AbstractNodeDriver";

import { WebSocket } from "ws";
import { NodeType } from "@t/node";

import type { HarmonyLink } from "@/HarmonyLink";

export default class LavalinkV4 extends AbstractNodeDriver {
    public clientId = "";
    public type = NodeType.LavaLinkV4;
    public wsUrl = "";
    public httpUrl = "";
    public manager: null | HarmonyLink = null;

    protected node: any | null = null;
    protected sessionId: string | null = null;
    protected wsClient: WebSocket | undefined = undefined;

    public get isRegistered() {
        return (this.manager !== null && this.node !== null && this.wsUrl.length !== 0 && this.httpUrl.length !== 0);
    };

    public init(manager: HarmonyLink, node: any) {
        this.manager = manager;
        this.clientId = `${manager.config.name}/${manager.config.version} (${manager.config.github})`;
        this.node = node;

        this.wsUrl = `${(node.options.secure ?? false) ? "wss" : "ws"}://${node.options.host}:${node.options.port}`;
        this.httpUrl = `${(node.options.secure ?? false) ? "https" : "http"}://${node.options.host}:${node.options.port}`;
    };

    public async connect() {
        return new Promise<WebSocket>((resolve, reject) => {
            if (!this.isRegistered) return reject(new Error("Node is not registered. Please register it by using <AbstractNodeDriver>.init()"));
            if (!this.manager?.library.userID) return reject(new Error("User ID is not set. Please set it before connecting. Is this really a valid library?"));
            const shouldResume = this.manager?.options.resume ?? false;

            const headers: { [key: string]: string } = {
                Authorization: this.node.options.password,
                "User-Id": this.manager.library.userID,
                "Client-Name": this.clientId,
            };

            if (shouldResume && this.sessionId) headers["Session-Id"] = this.sessionId;

            const ws = new WebSocket(`${this.wsUrl}/v4/websocket`, { headers });

            this.wsClient = ws;

            return resolve(ws);
        });
    };


    

}