import type NodeManager from "@/managers/NodeManager";
import type { HarmonyLink } from "@/HarmonyLink";
import type { Node } from "./Node";
import type { ErrorResponses, PlayerObjectFromAPI, RoutePlannerStatus } from "@/typings/node/rest";
import { HarmonyLinkRequesterOptions, NodeType } from "@/typings/node";

export default class Rest {
    public manager: HarmonyLink;
    public node: Node

    protected nodeManager: NodeManager;
    protected sessionId: string | null = null;

    constructor(manager: HarmonyLink, node: Node) {
        this.manager = manager;
        this.node = node;
        this.nodeManager = this.manager.nodeManager;
    };

    public get isReady(): boolean {
        return this.sessionId !== null;
    };

    public setSessionId(sessionId: string): void {
        this.sessionId = sessionId;
    };

    public async getAllPlayers(): Promise<PlayerObjectFromAPI[] | ErrorResponses> {
        const options: HarmonyLinkRequesterOptions = {
            method: "GET",
            path: `/sessions/${this.sessionId}/players`
        };
        
        return await this.node.driver.request<PlayerObjectFromAPI[] | ErrorResponses | null>(options) ?? [];
    };

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
    public async unmarkFailedAddress(address: string): Promise<void | ErrorResponses> {
        if (this.node.driver.type === NodeType.NodeLink) return {
            timestamp: Date.now(),
            status: 404,
            error: "Not found.",
            message: "The specified node is a NodeLink. NodeLink's do not have the routeplanner feature.",
            path: "/v4/routeplanner/free/address",
            trace: new Error().stack
        } satisfies ErrorResponses;

        const options: HarmonyLinkRequesterOptions = {
            method: "POST",
            path: "/routeplanner/free/address",
            body: JSON.stringify({ address })
        }

        await this.node.driver.request<undefined>(options)
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
    public async unmarkAllFailedAddresses(): Promise<void | ErrorResponses> {
        if (this.node.driver.type === NodeType.NodeLink) return {
            timestamp: Date.now(),
            status: 404,
            error: "Not found.",
            message: "The specified node is a NodeLink. NodeLink's do not have the routeplanner feature.",
            path: "/v4/routeplanner/free/all",
            trace: new Error().stack
        } satisfies ErrorResponses;

        const options: HarmonyLinkRequesterOptions = {
            method: "POST",
            path: "/routeplanner/free/all",
        };

        await this.node.driver.request<undefined>(options);
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
    public async getRoutePlannerStatus(): Promise<RoutePlannerStatus> {
        if (this.node.driver.type === NodeType.NodeLink) return {
            timestamp: Date.now(),
            status: 404,
            error: "Not found.",
            message: "The specified node is a NodeLink. NodeLink's do not have the routeplanner feature.",
            path: "/v4/routeplanner/status",
            trace: new Error().stack
        } satisfies ErrorResponses;

        const options: HarmonyLinkRequesterOptions = {
            method: "GET",
            path: "/routeplanner/status"
        };

        return await this.node.driver.request<RoutePlannerStatus>(options) ?? {};
    };
};