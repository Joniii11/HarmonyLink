"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("../node/Node");
class NodeManager extends Map {
    nodes = new Map();
    manager;
    constructor(manager) {
        super();
        this.manager = manager;
    }
    ;
    async addNode(node) {
        const addedNode = new Node_1.Node(this.manager, node);
        this.set(node.name, addedNode);
        if (this.manager.isReady)
            await addedNode.connect();
        return addedNode;
    }
    ;
    async getLeastUsedNode() {
        if (this.manager.options.nodeResolver) {
            const resolvedData = await this.manager.options.nodeResolver(this);
            if (resolvedData && resolvedData instanceof Node_1.Node)
                return resolvedData;
        }
        ;
        const nodes = this.allNodes;
        const onlineNodes = nodes.filter(node => node.isConnected);
        if (onlineNodes.length === 0) {
            throw new Error("[HarmonyLink] [NodeManager] No nodes are online.");
        }
        ;
        const promises = onlineNodes.map(async (node) => {
            const stats = await node.getStats();
            return { node, stats };
        });
        const results = await Promise.all(promises);
        const sorted = results.sort((a, b) => (a.stats.players || 0) - (b.stats.players || 0));
        return sorted[0].node;
    }
    ;
    async removeNode(name) {
        const node = this.get(name);
        if (!node)
            return null;
        await node.disconnect();
        this.delete(name);
        return node;
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