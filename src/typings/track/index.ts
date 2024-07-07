export interface TrackData {
    /**
     * The base64 encoded track data
     */
    encoded: string;

    /**
     * The track info
     */
    info: TrackDataInfo;

    /**
     * Additional track info provided by plugins
     */
    pluginInfo: Record<string, unknown>;

    /**
     * Additional track data provided via the Update Player endpoint
     */
    userData: Record<string, unknown>
};

export interface TrackDataInfo {
    /**
     * The track identifier
     */
    identifier: string;

    /**
     * Whether the track is seekable
     */
    isSeekable: boolean;

    /**
     * The track author
     */
    author: string;

    /**
     * The track length in milliseconds
     */
    length: number;

    /**
     * Whether the track is a stream
     */
    isStream: boolean;

    /**
     * The track position in milliseconds
     */
    position: number;

    /**
     * The track title
     */
    title: string;

    /**
     * The track URI
     */
    uri: string | null;

    /**
     * The track artwork url
     */
    artworkUrl: string | null;

    /**
     * The track [ISRC](https://en.wikipedia.org/wiki/International_Standard_Recording_Code)
     */
    isrc: string | null;

    /**
     * The track source name
     */
    sourceName: string;
}