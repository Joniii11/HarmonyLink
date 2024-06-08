"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultNodeStats = exports.config = void 0;
exports.config = {
    name: "HarmonyLink",
    author: "Joniii11",
    version: "1.0.0",
    github: "https://github.com/Joniii11/HarmonyLink"
};
const getDefaultNodeStats = () => ({
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
exports.getDefaultNodeStats = getDefaultNodeStats;
//# sourceMappingURL=index.js.map