import { HarmonyLinkConfiguration } from "../typings/HarmonyLink";
import { NodeGroup, NodeOption } from "../typings/node";
export declare const defaultOptions: (harmoyLinkConfiguration: Omit<HarmonyLinkConfiguration, "nodes"> & {
    nodes?: NodeGroup[] | undefined;
}) => NodeOption;
