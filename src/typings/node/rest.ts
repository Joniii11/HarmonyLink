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