"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Track = void 0;
class Track {
    track;
    info;
    pluginInfo;
    userData;
    /**
     * Constructor
     * @param data
     * @param requester
     */
    constructor(data, requester) {
        this.track = data.encoded;
        this.pluginInfo = data.pluginInfo;
        this.userData = data.userData;
        this.info = {
            ...data.info,
            uri: data.info.uri ?? null,
            artworkUrl: data.info.artworkUrl ?? null,
            isrc: data.info.isrc ?? null,
            requester
        };
    }
    ;
}
exports.Track = Track;
//# sourceMappingURL=Track.js.map