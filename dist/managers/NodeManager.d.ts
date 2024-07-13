import { Node } from "../node/Node";
import { HarmonyLink } from "../HarmonyLink";
import { NodeGroup } from "../typings/node";
export default class NodeManager extends Map<string, Node> {
    readonly manager: HarmonyLink;
    constructor(manager: HarmonyLink);
    addNode(node: NodeGroup): Promise<Node>;
    getLeastUsedNode(): Promise<Node | undefined>;
    removeNode(name: string): Promise<Node | null>;
    get allNodes(): Node[];
}
