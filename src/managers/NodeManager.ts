import { Node } from "@/node/Node";

import { HarmonyLink } from "@/HarmonyLink";
import { NodeGroup } from "@t/node";

export default class NodeManager extends Map<string, Node> {
    public readonly manager: HarmonyLink;

    public constructor(manager: HarmonyLink) {
        super();
        this.manager = manager;
    };

    public async addNode(node: NodeGroup): Promise<Node> {
        if (this.manager.options.nodeAdder) {
            const resolvedNode = await this.manager.options.nodeAdder(this, node);

            if (resolvedNode && resolvedNode instanceof Node) return resolvedNode;
        };

        const addedNode = new Node(this.manager, node);

        this.set(node.name, addedNode);

        if (this.manager.isReady) await addedNode.connect();
        return addedNode;
    };

    public async getLeastUsedNode(): Promise<Node | undefined> {
        if (this.manager.options.nodeResolver) {
            const resolvedData = await this.manager.options.nodeResolver(this);

            if (resolvedData && resolvedData instanceof Node) return resolvedData;
        };

        const nodes = this.allNodes;

        const onlineNodes = nodes.filter(node => node.isConnected);

        if (onlineNodes.length === 0) {
            throw new Error("[HarmonyLink] [NodeManager] No nodes are online.");
        };

        const promises = onlineNodes.map(node => {
            const stats = node.stats
            return { node, stats };
        });

        const results = await Promise.all(promises);
        const sorted = results.sort((a, b) => (a.stats.players || 0) - (b.stats.players || 0));

        return sorted[0].node;
    };

    public async removeNode(name: string): Promise<Node | null> {
        const node = this.get(name);
        if (!node) return null;

        await node.disconnect();
        this.delete(name);
        return node;
    };

    public get allNodes(): Node[] {
        return [...this.values()];
    };
};