"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
const constants_1 = require("@/constants");
const node_1 = require("@/typings/node");
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
        return await this.node.driver.request(options) ?? [];
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
        return await this.node.driver.request(options) ?? null;
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
     */
    async loadTrack(identifier) {
        const options = {
            method: "GET",
            path: `/loadtracks`,
            params: { identifier }
        };
        return await this.node.driver.request(options) ?? { loadType: "empty", data: {} };
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
        return await this.node.driver.request(options) ?? null;
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
        return await this.node.driver.request(options) ?? [];
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
        if (this.node.driver.type === node_1.NodeType.NodeLink)
            return {
                timestamp: Date.now(),
                status: 404,
                error: "Not found.",
                message: "The specified node is a NodeLink. NodeLink's do not have the routeplanner feature.",
                path: "/v4/routeplanner/free/address",
                trace: new Error().stack
            };
        const options = {
            method: "POST",
            path: "/routeplanner/free/address",
            data: { address }
        };
        await this.node.driver.request(options);
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
        if (this.node.driver.type === node_1.NodeType.NodeLink)
            return {
                timestamp: Date.now(),
                status: 404,
                error: "Not found.",
                message: "The specified node is a NodeLink. NodeLink's do not have the routeplanner feature.",
                path: "/v4/routeplanner/free/all",
                trace: new Error().stack
            };
        const options = {
            method: "POST",
            path: "/routeplanner/free/all",
        };
        await this.node.driver.request(options);
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
        if (this.node.driver.type === node_1.NodeType.NodeLink)
            return {
                timestamp: Date.now(),
                status: 404,
                error: "Not found.",
                message: "The specified node is a NodeLink. NodeLink's do not have the routeplanner feature.",
                path: "/v4/routeplanner/status",
                trace: new Error().stack
            };
        const options = {
            method: "GET",
            path: "/routeplanner/status"
        };
        return await this.node.driver.request(options) ?? {};
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
        if (this.node.driver.type === node_1.NodeType.FrequenC) {
            return {
                version: {
                    major: result?.version.major ?? 0,
                    minor: result?.version.minor ?? 0,
                    patch: result?.version.patch ?? 0,
                    semver: "0.0.0"
                },
                jvm: "GNU Libgcj 7.3.0",
                lavaplayer: `${(result?.version.major ?? 0)}.${(result?.version.minor ?? 0)}.${(result?.version.patch ?? 0)}`,
                sourceManagers: result.source_managers || [],
                filters: result.filters || [],
                plugins: [],
                git: {
                    commit: result?.git.commit ?? "Unknown",
                    branch: result?.git.branch ?? "main",
                    commitTime: 0
                },
                buildTime: 0
            };
        }
        ;
        return result;
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
        return await this.node.driver.request(options) ?? "Unknown";
    }
    ;
    async getStats() {
        const options = {
            method: "GET",
            path: "/stats",
        };
        return await this.node.driver.request(options) ?? (0, constants_1.getDefaultNodeStats)();
    }
    ;
}
exports.default = Rest;
;
//# sourceMappingURL=Rest.js.map