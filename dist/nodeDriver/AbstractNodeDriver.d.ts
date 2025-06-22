/// <reference types="node" />
/// <reference types="node" />
import { HarmonyLink } from "../HarmonyLink";
import { HarmonyLinkRequesterOptions, NodeType } from "../typings/node";
import ws from "ws";
import { Node } from "../node/Node";
import { TrackData } from "../typings/track";
import { Result } from 'neverthrow';
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
    setSessionId(sessionId: string): void;
    protected eventHandler(data: string): Result<boolean, Error>;
    protected openHandler(): Result<boolean, Error>;
    protected closeHandler(code: number, reason: Buffer): Result<boolean, Error>;
    protected errorHandler(data: Error): Result<boolean, Error>;
    protected decoder: (base64EncodedTrack: string) => Result<TrackData, Error>;
    abstract init(manager: HarmonyLink, node: Node): void;
    abstract connect(): Promise<Result<ws, Error>>;
    abstract wsClose(withoutEmit?: boolean): void;
    abstract updateSessions(sessionId: string, mode: boolean, timeout: number): Promise<Result<void, Error>>;
    abstract request<T = unknown>(options: HarmonyLinkRequesterOptions): Promise<Result<T | undefined, Error>>;
}
