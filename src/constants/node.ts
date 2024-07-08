// Types
import { HarmonyLinkConfiguration } from "@t/HarmonyLink";
import { NodeGroup, NodeOption } from "@t/node";

export const defaultOptions = (harmoyLinkConfiguration: Omit<HarmonyLinkConfiguration, "defaultPlatform" | "nodes"> & { defaultPlatform: string; nodes?: NodeGroup[] | undefined; }): NodeOption => {
    const { reconnectTimeout, reconnectTries, resumeTimeout } = harmoyLinkConfiguration;
    
    return {
        reconnectAttemptTimeout: null,
        reconnectTries: reconnectTries ?? 5,
        currentAttempts: 0,
        reconnectTimeout: reconnectTimeout ?? 5000,
        resumeTimeout: resumeTimeout ?? 60
    };
}