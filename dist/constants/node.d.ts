import { HarmonyLinkConfiguration } from "../typings/HarmonyLink";
import { NodeGroup, NodeOption } from "../typings/node";
export declare const defaultOptions: (harmoyLinkConfiguration: Omit<HarmonyLinkConfiguration, "defaultPlatform" | "nodes"> & {
    defaultPlatform: string;
    nodes?: NodeGroup[] | undefined;
}) => NodeOption;
