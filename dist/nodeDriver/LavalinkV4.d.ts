import AbstractNodeDriver from "./AbstractNodeDriver";
import { WebSocket } from "ws";
import { HarmonyLinkRequesterOptions, NodeType } from "../typings/node";
import { HarmonyLink } from "../HarmonyLink";
import { Node } from "../node/Node";
import { Result } from 'neverthrow';
export default class LavalinkV4 extends AbstractNodeDriver {
    clientId: string;
    type: NodeType;
    wsUrl: string;
    httpUrl: string;
    manager: HarmonyLink | null;
    protected node: Node | null;
    protected sessionId: string | null;
    protected wsClient: WebSocket | undefined;
    get isRegistered(): boolean;
    init(manager: HarmonyLink, node: Node): void;
    connect(): Promise<Result<WebSocket, Error>>;
    wsClose(withoutEmit?: boolean): void;
    request<T = unknown>(options: HarmonyLinkRequesterOptions): Promise<Result<T | undefined, Error>>;
    updateSessions(sessionId: string, mode: boolean, timeout: number): Promise<Result<void, Error>>;
}
