"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
class Queue extends Array {
    currentTrack = null;
    previousTrack = null;
    constructor() {
        super();
    }
    ;
    /**
     * Returns the number of tracks in the queue.
     * @type {number}
     */
    get size() {
        return this.length;
    }
    /**
     * Returns the first track in the queue.
     * @returns {TrackData | null} The first track in the queue, or undefined if the queue is empty.
     */
    get current() {
        return this.currentTrack;
    }
    ;
    /**
     * Returns the next track in the queue.
     * @returns {TrackData | null} The next track in the queue, or undefined if the queue is empty.
     */
    get next() {
        return this[1];
    }
    ;
    get previous() {
        return this.previousTrack;
    }
    /**
     * Adds a track to the queue.
     * @param {TrackData} track - The track to add to the queue.
     * @returns {Queue} The queue with the added track.
     */
    add(track) {
        this.push(track);
        return this;
    }
    ;
    /**
     * Removes a track from the queue by its index.
     * @param {number} index - The index of the track to remove.
     * @returns {Queue} The queue with the removed track.
     */
    remove(index) {
        this.splice(index, 1);
        return this;
    }
    ;
    /**
     * Clears the entire queue.
     * @returns {TrackData[]} An array containing all the cleared tracks, or an empty array if the queue was already empty.
     */
    clear() {
        return this.splice(0);
    }
    ;
    /**
     * Shuffles the tracks in the queue.
     * @returns {Queue} This method does not return anything.
     */
    shuffle() {
        for (let i = this.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [this[i], this[j]] = [this[j], this[i]];
        }
        return this;
    }
    ;
    /**
     * Shifts the queue to the next track.
     * @returns {TrackData | null} The next track in the queue, or null if the queue is empty.
     */
    _next() {
        if (this.length === 0)
            return null;
        this.previousTrack = this.currentTrack;
        this.currentTrack = this.shift() ?? null;
        return this.currentTrack;
    }
    ;
    _cleanUp() {
        this.currentTrack = null;
        this.previousTrack = null;
        this.clear();
    }
    ;
}
exports.Queue = Queue;
//# sourceMappingURL=Queue.js.map