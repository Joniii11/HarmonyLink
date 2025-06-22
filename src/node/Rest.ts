/* eslint-disable @typescript-eslint/no-invalid-void-type, @typescript-eslint/no-unnecessary-condition, class-methods-use-this */

// Constants
import { getDefaultNodeStats } from "@/constants";

// Types
import NodeManager from "@/managers/NodeManager";
import { HarmonyLink } from "@/HarmonyLink";
import { Node } from "./Node";
import { ErrorResponses, LoadTrackResult, PlayerObjectFromAPI, RoutePlannerStatus, UpdatePlayerInfo } from "@t/node/rest";
import { FrequenCInfo, HarmonyLinkRequesterOptions, NodeInfo, NodeStats, NodeType } from "@t/node";
import { TrackData } from "@t/track";
import { err, ok, Result } from "neverthrow";

export default class Rest {
    public manager: HarmonyLink;
    public node: Node

    protected nodeManager: NodeManager;
    protected sessionId: string | null = null;

    public constructor(manager: HarmonyLink, node: Node) {
        this.manager = manager;
        this.node = node;
        this.nodeManager = this.manager.nodeManager;
    };

    public get isReady(): boolean {
        return this.sessionId !== null;
    };

    // ? ----- Session API Begin ----- ?//

    /**
     * Set the session id
     * @param sessionId The session id to set
     */
    public setSessionId(sessionId: string): void {
        this.sessionId = sessionId;
    };

    // ? ----- Session API End ----- ?//

    // ? ----- Player API Begin ----- ?//

    /**
     * Get all the players on the node
     * @returns {PlayerObjectFromAPI[] | ErrorResponses} The players on the node
     * 
     * @docs https://lavalink.dev/api/rest.html#get-players
     */    
    public async getAllPlayers(): Promise<Result<PlayerObjectFromAPI[], Error>> {
        const options: HarmonyLinkRequesterOptions = {
            method: "GET",
            path: `/sessions/${this.sessionId}/players`
        };

        const result = await this.node.driver.request<PlayerObjectFromAPI[]>(options);

        return result.match(
            (players) => ok(players ?? []),
            (error) => err(error instanceof Error ? error : new Error(String(error)))
        );
    };

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
    public async getPlayer(guildId: string): Promise<Result<PlayerObjectFromAPI | null, Error>> {
        const options: HarmonyLinkRequesterOptions = {
            method: "GET",
            path: `/sessions/${this.sessionId}/players/${guildId}`
        };

        const result = await this.node.driver.request<PlayerObjectFromAPI | null>(options);

        return result.match(
            (player) => ok(player ?? null),
            (error) => err(error instanceof Error ? error : new Error(String(error)))
        );
    };

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
    public async updatePlayer(data: UpdatePlayerInfo): Promise<Result<PlayerObjectFromAPI | undefined, Error>> {
        const options: HarmonyLinkRequesterOptions = {
            method: "PATCH",
            path: `/sessions/${this.sessionId}/players/${data.guildId}`,
            data: data.playerOptions as Record<string, unknown>,
            params: { noReplace: data.noReplace?.toString() ?? "false" },
        };

        return this.node.driver.request<PlayerObjectFromAPI>(options)
    };

    /**
     * Destroy a player by the guild id
     * @param {string} guildId The guild id to destroy the player from
     * @returns {undefined} 204 - No Content
     */
    public async destroyPlayer(guildId: string): Promise<Result<undefined, Error>> {
        const options: HarmonyLinkRequesterOptions = {
            method: "DELETE",
            path: `/sessions/${this.sessionId}/players/${guildId}`,
        };

        return this.node.driver.request<undefined>(options);
    };

    // ? ----- Player API End ----- ?//

    // ? ----- Track API Begin ----- ?//

