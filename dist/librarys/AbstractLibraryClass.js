"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Abstract class for library classes
 * @abstract
 *
 * @note This class is not meant to be instantiated, but to be extended by other classes.
 * @note We currenty only support OceanicJs and Discord.js, however if you want to add support for other libraries, you can extend this class and implement the methods.
 */
class AbstractLibraryClass {
    client;
    manager = null;
    constructor(client) {
        this.client = client;
    }
    /**
     * Initialize the library class
     * @param {HarmonyLink} manager The HarmonyLink instance
     *
     * @returns the instance of the class
     */
    initialize(manager) {
        this.manager = manager;
        return this;
    }
    ;
    /**
     * Handle raw packets from the gateway
     * @param {Packet} incomingData The packet to handle
     */
    async raw(incomingData) {
        if (!this.manager)
            throw new Error("[HarmonyLink] [Library] The Manager is not initialized yet!");
        const { t, d } = incomingData;
        switch (t) {
            case "VOICE_STATE_UPDATE":
                {
                    if (!d.guild_id)
                        return this;
                    const player = this.manager.playerManager.get(d.guild_id);
                    if (!player)
                        return this;
                    if (d.user_id !== this.manager.botID)
                        return this;
                    player.ConnectionHandler.setStateUpdate(d);
                    break;
                }
                ;
            case "VOICE_SERVER_UPDATE":
                {
                    if (!d.guild_id)
                        return this;
                    const player = this.manager.playerManager.get(d.guild_id);
                    if (!player)
                        return this;
                    await player.ConnectionHandler.setServersUpdate(d);
                    break;
                }
                ;
            default: break;
        }
        ;
        return this;
    }
    ;
    async ready(nodes) {
        if (!this.manager)
            throw new Error("The Manager is not initialized yet!");
        this.manager.botID = this.userID;
        this.manager.isReady = true;
        this.manager.emit("debug", "[HarmonyLink] Finished initializing the library! | Connecting to the specified nodes...");
        for (const node of nodes) {
            await this.manager.nodeManager.addNode(node);
        }
        ;
    }
    ;
}
exports.default = AbstractLibraryClass;
;
//# sourceMappingURL=AbstractLibraryClass.js.map