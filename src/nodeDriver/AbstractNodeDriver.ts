import Decoder from "./Decoder";

import type { HarmonyLink } from "@/HarmonyLink";
import { HarmonyLinkRequesterOptions, NodeType } from "@t/node";
import type ws from "ws"
import type { Node } from "@/node/Node";

export default abstract class AbstractNodeDriver {
    public abstract clientId: string;
    public abstract type: NodeType;
    public abstract wsUrl: string;
    public abstract httpUrl: string;
    public abstract manager: HarmonyLink | null;

    protected abstract wsClient?: ws
    protected abstract node: Node | null;
    protected abstract sessionId: string | null;

    public abstract get isRegistered(): boolean;

    public get defaultHeaders(): { [key: string]: string } {
        const headers: { [key: string]: string } = {
            Authorization: this.node!.options.password,
            "User-Agent": this.clientId,
            "Content-Type": "application/json"
        };

        if (this.type === NodeType.NodeLink) {
            headers["Accept-Encoding"] = ((process as NodeJS.Process & { isBun: boolean}).isBun) ? "gzip, deflate" : "br, gzip, deflate";
        };

        return headers;
    };

    public abstract init(manager: HarmonyLink, node: Node): void;

    public abstract connect(): Promise<ws>;

    protected decoder = (base64EncodedTrack: string) => new Decoder(base64EncodedTrack, this.type).getTrack ?? null;

    public abstract wsClose(withoutEmit?: boolean): void

    public abstract updateSessions(sessionId: string, mode: boolean, timeout: number): Promise<void>

    public abstract request<T = unknown>(options: HarmonyLinkRequesterOptions): Promise<T | undefined>

    protected async eventHandler(data: string): Promise<boolean> {
        if (!this.node) return false;

        return this.node.emit("lavalinkEvent", data.toString())
    };

    protected async openHandler(): Promise<boolean> {
        if (!this.node) return false;

        return this.node.emit("lavalinkWSOpen")
    };

    protected async closeHandler(code: number, reason: Buffer): Promise<boolean> {
        if (!this.node) return false;

        return this.node.emit("lavalinkWSClose", code, reason)
    };

    protected async errorHandler(data: Error): Promise<boolean> {
        if (!this.node) return false;

        return this.node.emit("lavalinkWSError", data)
    };
};