import { Track } from "./Track";
export declare class Queue extends Array<Track> {
    currentTrack: Track | null;
    previousTrack: Track | null;
    constructor();
    /**
     * Returns the number of tracks in the queue.
     * @type {number}
     */
    get size(): number;
    /**
     * Returns the first track in the queue.
     * @returns {Track | null} The first track in the queue, or undefined if the queue is empty.
     */
    get current(): Track | null;
    /**
     * Returns the next track in the queue.
     * @returns {Track | null} The next track in the queue, or undefined if the queue is empty.
     */
    get next(): Track;
    get previous(): Track | null;
    /**
     * Adds a track to the queue.
     * @param {Track} track - The track to add to the queue.
     * @returns {Queue} The queue with the added track.
     */
    add(track: Track): this;
    /**
     * Removes a track from the queue by its index.
     * @param {number} index - The index of the track to remove.
     * @returns {Queue} The queue with the removed track.
     */
    remove(index: number): this;
    /**
     * Clears the entire queue.
     * @returns {Track[]} An array containing all the cleared tracks, or an empty array if the queue was already empty.
     */
    clear(): Track[] | [];
    /**
     * Shuffles the tracks in the queue.
     * @returns {Queue} Returns the shuffled queue.
     */
    shuffle(): this;
    /**
     * Shifts the queue to the next track.
     * @returns {Track | null} The next track in the queue, or null if the queue is empty.
     */
    _next(): Track | null;
    _cleanUp(): void;
}
