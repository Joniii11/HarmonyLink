import { ConnectionOptions, SetStateUpdate, VoiceServer } from "../typings/player/connection";
import { Player } from "./Player";
export declare class ConnectionHandler {
    readonly player: Player;
    options: ConnectionOptions;
    constructor(player: Player);
    /**
     * Updates the voice server of the player.
     * @param {VoiceServer} data The incoming data from the voice server from discord.
     */
    setServersUpdate(data: VoiceServer): Promise<void>;
    /**
     * Updates the state of the player.
     * @param {SetStateUpdate} data The incoming data from the voice server from discord.
     */
    setStateUpdate(data: SetStateUpdate): void;
}
