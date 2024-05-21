import AbstractLibraryClass from "@/librarys/AbstractLibraryClass";

import type { NodeGroup } from "@t/node";

export interface HarmonyLinkConfiguration {
    /**
     * The library instance used for interacting with the Discord client.
     * This should be an instance of a class extending `AbstractLibraryClass`.
     * 
     * ```ts
     * import { DJSLibrary } from "HarmonyLink";
     * import { Client } from "discord.js"
     * 
     * // Initialize your client
     * const client = new Client();
     * 
     * const config: HarmonyLinkConfiguration = {
     *   ...YourConfiguration
     *   library: new DJSLibrary(client),
     * }
     * ```
     */
    library: AbstractLibraryClass;

    /**
     * The nodes to use and connect to
     */
    nodes: NodeGroup[];
}