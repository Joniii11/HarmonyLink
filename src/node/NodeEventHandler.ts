import type { HarmonyLink } from "@/HarmonyLink";
import type { Node } from "./Node";
import type { LavalinkPackets, NodeStats } from "@t/node";

export default class PlayerEvent {
    public manager: HarmonyLink;
    public node: Node

    constructor(node: Node) {
        this.node = node;
        this.manager = this.node.manager;
    };

    public listen(): void {
        this.node.on("lavalinkEvent", this.onLavalinkEvent.bind(this));
    };

    protected onLavalinkEvent(data: string): void {
        try {
            const packet = JSON.parse(data) as LavalinkPackets;

            if (!packet?.op) return;

            switch (packet.op) {
                case "ready": {
                    this.node.setSessionId(packet.sessionId)
                    this.manager.emit("debug", `[Web Socket] Node ${this.node.options.name} is ready.`)

                    if (this.manager.options.resume) {
                        /*
                            Implement resume logic here
                        */
                    };

                    break;
                }

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
    }
}

