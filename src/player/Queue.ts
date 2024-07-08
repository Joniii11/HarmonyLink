// Types
import { Track } from "./Track";

export class Queue extends Array<Track> {
    public currentTrack: Track | null = null;
    public previousTrack: Track | null = null;
    
    public constructor() {
        super();
    };

    /**
     * Returns the number of tracks in the queue.
     * @type {number}
     */
    public get size(): number {
        return this.length;
    }

    /**
     * Returns the first track in the queue.
     * @returns {Track | null} The first track in the queue, or undefined if the queue is empty.
     */
    public get current(): Track | null {
        return this.currentTrack;
    };

    /**
     * Returns the next track in the queue.
     * @returns {Track | null} The next track in the queue, or undefined if the queue is empty.
     */
    public get next(): Track {
        return this[1];
    };

    public get previous(): Track | null {
        return this.previousTrack;
    }

    /**
     * Adds a track to the queue.
     * @param {Track} track - The track to add to the queue.
     * @returns {Queue} The queue with the added track.
     */
    public add(track: Track): this {
        this.push(track);
        return this;
    };

    /**
     * Removes a track from the queue by its index.
     * @param {number} index - The index of the track to remove.
     * @returns {Queue} The queue with the removed track.
     */
    public remove(index: number): this {
        this.splice(index, 1);
        return this;
    };

    /**
     * Clears the entire queue.
     * @returns {Track[]} An array containing all the cleared tracks, or an empty array if the queue was already empty.
     */
    public clear(): Track[] | [] {
        return this.splice(0);
    };

    /**
     * Shuffles the tracks in the queue.
     * @returns {Queue} This method does not return anything.
     */
    public shuffle(): this {
        for (let i = this.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [this[i], this[j]] = [this[j], this[i]];
        }

        return this;
    };

    /**
     * Shifts the queue to the next track.
     * @returns {Track | null} The next track in the queue, or null if the queue is empty.
     */
    public _next(): Track | null {
        if (this.length === 0) return null;

        this.previousTrack = this.currentTrack;
        this.currentTrack = this.shift() ?? null;
        return this.currentTrack;
    };

    public _cleanUp(): void {
        this.currentTrack = null;
        this.previousTrack = null;
        this.clear();
    };
}