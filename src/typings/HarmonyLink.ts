/* eslint-disable @typescript-eslint/no-invalid-void-type */
import AbstractLibraryClass from "@/librarys/AbstractLibraryClass";
import AbstractNodeDriver from "@/nodeDriver/AbstractNodeDriver";

import NodeManager from "@/managers/NodeManager";
import { NodeGroup } from "@t/node";
import { Node } from "@/node/Node";
import { Player } from "@/player/Player";
import { AbstractPlugin } from "@/plugin";

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
     * Additional plugins to use for the library
     * 
     * @default []
     */
    plugins?: AbstractPlugin[]

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
     * A custom autoplay function to use for autoplaying tracks
     * 
     * @default
     * ```ts
     *  try {
     *      const prevTrack = previousTrack ?? this.queue.previousTrack;
     *      if (!prevTrack) return this;
     *
     *      switch (prevTrack.info.sourceName) {
     *           case "soundcloud": {
     *               const response = await this.resolve({ query: `${prevTrack.info.title}`, requester: prevTrack.info.requester, source: "scsearch" });
     *           
     *               if (!response.tracks.length || response.tracks.length === 0 || ["error", "empty"].includes(response.loadType)) return await this.skip();
     *
     *              this.queue.add(response.tracks[Math.floor(Math.random() * Math.floor(response.tracks.length))]);
     *              return await this.play();
     *           };
     *
     *           case "youtube":
     *           default: {
     *              const searchedURL = `https://www.youtube.com/watch?v=${prevTrack.info.identifier || this.queue.currentTrack?.info.identifier}&list=RD${prevTrack.info.identifier || this.queue.currentTrack?.info.identifier}`;
     *              const response = await this.resolve({ query: searchedURL, requester: prevTrack.info.requester, source: "ytmsearch" });
     *
     *              if (!response.tracks.length || response.tracks.length === 0 || ["error", "empty"].includes(response.loadType)) return await this.skip();
     *          
     *              response.tracks.shift();
     *          
     *              const track = response.tracks[Math.floor(Math.random() * Math.floor(response.tracks.length))];
     *              this.queue.add(track);
     *
     *              return await this.play();
     *          };
     *      }
     *  } catch {
     *      return this.skip()
     *  }
     * ```
     */
    customAutoplay?: (player: Player) => Promise<Player | void>

    /**
     * The default volume to use for players
     * 
     * @default 100
     */
    defaultVolume?: number

    /**
     * The default source (platform) to use for resolving tracks
     * 
     * @default "ytsearch"
     */
    defaultPlatform?: string;

    /**
     * The timeout to use for voice connections
     * 
     * @default 10000
     */
    voiceConnectionTimeout?: number;
};

export type RequiredHarmonyLinkConfiguration = Omit<Required<HarmonyLinkConfiguration>, "customAutoplay" | "nodeResolver" | "nodes"> & { nodes?: NodeGroup[]; customAutoplay: ((player: Player) => Promise<Player | void>) | undefined; nodeResolver: ((nodes: NodeManager) => Promise<Node | void>) | undefined; };