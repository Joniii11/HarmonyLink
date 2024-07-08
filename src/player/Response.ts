/* eslint-disable class-methods-use-this */

// Structures
import { Track } from "./Track";

// Types
import { LavaLinkLoadTypes, LoadTrackResult } from "@t/node/rest";
import { PlaylistInfo } from "@t/player/response";
import { TrackData } from "@t/track";

export class Response {
    public tracks: Track[];
    public loadType: LavaLinkLoadTypes;
    public playlistInfo: PlaylistInfo;

    public constructor(response: LoadTrackResult, requester?: any) {
        const { loadType, data } = response;
        
        switch (loadType) {
            case "playlist": {
                this.tracks = this.handleTracks(data.tracks, requester);
                this.playlistInfo = {
                    ...data.info,
                    type: "playlist"
                };

                break;
            };

            case "search":
            case "track": {
                this.tracks = this.handleTracks(data, requester);
                this.playlistInfo = {
                    type: "noPlaylist"
                };

                break;
            };

            default: {
                this.tracks = [];
                this.playlistInfo = {
                    type: "noPlaylist"
                };

                break;
            };
        };

        this.loadType = loadType;
    };

    /**
     * This function will handle the tracks and return them as an array of Track classes
     * @param {TrackData | TrackData[]} data The raw track data
     * @param {any | undefined} requester The requester
     * @returns {Track[]} The tracks
     */
    private handleTracks(data: TrackData | TrackData[], requester?: any): Track[] {
        if (Array.isArray(data)) {
          return data.map((track) => new Track(track, requester))
        };
        
        return [new Track(data, requester)]
    };
};