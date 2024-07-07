import { TrackData } from "../typings/track";
export declare class Queue extends Array<TrackData> {
    currentTrack: TrackData | null;
    previousTrack: TrackData | null;
    constructor();
    /**
     * Returns the number of tracks in the queue.
     * @type {number}
     */
    get size(): number;
    /**
     * Returns the first track in the queue.
     * @returns {TrackData | null} The first track in the queue, or undefined if the queue is empty.
     */
    get current(): TrackData | null;
    /**
     * Returns the next track in the queue.
     * @returns {TrackData | null} The next track in the queue, or undefined if the queue is empty.
     */
    get next(): TrackData;
    get previous(): TrackData | null;
    /**
     * Adds a track to the queue.
     * @param {TrackData} track - The track to add to the queue.
     * @returns {Queue} The queue with the added track.
     */
    add(track: TrackData): this;
    /**
     * Removes a track from the queue by its index.
     * @param {number} index - The index of the track to remove.
     * @returns {Queue} The queue with the removed track.
     */
    remove(index: number): this;
    /**
     * Clears the entire queue.
     * @returns {TrackData[]} An array containing all the cleared tracks, or an empty array if the queue was already empty.
     */
    clear(): TrackData[] | [];
    /**
     * Shuffles the tracks in the queue.
     * @returns {Queue} This method does not return anything.
     */
    shuffle(): this;
    /**
     * Shifts the queue to the next track.
     * @returns {TrackData | null} The next track in the queue, or null if the queue is empty.
     */
    _next(): TrackData | null;
    _cleanUp(): void;
}
