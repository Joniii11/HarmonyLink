"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPluginSummary = exports.loadPluginsLegacy = exports.unloadPlugins = exports.loadPlugins = exports.err = exports.ok = exports.Err = exports.Ok = exports.Result = void 0;
const neverthrow_1 = require("neverthrow");
// Exporting stuff
__exportStar(require("./AbstractPlugin"), exports);
// Re-export neverthrow types for plugin developers
var neverthrow_2 = require("neverthrow");
Object.defineProperty(exports, "Result", { enumerable: true, get: function () { return neverthrow_2.Result; } });
Object.defineProperty(exports, "Ok", { enumerable: true, get: function () { return neverthrow_2.Ok; } });
Object.defineProperty(exports, "Err", { enumerable: true, get: function () { return neverthrow_2.Err; } });
Object.defineProperty(exports, "ok", { enumerable: true, get: function () { return neverthrow_2.ok; } });
Object.defineProperty(exports, "err", { enumerable: true, get: function () { return neverthrow_2.err; } });
/**
 * This function will load all the plugins that are in the HarmonyLink instance with Result types.
 * @param {HarmonyLink} manager The HarmonyLink instance
 * @returns {Promise<Result<PluginLoadResult[], string>>} Result containing plugin load results or error message
 */
async function loadPlugins(manager) {
    const results = [];
    if (!manager.options.plugins || manager.options.plugins.length === 0) {
        manager.emit("debug", `[HarmonyLink] [PluginManager] No plugins to load.`);
        return (0, neverthrow_1.ok)(results);
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
            }
            else {
                const error = initResult.error;
                results.push({
                    pluginName: plugin.name,
                    success: false,
                    error: `${error.type}: ${error.message}`
                });
                manager.emit("debug", `[HarmonyLink] [PluginManager] Failed to load plugin ${plugin.name}: ${error.message}`, error);
            }
        }
        catch (e) {
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
        return (0, neverthrow_1.err)(`Failed to load ${failedPlugins.length} plugin(s): ${failedNames}`);
    }
    return (0, neverthrow_1.ok)(results);
}
exports.loadPlugins = loadPlugins;
/**
 * Unload all plugins with Result types
 * @param {HarmonyLink} manager The HarmonyLink instance
 * @returns {Promise<Result<PluginLoadResult[], string>>} Result containing plugin unload results or error message
 */
async function unloadPlugins(manager) {
    const results = [];
    if (!manager.options.plugins || manager.options.plugins.length === 0) {
        manager.emit("debug", `[HarmonyLink] [PluginManager] No plugins to unload.`);
        return (0, neverthrow_1.ok)(results);
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
            }
            else {
                const error = shutdownResult.error;
                results.push({
                    pluginName: plugin.name,
                    success: false,
                    error: `${error.type}: ${error.message}`
                });
                manager.emit("debug", `[HarmonyLink] [PluginManager] Failed to unload plugin ${plugin.name}: ${error.message}`, error);
            }
        }
        catch (e) {
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
        return (0, neverthrow_1.err)(`Failed to unload ${failedPlugins.length} plugin(s): ${failedNames}`);
    }
    return (0, neverthrow_1.ok)(results);
}
exports.unloadPlugins = unloadPlugins;
/**
 * Backward compatibility function (deprecated - use loadPlugins with Result handling)
 * @deprecated Use loadPlugins() with Result handling instead
 */
async function loadPluginsLegacy(manager) {
    const result = await loadPlugins(manager);
    return result.isOk();
}
exports.loadPluginsLegacy = loadPluginsLegacy;
/**
 * Get plugin loading summary
 */
function getPluginSummary(results) {
    const total = results.length;
    const successful = results.filter(r => r.success).length;
    const failed = total - successful;
    if (failed === 0)
        return `Successfully loaded ${successful}/${total} plugins`;
    const failedNames = results.filter(r => !r.success).map(r => r.pluginName).join(', ');
    return `Loaded ${successful}/${total} plugins. Failed: ${failedNames}`;
}
exports.getPluginSummary = getPluginSummary;
//# sourceMappingURL=index.js.map