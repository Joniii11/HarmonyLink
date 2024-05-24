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
};