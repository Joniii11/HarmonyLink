import type NodeManager from "@/managers/NodeManager";
import type { HarmonyLink } from "@/HarmonyLink";
import type { Node } from "./Node";

export default class Rest {
    public manager: HarmonyLink;
    public node: Node

    protected nodeManager: NodeManager;
    protected sessionId: string | null = null;

    constructor(manager: HarmonyLink, node: Node) {
        this.manager = manager;
        this.node = node;
        this.nodeManager = this.manager.nodeManager;
    };

    public get isReady(): boolean {
        return this.sessionId !== null;
    };

    public setSessionId(sessionId: string): void {
        this.sessionId = sessionId;
    };
}