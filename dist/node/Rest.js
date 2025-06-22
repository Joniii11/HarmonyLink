"use strict";
/* eslint-disable @typescript-eslint/no-invalid-void-type, @typescript-eslint/no-unnecessary-condition, class-methods-use-this */
Object.defineProperty(exports, "__esModule", { value: true });
// Constants
const constants_1 = require("../constants");
const node_1 = require("../typings/node");
const neverthrow_1 = require("neverthrow");
class Rest {
    manager;
    node;
    nodeManager;
    sessionId = null;
    constructor(manager, node) {
        this.manager = manager;
        this.node = node;
        this.nodeManager = this.manager.nodeManager;
    }
    ;
    get isReady() {
        return this.sessionId !== null;
    }
    ;
    // ? ----- Session API Begin ----- ?//
    /**
     * Set the session id
     * @param sessionId The session id to set
     */
    setSessionId(sessionId) {
        this.sessionId = sessionId;
    }
    ;
    // ? ----- Session API End ----- ?//
    // ? ----- Player API Begin ----- ?//
    /**
     * Get all the players on the node
     * @returns {PlayerObjectFromAPI[] | ErrorResponses} The players on the node
     *
     * @docs https://lavalink.dev/api/rest.html#get-players
     */
    async getAllPlayers() {
        const options = {
            method: "GET",
            path: `/sessions/${this.sessionId}/players`
        };
        const result = await this.node.driver.request(options);
        return result.match((players) => (0, neverthrow_1.ok)(players ?? []), (error) => (0, neverthrow_1.err)(error instanceof Error ? error : new Error(String(error))));
    }
    ;
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
    async getPlayer(guildId) {
        const options = {
            method: "GET",
            path: `/sessions/${this.sessionId}/players/${guildId}`
        };
        const result = await this.node.driver.request(options);
        return result.match((player) => (0, neverthrow_1.ok)(player ?? null), (error) => (0, neverthrow_1.err)(error instanceof Error ? error : new Error(String(error))));
    }
    ;
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
    async updatePlayer(data) {
        const options = {
            method: "PATCH",
            path: `/sessions/${this.sessionId}/players/${data.guildId}`,
            data: data.playerOptions,
            params: { noReplace: data.noReplace?.toString() ?? "false" },
        };
        return this.node.driver.request(options);
    }
    ;
    /**
     * Destroy a player by the guild id
     * @param {string} guildId The guild id to destroy the player from
     * @returns {undefined} 204 - No Content
     */
    async destroyPlayer(guildId) {
        const options = {
            method: "DELETE",
            path: `/sessions/${this.sessionId}/players/${guildId}`,
        };
        return this.node.driver.request(options);
    }
    ;
    // ? ----- Player API End ----- ?//
    // ? ----- Track API Begin ----- ?//
    /**
     * Load a track by the identifier
     * @param identifier The identifier of the track to load
     * @returns {LoadTrackResult} The result of the track
     *
     * @docs https://lavalink.dev/api/rest.html#track-loading
     */ async loadTrack(identifier, source) {
        const options = {
            method: "GET",
            path: `/loadtracks?identifier=${encodeURIComponent((this.startsWithMultiple(identifier, ["https://", "http://"]) ? '' : `${source ?? this.manager.options.defaultPlatform ?? 'ytsearch'}:`) + identifier)}`,
        };
        const result = await this.node.driver.request(options);
        return result.map((data) => data ?? { loadType: "empty", data: {} });
    }
    ;
    /**
     * Decode a track from the base64 encoded track
     * @param {string} encodedBase64Track The base64 encoded track to decode
     * @returns {TrackData | null} The decoded track
     *
     * @docs https://lavalink.dev/api/rest.html#track-decoding
     */
    async decodeTrack(encodedBase64Track) {
        const options = {
            method: "GET",
            path: "/decodetrack",
            params: { encodedTrack: encodedBase64Track }
        };
        const result = await this.node.driver.request(options);
        return result.match((track) => (0, neverthrow_1.ok)(track ?? null), (error) => (0, neverthrow_1.err)(error instanceof Error ? error : new Error(String(error))));
    }
    ;
    /**
     * Decode multiple tracks from the base64 encoded tracks
     * @param {string[]} encodedBase64Tracks The base64 encoded tracks to decode
     * @returns {TrackData[]} The decoded tracks
     *
     * @docs https://lavalink.dev/api/rest.html#track-decoding
     */
    async decodeTracks(encodedBase64Tracks) {
        const options = {
            method: "POST",
            path: "/decodetracks",
            data: encodedBase64Tracks
        };
        const result = await this.node.driver.request(options);
        return result.match((tracks) => (0, neverthrow_1.ok)(tracks ?? []), (error) => (0, neverthrow_1.err)(error instanceof Error ? error : new Error(String(error))));
    }
    ;
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
    async unmarkFailedAddress(address) {
        if ([node_1.NodeType.NodeLink, node_1.NodeType.FrequenC].includes(this.node.driver.type))
            return (0, neverthrow_1.err)({
                timestamp: Date.now(),
                status: 404,
                error: "Not found.",
                message: `The specified node is a ${this.node.driver.type === node_1.NodeType.NodeLink ? "NodeLink. NodeLink's" : "FrequenC Node. FrequenC Nodes"} do not have the routeplanner feature.`,
                path: "/v4/routeplanner/free/address",
                trace: new Error().stack
            });
        const options = {
            method: "POST",
            path: "/routeplanner/free/address",
            data: { address }
        };
        return await this.node.driver.request(options);
    }
    ;
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
    async unmarkAllFailedAddresses() {
        if ([node_1.NodeType.NodeLink, node_1.NodeType.FrequenC].includes(this.node.driver.type))
            return (0, neverthrow_1.err)({
                timestamp: Date.now(),
                status: 404,
                error: "Not found.",
                message: `The specified node is a ${this.node.driver.type === node_1.NodeType.NodeLink ? "NodeLink. NodeLink's" : "FrequenC Node. FrequenC Nodes"} do not have the routeplanner feature.`,
                path: "/v4/routeplanner/free/all",
                trace: new Error().stack
            });
        const options = {
            method: "POST",
            path: "/routeplanner/free/all",
        };
        return await this.node.driver.request(options);
    }
    ;
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
    async getRoutePlannerStatus() {
        if ([node_1.NodeType.NodeLink, node_1.NodeType.FrequenC].includes(this.node.driver.type))
            return (0, neverthrow_1.err)({
                timestamp: Date.now(),
                status: 404,
                error: "Not found.",
                message: `The specified node is a ${this.node.driver.type === node_1.NodeType.NodeLink ? "NodeLink. NodeLink's" : "FrequenC Node. FrequenC Nodes"} do not have the routeplanner feature.`,
                path: "/v4/routeplanner/status",
                trace: new Error().stack
            });
        const options = {
            method: "GET",
            path: "/routeplanner/status"
        };
        const result = await this.node.driver.request(options);
        return result.match((status) => (0, neverthrow_1.ok)(status ?? {}), (error) => (0, neverthrow_1.err)(error instanceof Error ? error : new Error(String(error))));
    }
    ;
    // ? ----- Route Planer End ----- ?//
    // ? ----- Node Begin ----- ?//
    /**
     * Get the node information
     * @returns {NodeInfo} The information of the node
     *
     * @docs https://lavalink.dev/api/rest.html#get-lavalink-info
     */
    async getInfo() {
        const options = {
            method: "GET",
            path: "/info"
        };
        const result = await this.node.driver.request(options);
        if (result.isErr())
            return (0, neverthrow_1.err)(result.error);
        if (this.node.driver.type === node_1.NodeType.FrequenC) {
            return (0, neverthrow_1.ok)({
                version: {
                    major: result.value?.version.major ?? 0,
                    minor: result.value?.version.minor ?? 0,
                    patch: result.value?.version.patch ?? 0,
                    semver: "0.0.0"
                },
                jvm: "GNU Libgcj 7.3.0",
                lavaplayer: `${(result.value?.version.major ?? 0)}.${(result.value?.version.minor ?? 0)}.${(result.value?.version.patch ?? 0)}`,
                sourceManagers: result.value.source_managers || [],
                filters: result.value.filters || [],
                plugins: [],
                git: {
                    commit: result.value?.git.commit ?? "Unknown",
                    branch: result.value?.git.branch ?? "main",
                    commitTime: 0
                },
                buildTime: 0
            });
        }
        ;
        return (0, neverthrow_1.ok)(result.value);
    }
    ;
    /**
     * Get the version of the node
     * @returns {string} The version of the node
     *
     * @docs https://lavalink.dev/api/rest.html#get-lavalink-version
     */
    async getVersion() {
        const options = {
            method: "GET",
            path: "/version",
            headers: {
                "Accept": "text/plain"
            }
        };
        const result = await this.node.driver.request(options);
        return result.match((version) => (0, neverthrow_1.ok)(version ?? "Unknown"), (error) => (0, neverthrow_1.err)(error instanceof Error ? error : new Error(String(error))));
    }
    ;
    /**
     * Get the stats of the node
     * @returns {NodeStats} The stats of the node
     *
     * @docs https://lavalink.dev/api/rest.html#get-lavalink-stats ||
     */
    async getStats() {
        const options = {
            method: "GET",
            path: "/stats",
        };
        const result = await this.node.driver.request(options);
        return result.match((stats) => (0, neverthrow_1.ok)(stats ?? (0, constants_1.getDefaultNodeStats)()), (error) => (0, neverthrow_1.err)(error instanceof Error ? error : new Error(String(error))));
    }
    ;
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
    startsWithMultiple(s, words) {
        return words.some(w => s.startsWith(w));
    }
    ;
}
exports.default = Rest;
;
//# sourceMappingURL=Rest.js.map