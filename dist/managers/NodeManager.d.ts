import { Node } from "../node/Node";
import { HarmonyLink } from "../HarmonyLink";
import { NodeGroup } from "../typings/node";
import { Result } from 'neverthrow';
export default class NodeManager extends Map<string, Node> {
    readonly manager: HarmonyLink;
    constructor(manager: HarmonyLink);
    addNode(node: NodeGroup): Promise<Result<Node, Error>>;
    getLeastUsedNode(): Promise<Node | undefined>;
    removeNode(name: string): Promise<Node | null>;
    get allNodes(): Node[];
}
