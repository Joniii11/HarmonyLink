import { HarmonyLink } from "../HarmonyLink";
import { Result } from 'neverthrow';
export * from "./AbstractPlugin";
export { Result, Ok, Err, ok, err } from 'neverthrow';
/**
 * Plugin loading result type
 */
export interface PluginLoadResult {
    pluginName: string;
    success: boolean;
    error?: string;
}
/**
 * This function will load all the plugins that are in the HarmonyLink instance with Result types.
 * @param {HarmonyLink} manager The HarmonyLink instance
 * @returns {Promise<Result<PluginLoadResult[], string>>} Result containing plugin load results or error message
 */
export declare function loadPlugins(manager: HarmonyLink): Promise<Result<PluginLoadResult[], string>>;
/**
 * Unload all plugins with Result types
 * @param {HarmonyLink} manager The HarmonyLink instance
 * @returns {Promise<Result<PluginLoadResult[], string>>} Result containing plugin unload results or error message
 */
export declare function unloadPlugins(manager: HarmonyLink): Promise<Result<PluginLoadResult[], string>>;
/**
 * Backward compatibility function (deprecated - use loadPlugins with Result handling)
 * @deprecated Use loadPlugins() with Result handling instead
 */
export declare function loadPluginsLegacy(manager: HarmonyLink): Promise<boolean>;
/**
 * Get plugin loading summary
 */
export declare function getPluginSummary(results: PluginLoadResult[]): string;
