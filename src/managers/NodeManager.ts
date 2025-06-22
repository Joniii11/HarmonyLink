import { Node } from "@/node/Node";

import { HarmonyLink } from "@/HarmonyLink";
import { NodeGroup } from "@t/node";
import { ok, err, Result, fromPromise } from 'neverthrow';

export default class NodeManager extends Map<string, Node> {
    public readonly manager: HarmonyLink;

    public constructor(manager: HarmonyLink) {
        super();
        this.manager = manager;
    };

    public async addNode(node: NodeGroup): Promise<Result<Node, Error>> {        
        try {
            if (this.manager.options.nodeAdder) {
                const resolvedNodeResult = await fromPromise(this.manager.options.nodeAdder(this, node), (_err) => new Error("Node adder failed"));
                const resolvedNode = resolvedNodeResult.unwrapOr(null);

                if (resolvedNode instanceof Node) return ok(resolvedNode);
            };

            const addedNode = new Node(this.manager, node);

            this.set(node.name, addedNode);

            if (this.manager.isReady) await addedNode.connect();
            return ok(addedNode);   
        } catch (error) {
            return err(new Error(`[HarmonyLink] [NodeManager] Failed to add node: ${node.name}. Error: ${error}`));
        }
    };

    public async getLeastUsedNode(): Promise<Result<Node, Error>> {        
        if (this.manager.options.nodeResolver) {
            const resolvedDataResult = await fromPromise(this.manager.options.nodeResolver(this), () => new Error("Node resolver failed"));
            const resolvedData = resolvedDataResult.unwrapOr(null);

            if (resolvedData instanceof Node) return ok(resolvedData);
        };

        const nodes = this.allNodes;

        const onlineNodes = nodes.filter(node => node.isConnected);

        if (onlineNodes.length === 0) {
            return err(new Error("[HarmonyLink] [NodeManager] No nodes are online."));
        };

        const promises = onlineNodes.map(node => {
            const stats = node.stats
            return { node, stats };
        });

        const results = await Promise.all(promises);
        const sorted = results.sort((a, b) => (a.stats.playingPlayers || 0) - (b.stats.playingPlayers || 0));

        return ok(sorted[0].node);
    };

    public removeNode(name: string): Result<Node, Error> {
        const node = this.get(name);
        if (!node) return err(new Error(`[HarmonyLink] [NodeManager] Node with name ${name} does not exist.`));

        node.disconnect();
        this.delete(name);

        return ok(node);
    };

    public get allNodes(): Node[] {
        return [...this.values()];
    };
};