import type { HarmonyLink } from "@/HarmonyLink";
import type { Node } from "./Node";
import { LavalinkReadyPacket, NodeType, type LavalinkPackets, type NodeStats } from "@t/node";

export default class PlayerEvent {
    public manager: HarmonyLink;
    public node: Node

    constructor(node: Node) {
        this.node = node;
        this.manager = this.node.manager;

        this.listen();
    };

    public listen(): void {
        this.node.on("lavalinkEvent", this.onLavalinkEvent.bind(this));
        this.node.on("lavalinkWSClose", this.onWSCloseEvent.bind(this));
        this.node.on("lavalinkWSError", this.onWSErrorEvent.bind(this));
        this.node.on("lavalinkWSOpen", this.onWSOpenEvent.bind(this));
    };

    public destroy(): void {
        this.node.removeAllListeners();
    }

    protected async onLavalinkEvent(data: string, interceptor?: Function): Promise<void> {
        try {
            const packet = interceptor ? interceptor(JSON.parse(data)) as LavalinkPackets : JSON.parse(data) as LavalinkPackets;

            if (!packet?.op) return;

            switch (packet.op) {
                case "ready": {
                    this.node.setSessionId(packet.sessionId)
                    this.manager.emit("debug", `[Web Socket] Node ${this.node.options.name} is ready.`)

                    if (this.manager.options.resume && this.manager.options.resumeTimeout) {
                        await this.node.driver.updateSessions(packet.sessionId, this.manager.options.resume, this.manager.options.resumeTimeout)
                    };

                    break;
                };

                case "stats": {
                    delete (packet as NodeStats & { op: string | undefined}).op;

                    this.node.stats = packet;

                    break;
                };

                case "event":
                case "playerUpdate": {
                    // const player = @TODO: Make a player Manager
                    // look if packet.guildId and player exists, then emit the event on the player
                }
            }
        } catch (err) {
            this.manager.emit("debug", "[Web Socket] Error while parsing the payload.", err)
        }
    };

    protected onWSOpenEvent(): void {
        try {
            if (this.node.options.reconnectAttemptTimeout) {
                clearTimeout(this.node.options.reconnectAttemptTimeout);
                this.node.options.reconnectAttemptTimeout = null;
            };

            this.manager.emit("nodeConnect", this.node);
            this.node.isConnected = true;
            this.manager.emit("debug", `[HarmonyLink] [Node ${this.node.options.name}] [Web Socket] Connected to the node.`)

            this.node.options.currentAttempts = 0;
        } catch (err) {
            this.manager.emit("debug", `[HarmonyLink] [Node ${this.node.options.name}] [Web Socket] Error while parsing the payload.`, err)
        };
    };

    protected async onWSCloseEvent(code: number, reason: Buffer): Promise<void> {
        try {
            await this.node.disconnect();

            this.manager.emit("nodeDisconnect", this.node, code);
            this.manager.emit("debug", `[HarmonyLink] [Node ${this.node.options.name}] [Web Socket] Disconnected from the node. [${code}] [${reason.toString("utf-8")}]`)

            if (code !== 100) await this.node.reconnect()
        } catch (err) {
            this.manager.emit("debug", `[HarmonyLink] [Node ${this.node.options.name}] [Web Socket] Error while parsing the payload.`, err)
        };
    };

    protected onWSErrorEvent(error: Error): void {
        try {
            if (!error) return;

            this.manager.emit("nodeError", this.node, error);
            this.manager.emit("debug", `[HarmonyLink] [Node ${this.node.options.name}] [Web Socket] Error from the node.`, error)
        } catch (err) {
            this.manager.emit("debug", `[HarmonyLink] [Node ${this.node.options.name}] [Web Socket] Error while parsing the payload.`, err)
        }
    }
}

