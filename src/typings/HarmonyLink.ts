import AbstractLibraryClass from "@/librarys/AbstractLibraryClass";
import AbstractNodeDriver from "@/nodeDriver/AbstractNodeDriver";

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

    /**
     * Whether to automatically resume players when the node is reconnected
     * 
     * @default true
     */
    resume?: boolean;

    /**
     * Additional drivers to use for connecting to other nodes.
     * 
     * @note If you are using a custom driver, you should extend `AbstractNodeDriver` and implement the methods.
     * @note If you want, you can go onto our github and create a pull request to add your driver to the main repository so that it is supported by default.
     * 
     * @default []
     */
    additionalDriver?: AbstractNodeDriver[];
}