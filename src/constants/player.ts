import { ConnectionOptions } from "@t/player/connection";
import { PlayerOptions } from "@/typings/player";

export function getDefaultConnectionOptions(options: PlayerOptions): ConnectionOptions {
    return {
        voiceRegion: null,
        voice: {
            sessionId: null,
            token: null,
            endpoint: null,
        },
        selfDeaf: options.deaf ?? false,
        selfMute: options.mute ?? false,
    } satisfies ConnectionOptions;
};