import AbstractNodeDriver from "./AbstractNodeDriver";
import { WebSocket } from "ws";
import { HarmonyLinkRequesterOptions, NodeType } from "@t/node";
import { HarmonyLink } from "@/HarmonyLink";
import { Node } from "@/node/Node";
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
    connect(): Promise<WebSocket>;
    wsClose(withoutEmit?: boolean): void;
    request<T = unknown>(options: HarmonyLinkRequesterOptions): Promise<T | undefined>;
    updateSessions(sessionId: string, mode: boolean, timeout: number): Promise<void>;
}
