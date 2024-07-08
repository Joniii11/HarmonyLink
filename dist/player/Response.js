"use strict";
/* eslint-disable class-methods-use-this */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
// Structures
const Track_1 = require("./Track");
class Response {
    tracks;
    loadType;
    playlistInfo;
    constructor(response, requester) {
        const { loadType, data } = response;
        switch (loadType) {
            case "playlist":
                {
                    this.tracks = this.handleTracks(data.tracks, requester);
                    this.playlistInfo = {
                        ...data.info,
                        type: "playlist"
                    };
                    break;
                }
                ;
            case "search":
            case "track":
                {
                    this.tracks = this.handleTracks(data, requester);
                    this.playlistInfo = {
                        type: "noPlaylist"
                    };
                    break;
                }
                ;
            default:
                {
                    this.tracks = [];
                    this.playlistInfo = {
                        type: "noPlaylist"
                    };
                    break;
                }
                ;
        }
        ;
        this.loadType = loadType;
    }
    ;
    /**
     * This function will handle the tracks and return them as an array of Track classes
     * @param {TrackData | TrackData[]} data The raw track data
     * @param {any | undefined} requester The requester
     * @returns {Track[]} The tracks
     */
    handleTracks(data, requester) {
        if (Array.isArray(data)) {
            return data.map((track) => new Track_1.Track(track, requester));
        }
        ;
        return [new Track_1.Track(data, requester)];
    }
    ;
}
exports.Response = Response;
;
//# sourceMappingURL=Response.js.map