import Decoder from "./Decoder";

import { HarmonyLink } from "@/HarmonyLink";
import { HarmonyLinkRequesterOptions, NodeType } from "@t/node";
import ws from "ws"
import { Node } from "@/node/Node";
import { TrackData } from "@/typings/track";
import { Result, ok } from 'neverthrow';

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
            headers["Accept-Encoding"] = ((process as any).isBun) ? "gzip, deflate" : "br, gzip, deflate";
        };

        return headers;
    };

    public setSessionId(sessionId: string): void{
        this.sessionId = sessionId;
    };    
    
    protected eventHandler(data: string): Result<boolean, Error> {
        if (!this.node) return ok(false);

        return ok(this.node.emit("lavalinkEvent", data.toString()));
    };

    protected openHandler(): Result<boolean, Error> {
        if (!this.node) return ok(false);

        return ok(this.node.emit("lavalinkWSOpen"));
    };

    protected closeHandler(code: number, reason: Buffer): Result<boolean, Error> {
        if (!this.node) return ok(false);

        return ok(this.node.emit("lavalinkWSClose", code, reason));
    };

    protected errorHandler(data: Error): Result<boolean, Error> {
        if (!this.node) return ok(false);

        return ok(this.node.emit("lavalinkWSError", data));
    }

    protected decoder: (base64EncodedTrack: string) => Result<TrackData, Error> = (base64EncodedTrack: string) => {
        const decoderInstance = new Decoder(base64EncodedTrack, this.type);
        return decoderInstance.getTrack;
    };

    public abstract init(manager: HarmonyLink, node: Node): void;    
    public abstract connect(): Promise<Result<ws, Error>>;

    public abstract wsClose(withoutEmit?: boolean): void;

    public abstract updateSessions(sessionId: string, mode: boolean, timeout: number): Promise<Result<void, Error>>;

    public abstract request<T = unknown>(options: HarmonyLinkRequesterOptions): Promise<Result<T | undefined, Error>>;
};