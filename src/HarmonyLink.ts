/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import EventEmitter from "events";

// Abstract Classes
import AbstractLibraryClass from "@/librarys/AbstractLibraryClass";
import AbstractNodeDriver from "@/nodeDriver/AbstractNodeDriver";

// Managers
import NodeManager from "@/managers/NodeManager";
import PlayerManager from "@/managers/PlayerManager";

// Drivers
import LavalinkV4 from "@/nodeDriver/LavalinkV4";
import NodeLink from "@/nodeDriver/NodeLink";
import FrequenC from "@/nodeDriver/FrequenC";

// Classes
import { Response } from "@/player/Response";

// Constants
import { config, parseHarmonyLinkConfig } from "@/constants";

// Types
import { Config } from "@t/constants";
import { HarmonyLinkConfiguration, HarmonyLinkEvents, RequiredHarmonyLinkConfiguration } from "@t/HarmonyLink";
import { NodeGroup } from "@t/node";
import { Node } from "@/node/Node";
import { PlayerOptions, ResolveOptions } from "@t/player";
import { loadPlugins } from "./plugin";
import { Player } from "./player";
import { TrackData } from "./typings/track";

export declare interface HarmonyLink {
    on: <K extends keyof HarmonyLinkEvents>(event: K, listener: HarmonyLinkEvents[K]) => this;
    once: <K extends keyof HarmonyLinkEvents>(event: K, listener: HarmonyLinkEvents[K]) => this;
    emit: <K extends keyof HarmonyLinkEvents>(
        event: K,
        ...args: Parameters<HarmonyLinkEvents[K]>
    ) => boolean;
    off: <K extends keyof HarmonyLinkEvents>(event: K, listener: HarmonyLinkEvents[K]) => this;
}

export class HarmonyLink extends EventEmitter {
    public botID: string = "";
    public isReady: boolean = false;

    public readonly config: Config = config;
    public readonly library: AbstractLibraryClass;
    public readonly nodes: NodeGroup[];
    public readonly options: RequiredHarmonyLinkConfiguration
    public readonly drivers: AbstractNodeDriver[] = []; 

    /* Managers */
    public readonly nodeManager = new NodeManager(this)
    public readonly playerManager = new PlayerManager(this)

    public constructor(options: HarmonyLinkConfiguration) {
        super();

        // Initialize the library
        this.library = options.library.initialize(this);
        
        // Set some stuff
        this.nodes = options.nodes;
        this.options = parseHarmonyLinkConfig(options)

        // Loading all of the plugins asynchorously
        void (async () => {
            await loadPlugins(this);
        })().catch((error) => this.emit("debug", "[HarmonyLink] [Initialization] Error while loading plugins.", error));

        // Clean up some stuff
        delete this.options.nodes;

        this.drivers = [new LavalinkV4(), new NodeLink(), new FrequenC(), ...(options.additionalDriver ?? [])];

        // Listen for updates in the ws on the client
        this.library.listen(this.nodes);
    };

    /**
     * Resolves a track.
     * @param {ResolveOptions} options - Options for resolving tracks.
     * @param {Node} [node] - Node to use for resolution.
     * @returns {Promise<Response>} The response containing resolved tracks.
     */
    public async resolve({ query, source, requester}: ResolveOptions, node?: Node): Promise<Response> {
        if (!node) node = await this.nodeManager.getLeastUsedNode();
        if (!node) throw new Error("No nodes available to resolve from");

        const result = await node.rest.loadTrack(query, source);

        return new Response(result, requester);
    };

    /**
     * Creates a player.
     * @param {PlayerOptions} playerOptions - Options for the player.
     * @param {Node} [node] - Node to use for the player.
     * @returns {Promise<Player>} The created player.
     */
    public async createPlayer(playerOptions: Omit<PlayerOptions, "node">, node?: Node): Promise<Player> {
        return this.playerManager.createPlayer({ ...playerOptions, node })
    };

    /**
     * Destroys a player.
     * @param {string} guildId - The guild ID of the player to destroy.
     * @returns {Promise<Player | null>} The destroyed player.
     */
    public async destroyPlayer(guildId: string): Promise<Player | null> {
        return this.playerManager.removePlayer(guildId);
    };

    /**
     * Adds a node to the node manager.
     * @param {NodeGroup | NodeGroup[]} node - The node to add.
     * @returns {Promise<Node | Node[]>} The added node.
     */
    public async addNode(node: NodeGroup | NodeGroup[]): Promise<Node | Node[]> {
        if (!this.isReady) throw new Error("[HarmonyLink] [NodeManager] HarmonyLink is not ready yet.");

        if (Array.isArray(node)) {
            const nodes = await Promise.all(node.map(n => this.nodeManager.addNode(n))).catch((error) => this.emit("debug", "[HarmonyLink] [NodeManager] Error while adding nodes.", error));
            return typeof nodes === "boolean" ? [] : nodes;
        };

        return this.nodeManager.addNode(node);
    };

    /**
     * Removes a node from the node manager.
     * @param {string} nodeName - The name of the node to remove.
     * @returns {Promise<Node | null>} The removed node.
     */
    public async removeNode(nodeName: string): Promise<Node | null> {
        if (!this.isReady) throw new Error("[HarmonyLink] [NodeManager] HarmonyLink is not ready yet.");

        return this.nodeManager.removeNode(nodeName)
    };

    /**
     * Decodes a or multiple encoded tracks.
     * @param {string | string[]} tracks - The track to decode.
     * @returns {Promise<TrackData[]>} - A Promise that resolves to the decoded track.
     */
    public async decodeTracks(tracks: string[] | string, node?: Node): Promise<TrackData[] | null> {
        if (!Array.isArray(tracks)) tracks = [tracks];

        node ??= await this.nodeManager.getLeastUsedNode();
        if (!node) {
            this.emit("debug", "[HarmonyLink] [PlayerManager] No nodes available to decode tracks.");
            return null;
        };

        return node.rest.decodeTracks(tracks);
    };
}