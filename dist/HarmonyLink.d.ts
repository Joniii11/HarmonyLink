/// <reference types="node" />
import EventEmitter from "events";
import AbstractLibraryClass from "./librarys/AbstractLibraryClass";
import AbstractNodeDriver from "./nodeDriver/AbstractNodeDriver";
import NodeManager from "./managers/NodeManager";
import PlayerManager from "./managers/PlayerManager";
import { Config } from "./typings/constants";
import { HarmonyLinkConfiguration } from "./typings/HarmonyLink";
import { NodeGroup } from "./typings/node";
export declare class HarmonyLink extends EventEmitter {
    botID: string;
    isReady: boolean;
    readonly config: Config;
    readonly library: AbstractLibraryClass;
    readonly nodes: NodeGroup[];
    readonly options: HarmonyLinkConfiguration;
    readonly drivers: AbstractNodeDriver[];
    readonly nodeManager: NodeManager;
    readonly playerManager: PlayerManager;
    constructor(options: HarmonyLinkConfiguration);
}
