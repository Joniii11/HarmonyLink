import { Track } from "./Track";
import { LavaLinkLoadTypes, LoadTrackResult } from "../typings/node/rest";
import { PlaylistInfo } from "../typings/player/response";
export declare class Response {
    tracks: Track[];
    loadType: LavaLinkLoadTypes;
    playlistInfo: PlaylistInfo;
    constructor(response: LoadTrackResult, requester?: any);
    /**
     * This function will handle the tracks and return them as an array of Track classes
     * @param {TrackData | TrackData[]} data The raw track data
     * @param {any | undefined} requester The requester
     * @returns {Track[]} The tracks
     */
    private handleTracks;
}
