export interface TrackData {
    encoded: string;
    info: {
        title: string;
        author: string;
        length: number;
        identifier: string;
        isSeekable: boolean;
        isStream: boolean;
        uri: string | null;
        artworkUrl: string | null;
        isrc: string | null;
        sourceName: string;
        position: number;
    };
    pluginInfo: Record<string, unknown>;
}

export type NodeLinkV2LoadTypes = "short" | "album" | "artist" | "show" | "episode" | "station" | "podcast";
export type LavaLinkLoadTypes = "track" | "playlist" | "search" | "empty" | "error"
export type Severity = "common" | "suspicious" | "fault"