import { TrackData, TrackDataInfo } from "../typings/track";
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
}
