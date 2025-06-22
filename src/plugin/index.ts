// Types
import { HarmonyLink } from "@/HarmonyLink";
import { Result, ok, err } from 'neverthrow';

// Exporting stuff
export * from "./AbstractPlugin";

// Re-export neverthrow types for plugin developers
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
export async function loadPlugins(manager: HarmonyLink): Promise<Result<PluginLoadResult[], string>> {
    const results: PluginLoadResult[] = [];
    
    if (!manager.options.plugins || manager.options.plugins.length === 0) {
        manager.emit("debug", `[HarmonyLink] [PluginManager] No plugins to load.`);
        return ok(results);
    }

    for (const plugin of manager.options.plugins) {
        try {
            // Use the new initialize method instead of load
            const initResult = await plugin.initialize(manager);
            
            if (initResult.isOk()) {
                results.push({
                    pluginName: plugin.name,
                    success: true
                });
                
                manager.emit("debug", `[HarmonyLink] [PluginManager] Loaded plugin ${plugin.name} (Version: ${plugin.version}) by ${plugin.author}.`);
            } else {
                const error = initResult.error;
                results.push({
                    pluginName: plugin.name,
                    success: false,
                    error: `${error.type}: ${error.message}`
                });
                
                manager.emit("debug", `[HarmonyLink] [PluginManager] Failed to load plugin ${plugin.name}: ${error.message}`, error);
            }
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            results.push({
                pluginName: plugin.name || 'Unknown Plugin',
                success: false,
                error: `Unexpected error: ${errorMessage}`
            });
            
            manager.emit("debug", `[HarmonyLink] [PluginManager] Unexpected error while loading plugin ${plugin.name || 'Unknown'}.`, e);
        }
    }

    // Check if any plugins failed to load
    const failedPlugins = results.filter(result => !result.success);
    if (failedPlugins.length > 0) {
        const failedNames = failedPlugins.map(p => p.pluginName).join(', ');
        return err(`Failed to load ${failedPlugins.length} plugin(s): ${failedNames}`);
    }

    return ok(results);
}

/**
 * Unload all plugins with Result types
 * @param {HarmonyLink} manager The HarmonyLink instance
 * @returns {Promise<Result<PluginLoadResult[], string>>} Result containing plugin unload results or error message
 */
export async function unloadPlugins(manager: HarmonyLink): Promise<Result<PluginLoadResult[], string>> {
    const results: PluginLoadResult[] = [];
    
    if (!manager.options.plugins || manager.options.plugins.length === 0) {
        manager.emit("debug", `[HarmonyLink] [PluginManager] No plugins to unload.`);
        return ok(results);
    }

    for (const plugin of manager.options.plugins) {
        try {
            if (!plugin.isLoaded) {
                results.push({
                    pluginName: plugin.name,
                    success: true
                });
                continue;
            }

            const shutdownResult = await plugin.shutdown();
            
            if (shutdownResult.isOk()) {
                results.push({
                    pluginName: plugin.name,
                    success: true
                });
                
                manager.emit("debug", `[HarmonyLink] [PluginManager] Unloaded plugin ${plugin.name}.`);
            } else {
                const error = shutdownResult.error;
                results.push({
                    pluginName: plugin.name,
                    success: false,
                    error: `${error.type}: ${error.message}`
                });
                
                manager.emit("debug", `[HarmonyLink] [PluginManager] Failed to unload plugin ${plugin.name}: ${error.message}`, error);
            }
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            results.push({
                pluginName: plugin.name || 'Unknown Plugin',
                success: false,
                error: `Unexpected error: ${errorMessage}`
            });
            
            manager.emit("debug", `[HarmonyLink] [PluginManager] Unexpected error while unloading plugin ${plugin.name || 'Unknown'}.`, e);
        }
    }

    // Check if any plugins failed to unload
    const failedPlugins = results.filter(result => !result.success);
    if (failedPlugins.length > 0) {
        const failedNames = failedPlugins.map(p => p.pluginName).join(', ');
        return err(`Failed to unload ${failedPlugins.length} plugin(s): ${failedNames}`);
    }

    return ok(results);
}

/**
 * Backward compatibility function (deprecated - use loadPlugins with Result handling)
 * @deprecated Use loadPlugins() with Result handling instead
 */
export async function loadPluginsLegacy(manager: HarmonyLink): Promise<boolean> {
    const result = await loadPlugins(manager);
    return result.isOk();
}

/**
 * Get plugin loading summary
 */
export function getPluginSummary(results: PluginLoadResult[]): string {
    const total = results.length;
    const successful = results.filter(r => r.success).length;
    const failed = total - successful;
    
    if (failed === 0) return `Successfully loaded ${successful}/${total} plugins`;

    const failedNames = results.filter(r => !r.success).map(r => r.pluginName).join(', ');
    return `Loaded ${successful}/${total} plugins. Failed: ${failedNames}`;
}