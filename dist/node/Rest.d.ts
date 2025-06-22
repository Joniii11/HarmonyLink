import NodeManager from "../managers/NodeManager";
import { HarmonyLink } from "../HarmonyLink";
import { Node } from "./Node";
import { ErrorResponses, LoadTrackResult, PlayerObjectFromAPI, RoutePlannerStatus, UpdatePlayerInfo } from "../typings/node/rest";
import { NodeInfo, NodeStats } from "../typings/node";
import { TrackData } from "../typings/track";
import { Result } from "neverthrow";
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
    getAllPlayers(): Promise<Result<PlayerObjectFromAPI[], Error>>;
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
    getPlayer(guildId: string): Promise<Result<PlayerObjectFromAPI | null, Error>>;
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
    updatePlayer(data: UpdatePlayerInfo): Promise<Result<PlayerObjectFromAPI | undefined, Error>>;
    /**
     * Destroy a player by the guild id
     * @param {string} guildId The guild id to destroy the player from
     * @returns {undefined} 204 - No Content
     */
    destroyPlayer(guildId: string): Promise<Result<undefined, Error>>;
    /**
     * Load a track by the identifier
     * @param identifier The identifier of the track to load
     * @returns {LoadTrackResult} The result of the track
     *
     * @docs https://lavalink.dev/api/rest.html#track-loading
     */ loadTrack(identifier: string, source?: string): Promise<Result<LoadTrackResult | undefined, Error>>;
    /**
     * Decode a track from the base64 encoded track
     * @param {string} encodedBase64Track The base64 encoded track to decode
     * @returns {TrackData | null} The decoded track
     *
     * @docs https://lavalink.dev/api/rest.html#track-decoding
     */
    decodeTrack(encodedBase64Track: string): Promise<Result<TrackData | null, Error>>;
    /**
     * Decode multiple tracks from the base64 encoded tracks
     * @param {string[]} encodedBase64Tracks The base64 encoded tracks to decode
     * @returns {TrackData[]} The decoded tracks
     *
     * @docs https://lavalink.dev/api/rest.html#track-decoding
     */
    decodeTracks(encodedBase64Tracks: string[]): Promise<Result<TrackData[], Error>>;
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
    unmarkFailedAddress(address: string): Promise<Result<undefined, Error | ErrorResponses>>;
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
    unmarkAllFailedAddresses(): Promise<Result<undefined, Error | ErrorResponses>>;
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
    getRoutePlannerStatus(): Promise<Result<RoutePlannerStatus, ErrorResponses | Error>>;
    /**
     * Get the node information
     * @returns {NodeInfo} The information of the node
     *
     * @docs https://lavalink.dev/api/rest.html#get-lavalink-info
     */
    getInfo(): Promise<Result<NodeInfo, Error>>;
    /**
     * Get the version of the node
     * @returns {string} The version of the node
     *
     * @docs https://lavalink.dev/api/rest.html#get-lavalink-version
     */
    getVersion(): Promise<Result<string, Error>>;
    /**
     * Get the stats of the node
     * @returns {NodeStats} The stats of the node
     *
     * @docs https://lavalink.dev/api/rest.html#get-lavalink-stats ||
     */
    getStats(): Promise<Result<NodeStats, Error>>;
    /**
     * Check if a string starts with any of the words
     * @param {string} s The string to check
     * @param {Array<string>} words The words to check if the string starts with
     * @returns {boolean} If the string starts with any of the words
     *
     * @example
     * ```ts
     * this.startsWithMultiple("Hello World", ["Hello", "Hi", "Hey"]); // Returns true
     * ```
     */
    private startsWithMultiple;
}
