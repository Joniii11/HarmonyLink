import { HarmonyLink } from "@/HarmonyLink";
import type { NodeType } from "@t/node";
import type ws from "ws"
import Decoder from "./Decoder";

export default abstract class AbstractNodeDriver {
    public abstract clientId: string;
    public abstract type: NodeType;
    public abstract wsUrl: string;
    public abstract httpUrl: string;
    public abstract manager: HarmonyLink | null;

    protected abstract wsClient?: ws
    protected abstract node: any | null;
    protected abstract sessionId: string | null;

    public abstract get isRegistered(): boolean;

    public abstract init(manager: HarmonyLink, node: any): void;

    public abstract connect(): Promise<ws>;

    protected decoder = (base64EncodedTrack: string) => new Decoder(base64EncodedTrack, this.type).getTrack ?? null;
};