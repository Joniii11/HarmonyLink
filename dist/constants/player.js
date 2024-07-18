"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultConnectionOptions = void 0;
function getDefaultConnectionOptions(options) {
    return {
        voiceRegion: null,
        voice: {
            sessionId: null,
            token: null,
            endpoint: null,
        },
        selfDeaf: options.deaf ?? false,
        selfMute: options.mute ?? false,
    };
}
exports.getDefaultConnectionOptions = getDefaultConnectionOptions;
;
//# sourceMappingURL=player.js.map