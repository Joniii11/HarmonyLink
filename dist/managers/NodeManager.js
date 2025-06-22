"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../node/Node");
const neverthrow_1 = require("neverthrow");
class NodeManager extends Map {
    manager;
    constructor(manager) {
        super();
        this.manager = manager;
    }
    ;
    async addNode(node) {
        try {
            if (this.manager.options.nodeAdder) {
                const resolvedNodeResult = await (0, neverthrow_1.fromPromise)(this.manager.options.nodeAdder(this, node), (_err) => new Error("Node adder failed"));
                const resolvedNode = resolvedNodeResult.unwrapOr(null);
                if (resolvedNode instanceof Node_1.Node)
                    return (0, neverthrow_1.ok)(resolvedNode);
            }
            ;
            const addedNode = new Node_1.Node(this.manager, node);
            this.set(node.name, addedNode);
            if (this.manager.isReady)
                await addedNode.connect();
            return (0, neverthrow_1.ok)(addedNode);
        }
        catch (error) {
            return (0, neverthrow_1.err)(new Error(`[HarmonyLink] [NodeManager] Failed to add node: ${node.name}. Error: ${error}`));
        }
    }
    ;
    async getLeastUsedNode() {
        if (this.manager.options.nodeResolver) {
            const resolvedDataResult = await (0, neverthrow_1.fromPromise)(this.manager.options.nodeResolver(this), () => new Error("Node resolver failed"));
            const resolvedData = resolvedDataResult.unwrapOr(null);
            if (resolvedData instanceof Node_1.Node)
                return (0, neverthrow_1.ok)(resolvedData);
        }
        ;
        const nodes = this.allNodes;
        const onlineNodes = nodes.filter(node => node.isConnected);
        if (onlineNodes.length === 0) {
            return (0, neverthrow_1.err)(new Error("[HarmonyLink] [NodeManager] No nodes are online."));
        }
        ;
        const promises = onlineNodes.map(node => {
            const stats = node.stats;
            return { node, stats };
        });
        const results = await Promise.all(promises);
        const sorted = results.sort((a, b) => (a.stats.playingPlayers || 0) - (b.stats.playingPlayers || 0));
        return (0, neverthrow_1.ok)(sorted[0].node);
    }
    ;
    removeNode(name) {
        const node = this.get(name);
        if (!node)
            return (0, neverthrow_1.err)(new Error(`[HarmonyLink] [NodeManager] Node with name ${name} does not exist.`));
        node.disconnect();
        this.delete(name);
        return (0, neverthrow_1.ok)(node);
    }
    ;
    get allNodes() {
        return [...this.values()];
    }
    ;
}
exports.default = NodeManager;
;
//# sourceMappingURL=NodeManager.js.map