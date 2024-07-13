"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HarmonyLink = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
const events_1 = __importDefault(require("events"));
// Managers
const NodeManager_1 = __importDefault(require("./managers/NodeManager"));
const PlayerManager_1 = __importDefault(require("./managers/PlayerManager"));
// Drivers
const LavalinkV4_1 = __importDefault(require("./nodeDriver/LavalinkV4"));
const NodeLink_1 = __importDefault(require("./nodeDriver/NodeLink"));
const FrequenC_1 = __importDefault(require("./nodeDriver/FrequenC"));
// Classes
const Response_1 = require("./player/Response");
// Constants
const constants_1 = require("./constants");
const plugin_1 = require("./plugin");
class HarmonyLink extends events_1.default {
    botID = "";
    isReady = false;
    config = constants_1.config;
    library;
    nodes;
    options;
    drivers = [];
    /* Managers */
    nodeManager = new NodeManager_1.default(this);
    playerManager = new PlayerManager_1.default(this);
    constructor(options) {
        super();
        // Initialize the library
        this.library = options.library.initialize(this);
        // Set some stuff
        this.nodes = options.nodes;
        this.options = (0, constants_1.parseHarmonyLinkConfig)(options);
        // Loading all of the plugins asynchorously
        void (async () => {
            await (0, plugin_1.loadPlugins)(this);
        })().catch((error) => this.emit("debug", "[HarmonyLink] [Initialization] Error while loading plugins.", error));
        // Clean up some stuff
        delete this.options.nodes;
        this.drivers = [new LavalinkV4_1.default(), new NodeLink_1.default(), new FrequenC_1.default(), ...(options.additionalDriver ?? [])];
        // Listen for updates in the ws on the client
        this.library.listen(this.nodes);
    }
    ;
    /**
     * Resolves a track.
     * @param {ResolveOptions} options - Options for resolving tracks.
     * @param {Node} [node] - Node to use for resolution.
     * @returns {Promise<Response>} The response containing resolved tracks.
     */
    async resolve({ query, source, requester }, node) {
        if (!node)
            node = await this.nodeManager.getLeastUsedNode();
        if (!node)
            throw new Error("No nodes available to resolve from");
        const result = await node.rest.loadTrack(query, source);
        return new Response_1.Response(result, requester);
    }
    ;
    /**
     * Creates a player.
     * @param {PlayerOptions} playerOptions - Options for the player.
     * @param {Node} [node] - Node to use for the player.
     * @returns {Promise<Player>} The created player.
     */
    async createPlayer(playerOptions, node) {
        return this.playerManager.createPlayer({ ...playerOptions, node });
    }
    ;
    /**
     * Destroys a player.
     * @param {string} guildId - The guild ID of the player to destroy.
     * @returns {Promise<Player | null>} The destroyed player.
     */
    async destroyPlayer(guildId) {
        return this.playerManager.removePlayer(guildId);
    }
    ;
    /**
     * Adds a node to the node manager.
     * @param {NodeGroup | NodeGroup[]} node - The node to add.
     * @returns {Promise<Node | Node[]>} The added node.
     */
    async addNode(node) {
        if (!this.isReady)
            throw new Error("[HarmonyLink] [NodeManager] HarmonyLink is not ready yet.");
        if (Array.isArray(node)) {
            const nodes = await Promise.all(node.map(n => this.nodeManager.addNode(n))).catch((error) => this.emit("debug", "[HarmonyLink] [NodeManager] Error while adding nodes.", error));
            return typeof nodes === "boolean" ? [] : nodes;
        }
        ;
        return this.nodeManager.addNode(node);
    }
    ;
    /**
     * Removes a node from the node manager.
     * @param {string} nodeName - The name of the node to remove.
     * @returns {Promise<Node | null>} The removed node.
     */
    async removeNode(nodeName) {
        if (!this.isReady)
            throw new Error("[HarmonyLink] [NodeManager] HarmonyLink is not ready yet.");
        return this.nodeManager.removeNode(nodeName);
    }
    ;
}
exports.HarmonyLink = HarmonyLink;
//# sourceMappingURL=HarmonyLink.js.map