    /**
     * Load a track by the identifier
     * @param identifier The identifier of the track to load
     * @returns {LoadTrackResult} The result of the track
     * 
     * @docs https://lavalink.dev/api/rest.html#track-loading
     */    public async loadTrack(identifier: string, source?: string): Promise<Result<LoadTrackResult | undefined, Error>> {
        const options: HarmonyLinkRequesterOptions = {
            method: "GET",
            path: `/loadtracks?identifier=${encodeURIComponent((this.startsWithMultiple(identifier, ["https://", "http://"]) ? '' : `${source ?? this.manager.options.defaultPlatform ?? 'ytsearch'}:`) + identifier)}`,
        };

        const result = await this.node.driver.request<LoadTrackResult>(options);
        
        return result.map((data) => data ?? { loadType: "empty", data: {} });
    };

    /**
     * Decode a track from the base64 encoded track
     * @param {string} encodedBase64Track The base64 encoded track to decode
     * @returns {TrackData | null} The decoded track
     * 
     * @docs https://lavalink.dev/api/rest.html#track-decoding
     */
    public async decodeTrack(encodedBase64Track: string): Promise<Result<TrackData | null, Error>>  {
        const options: HarmonyLinkRequesterOptions = {
            method: "GET",
            path: "/decodetrack",
            params: { encodedTrack: encodedBase64Track }
        };

        const result = await this.node.driver.request<TrackData | null>(options);

        return result.match(
            (track) => ok(track ?? null),
            (error) => err(error instanceof Error ? error : new Error(String(error)))
        );
    };

    /**
     * Decode multiple tracks from the base64 encoded tracks
     * @param {string[]} encodedBase64Tracks The base64 encoded tracks to decode
     * @returns {TrackData[]} The decoded tracks
     * 
     * @docs https://lavalink.dev/api/rest.html#track-decoding
     */
    public async decodeTracks(encodedBase64Tracks: string[]): Promise<Result<TrackData[], Error>> {
        const options: HarmonyLinkRequesterOptions = {
            method: "POST",
            path: "/decodetracks",
            data: encodedBase64Tracks
        };

        const result = await this.node.driver.request<TrackData[]>(options);

        return result.match(
            (tracks) => ok(tracks ?? []),
            (error) => err(error instanceof Error ? error : new Error(String(error)))
        );
    };

    // ? ----- Track API End ----- ?//

    // ? ----- Route Planer Begin ----- ?//

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
    public async unmarkFailedAddress(address: string): Promise<Result<undefined, Error | ErrorResponses>> {
        if ([NodeType.NodeLink, NodeType.FrequenC].includes(this.node.driver.type)) return err({
            timestamp: Date.now(),
            status: 404,
            error: "Not found.",
            message: `The specified node is a ${this.node.driver.type === NodeType.NodeLink ? "NodeLink. NodeLink's" : "FrequenC Node. FrequenC Nodes"} do not have the routeplanner feature.`,
            path: "/v4/routeplanner/free/address",
            trace: new Error().stack
        } satisfies ErrorResponses);

        const options: HarmonyLinkRequesterOptions = {
            method: "POST",
            path: "/routeplanner/free/address",
            data: { address }
        }

        return await this.node.driver.request<undefined>(options)
    };

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
    public async unmarkAllFailedAddresses(): Promise<Result<undefined, Error | ErrorResponses>> {
        if ([NodeType.NodeLink, NodeType.FrequenC].includes(this.node.driver.type)) return err({
            timestamp: Date.now(),
            status: 404,
            error: "Not found.",
            message: `The specified node is a ${this.node.driver.type === NodeType.NodeLink ? "NodeLink. NodeLink's" : "FrequenC Node. FrequenC Nodes"} do not have the routeplanner feature.`,
            path: "/v4/routeplanner/free/all",
            trace: new Error().stack
        } satisfies ErrorResponses);

        const options: HarmonyLinkRequesterOptions = {
            method: "POST",
            path: "/routeplanner/free/all",
        };

        return await this.node.driver.request<undefined>(options);
    };

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
    public async getRoutePlannerStatus(): Promise<Result<RoutePlannerStatus, ErrorResponses | Error>> {
        if ([NodeType.NodeLink, NodeType.FrequenC].includes(this.node.driver.type)) return err({
            timestamp: Date.now(),
            status: 404,
            error: "Not found.",
            message: `The specified node is a ${this.node.driver.type === NodeType.NodeLink ? "NodeLink. NodeLink's" : "FrequenC Node. FrequenC Nodes"} do not have the routeplanner feature.`,
            path: "/v4/routeplanner/status",
            trace: new Error().stack
        } satisfies ErrorResponses);

        const options: HarmonyLinkRequesterOptions = {
            method: "GET",
            path: "/routeplanner/status"
        };

        const result = await this.node.driver.request<RoutePlannerStatus>(options);

        return result.match(
            (status) => ok(status ?? {}),
            (error) => err(error instanceof Error ? error : new Error(String(error)))
        )
    };

