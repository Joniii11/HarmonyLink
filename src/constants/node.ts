import type { HarmonyLinkConfiguration } from "@t/HarmonyLink";
import type { NodeOption } from "@t/node";

export const defaultOptions = (harmoyLinkConfiguration: HarmonyLinkConfiguration): NodeOption => {
    const { reconnectTimeout, reconnectTries, resumeTimeout } = harmoyLinkConfiguration;
    
    return {
        reconnectAttemptTimeout: null,
        reconnectTries: reconnectTries ?? 5,
        currentAttempts: 0,
        reconnectTimeout: reconnectTimeout ?? 5000,
        resumeTimeout: resumeTimeout ?? 60
    };
}