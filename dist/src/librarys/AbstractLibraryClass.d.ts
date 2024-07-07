import { HarmonyLink } from "@/HarmonyLink";
import { NodeGroup } from "@t/node";
import { Packet, AnyOtherPacket } from "@t/librarys";
/**
 * Abstract class for library classes
 * @abstract
 *
 * @note This class is not meant to be instantiated, but to be extended by other classes.
 * @note We currenty only support OceanicJs and Discord.js, however if you want to add support for other libraries, you can extend this class and implement the methods.
 */
export default abstract class AbstractLibraryClass {
    protected readonly client: any;
    protected manager: HarmonyLink | null;
    constructor(client: any);
    /**
     * Initialize the library class
     * @param {HarmonyLink} manager The HarmonyLink instance
     *
     * @returns the instance of the class
     */
    initialize(manager: HarmonyLink): this;
    /**
     * Handle raw packets from the gateway
     * @param {Packet} incomingData The packet to handle
     *
     * @abstract method to handle raw packets from the gateway
     */
    protected raw(incomingData: Packet): this;
    protected ready(nodes: NodeGroup[]): Promise<void>;
    /**
     * Get the user ID of the bot
     *
     * @abstract getter method for the user ID of the bot
     */
    abstract get userID(): string;
    /**
     * Send raw packets to the gateway to communicate with the Discord API
     * @param {number} shardId The shard ID to send the packet with
     * @param {AnyOtherPacket} payload The payload to send
     * @param {boolean} important Whether the packet is important or not (default: false)
     *
     * @abstract method to send packets to the gateway
     */
    abstract sendPacket(shardId: number, payload: AnyOtherPacket, important: boolean): void;
    /**
     * Listen for events from the discord gateway that are arriving on the library
     *
     * @abstract method to listen for events from the discord gateway that are arriving on the library
     */
    abstract listen(nodes: NodeGroup[]): void;
}
