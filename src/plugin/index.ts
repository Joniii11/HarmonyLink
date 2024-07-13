// Types
import { HarmonyLink } from "@/HarmonyLink";

// Exporting stuff
export * from "./AbstractPlugin";

/**
 * This function will load all the plugins that are in the HarmonyLink instance.
 * @param {HarmonyLink} manager The HarmonyLink instance
 * @returns {Promise<boolean>} If the plugins were loaded successfully.
 */
export async function loadPlugins(manager: HarmonyLink): Promise<boolean> {
    let success = true;

    for (const plugin of manager.options.plugins) {
        try {
            await plugin.load(manager);   

            manager.emit("debug", `[HarmonyLink] [PluginManager] Loaded plugin ${plugin.name} (Version: ${plugin.version}) by ${plugin.author}.`);
        } catch (err) {
            manager.emit("debug", `[HarmonyLink] [PluginManager] Error while loading plugin ${plugin.name}.`, err);
            success = false;
        }
    };

    return success;
};