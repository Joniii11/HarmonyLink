import AbstractLibraryClass from "../librarys/AbstractLibraryClass";
import AbstractNodeDriver from "../nodeDriver/AbstractNodeDriver";
import NodeManager from "../managers/NodeManager";
import { NodeGroup } from "./node";
import { Node } from "../node/Node";
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
     * Whether to automatically resume players when the node is reconnected (Note: DOES NOT RESUME WHEN THE LAVALINK SERVER DIES)
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
    /**
     * The timeout to use when resuming players
     *
     * @default 10000
     */
    resumeTimeout?: number;
    /**
     * The amount of times to try to reconnect to the node
     *
     * @default 5
     */
    reconnectTries?: number;
    /**
     * The timeout for the reconnect
     *
     * @default 5000
     */
    reconnectTimeout?: number;
    /**
     * A custom resolver for the NodeResolver
     *
     * @default
     * ```ts
     *  const nodes = this.allNodes;
     *
     *  const onlineNodes = nodes.filter(node => node.isConnected);
     *
     *  if (!onlineNodes || onlineNodes.length === 0) {
     *      throw new Error("[HarmonyLink] [NodeManager] No nodes are online.");
     *  };
     *
     *  const promises = onlineNodes.map(async node => {
     *      const stats = await node.getStats();
     *      return { node, stats };
     *  });
     *
     *  const results = await Promise.all(promises);
     *  const sorted = results.sort((a, b) => a.stats.players - b.stats.players);
     *
     *  return sorted[0].node;
     * ```
     */
    nodeResolver?: (nodes: NodeManager) => Promise<Node | void>;
    /**
     * The default volume to use for players
     *
     * @default 100
     */
    defaultVolume?: number;
    /**
     * The timeout to use for voice connections
     *
     * @default 10000
     */
    voiceConnectionTimeout?: number;
}
