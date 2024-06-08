import { ConnectionOptions } from "@t/player/connection";

export function getDefaultConnectionOptions(): ConnectionOptions {
    return {
        voiceRegion: null,
        voice: {
            sessionId: null,
            token: null,
            endpoint: null,
        },
        selfDeaf: false,
        selfMute: false,
    } satisfies ConnectionOptions;
};