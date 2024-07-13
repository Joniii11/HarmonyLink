import { HarmonyLink } from "@/HarmonyLink";

export abstract class AbstractPlugin {
    /**
     * This will be the name of the plugin.
     */
    public abstract name: string;

    /**
     * This will be the version of the plugin.
     */
    public abstract version: string;

    /**
     * This will be the author of the plugin aka you.
     */
    public abstract author: string;

    /**
     * This will be the HarmonyLink instance that the plugin will interact with.
     */
    public abstract manager: HarmonyLink | undefined;

    /**
     * This will be your entrypoint for your plugin to load and initialize it. You will also get the HarmonyLink instance to interact with the library.
     * @param {HarmonyLink} manager The HarmonyLink instance
     * 
     * @returns {Promise<void> | void} If you return a promise, the library will wait for it to resolve before continuing.
     */
    public abstract load(manager: HarmonyLink): Promise<void> | void;
};