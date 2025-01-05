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
exports.parseHarmonyLinkConfig = exports.getDefaultNodeStats = exports.config = void 0;
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
const parseHarmonyLinkConfig = (harmonylinkConfig) => {
    if (!harmonylinkConfig.library)
        throw new Error("[HarmonyLink] [Initialization] No library was provided.");
    return {
        library: harmonylinkConfig.library,
        nodes: harmonylinkConfig.nodes ?? [],
        defaultPlatform: harmonylinkConfig.defaultPlatform ?? "ytsearch",
        voiceConnectionTimeout: harmonylinkConfig.voiceConnectionTimeout ?? 10000,
        additionalDriver: harmonylinkConfig.additionalDriver ?? [],
        resumeTimeout: harmonylinkConfig.resumeTimeout ?? 10000,
        nodeAdder: harmonylinkConfig.nodeAdder ?? undefined,
        nodeResolver: harmonylinkConfig.nodeResolver ?? undefined,
        customAutoplay: harmonylinkConfig.customAutoplay ?? undefined,
        resume: harmonylinkConfig.resume ?? true,
        reconnectTries: harmonylinkConfig.reconnectTries ?? 5,
        reconnectTimeout: harmonylinkConfig.reconnectTimeout ?? 5000,
        defaultVolume: harmonylinkConfig.defaultVolume ?? 100,
        plugins: harmonylinkConfig.plugins ?? [],
        reconnectVoiceConnection: harmonylinkConfig.reconnectVoiceConnection ?? true,
    };
};
exports.parseHarmonyLinkConfig = parseHarmonyLinkConfig;
__exportStar(require("./node"), exports);
__exportStar(require("./player"), exports);
//# sourceMappingURL=index.js.map