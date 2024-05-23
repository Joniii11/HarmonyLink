import type { PlayerState } from "../player";
import type { VoiceServer } from "../player/connection";
import { FiltersOptions } from "../player/filters";

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

export interface PlayerObjectFromAPI {
    guildId: string;
    track: TrackData;
    volume: number;
    paused: boolean;
    state: PlayerState;
    voice: VoiceServer;
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

export interface RoutePlannerStatusRIRP {
    class: "RotatingIpRoutePlanner";
    
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
    class: "NanoIpRoutePlanner"
    
    details: {
        /**
         * The current offset in the ip block
         */
        currentAddressIndex: string;
    } & RoutePlannerStatusBase;
};

export interface RoutePlannerStatusRNIP {
    class: "RotatingNanoIpRoutePlanner"
    
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