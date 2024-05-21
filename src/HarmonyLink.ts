import EventEmitter from "events";
import AbstractLibraryClass from "@/librarys/AbstractLibraryClass";

import { config } from "@/constants";

import type { Config } from "@t/constants";
import type { HarmonyLinkConfiguration } from "@t/HarmonyLink";
import type { NodeGroup } from "@t/node";

export class HarmonyLink extends EventEmitter {
    private readonly config: Config = config;
    public readonly library: AbstractLibraryClass;
    public readonly nodes: NodeGroup[];

    constructor(options: HarmonyLinkConfiguration) {
        super();
        this.library = options.library;
        this.nodes = options.nodes;
    };
}