import AbstractNodeDriver from "@/nodeDriver/AbstractNodeDriver";

import type { HarmonyLink } from "@/HarmonyLink";
import type { NodeGroup } from "@t/node";
import { Node } from "@/node/Node";


export default class NodeManager {
    public readonly nodes: Map<string, AbstractNodeDriver> = new Map();
    public readonly manager: HarmonyLink;

    constructor(manager: HarmonyLink) {
        this.manager = manager;
    };

    public async addNode(node: NodeGroup): Promise<Node> {
        return new Node(this.manager, node)
    }


}