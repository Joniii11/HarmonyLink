/* eslint-disable class-methods-use-this */

// Types
import { HarmonyLink } from "@/HarmonyLink";
import { TrackData, TrackDataInfo } from "@t/track";

export class Track {
    public track: string;
    public info: (TrackDataInfo & { requester?: any });
    public pluginInfo: Record<string, unknown>;
    public userData: Record<string, unknown>;

    /**
     * Constructor
     * @param data 
     * @param requester 
     */
    public constructor(data: TrackData, requester?: any) {
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
    };

    /**
     * This function will resolve the track and return the track as resolved
     * @param {HarmonyLink} manager The HarmonyLink instance
     * @returns {Promise<Track | null>} The resolved track
     */
    public async resolve(manager: HarmonyLink): Promise<Track> {
        const query = [this.info.author, this.info.title].filter((x) => Boolean(x)).join(" - ");

        const result = await manager.resolve({ query, requester: this.info.requester });

        if (this.info.author) {
            const author = [this.info.author, `${this.info.author} - Topic`];
            const officialAudio = result.tracks.find(
                (track) =>
                    author.some((name) => new RegExp(`^${this.escapeRegExp(name)}$`, "i").test(track.info.author)) ||
                    new RegExp(`^${this.escapeRegExp(this.info.title)}$`, "i").test(track.info.title)
            );

            if (officialAudio) {
                this.track = officialAudio.track;
                return this;
            };
        };

        if (this.info.length) {
            const sameDuration = result.tracks.find(
                (track) =>
                    track.info.length >= (this.info.length ? this.info.length : 0) - 2000 &&
                    track.info.length <= (this.info.length ? this.info.length : 0) + 2000
            );

            if (sameDuration) {
                this.track = sameDuration.track;
                return this;
            };
        };
        
        this.info.identifier = result.tracks[0].info.identifier;
        this.track = result.tracks[0].track;
        return this;
    };

    private escapeRegExp(str: string): string {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    };
}