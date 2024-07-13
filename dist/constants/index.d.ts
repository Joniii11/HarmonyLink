import { HarmonyLinkConfiguration, RequiredHarmonyLinkConfiguration } from "../typings/HarmonyLink";
import { Config } from "../typings/constants";
import { NodeStats } from "../typings/node";
export declare const config: Config;
export declare const getDefaultNodeStats: () => NodeStats;
export declare const parseHarmonyLinkConfig: (harmonylinkConfig: Partial<HarmonyLinkConfiguration>) => RequiredHarmonyLinkConfiguration;
export * from "./node";
export * from "./player";
