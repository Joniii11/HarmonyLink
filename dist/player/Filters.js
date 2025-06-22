"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filters = void 0;
const FilterBuilder_1 = require("./FilterBuilder");
const neverthrow_1 = require("neverthrow");
/**
 * The Filters class that is used to apply filters to the currently playing track
 */
class Filters {
    player;
    volume;
    equalizer;
    karaoke;
    tremolo;
    vibrato;
    rotation;
    distortion;
    channelMix;
    lowPass;
    timescale;
    _builder;
    constructor(player, options) {
        this.player = player;
        this.volume = 1.0;
        this.equalizer = [];
        this.karaoke = options?.karaoke;
        this.timescale = options?.timescale;
        this.tremolo = options?.tremolo;
        this.vibrato = options?.vibrato;
        this.rotation = options?.rotation;
        this.distortion = options?.distortion;
        this.channelMix = options?.channelMix;
        this.lowPass = options?.lowPass;
        this._builder = this._createBuilder();
    }
    ;
    /**
     * Create a new FilterBuilder instance with current filter state
     * @private
     */
    _createBuilder() {
        const builder = new FilterBuilder_1.FilterBuilder()
            .volume(this.volume)
            .equalizer(this.equalizer);
        if (this.karaoke)
            builder.karaoke(this.karaoke);
        if (this.timescale)
            builder.timescale(this.timescale);
        if (this.tremolo)
            builder.tremolo(this.tremolo);
        if (this.vibrato)
            builder.vibrato(this.vibrato);
        if (this.rotation)
            builder.rotation(this.rotation);
        if (this.distortion)
            builder.distortion(this.distortion);
        if (this.channelMix)
            builder.channelMix(this.channelMix);
        if (this.lowPass)
            builder.lowPass(this.lowPass);
        return builder;
    }
    /**
     * Get a new FilterBuilder instance for advanced filter configuration
     * @returns {FilterBuilder<FiltersOptions>} A new FilterBuilder instance
     */
    builder() {
        return this._createBuilder();
    }
    async _internalBuildFilters(builderFn) {
        // eslint-disable-next-line neverthrow/must-use-result
        const builderResult = builderFn(this.builder());
        if (builderResult.isErr()) {
            return (0, neverthrow_1.err)(new Error(`Failed to build filters: ${builderResult.error.message}`));
        }
        const configuredBuilder = builderResult.value;
        // Validate the configuration
        if (!configuredBuilder.validate()) {
            return (0, neverthrow_1.err)(new Error('Invalid filter configuration'));
        }
        // eslint-disable-next-line neverthrow/must-use-result
        const filtersResult = configuredBuilder.build();
        if (filtersResult.isErr()) {
            return (0, neverthrow_1.err)(new Error(`Failed to build filters: ${filtersResult.error.message}`));
        }
        const filters = filtersResult.value;
        // Apply the built filters
        this.volume = filters.volume ?? this.volume;
        this.equalizer = filters.equalizer ?? this.equalizer;
        this.karaoke = filters.karaoke;
        this.timescale = filters.timescale;
        this.tremolo = filters.tremolo;
        this.vibrato = filters.vibrato;
        this.rotation = filters.rotation;
        this.distortion = filters.distortion;
        this.channelMix = filters.channelMix;
        this.lowPass = filters.lowPass;
        // Update the internal builder
        this._builder = this._createBuilder();
        await this.updateFilters();
        return (0, neverthrow_1.ok)(this);
    }
    /**
     * Apply filters using a FilterBuilder configuration function
     * @param builderFn - Function that configures the FilterBuilder
     * @returns {Promise<Filters>} The updated filter instance
     */
    async buildFilters(builderFn) {
        const builder = this.builder();
        const configuredBuilder = builderFn(builder);
        // Validate the configuration
        if (!configuredBuilder.validate()) {
            return (0, neverthrow_1.err)(new Error('Invalid filter configuration'));
        }
        // eslint-disable-next-line neverthrow/must-use-result
        const filtersResult = configuredBuilder.build();
        if (filtersResult.isErr()) {
            return (0, neverthrow_1.err)(new Error(`Failed to build filters: ${filtersResult.error.message}`));
        }
        const filters = filtersResult.value;
        // Apply the built filters
        this.volume = filters.volume ?? this.volume;
        this.equalizer = filters.equalizer ?? this.equalizer;
        this.karaoke = filters.karaoke;
        this.timescale = filters.timescale;
        this.tremolo = filters.tremolo;
        this.vibrato = filters.vibrato;
        this.rotation = filters.rotation;
        this.distortion = filters.distortion;
        this.channelMix = filters.channelMix;
        this.lowPass = filters.lowPass;
        // Update the internal builder
        this._builder = this._createBuilder();
        await this.updateFilters();
        return (0, neverthrow_1.ok)(this);
    }
    /**
     * Apply a preset filter configuration
     * @param presetName - Name of the preset to apply
     * @returns {Promise<Filters>} The updated filter instance
     */
    applyPreset(presetName) {
        return this._internalBuildFilters(builder => builder.preset(presetName));
    }
    /**
     * Set equalizer bands for the currently playing track
     * @param {Band[]} bands - An array of bands to set the equalizer to
     * @returns {Promise<Filters>} The updated filter instance
     */
    async setEqualizer(bands) {
        this.equalizer = bands;
        await this.updateFilters();
        return this;
    }
    ;
    /**
     * Change the karaoke Options applied to the currently playing track
     * @param {karaokeOptions | undefined} karaoke - An object that conforms to the KaraokeOptions type that defines a range of frequencies to mute
     * @returns {Promise<Filters>} The updated filter instance
     */
    async setKaraoke(karaoke) {
        this.karaoke = karaoke;
        await this.updateFilters();
        return this;
    }
    ;
    /**
     * Change the timescale Options applied to the currently playing track
     * @param {timescaleOptions} timescale - An object that conforms to the TimescaleOptions type that defines the timescale to apply
     * @returns {Promise<Filters>} The updated filter instance
     */
    async setTimescale(timescale) {
        this.timescale = timescale;
        await this.updateFilters();
        return this;
    }
    ;
    /**
     * Change the tremolo Options applied to the currently playing track
     * @param {tremoloOptions} tremolo - An object that conforms to the TremoloOptions type that defines the tremolo to apply
     * @returns {Promise<Filters>} The updated filter instance
     */
    async setTremolo(tremolo) {
        this.tremolo = tremolo;
        await this.updateFilters();
        return this;
    }
    ;
    /**
     * Change the vibrato Options applied to the currently playing track
     * @param {vibratoOptions} vibrato - An object that conforms to the VibratoOptions type that defines the vibrato to apply
     * @returns {Promise<Filters>} The updated filter instance
     */
    async setVibrato(vibrato) {
        this.vibrato = vibrato;
        await this.updateFilters();
        return this;
    }
    ;
    /**
     * Change the rotation Options applied to the currently playing track
     * @param {rotationOptions} rotation - An object that conforms to the RotationOptions type that defines the rotation to apply
     * @returns {Promise<Filters>} The updated filter instance
     */
    async setRotation(rotation) {
        this.rotation = rotation;
        await this.updateFilters();
        return this;
    }
    ;
    /**
     * Change the distortion Options applied to the currently playing track
     * @param {distortionOptions} distortion - An object that conforms to the DistortionOptions type that defines the distortion to apply
     * @returns {Promise<Filters>} The updated filter instance
     */
    async setDistortion(distortion) {
        this.distortion = distortion;
        await this.updateFilters();
        return this;
    }
    ;
    /**
     * Change the channel mix Options applied to the currently playing track
     * @param {channelMixOptions} channelMix - An object that conforms to the ChannelMixOptions type that defines the channel mix to apply
     * @returns {Promise<Filters>} The updated filter instance
     */
    async setChannelMix(channelMix) {
        this.channelMix = channelMix;
        await this.updateFilters();
        return this;
    }
    ;
    /**
     * Change the low pass Options applied to the currently playing track
     * @param {lowPassOptions} lowPass - An object that conforms to the LowPassOptions type that defines the low pass to apply
     * @returns {Promise<Filters>} The updated filter instance
     */
    async setLowPass(lowPass) {
        this.lowPass = lowPass;
        await this.updateFilters();
        return this;
    }
    ;
    /**
     * Change the filters of the currently playing track
     * @param {Filters | FiltersOptions} options - An object that conforms to the FiltersOptions type that defines the filters to apply
     * @returns {Promise<Filters>} The updated filter instance
     */
    async setFilters(options) {
        this.player.filters = new Filters(this.player, options);
        await this.updateFilters();
        return this;
    }
    ;
    /**
     * Clears all of the filters to their default values
     * @returns {Promise<Filters>} The current filters applied to the currently playing track
     */
    async clearFilters() {
        this.player.filters = new Filters(this.player);
        await this.updateFilters();
        return this;
    }
    ;
    /**
     * Updates all the filters applied to the currently playing track
     * @returns {Promise<Filters>} the updated filters applied to the currently playing track
     */
    async updateFilters() {
        const { equalizer, karaoke, timescale, tremolo, vibrato, rotation, distortion, channelMix, lowPass, volume } = this;
        return (await this.player.node.rest.updatePlayer({
            guildId: this.player.guildId,
            playerOptions: {
                filters: {
                    volume, equalizer, karaoke, timescale, tremolo, vibrato, rotation, distortion, channelMix, lowPass,
                }
            }
        })).match(() => (0, neverthrow_1.ok)(this), (error) => (0, neverthrow_1.err)(new Error(`[HarmonyLink] [Player] [Filters] Failed to update filters: ${error.message}`)));
    }
    ;
}
exports.Filters = Filters;
;
//# sourceMappingURL=Filters.js.map