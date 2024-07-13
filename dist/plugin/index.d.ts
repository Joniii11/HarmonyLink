import { HarmonyLink } from "../HarmonyLink";
export * from "./AbstractPlugin";
/**
 * This function will load all the plugins that are in the HarmonyLink instance.
 * @param {HarmonyLink} manager The HarmonyLink instance
 * @returns {Promise<boolean>} If the plugins were loaded successfully.
 */
export declare function loadPlugins(manager: HarmonyLink): Promise<boolean>;
