import { HarmonyLink } from "@/HarmonyLink";

import type { Packet, AnyOtherPacket } from "@t/librarys";

/**
 * Abstract class for library classes
 * @abstract
 * 
 * @note This class is not meant to be instantiated, but to be extended by other classes.
 * @note We currenty only support OceanicJs and Discord.js, however if you want to add support for other libraries, you can extend this class and implement the methods.
 */
export default abstract class AbstractLibraryClass {
    protected readonly client: any;
    protected manager: HarmonyLink | null = null;

    constructor(client: any) {
        this.client = client;
    }
    
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
    abstract listen(): void;

    /**
     * Initialize the library class
     * @param {HarmonyLink} manager The HarmonyLink instance
     * 
     * @returns the instance of the class
     */
    public initialize(manager: HarmonyLink): AbstractLibraryClass {
        this.manager = manager
        return this;
    };

    /**
     * Handle raw packets from the gateway
     * @param {Packet} incomingData The packet to handle
     * 
     * @abstract method to handle raw packets from the gateway
     */
    protected raw(incomingData: Packet) {
        const { t, d } = incomingData;

        switch (t) {
            case "VOICE_STATE_UPDATE": {
                break;
            };

            case "VOICE_SERVER_UPDATE": {
                break;
            };

            default: break;
        };
    };
};