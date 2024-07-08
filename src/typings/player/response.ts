/**
 * The response of the player API
 * 
 * @docs https://lavalink.dev/api/rest#playlist-info
 */
export interface PlaylistInfoFound {
    /**
     * The type of the playlist. This is used to identify the type of the playlist
     */
    type: "playlist";
    
    /**
     * The name of the playlist
     */
    name: string;

    /**
     * 	The selected track of the playlist (-1 if no track is selected)
     */
    selectedTrack: number;
};

export interface NoPlaylistInfo {
    /**
     * The type of the playlist. This is used to identify the type of the playlist
     */
    type: "noPlaylist";   
};

export type PlaylistInfo = NoPlaylistInfo | PlaylistInfoFound;
