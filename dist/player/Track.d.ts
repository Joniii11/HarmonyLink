import { HarmonyLink } from "../HarmonyLink";
import { TrackData, TrackDataInfo } from "../typings/track";
import { Result } from "neverthrow";
export declare class Track {
    track: string;
    info: (TrackDataInfo & {
        requester?: any;
    });
    pluginInfo: Record<string, unknown>;
    userData: Record<string, unknown>;
    /**
     * Constructor
     * @param data
     * @param requester
     */
    constructor(data: TrackData, requester?: any);
    /**
     * This function will resolve the track and return the track as resolved
     * @param {HarmonyLink} manager The HarmonyLink instance
     * @returns {Promise<Track | null>} The resolved track
     */
    resolve(manager: HarmonyLink): Promise<Result<Track, Error>>;
    private escapeRegExp;
}
