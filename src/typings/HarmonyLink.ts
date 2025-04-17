/* eslint-disable @typescript-eslint/no-invalid-void-type */
import AbstractLibraryClass from "@/librarys/AbstractLibraryClass";
import AbstractNodeDriver from "@/nodeDriver/AbstractNodeDriver";

import NodeManager from "@/managers/NodeManager";
import { LavalinkPlayerUpdatePacket, NodeGroup } from "@t/node";
import { Node } from "@/node/Node";
import { Player } from "@/player/Player";
import { AbstractPlugin } from "@/plugin";
import { Track } from "@/player";
import { TrackEndEvent, TrackExceptionEvent, TrackStuckEvent, WebSocketClosedEvent } from "./exporter";

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
     * @see If you are using a custom driver, you should extend `AbstractNodeDriver` and implement the methods.
     * @see If you want, you can go onto our github and create a pull request to add your driver to the main repository so that it is supported by default.
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
     *  const promises = onlineNodes.map( node => {
     *      const stats = node.stats;
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
     * A custom resolver for adding Nodes.
     *
     * @default undefined
     */
    nodeAdder?: (nodeManager: NodeManager, node: NodeGroup) => Promise<Node | void>;

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

    /**
     * Reconnect the player when the voice connection is lost and recovered
     * 
     * @default true
     */
    reconnectVoiceConnection?: boolean;
};

export type RequiredHarmonyLinkConfiguration = Omit<Required<HarmonyLinkConfiguration>, "customAutoplay" | "nodeAdder" | "nodeResolver" | "nodes"> & {
    nodes?: NodeGroup[];
    customAutoplay: ((player: Player) => Promise<Player | void>) | undefined;
    nodeResolver: ((nodes: NodeManager) => Promise<Node | void>) | undefined;
    nodeAdder: ((nodeManager: NodeManager, node: NodeGroup) => Promise<Node | void>) | undefined;
};

export interface HarmonyLinkTupledEvents {
    debug: [args: unknown[]];
    nodeReconnect: [node: Node];
    nodeDisconnect: [node: Node, code: number];
    nodeConnect: [node: Node];
    nodeError: [node: Node, error: Error];
    playerCreate: [player: Player];
    playerDestroy: [player: Player];
    playerUpdate: [player: Player, packet: LavalinkPlayerUpdatePacket];
    trackEnd: [player: Player, previousTrack: Track, packet?: TrackEndEvent & { op: "event"; guildId: string; }];
    trackStart: [player: Player, track: Track];
    trackError: [player: Player, track: Track, error: { op: "event"; guildId: string; } & (TrackExceptionEvent | TrackStuckEvent)];
    socketClose: [player: Player, track: Track, wsCloseData: WebSocketClosedEvent & { op: "event"; guildId: string; }];
    queueEmpty: [player: Player];
}

export interface HarmonyLinkEvents {
    /**
     * Emitted for useful debugging information.
     * @param {unknown[]} args The arguments to log.
     * @returns {void} 
     */
    debug: (...args: unknown[]) => void;

    /**
     * Emitted when a node has reconnected and is ready to be used.
     * @param {Node} node The node that reconnected.
     * @returns {void}
     */
    nodeReconnect: (node: Node) => void;

    /**
     * Emitted when a node has disconnected and is no longer available.
     * @param {Node} node The node that disconnected.
     * @param {number} code The code for the disconnection.
     * @returns {void}
     */
    nodeDisconnect: (node: Node, code: number) => void;

    /**
     * Emitted when a node has connected and is ready to be used.
     * @param {Node} node The node that connected.
     * @returns {void}
     */
    nodeConnect: (node: Node) => void;

    /**
     * Emitted when a node threw an error
     * @param {Node} node The node that threw the error.
     * @param {Error} error The error that was thrown.
     * @returns {void}
     */
    nodeError: (node: Node, error: Error) => void;

    /**
     * Emitted when a player has been created.
     * @param {Player} player The player that was created.
     * @returns {void}
     */
    playerCreate: (player: Player) => void;

    /**
     * Emitted when a player has been destroyed.
     * @param {Player} player The player that was destroyed.
     * @returns {void}
     */
    playerDestroy: (player: Player) => void;

    /**
     * Emitted when a player has been updated.
     * @param {Player} player The player that was updated.
     * @param {LavalinkPlayerUpdatePacket} packet The packet that was sent.
     * @returns {void}
     */
    playerUpdate: (player: Player, packet: LavalinkPlayerUpdatePacket) => void;

    /**
     * Emitted when a track has ended.
     * @param {Player} player The player that the track ended on.
     * @param {Track} previousTrack The track that ended.
     * @param {(TrackEndEvent & { op: "event"; guildId: string; }) | undefined} packet The packet that was sent.
     * @returns {void}
     */
    trackEnd: (player: Player, previousTrack: Track, packet?: TrackEndEvent & { op: "event"; guildId: string; }) => void;

    /**
     * Emitted when a track has started.
     * @param {Player} player The player that the track started on.
     * @param {Track} track The track that started.
     * @returns {void}
     */
    trackStart: (player: Player, track: Track) => void;

    /**
     * Emitted when a track has errored.
     * @param {Player} player The player that the track errored on.
     * @param {Track} track The track that errored.
     * @param {{ op: "event"; guildId: string; } & (TrackStuckEvent | TrackExceptionEvent)} error The error that was sent.
     * @returns {void}
     */
    trackError: (player: Player, track: Track, error: { op: "event"; guildId: string; } & (TrackExceptionEvent | TrackStuckEvent)) => void;

    /**
     * Emitted when the socket disconnects.
     * @param {Player} player The player that the socket disconnection occured on
     * @param {Track} track The track that was playing during the socket disconnection.
     * @param {{ op: "event"; guildId: string; } & WebSocketClosedEvent} error The error that was sent.
     * @returns {void}
     */
    socketClose: (player: Player, track: Track, wsCloseData: WebSocketClosedEvent & { op: "event"; guildId: string; }) => void;

    /**
     * Emitted when the queue is empty.
     * @param {Player} player The player that the queue emptied on.
     * @returns {void}
     */
    queueEmpty: (player: Player) => void;
};

export interface HarmonyLinkEventsOtherFormat {
  /**
   * Emitted for useful debugging information.
   * @param message The debug message.
   */
  debug: [message: string];

  /**
   * Emitted when a node has reconnected and is ready to be used.
   * @param node The node that reconnected.
   */
  nodeReconnect: [node: Node];

  /**
   * Emitted when a node has disconnected and is no longer available.
   * @param node The node that disconnected.
   * @param code The disconnection code.
   */
  nodeDisconnect: [node: Node, code: number];

  /**
   * Emitted when a node has connected and is ready to be used.
   * @param node The node that connected.
   */
  nodeConnect: [node: Node];

  /**
   * Emitted when a node throws an error.
   * @param node The node that encountered an error.
   * @param error The error that was thrown.
   */
  nodeError: [node: Node, error: Error];

  /**
   * Emitted when a player has been created.
   * @param player The player that was created.
   */
  playerCreate: [player: Player];

  /**
   * Emitted when a player has been destroyed.
   * @param player The player that was destroyed.
   */
  playerDestroy: [player: Player];

  /**
   * Emitted when a player is updated.
   * @param player The player that was updated.
   * @param packet The update packet.
   */
  playerUpdate: [player: Player, packet: LavalinkPlayerUpdatePacket];

  /**
   * Emitted when a track has ended.
   * @param player The player on which the track ended.
   * @param previousTrack The track that ended.
   * @param packet Optional packet with event details.
   */
  trackEnd: [player: Player, previousTrack: Track, packet?: TrackEndEvent & { op: "event"; guildId: string }];

  /**
   * Emitted when a track has started.
   * @param player The player on which the track started.
   * @param track The track that started.
   */
  trackStart: [player: Player, track: Track];

  /**
   * Emitted when a track encounters an error.
   * @param player The player on which the error occurred.
   * @param track The track that errored.
   * @param error The error details.
   */
  trackError: [player: Player, track: Track, error: { op: "event"; guildId: string } & (TrackExceptionEvent | TrackStuckEvent)];

  /**
   * Emitted when the socket disconnects.
   * @param player The player affected by the disconnection.
   * @param track The track that was playing during disconnection.
   * @param wsCloseData The WebSocket close data.
   */
  socketClose: [player: Player, track: Track, wsCloseData: WebSocketClosedEvent & { op: "event"; guildId: string }];

  /**
   * Emitted when the queue becomes empty.
   * @param player The player on which the queue emptied.
   */
  queueEmpty: [player: Player];
}
