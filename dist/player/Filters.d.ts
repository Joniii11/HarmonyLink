import { Band, karaokeOptions, tremoloOptions, vibratoOptions, rotationOptions, distortionOptions, channelMixOptions, lowPassOptions, timescaleOptions, FiltersOptions } from "../typings/player/filters";
import { Player } from "./Player";
/**
 * The Filters class that is used to apply filters to the currently playing track
 */
export declare class Filters {
    player: Player;
    volume: number;
    equalizer: Band[];
    karaoke: karaokeOptions | undefined;
    tremolo: tremoloOptions | undefined;
    vibrato: vibratoOptions | undefined;
    rotation: rotationOptions | undefined;
    distortion: distortionOptions | undefined;
    channelMix: channelMixOptions | undefined;
    lowPass: lowPassOptions | undefined;
    timescale: timescaleOptions | undefined;
    constructor(player: Player, options?: Partial<FiltersOptions>);
    /**
     * Set equalizer bands for the currently playing track
     * @param {Band[]} bands - An array of bands to set the equalizer to
     * @returns {Promise<Filters>} The updated filter instance
     */
    setEqualizer(bands: Band[]): Promise<Filters>;
    /**
     * Change the karaoke Options applied to the currently playing track
     * @param {karaokeOptions | undefined} karaoke - An object that conforms to the KaraokeOptions type that defines a range of frequencies to mute
     * @returns {Promise<Filters>} The updated filter instance
     */
    setKaraoke(karaoke?: karaokeOptions): Promise<Filters>;
    /**
     * Change the timescale Options applied to the currently playing track
     * @param {timescaleOptions} timescale - An object that conforms to the TimescaleOptions type that defines the timescale to apply
     * @returns {Promise<Filters>} The updated filter instance
     */
    setTimescale(timescale?: timescaleOptions): Promise<Filters>;
    /**
     * Change the tremolo Options applied to the currently playing track
     * @param {tremoloOptions} tremolo - An object that conforms to the TremoloOptions type that defines the tremolo to apply
     * @returns {Promise<Filters>} The updated filter instance
     */
    setTremolo(tremolo?: tremoloOptions): Promise<Filters>;
    /**
     * Change the vibrato Options applied to the currently playing track
     * @param {vibratoOptions} vibrato - An object that conforms to the VibratoOptions type that defines the vibrato to apply
     * @returns {Promise<Filters>} The updated filter instance
     */
    setVibrato(vibrato?: vibratoOptions): Promise<Filters>;
    /**
     * Change the rotation Options applied to the currently playing track
     * @param {rotationOptions} rotation - An object that conforms to the RotationOptions type that defines the rotation to apply
     * @returns {Promise<Filters>} The updated filter instance
     */
    setRotation(rotation?: rotationOptions): Promise<Filters>;
    /**
     * Change the distortion Options applied to the currently playing track
     * @param {distortionOptions} distortion - An object that conforms to the DistortionOptions type that defines the distortion to apply
     * @returns {Promise<Filters>} The updated filter instance
     */
    setDistortion(distortion?: distortionOptions): Promise<Filters>;
    /**
     * Change the channel mix Options applied to the currently playing track
     * @param {channelMixOptions} channelMix - An object that conforms to the ChannelMixOptions type that defines the channel mix to apply
     * @returns {Promise<Filters>} The updated filter instance
     */
    setChannelMix(channelMix?: channelMixOptions): Promise<Filters>;
    /**
     * Change the low pass Options applied to the currently playing track
     * @param {lowPassOptions} lowPass - An object that conforms to the LowPassOptions type that defines the low pass to apply
     * @returns {Promise<Filters>} The updated filter instance
     */
    setLowPass(lowPass: lowPassOptions): Promise<Filters>;
    /**
     * Change the filters of the currently playing track
     * @param {Filters | FiltersOptions} options - An object that conforms to the FiltersOptions type that defines the filters to apply
     * @returns {Promise<Filters>} The updated filter instance
     */
    setFilters(options: Filters | FiltersOptions): Promise<Filters>;
    /**
     * Clears all of the filters to their default values
     * @returns {Promise<Filters>} The current filters applied to the currently playing track
     */
    clearFilters(): Promise<Filters>;
    /**
     * Updates all the filters applied to the currently playing track
     * @returns {Promise<Filters>} the updated filters applied to the currently playing track
     */
    updateFilters(): Promise<Filters>;
}
