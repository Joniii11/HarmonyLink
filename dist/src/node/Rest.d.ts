import NodeManager from "../managers/NodeManager";
import { HarmonyLink } from "../HarmonyLink";
import { Node } from "./Node";
import { ErrorResponses, LoadTrackResult, PlayerObjectFromAPI, RoutePlannerStatus, UpdatePlayerInfo } from "../typings/node/rest";
import { NodeInfo, NodeStats } from "../typings/node";
import { TrackData } from "../typings/track";
export default class Rest {
    manager: HarmonyLink;
    node: Node;
    protected nodeManager: NodeManager;
    protected sessionId: string | null;
    constructor(manager: HarmonyLink, node: Node);
    get isReady(): boolean;
    /**
     * Set the session id
     * @param sessionId The session id to set
     */
    setSessionId(sessionId: string): void;
    /**
     * Get all the players on the node
     * @returns {PlayerObjectFromAPI[] | ErrorResponses} The players on the node
     *
     * @docs https://lavalink.dev/api/rest.html#get-players
     */
    getAllPlayers(): Promise<PlayerObjectFromAPI[]>;
    /**
     * Get a player by the guild id
     * @param {string} guildId The guild id to get the player from
     * @returns {PlayerObjectFromAPI | ErrorResponses} The player object
     *
     * @example
     * ```ts
     * <Node>.rest.getPlayer("1234567890");
     * ```
     *
     * @docs https://lavalink.dev/api/rest.html#get-player
     */
    getPlayer(guildId: string): Promise<PlayerObjectFromAPI | null>;
    /**
     * Destroy a player by the guild id
     * @param {UpdatePlayerInfo} data The guild id to destroy the player from
     * @returns {PlayerObjectFromAPI} The player object
     *
     * @example
     * ```ts
     * <Node>.rest.updatePlayer({ guildId: "1234567890", noReplace: true, playerOptions: { volume: 100 } });
     * ```
     *
     * @docs https://lavalink.dev/api/rest.html#update-player
     */
    updatePlayer(data: UpdatePlayerInfo): Promise<PlayerObjectFromAPI | undefined>;
    /**
     * Destroy a player by the guild id
     * @param {string} guildId The guild id to destroy the player from
     * @returns {undefined} 204 - No Content
     */
    destroyPlayer(guildId: string): Promise<undefined>;
    /**
     * Load a track by the identifier
     * @param identifier The identifier of the track to load
     * @returns {LoadTrackResult} The result of the track
     *
     * @docs https://lavalink.dev/api/rest.html#track-loading
     */
    loadTrack(identifier: string): Promise<LoadTrackResult>;
    /**
     * Decode a track from the base64 encoded track
     * @param {string} encodedBase64Track The base64 encoded track to decode
     * @returns {TrackData | null} The decoded track
     *
     * @docs https://lavalink.dev/api/rest.html#track-decoding
     */
    decodeTrack(encodedBase64Track: string): Promise<TrackData | null>;
    /**
     * Decode multiple tracks from the base64 encoded tracks
     * @param {string[]} encodedBase64Tracks The base64 encoded tracks to decode
     * @returns {TrackData[]} The decoded tracks
     *
     * @docs https://lavalink.dev/api/rest.html#track-decoding
     */
    decodeTracks(encodedBase64Tracks: string[]): Promise<TrackData[]>;
    /**
     * Unmark a failed address
     * @param {string} address The address to unmark as failed. This address must be in the same ip block.
     * @returns {void} 204 - No Content
     *
     * @example
     * ```ts
     * await <Node>.rest.unmarkFailedAddress("1.0.0.1");
     * ```
     *
     * @docs https://lavalink.dev/api/rest.html#unmark-a-failed-address
     */
    unmarkFailedAddress(address: string): Promise<ErrorResponses | void>;
    /**
     * Unmark all failed addresses
     * @returns {void} 204 - No Content
     *
     * @example
     * ```ts
     * await <Node>.rest.unmarkAllFailedAddresses();
     * ```
     *
     * @docs https://lavalink.dev/api/rest.html#unmark-all-failed-address
     */
    unmarkAllFailedAddresses(): Promise<ErrorResponses | void>;
    /**
     *
     * @returns {RoutePlannerStatus} The status of the routeplanner
     *
     * @example
     * ```ts
     * await <Node>.rest.getRoutePlannerStatus();
     * ```
     *
     * @docs https://lavalink.dev/api/rest.html#get-routeplanner-status
     */
    getRoutePlannerStatus(): Promise<RoutePlannerStatus>;
    /**
     * Get the node information
     * @returns {NodeInfo} The information of the node
     *
     * @docs https://lavalink.dev/api/rest.html#get-lavalink-info
     */
    getInfo(): Promise<NodeInfo | undefined>;
    /**
     * Get the version of the node
     * @returns {string} The version of the node
     *
     * @docs https://lavalink.dev/api/rest.html#get-lavalink-version
     */
    getVersion(): Promise<string>;
    getStats(): Promise<NodeStats>;
}
