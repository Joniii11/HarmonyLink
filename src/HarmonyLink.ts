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
import { ok, Result, err } from 'neverthrow';

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

    public readonly version: string = config.version;
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
    public async resolve({ query, source, requester}: ResolveOptions, node?: Node): Promise<Result<Response, Error>> {
        if (!node) node = (await this.nodeManager.getLeastUsedNode()).unwrapOr(undefined);
        if (!node) throw new Error("No nodes available to resolve from");

        const result = await node.rest.loadTrack(query, source);

        return result.match(
            (data) => data ? ok(new Response(data, requester)) : err(new Error("[HarmonyLink] [NodeManager] No tracks found for the given query.")),
            (error) => err(new Error(`[HarmonyLink] [NodeManager] Failed to resolve track: ${error.message}`))
        )
    };

    /**
     * Creates a player.
     * @param {PlayerOptions} playerOptions - Options for the player.
     * @param {Node} [node] - Node to use for the player.
     * @returns {Promise<Player>} The created player.
     */
    public createPlayer(playerOptions: Omit<PlayerOptions, "node">, node?: Node): Promise<Result<Player, Error>> {
        return this.playerManager.createPlayer({ ...playerOptions, node })
    };

    /**
     * Destroys a player.
     * @param {string} guildId - The guild ID of the player to destroy.
     * @returns {Promise<Player | null>} The destroyed player.
     */
    public async destroyPlayer(guildId: string): Promise<Result<Player, Error>> {
        return await this.playerManager.removePlayer(guildId);
    };

    /**
     * Adds a node to the node manager.
     * @param {NodeGroup[]} nodes - The nodes to add.
     * @returns {Promise<Result<Node[], Error>>} The added nodes.
     */
    public async addNode(nodes: NodeGroup[]): Promise<Result<Node[], Error[]>>;
    /**
     * Adds a node to the node manager.
     * @param {NodeGroup} node - The node to add.
     * @returns {Promise<Result<Node, Error>>} The added node.
     */
    public async addNode(node: NodeGroup): Promise<Result<Node, Error>>;
    /**
     * Adds a node or multiple nodes to the node manager.
     * @param {NodeGroup[] | NodeGroup} node - The node or nodes to add. Can be a single NodeGroup or an array of NodeGroups.
     * @returns {Promise<Result<Node[] | Node, Error>>} The added node(s).
     */
    public async addNode(node: (NodeGroup[] | NodeGroup)): Promise<Result<(Node[] | Node), Error[] | Error>> {
        if (!this.isReady) return err(new Error("[HarmonyLink] [NodeManager] HarmonyLink is not ready yet."));

        if (Array.isArray(node)) {
            if (node.length === 0) return err(new Error("[HarmonyLink] [NodeManager] No nodes provided to add."));

            const nodePromises = node.map((n) => this.nodeManager.addNode(n));               
            const nodeResults = Result.combineWithAllErrors(await Promise.all(nodePromises));
            
            return nodeResults.match(
                (nodes) => ok(nodes),
                (errors) => err(errors)
            );
        };

        const result = await this.nodeManager.addNode(node);

        return result.match(
            (returnedNode) => ok(returnedNode),
            (error) => err(error)
        )
    };

    /**
     * Removes a node from the node manager.
     * @param {string} nodeName - The name of the node to remove.
     * @returns {Promise<Node | null>} The removed node.
     */
    public async removeNode(nodeName: string): Promise<Result<Node, Error>> {
        if (!this.isReady) return err(new Error("[HarmonyLink] [NodeManager] HarmonyLink is not ready yet."));

        return await this.nodeManager.removeNode(nodeName)
    };

    /**
     * Decodes a or multiple encoded tracks.
     * @param {string | string[]} tracks - The track to decode.
     * @returns {Promise<TrackData[]>} - A Promise that resolves to the decoded track.
     */
    public async decodeTracks(tracks: string[] | string, node?: Node): Promise<Result<TrackData[], Error>> {
        if (!Array.isArray(tracks)) tracks = [tracks];

        node ??= (await this.nodeManager.getLeastUsedNode()).unwrapOr(undefined);
        if (!node) return err(new Error("[HarmonyLink] [NodeManager] No nodes available to decode tracks."));

        return node.rest.decodeTracks(tracks)
    };
}