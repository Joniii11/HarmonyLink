import { HarmonyLinkConfiguration } from "@t/HarmonyLink";
import { Config } from "@t/constants";
import { NodeGroup, NodeStats } from "@t/node";

export const config: Config = {
    name: "HarmonyLink",
    author: "Joniii11",
    version: "1.0.0",
    github: "https://github.com/Joniii11/HarmonyLink"
} as const;

export const getDefaultNodeStats = (): NodeStats => ({
        players: 0,
        playingPlayers: 0,
        uptime: 0,
        memory: {
            free: 0,
            used: 0,
            allocated: 0,
            reservable: 0
        },
        cpu: {
            cores: 0,
            systemLoad: 0,
            lavalinkLoad: 0
        },
        frameStats: {
            sent: 0,
            nulled: 0,
            deficit: 0
        },
});

export const parseHarmonyLinkConfig = (harmonylinkConfig: Partial<HarmonyLinkConfiguration>): Omit<HarmonyLinkConfiguration, "defaultPlatform" | "nodes"> & { defaultPlatform: string; nodes?: NodeGroup[] } => {
    if (!harmonylinkConfig.library) throw new Error("No library was provided.");

    return {
        library: harmonylinkConfig.library,
        nodes: harmonylinkConfig.nodes ?? [],
        defaultPlatform: harmonylinkConfig.defaultPlatform ?? "ytsearch",
        voiceConnectionTimeout: harmonylinkConfig.voiceConnectionTimeout ?? 10000,
        additionalDriver: harmonylinkConfig.additionalDriver ?? [],
        resumeTimeout: harmonylinkConfig.resumeTimeout ?? 10000,
        nodeResolver: harmonylinkConfig.nodeResolver ?? undefined,
        customAutoplay: harmonylinkConfig.customAutoplay ?? undefined,
        resume: harmonylinkConfig.resume ?? true,
        reconnectTries: harmonylinkConfig.reconnectTries ?? 5,
        reconnectTimeout: harmonylinkConfig.reconnectTimeout ?? 5000,
        defaultVolume: harmonylinkConfig.defaultVolume ?? 100,
    } satisfies  Omit<HarmonyLinkConfiguration, "defaultPlatform" | "nodes"> & { defaultPlatform: string; nodes?: NodeGroup[] };
}

export * from "./node";
export * from "./player";