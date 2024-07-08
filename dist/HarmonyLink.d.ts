/// <reference types="node" />
import EventEmitter from "events";
import AbstractLibraryClass from "./librarys/AbstractLibraryClass";
import AbstractNodeDriver from "./nodeDriver/AbstractNodeDriver";
import NodeManager from "./managers/NodeManager";
import PlayerManager from "./managers/PlayerManager";
import { Response } from "./player/Response";
import { Config } from "./typings/constants";
import { HarmonyLinkConfiguration } from "./typings/HarmonyLink";
import { NodeGroup } from "./typings/node";
import { Node } from "./node/Node";
import { ResolveOptions } from "./typings/player";
export declare class HarmonyLink extends EventEmitter {
    botID: string;
    isReady: boolean;
    readonly config: Config;
    readonly library: AbstractLibraryClass;
    readonly nodes: NodeGroup[];
    readonly options: Omit<HarmonyLinkConfiguration, "defaultPlatform" | "nodes"> & {
        defaultPlatform: string;
        nodes?: NodeGroup[];
    };
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
}
