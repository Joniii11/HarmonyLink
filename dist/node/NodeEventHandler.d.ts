/// <reference types="node" />
import { HarmonyLink } from "@/HarmonyLink";
import { Node } from "./Node";
import { LavalinkPackets } from "@t/node";
export default class PlayerEvent {
    manager: HarmonyLink;
    node: Node;
    constructor(node: Node);
    listen(): void;
    destroy(): void;
    protected onLavalinkEvent(data: string, interceptor?: (data: any) => LavalinkPackets): Promise<void>;
    protected onWSOpenEvent(): void;
    protected onWSCloseEvent(code: number, reason: Buffer): Promise<void>;
    protected onWSErrorEvent(error?: Error): void;
}
