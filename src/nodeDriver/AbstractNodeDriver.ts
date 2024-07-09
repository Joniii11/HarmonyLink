import Decoder from "./Decoder";

import { HarmonyLink } from "@/HarmonyLink";
import { HarmonyLinkRequesterOptions, NodeType } from "@t/node";
import ws from "ws"
import { Node } from "@/node/Node";
import { TrackData } from "@/typings/track";

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

    public get defaultHeaders(): Record<string, string> {
        const headers: Record<string, string> = {
            Authorization: this.node!.options.password,
            "User-Agent": this.clientId,
            "Content-Type": "application/json"
        };

        if (this.type === NodeType.NodeLink) {
            headers["Accept-Encoding"] = ((process as NodeJS.Process & { isBun: boolean}).isBun) ? "gzip, deflate" : "br, gzip, deflate";
        };

        return headers;
    };

    public setSessionId(sessionId: string): void{
        this.sessionId = sessionId;
    };

    protected async eventHandler(data: string): Promise<boolean> {
        return new Promise((resolve) => {
            if (!this.node) return resolve(false);

            return resolve(this.node.emit("lavalinkEvent", data.toString()))
        });
    };

    protected async openHandler(): Promise<boolean> {
        return new Promise((resolve) => {
            if (!this.node) return resolve(false);

            return resolve(this.node.emit("lavalinkWSOpen"))
        });
    };

    protected async closeHandler(code: number, reason: Buffer): Promise<boolean> {
        return new Promise((resolve) => {
            if (!this.node) return resolve(false);

            return resolve(this.node.emit("lavalinkWSClose", code, reason))
        });
    };

    protected async errorHandler(data: Error): Promise<boolean> {
        return new Promise((resolve) => {
            if (!this.node) return resolve(false);

            return resolve(this.node.emit("lavalinkWSError", data))
        });
    };

    protected decoder: (base64EncodedTrack: string) => TrackData | null = (base64EncodedTrack: string) => new Decoder(base64EncodedTrack, this.type).getTrack ?? null;

    public abstract init(manager: HarmonyLink, node: Node): void;

    public abstract connect(): Promise<ws>;

    public abstract wsClose(withoutEmit?: boolean): void

    public abstract updateSessions(sessionId: string, mode: boolean, timeout: number): Promise<void>

    public abstract request<T = unknown>(options: HarmonyLinkRequesterOptions): Promise<T | undefined>
};