    // ? ----- Route Planer End ----- ?//

    // ? ----- Node Begin ----- ?//

    /**
     * Get the node information
     * @returns {NodeInfo} The information of the node
     * 
     * @docs https://lavalink.dev/api/rest.html#get-lavalink-info
     */
    public async getInfo(): Promise<Result<NodeInfo, Error>> {
        const options: HarmonyLinkRequesterOptions = {
            method: "GET",
            path: "/info"
        };

        const result = await this.node.driver.request<FrequenCInfo | NodeInfo>(options);

        if (result.isErr()) return err(result.error)

        if (this.node.driver.type === NodeType.FrequenC) {
            return ok({
                version: {
                    major: result.value?.version.major ?? 0,
                    minor: result.value?.version.minor ?? 0,
                    patch: result.value?.version.patch ?? 0,
                    semver: "0.0.0"
                },
                jvm: "GNU Libgcj 7.3.0",
                lavaplayer: `${(result.value?.version.major ?? 0)}.${(result.value?.version.minor ?? 0)}.${(result.value?.version.patch ?? 0)}`,
                sourceManagers: (result.value as FrequenCInfo).source_managers || [],
                filters: (result.value as FrequenCInfo).filters || [],
                plugins: [],
                git: {
                    commit: result.value?.git.commit ?? "Unknown",
                    branch: result.value?.git.branch ?? "main",
                    commitTime: 0
                },
                buildTime: 0
            });
        };

        return ok(result.value as NodeInfo);
    };

    /**
     * Get the version of the node
     * @returns {string} The version of the node
     * 
     * @docs https://lavalink.dev/api/rest.html#get-lavalink-version
     */
    public async getVersion(): Promise<Result<string, Error>> {
        const options: HarmonyLinkRequesterOptions = {
            method: "GET",
            path: "/version",
            headers: {
                "Accept": "text/plain"
            }
        };

        const result = await this.node.driver.request<string>(options);

        return result.match(
            (version) => ok(version ?? "Unknown"),
            (error) => err(error instanceof Error ? error : new Error(String(error)))
        );
    };

    /**
     * Get the stats of the node
     * @returns {NodeStats} The stats of the node
     * 
     * @docs https://lavalink.dev/api/rest.html#get-lavalink-stats || 
     */
    public async getStats(): Promise<Result<NodeStats, Error>> {
        const options: HarmonyLinkRequesterOptions = {
            method: "GET",
            path: "/stats",
        };

        const result = await this.node.driver.request<NodeStats>(options);

        return result.match(
            (stats) => ok(stats ?? getDefaultNodeStats()),
            (error) => err(error instanceof Error ? error : new Error(String(error)))
        )
    };

    // ? ----- Node End ----- ?//

    // ? ----- Utils Begin ----- ?//

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
    private startsWithMultiple(s: string, words: string[]): boolean {
        return words.some( w => s.startsWith(w))
    };

    // ? ----- Utils End ----- ?//
};