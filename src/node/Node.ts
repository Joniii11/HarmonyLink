import EventEmitter from "events";
import NodeEventHandler from "./NodeEventHandler";

import type { HarmonyLink } from "@/HarmonyLink";
import type { NodeGroup, NodeStats } from "@t/node";
import { getDefaultNodeStats } from "@/constants";
import Rest from "./Rest";

export declare interface Node {
    on: (event: "lavalinkEvent", listener: (data: string) => void) => this;
}

export class Node extends EventEmitter {
    public manager: HarmonyLink;
    public options: NodeGroup
    public stats: NodeStats = getDefaultNodeStats()

    protected readonly NoderEventsHandler: NodeEventHandler = new NodeEventHandler(this);
    protected readonly rest: Rest

    constructor(manager: HarmonyLink, options: NodeGroup) {
        super();
        this.manager = manager;
        this.options = options;
        this.rest = new Rest(manager, this);

        // @TODO: Implement the rest of the logic
        
    };

    public setSessionId(sessionId: string): void {
        this.rest.setSessionId(sessionId);
    };


}