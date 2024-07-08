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
    protected manager: HarmonyLink | null = null;

    public constructor(client: any) {
        this.client = client;
    }

    /**
     * Initialize the library class
     * @param {HarmonyLink} manager The HarmonyLink instance
     * 
     * @returns the instance of the class
     */
    public initialize(manager: HarmonyLink): this {
        this.manager = manager
        return this;
    };

    /**
     * Handle raw packets from the gateway
     * @param {Packet} incomingData The packet to handle
     * 
     * @abstract method to handle raw packets from the gateway
     */
    protected async raw(incomingData: Packet): Promise<this> {
        const { t, d } = incomingData;

        switch (t) {
            case "VOICE_STATE_UPDATE": {
                if (!d.guild_id) return this;

                const player = this.manager?.playerManager.get(d.guild_id);
                if (!player) return this;

                if (d.user_id !== (this.manager?.botID ?? this.userID)) return this;
                
                player.ConnectionHandler.setStateUpdate(d);

                break;
            };

            case "VOICE_SERVER_UPDATE": {
                if (!d.guild_id) return this;
                
                const player = this.manager?.playerManager.get(d.guild_id);
                if (!player) return this;

                await player.ConnectionHandler.setServersUpdate(d)

                break;
            };

            default: break;
        };

        return this
    };

    protected async ready(nodes: NodeGroup[]): Promise<void> {
        if (!this.manager) throw new Error("The Manager is not initialized yet!");

        this.manager.botID = this.userID;
        this.manager.isReady = true;
        this.manager.emit("debug", "[HarmonyLink] Finished initializing the library! | Connecting to the specified nodes...");

        for (const node of nodes) {
            await this.manager.nodeManager.addNode(node);
        };
    };
    
    /**
     * Get the user ID of the bot
     * 
     * @abstract getter method for the user ID of the bot
     */
    public abstract get userID(): string;

    /**
     * Send raw packets to the gateway to communicate with the Discord API
     * @param {number} shardId The shard ID to send the packet with
     * @param {AnyOtherPacket} payload The payload to send
     * @param {boolean} important Whether the packet is important or not (default: false)
     * 
     * @abstract method to send packets to the gateway
     */
    public abstract sendPacket(shardId: number, payload: AnyOtherPacket, important: boolean): void;

    /**
     * Listen for events from the discord gateway that are arriving on the library
     * 
     * @abstract method to listen for events from the discord gateway that are arriving on the library
     */
    public abstract listen(nodes: NodeGroup[]): void;
};