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
import { HarmonyLinkConfiguration } from "@t/HarmonyLink";
import { NodeGroup } from "@t/node";
import { Node } from "@/node/Node";
import { ResolveOptions } from "@t/player";

export class HarmonyLink extends EventEmitter {
    public botID: string = "";
    public isReady: boolean = false;

    public readonly config: Config = config;
    public readonly library: AbstractLibraryClass;
    public readonly nodes: NodeGroup[];
    public readonly options: Omit<HarmonyLinkConfiguration, "defaultPlatform" | "nodes"> & { defaultPlatform: string; nodes?: NodeGroup[] };
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
}