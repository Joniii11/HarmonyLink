import type { Config } from "@t/constants";
import type { NodeStats } from "@t/node";

export const config: Config = {
    name: "HarmonyLink",
    author: "Joniii11",
    version: "1.0.0",
    github: "https://github.com/Joniii11/HarmonyLink"
} as const;

export const getDefaultNodeStats = (): NodeStats => {
    return {
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
    };
};