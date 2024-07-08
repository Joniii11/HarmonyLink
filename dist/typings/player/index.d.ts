import { Node } from "../../node/Node";
import { LavalinkEventPacket, LavalinkPlayerUpdatePacket } from "../node";
import { DiscordVoiceStates } from "./connection";
export interface PlayerEvents {
    /**
     * Dispatched when the node sends an event to the player
     * @param data The data that the node sends
     * @returns {void} void
     */
    playerUpdate: (data: LavalinkPlayerUpdatePacket) => void;
    /**
     * Dispatched when the node sends an event to the player (e.g. TrackStartEvent, TrackEndEvent, TrackStuckEvent, WebSocketClosedEvent)
     * @returns {void} void
     */
    event: (data: LavalinkEventPacket) => void;
    /**
     * Dispatched when the WebSocket connection is opened
     * @returns {void} void
     */
    connectionUpdate: (state: DiscordVoiceStates) => void;
}
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
export declare enum PlayerLoop {
    NONE = "NONE",
    QUEUE = "QUEUE",
    TRACK = "TRACK"
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
export interface ResolveOptions {
    /**
     * The query to resolve
     */
    query: string;
    /**
     * The platform to resolve from
     *
     * @default manager.options.defaultPlatform || "ytsearch"
     */
    source?: string;
    /**
     * The requester of the track
     */
    requester?: any;
}
