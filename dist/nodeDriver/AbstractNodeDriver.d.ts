/// <reference types="node" />
import { HarmonyLink } from "../HarmonyLink";
import { HarmonyLinkRequesterOptions, NodeType } from "../typings/node";
import ws from "ws";
import { Node } from "../node/Node";
import { TrackData } from "../typings/track";
export default abstract class AbstractNodeDriver {
    abstract clientId: string;
    abstract type: NodeType;
    abstract wsUrl: string;
    abstract httpUrl: string;
    abstract manager: HarmonyLink | null;
    protected abstract wsClient?: ws;
    protected abstract node: Node | null;
    protected abstract sessionId: string | null;
    abstract get isRegistered(): boolean;
    get defaultHeaders(): Record<string, string>;
    protected eventHandler(data: string): Promise<boolean>;
    protected openHandler(): Promise<boolean>;
    protected closeHandler(code: number, reason: Buffer): Promise<boolean>;
    protected errorHandler(data: Error): Promise<boolean>;
    protected decoder: (base64EncodedTrack: string) => TrackData | null;
    abstract init(manager: HarmonyLink, node: Node): void;
    abstract connect(): Promise<ws>;
    abstract wsClose(withoutEmit?: boolean): void;
    abstract updateSessions(sessionId: string, mode: boolean, timeout: number): Promise<void>;
    abstract request<T = unknown>(options: HarmonyLinkRequesterOptions): Promise<T | undefined>;
}
