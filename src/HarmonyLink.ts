import EventEmitter from "events";

// Abstract Classes
import AbstractLibraryClass from "@/librarys/AbstractLibraryClass";
import AbstractNodeDriver from "@/nodeDriver/AbstractNodeDriver";

// Managers
import NodeManager from "./managers/NodeManager";
import PlayerManager from "./managers/PlayerManager";

// Drivers
import LavalinkV4 from "./nodeDriver/LavalinkV4";
import NodeLink from "./nodeDriver/NodeLink";
import FrequenC from "./nodeDriver/FrequenC";

// Constants
import { config } from "@/constants";

// Types
import { Config } from "@t/constants";
import { HarmonyLinkConfiguration } from "@t/HarmonyLink";
import { NodeGroup } from "@t/node";

export class HarmonyLink extends EventEmitter {
    public botID: string = "";
    public isReady: boolean = false;

    public readonly config: Config = config;
    public readonly library: AbstractLibraryClass;
    public readonly nodes: NodeGroup[];
    public readonly options: HarmonyLinkConfiguration;
    public readonly drivers: AbstractNodeDriver[] = []; 

    /* Managers */
    public readonly nodeManager = new NodeManager(this)
    public readonly playerManager = new PlayerManager(this)

    constructor(options: HarmonyLinkConfiguration) {
        super();

        // Initialize the library
        this.library = options.library.initialize(this);
        
        // Set some stuff
        this.nodes = options.nodes;
        this.options = options;
        this.drivers = [new LavalinkV4(), new NodeLink(), new FrequenC(), ...(options.additionalDriver ?? [])];

        // Listen for updates in the ws on the client
        this.library.listen(this.nodes);
    };
}