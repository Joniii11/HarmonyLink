import EventEmitter from "events";
import AbstractLibraryClass from "@/librarys/AbstractLibraryClass";
import AbstractNodeDriver from "@/nodeDriver/AbstractNodeDriver";
import LavalinkV4 from "./nodeDriver/LavalinkV4";
import NodeManager from "./managers/NodeManager";
import NodeLink from "./nodeDriver/NodeLink";

import { config } from "@/constants";

import type { Config } from "@t/constants";
import type { HarmonyLinkConfiguration } from "@t/HarmonyLink";
import type { NodeGroup } from "@t/node";

export class HarmonyLink extends EventEmitter {
    public readonly config: Config = config;
    public readonly library: AbstractLibraryClass;
    public readonly nodes: NodeGroup[];
    public readonly options: HarmonyLinkConfiguration;
    public readonly drivers: AbstractNodeDriver[] = []; 
    public readonly nodeManager = new NodeManager(this)
    public botID: string = "";

    constructor(options: HarmonyLinkConfiguration) {
        super();
        this.library = options.library.initialize(this);
        this.nodes = options.nodes;
        this.options = options;
        this.drivers = [new LavalinkV4(), new NodeLink(), ...(options.additionalDriver ?? [])];

        this.library.listen(this.nodes);
    };
}