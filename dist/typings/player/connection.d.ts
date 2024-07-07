import { TDateISO } from "../index";
export interface VoiceServer {
    /**
     * Voice connection token
     */
    token: string;
    /**
     * The guild this voice server update is for in the session
     */
    sessionId: string;
    /**
     * The voice server host
     */
    endpoint?: string;
}
/**
 * [From the discord docs](https://discord.com/developers/docs/resources/voice#voice-state-object)
 *
 * @interface SetStateUpdate
 * @description This interface is used to update the voice state of a user.
 */
export interface SetStateUpdate {
    /**
     * 	the guild id this voice state is for
     */
    guild_id?: string;
    /**
     * the channel id this user is connected to
     */
    channel_id: string;
    /**
     * the user id this voice state is for
     */
    user_id: string;
    /**
     * the guild member this voice state is for
     */
    member?: Record<string, unknown>;
    /**
     * the session id for this voice state
     */
    session_id: string;
    /**
     * whether this user is deafened by the server
     */
    deaf: boolean;
    /**
     * whether this user is muted by the server
     */
    mute: boolean;
    /**
     * whether this user is locally deafened
     */
    self_deaf: boolean;
    /**
     * whether this user is locally muted
     */
    self_mute: boolean;
    /**
     * whether this user is streaming using "Go Live"
     */
    self_stream?: boolean;
    /**
     * whether this user's camera is enabled
     */
    self_video: boolean;
    /**
     * whether this user is muted by the current user
     */
    suppress: boolean;
    /**
     * the time at which the user requested to speak
     */
    request_to_speak_timestamp?: TDateISO;
}
export interface ConnectionOptions {
    /**
     * Voice Options
     */
    voice: {
        /**
         * The voice session id
         */
        sessionId: string | null;
        /**
         * The voice server token
         */
        token: string | null;
        /**
         * The voice server endpoint
         */
        endpoint: string | null;
    };
    /**
     * Whether to mute myself
     *
     * @default false
     */
    selfMute: boolean;
    /** *
     * Whether to deafen myself
     *
     * @default false
     */
    selfDeaf: boolean;
    /**
     * The voice region
     */
    voiceRegion: string | null;
}
export declare enum DiscordVoiceStates {
    SESSION_READY = 0,
    SESSION_ID_MISSING = 1,
    SESSION_ENDPOINT_MISSING = 2,
    SESSION_FAILED_UPDATE = 3
}
