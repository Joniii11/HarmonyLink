import AbstractNodeDriver from "./AbstractNodeDriver";
import WebSocket from "ws";
import { HarmonyLinkRequesterOptions, NodeType } from "../typings/node";
import { HarmonyLink } from "../HarmonyLink";
import { Node } from "../node/Node";
export default class FrequenC extends AbstractNodeDriver {
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
    request<T = unknown>(options: HarmonyLinkRequesterOptions): Promise<T | undefined>;
    updateSessions(): Promise<void>;
    wsClose(withoutEmit?: boolean): void;
    protected eventHandler(data: string): Promise<boolean>;
}
