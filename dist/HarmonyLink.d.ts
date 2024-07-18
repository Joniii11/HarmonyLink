/// <reference types="node" />
import EventEmitter from "events";
import AbstractLibraryClass from "./librarys/AbstractLibraryClass";
import AbstractNodeDriver from "./nodeDriver/AbstractNodeDriver";
import NodeManager from "./managers/NodeManager";
import PlayerManager from "./managers/PlayerManager";
import { Response } from "./player/Response";
import { Config } from "./typings/constants";
import { HarmonyLinkConfiguration, HarmonyLinkEvents, RequiredHarmonyLinkConfiguration } from "./typings/HarmonyLink";
import { NodeGroup } from "./typings/node";
import { Node } from "./node/Node";
import { PlayerOptions, ResolveOptions } from "./typings/player";
import { Player } from "./player";
export declare interface HarmonyLink {
    on: <K extends keyof HarmonyLinkEvents>(event: K, listener: HarmonyLinkEvents[K]) => this;
    once: <K extends keyof HarmonyLinkEvents>(event: K, listener: HarmonyLinkEvents[K]) => this;
    emit: <K extends keyof HarmonyLinkEvents>(event: K, ...args: Parameters<HarmonyLinkEvents[K]>) => boolean;
    off: <K extends keyof HarmonyLinkEvents>(event: K, listener: HarmonyLinkEvents[K]) => this;
}
export declare class HarmonyLink extends EventEmitter {
    botID: string;
    isReady: boolean;
    readonly config: Config;
    readonly library: AbstractLibraryClass;
    readonly nodes: NodeGroup[];
    readonly options: RequiredHarmonyLinkConfiguration;
    readonly drivers: AbstractNodeDriver[];
    readonly nodeManager: NodeManager;
    readonly playerManager: PlayerManager;
    constructor(options: HarmonyLinkConfiguration);
    /**
     * Resolves a track.
     * @param {ResolveOptions} options - Options for resolving tracks.
     * @param {Node} [node] - Node to use for resolution.
     * @returns {Promise<Response>} The response containing resolved tracks.
     */
    resolve({ query, source, requester }: ResolveOptions, node?: Node): Promise<Response>;
    /**
     * Creates a player.
     * @param {PlayerOptions} playerOptions - Options for the player.
     * @param {Node} [node] - Node to use for the player.
     * @returns {Promise<Player>} The created player.
     */
    createPlayer(playerOptions: Omit<PlayerOptions, "node">, node?: Node): Promise<Player>;
    /**
     * Destroys a player.
     * @param {string} guildId - The guild ID of the player to destroy.
     * @returns {Promise<Player | null>} The destroyed player.
     */
    destroyPlayer(guildId: string): Promise<Player | null>;
    /**
     * Adds a node to the node manager.
     * @param {NodeGroup | NodeGroup[]} node - The node to add.
     * @returns {Promise<Node | Node[]>} The added node.
     */
    addNode(node: NodeGroup | NodeGroup[]): Promise<Node | Node[]>;
    /**
     * Removes a node from the node manager.
     * @param {string} nodeName - The name of the node to remove.
     * @returns {Promise<Node | null>} The removed node.
     */
    removeNode(nodeName: string): Promise<Node | null>;
}
