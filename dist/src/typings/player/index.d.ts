import { Node } from "@/node/Node";
export interface PlayerState {
    /**
     * Unix timestamp in milliseconds
     */
    time: number;
    /**
     * The position of the track in milliseconds
     */
    position: number;
    /**
     * Whether Lavalink is connected to the voice gateway
     */
    connected: boolean;
    /**
     * The ping of the node to the Discord voice server in milliseconds (-1 if not connected)
     */
    ping: number;
}
export interface PlayerOptions {
    guildId: string;
    voiceId: string;
    textId: string;
    shardId: string;
    mute: boolean;
    deaf: boolean;
    /**
     * The node to connect to
     * @optional
     *
     */
    node?: Node;
}
export declare enum PlayerConnectionState {
    CONNECTED = 0,
    DISCONNECTED = 1,
    DESTROYED = 2
}
export declare enum VoiceConnectionState {
    CONNECTING = 0,
    NEARLY = 1,
    CONNECTED = 2,
    RECONNECTING = 3,
    DISCONNECTING = 4,
    DISCONNECTED = 5
}
