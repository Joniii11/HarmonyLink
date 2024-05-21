import type { Packet } from "@t/librarys";

/**
 * Abstract class for library classes
 * @abstract
 * 
 * @note This class is not meant to be instantiated, but to be extended by other classes.
 * @note We currenty only support OceanicJs and Discord.js, however if you want to add support for other libraries, you can extend this class and implement the methods.
 */
export default abstract class AbstractLibraryClass {
    protected readonly client: any;

    constructor(client: any) {
        this.client = client;
    }
    
    /**
     * Get the user ID of the bot
     * 
     * @abstract getter method for the user ID of the bot
     */
    abstract get userID(): string;

    abstract listen(): void;

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