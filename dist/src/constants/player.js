"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultConnectionOptions = void 0;
function getDefaultConnectionOptions() {
    return {
        voiceRegion: null,
        voice: {
            sessionId: null,
            token: null,
            endpoint: null,
        },
        selfDeaf: false,
        selfMute: false,
    };
}
exports.getDefaultConnectionOptions = getDefaultConnectionOptions;
;
//# sourceMappingURL=player.js.map