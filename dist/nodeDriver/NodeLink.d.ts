import AbstractNodeDriver from "./AbstractNodeDriver";
import { WebSocket } from "ws";
import { HarmonyLinkRequesterOptions, NodeType } from "../typings/node";
import { HarmonyLink } from "../HarmonyLink";
import { Node } from "../node/Node";
import { Result } from 'neverthrow';
export default class NodeLink extends AbstractNodeDriver {
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
    request<T = unknown>(options: HarmonyLinkRequesterOptions): Promise<Result<T | undefined, Error>>;
    updateSessions(_sessionId: string, _mode: boolean, _timeout: number): Promise<Result<void, Error>>;
    wsClose(withoutEmit?: boolean): void;
    private static convertNodelinkResponseToLavalink;
}
