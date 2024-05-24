import type { PlayerState } from "@t/player";
import type { VoiceServer } from "@t/player/connection";
import type { FiltersOptions } from "@t/player/filters";
import type { TrackData } from "@t/track";

export type NodeLinkV2LoadTypes = "short" | "album" | "artist" | "show" | "episode" | "station" | "podcast";
export type LavaLinkLoadTypes = "track" | "playlist" | "search" | "empty" | "error"
export type Severity = "common" | "suspicious" | "fault"

export interface TrackLoadingResultException {
    loadType: "error",
    data: {
        /**
         * The message of the exception
         */
        message?: string;

        /**
         * The severity of the exception
         */
        severity: Severity;

        /**
         * The cause of the exception
         */
        cause: string;

    }
};

export interface TrackLoadResultEmpty {
    loadType: "empty";
    data: {}
};

export interface TrackLoadResultSearch {
    loadType: "search";
    data: TrackData[];
};

export interface TrackLoadResultPlaylist {
    loadType: "playlist";
    data: {
        /**
         * The info of the playlist
         */
        info: {
            /**
             * The name of the playlist
             */
            name: string;

            /**
             * The selected track of the playlist (-1 if no track is selected)
             */
            selectedTrack: number;
        };

        /**
         * Addition playlist info provided by plugins
         */
        pluginInfo: Record<string, unknown>;

        /**
         * The tracks of the playlist
         */
        tracks: TrackData[];
    }
};

export interface TrackLoadResultTrack {
    loadType: "track";
    data: TrackData;
};

export type LoadTrackResult = TrackLoadingResultException | TrackLoadResultEmpty | TrackLoadResultSearch | TrackLoadResultPlaylist | TrackLoadResultTrack;

export interface PlayerObjectFromAPI {
    /**
     * The guild id of the player
     */
    guildId: string;

    /**
     * The currently playing track
     */
    track?: TrackData;

    /**
     * The volume of the player, range 0-1000, in percentage
     */
    volume: number;

    /**
     * Whether the player is paused
     */
    paused: boolean;

    /**
     * The state of the player
     */
    state: PlayerState;

    /**
     * The voice state of the player
     */
    voice: VoiceServer;

    /**
     * The filters used by the player
     */
    filters: FiltersOptions;
};

/**
 * This interface represents the LavaLink V4 Error Responses
 * @reference https://lavalink.dev/api/rest.html#error-responses
 */
export interface ErrorResponses {
    /**
     * The timestamp of the error in milliseconds since the Unix epoch
     */
    timestamp: number;

    /**
     * The HTTP status code
     */
    status: number;

    /**
     * The HTTP status code message
     */
    error: string;

    /**
     * The stack trace of the error when trace=true as query param has been sent
     * @optional
     */
    trace?: string;

    /**
     * The error message
     */
    message: string;

    /**
     * The path of the request
     */
    path: string;
};

export interface UpdatePlayerInfo {
    /**
     * The guild id of the player
     */
    guildId: string;

    /**
     * The options to update the player
     */
    playerOptions: UpdatePlayerOptions;

    /**
     * Whether to replace the current track with the new track. Defaults to false
     */
    noReplace?: boolean;
};

export interface UpdatePlayerOptions {
    /**
     * Specification for a new track to load, as well as user data to set
     */
    track?: UpdatePlayerTrack;

    /**
     * The track position in milliseconds
     */
    position?: number;

    /**
     * The track end time in milliseconds (must be > 0). null resets this if it was set previously
     */
    endTime?: number;

    /**
     * The player volume, in percentage, from 0 to 1000
     */
    volume?: number;

    /**
     * Whether the player is paused
     */
    paused?: boolean;

    /**
     * The new filters to apply. This will override all previously applied filters
     */
    filters?: Partial<FiltersOptions>;

    /**
     * Information required for connecting to Discord
     */
    voice?: Required<VoiceServer>;
};

export interface UpdatePlayerTrack {
    /**
     * The base64 encoded track to play. null stops the current track
     */
    encoded?: string | null;

    /**
     * The identifier of the track to play
     */
    identifier?: string;

    /**
     * Additional track data to be sent back in the Track Object
     */
    userData?: Record<string, unknown>;
};

export interface IPBlockType {
    /**
     * The type of the ip block
     */
    type: "Inet4Address" | "Inet6Address";
    
    /**
     * The size of the ip block
     */
    size: string;
};

export interface FailingAddresses {
    /**
     * The failing address
     */
    failingAddress: string;

    /**
     * The timestamp when the address failed
     */
    failingTimestamp: number;

    /**
     * The timestamp when the address failed as a pretty string
     */
    failingTime: string;
}

export interface RoutePlannerStatusBase {
    /**
     * The ip block being used
     */
    ipBlock: IPBlockType;

    /**
     * The failing addresses
     */
    failingAddresses: FailingAddresses[];
};

export interface RoutePlannerStatusBIRP {
    /**
     * The name of the RoutePlanner implementation being used by this server
     */
    class: "BalancingIpRoutePlanner";

    /**
     * The status details of the RoutePlanner
     */
    details: RoutePlannerStatusBase;
}

export interface RoutePlannerStatusRIRP {
    /**
     * The name of the RoutePlanner implementation being used by this server
     */
    class: "RotatingIpRoutePlanner";
    
    /**
     * The status details of the RoutePlanner
     */
    details: {
        /**
         * The number of rotations
         */
        rotateIndex: string;
        
        /**
         * The current offset in the block
         */
        ipIndex: string;

        /**
         * The current address being used
         */
        currentAddress: string;
    } & RoutePlannerStatusBase;
};

export interface RoutePlannerStatusNIRP {
    /**
     * The name of the RoutePlanner implementation being used by this server
     */
    class: "NanoIpRoutePlanner"
    
    /**
     * The status details of the RoutePlanner
     */
    details: {
        /**
         * The current offset in the ip block
         */
        currentAddressIndex: string;
    } & RoutePlannerStatusBase;
};

export interface RoutePlannerStatusRNIP {
    /**
     * The name of the RoutePlanner implementation being used by this server
     */
    class: "RotatingNanoIpRoutePlanner"
    
    /**
     * The status details of the RoutePlanner
     */
    details: {
        /**
         * The current offset in the ip block
         */
        currentAddressIndex: string;

        /**
         * The information in which /64 block ips are chosen. This number increases on each ban.
         */
        blockIndex: string;
    } & RoutePlannerStatusBase;
};

export type RoutePlannerStatusDisabled = Omit<RoutePlannerStatusNIRP, "class" | "details">
export type RoutePlannerStatus = RoutePlannerStatusNIRP | RoutePlannerStatusRIRP | RoutePlannerStatusRNIP | RoutePlannerStatusDisabled;