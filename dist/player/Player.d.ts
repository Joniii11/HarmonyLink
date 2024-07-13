/// <reference types="node" />
import { EventEmitter } from "events";
import { Queue } from './Queue';
import { ConnectionHandler } from "./Connection";
import { Track } from "./Track";
import { Response } from "./Response";
import { PlayerConnectionState, PlayerOptions, VoiceConnectionState, PlayerEvents, PlayerLoop, ResolveOptions } from "../typings/player";
import { Node } from "../node/Node";
import { HarmonyLink } from "../HarmonyLink";
export declare interface Player {
    on: <K extends keyof PlayerEvents>(event: K, listener: PlayerEvents[K]) => this;
    once: <K extends keyof PlayerEvents>(event: K, listener: PlayerEvents[K]) => this;
    emit: <K extends keyof PlayerEvents>(event: K, ...args: Parameters<PlayerEvents[K]>) => boolean;
    off: <K extends keyof PlayerEvents>(event: K, listener: PlayerEvents[K]) => this;
}
export declare class Player extends EventEmitter {
    readonly node: Node;
    readonly manager: HarmonyLink;
    readonly ConnectionHandler: ConnectionHandler;
    readonly queue: Queue;
    voiceChannelId: string;
    textChannelId: string;
    guildId: string;
    shardId: string;
    isConnected: boolean;
    isPlaying: boolean;
    isPaused: boolean;
    state: PlayerConnectionState;
    voiceState: VoiceConnectionState;
    loop: PlayerLoop | "NONE" | "QUEUE" | "TRACK";
    isAutoplay: boolean;
    volume: number;
    /**
     * The ping of the node to the Discord voice server in milliseconds (-1 if not connected)
     */
    ping: number;
    timestamp: number;
    position: number;
    constructor(manager: HarmonyLink, node: Node, options: Omit<PlayerOptions, "shardId"> & {
        shardId?: string;
    });
    /**
     * Connects the player to the voice channel.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    connect(): Promise<Player>;
    /**
     * Reconnects the player to the voice channel.
     * @param {boolean} [restartSong=true] - Whether to restart the current song or not.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    reconnect(restartSong?: boolean): Promise<Player>;
    /**
     * Sets the loop mode for the player.
     * @param {PlayerLoop | "NONE" | "QUEUE" | "TRACK"} mode - The loop mode to set.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    setLoop(mode?: PlayerLoop | "NONE" | "QUEUE" | "TRACK"): Promise<Player>;
    /**
     * Sets the voice channel for the player.
     * @param {string} channelId - The channel ID to set for the player.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    setTextChannel(channelId: string): Promise<Player>;
    /**
     * Sets a new voice channel for the player.
     * @param {string} channelId - The channel ID to set for the player.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    setVoiceChannel(channelId: string): Promise<Player>;
    /**
     * Sets the autoplay mode for the player.
     * @param {boolean} [toggle] - Whether to enable or disable autoplay.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    setAutoplay(toggle?: boolean): Promise<Player>;
    /**
     * Sets the volume for the player.
     * @param {number} volume - The volume to set. Must be between 0 and 1000.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    setVolume(volume: number): Promise<Player>;
    /**
     * Seeks to a position in the current track.
     * @param {number} position - The position to seek to in milliseconds. Must be between 0 and `<Track>.info.length`
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    seekTo(position: number): Promise<Player>;
    /**
     * Plays the current track in the queue.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    play(): Promise<Player>;
    /**
     * Destroys the player and cleans up associated resources.
     * @returns {Promise<boolean>} - A Promise that resolves to a boolean which is true if an element in the Map existed and has been removed, or false if the element does not exist.
     */
    destroy(): Promise<boolean>;
    /**
     * Skips the current track.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    skip(): Promise<Player>;
    /**
     * Pauses the current track.
     * @param {boolean} [toggle=true] - Whether to pause or resume the track.
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    pause(toggle?: boolean): Promise<Player>;
    /**
     * Resolves a track.
     * @param {ResolveOptions} [options] - Options for resolving tracks.
     * @param {Node} [node] - Node to use for resolution.
     * @returns {Promise<Response>} The response containing resolved tracks.
     */
    resolve({ query, source, requester }: ResolveOptions, node?: Node): Promise<Response>;
    /**
     * Autoplays a track.
     * @param {Track | null} [previousTrack = null] The previous track to use for autoplay
     * @returns {Promise<Player>} - A Promise that resolves to the Player instance.
     */
    autoplay(previousTrack?: Track | null): Promise<Player>;
    protected disconnect(cleanQueue?: boolean): Promise<Player>;
    protected checkDestroyed(): void;
    private sendVoiceUpdate;
    private sendToDiscord;
    private _eventHandler;
}
