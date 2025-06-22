"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterBuilder = void 0;
const neverthrow_1 = require("neverthrow");
/**
 * Advanced, type-safe, generic FilterBuilder for audio filters
 */
class FilterBuilder {
    filters = {};
    validationRules = {};
    // Predefined filter presets
    static PRESETS = {
        bassBoost: {
            equalizer: [
                { band: 0, gain: 0.2 },
                { band: 1, gain: 0.15 },
                { band: 2, gain: 0.1 },
                { band: 3, gain: 0.05 },
                { band: 4, gain: 0.0 },
                { band: 5, gain: -0.05 },
                { band: 6, gain: -0.1 },
                { band: 7, gain: -0.1 },
                { band: 8, gain: -0.1 },
                { band: 9, gain: -0.1 },
                { band: 10, gain: -0.1 },
                { band: 11, gain: -0.1 },
                { band: 12, gain: -0.1 },
                { band: 13, gain: -0.1 },
                { band: 14, gain: -0.1 }
            ]
        },
        nightcore: {
            timescale: { speed: 1.3, pitch: 1.3, rate: 1.0 },
            tremolo: { frequency: 4.0, depth: 0.75 }
        },
        vaporwave: {
            timescale: { speed: 0.8, pitch: 0.8, rate: 1.0 },
            equalizer: [
                { band: 0, gain: 0.3 },
                { band: 1, gain: 0.3 },
                { band: 2, gain: 0.1 },
                { band: 3, gain: 0.1 },
                { band: 4, gain: 0.1 },
                { band: 5, gain: 0.1 },
                { band: 6, gain: 0.0 },
                { band: 7, gain: -0.1 },
                { band: 8, gain: -0.1 },
                { band: 9, gain: -0.1 },
                { band: 10, gain: -0.3 },
                { band: 11, gain: -0.3 },
                { band: 12, gain: -0.3 },
                { band: 13, gain: -0.3 },
                { band: 14, gain: -0.3 }
            ]
        },
        pop: {
            equalizer: [
                { band: 0, gain: 0.065 },
                { band: 1, gain: 0.045 },
                { band: 2, gain: 0.025 },
                { band: 3, gain: 0.005 },
                { band: 4, gain: -0.015 },
                { band: 5, gain: -0.035 },
                { band: 6, gain: -0.055 },
                { band: 7, gain: -0.035 },
                { band: 8, gain: -0.015 },
                { band: 9, gain: 0.005 },
                { band: 10, gain: 0.025 },
                { band: 11, gain: 0.045 },
                { band: 12, gain: 0.065 },
                { band: 13, gain: 0.085 },
                { band: 14, gain: 0.105 }
            ]
        },
        soft: {
            lowPass: { smoothing: 20.0 },
            volume: 0.5
        },
        treblebass: {
            equalizer: [
                { band: 0, gain: 0.6 },
                { band: 1, gain: 0.67 },
                { band: 2, gain: 0.67 },
                { band: 3, gain: 0 },
                { band: 4, gain: -0.5 },
                { band: 5, gain: 0.15 },
                { band: 6, gain: -0.45 },
                { band: 7, gain: 0.23 },
                { band: 8, gain: 0.35 },
                { band: 9, gain: 0.45 },
                { band: 10, gain: 0.55 },
                { band: 11, gain: 0.6 },
                { band: 12, gain: 0.55 },
                { band: 13, gain: 0 },
                { band: 14, gain: 0 }
            ]
        },
        earrape: {
            volume: 5.0,
            distortion: {
                sinOffset: 0.0,
                sinScale: 1.0,
                cosOffset: 0.0,
                cosScale: 1.0,
                tanOffset: 0.0,
                tanScale: 1.0,
                offset: 0.0,
                scale: 1.0
            }
        }
    };
    constructor() {
        this.initializeValidationRules();
    }
    /**
     * Initialize validation rules for filter parameters
     */
    initializeValidationRules() {
        this.validationRules = {
            volume: { min: 0, max: 5 },
            equalizer: {
                validator: (bands) => {
                    if (!Array.isArray(bands))
                        return false;
                    return bands.every(band => typeof band.band === 'number' &&
                        band.band >= 0 &&
                        band.band <= 14 &&
                        typeof band.gain === 'number' &&
                        band.gain >= -0.25 &&
                        band.gain <= 1.0);
                }
            },
            karaoke: {
                validator: (karaoke) => {
                    if (!karaoke)
                        return true;
                    return (karaoke.level >= 0 && karaoke.level <= 1 &&
                        karaoke.monoLevel >= 0 && karaoke.monoLevel <= 1 &&
                        karaoke.filterBand > 0 &&
                        karaoke.filterWidth > 0);
                }
            },
            timescale: {
                validator: (timescale) => {
                    if (!timescale || !(timescale.speed && timescale.pitch && timescale.rate))
                        return true;
                    return (timescale.speed >= 0.1 && timescale.speed <= 3.0 &&
                        timescale.pitch >= 0.1 && timescale.pitch <= 3.0 &&
                        timescale.rate >= 0.1 && timescale.rate <= 3.0);
                }
            },
            tremolo: {
                validator: (tremolo) => {
                    if (!tremolo)
                        return true;
                    return (tremolo.frequency > 0 &&
                        tremolo.depth >= 0 && tremolo.depth <= 1);
                }
            },
            vibrato: {
                validator: (vibrato) => {
                    if (!vibrato)
                        return true;
                    return (vibrato.frequency > 0 && vibrato.frequency <= 14 &&
                        vibrato.depth >= 0 && vibrato.depth <= 1);
                }
            },
            rotation: {
                validator: (rotation) => {
                    if (!rotation)
                        return true;
                    return rotation.rotationHz >= 0;
                }
            },
            lowPass: {
                validator: (lowPass) => {
                    if (!lowPass)
                        return true;
                    return lowPass.smoothing >= 1.0;
                }
            }
        };
    }
    /**
     * Set volume filter
     */
    volume(volume) {
        this.filters.volume = volume;
        return this;
    }
    /**
     * Set equalizer bands
     */
    equalizer(bands) {
        this.filters.equalizer = bands;
        return this;
    }
    /**
     * Set karaoke filter
     */
    karaoke(options) {
        this.filters.karaoke = options;
        return this;
    }
    /**
     * Set timescale filter
     */
    timescale(options) {
        this.filters.timescale = options;
        return this;
    }
    /**
     * Set tremolo filter
     */
    tremolo(options) {
        this.filters.tremolo = options;
        return this;
    }
    /**
     * Set vibrato filter
     */
    vibrato(options) {
        this.filters.vibrato = options;
        return this;
    }
    /**
     * Set rotation filter
     */
    rotation(options) {
        this.filters.rotation = options;
        return this;
    }
    /**
     * Set distortion filter
     */
    distortion(options) {
        this.filters.distortion = options;
        return this;
    }
    /**
     * Set channel mix filter
     */
    channelMix(options) {
        this.filters.channelMix = options;
        return this;
    }
    /**
     * Set low pass filter
     */
    lowPass(options) {
        this.filters.lowPass = options;
        return this;
    }
    /**
     * Apply a predefined preset
     */
    preset(name) {
        const presetConfig = FilterBuilder.PRESETS[name];
        if (!presetConfig) {
            return (0, neverthrow_1.err)(new Error(`Unknown preset: ${name}`));
        }
        // Apply preset configuration
        Object.assign(this.filters, presetConfig);
        return (0, neverthrow_1.ok)(this);
    }
    /**
     * Add a custom preset
     */
    static addPreset(name, config) {
        FilterBuilder.PRESETS[name] = config;
    }
    /**
     * Get available presets
     */
    static getPresets() {
        return Object.keys(FilterBuilder.PRESETS);
    }
    /**
     * Merge with another filter configuration
     */
    merge(other) {
        Object.assign(this.filters, other);
        return this;
    }
    /**
     * Reset all filters to default values
     */
    reset() {
        this.filters = {};
        return this;
    }
    /**
     * Clone the current builder
     */
    clone() {
        const cloned = new FilterBuilder();
        cloned.filters = { ...this.filters };
        cloned.validationRules = { ...this.validationRules };
        return cloned;
    }
    /**
     * Validate the current filter configuration
     */
    validate() {
        for (const [key, value] of Object.entries(this.filters)) {
            const rule = this.validationRules[key];
            if (!rule)
                continue;
            if (rule.required && (value === undefined || value === null)) {
                return false;
            }
            if (value !== undefined && value !== null) {
                if (typeof value === 'number') {
                    if (rule.min !== undefined && value < rule.min)
                        return false;
                    if (rule.max !== undefined && value > rule.max)
                        return false;
                }
                if (rule.validator && !rule.validator(value)) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * Get validation errors
     */
    getValidationErrors() {
        const errors = [];
        for (const [key, value] of Object.entries(this.filters)) {
            const rule = this.validationRules[key];
            if (!rule)
                continue;
            if (rule.required && (value === undefined || value === null)) {
                errors.push(`${key} is required`);
                continue;
            }
            if (value !== undefined && value !== null) {
                if (typeof value === 'number') {
                    if (rule.min !== undefined && value < rule.min) {
                        errors.push(`${key} must be >= ${rule.min}`);
                    }
                    if (rule.max !== undefined && value > rule.max) {
                        errors.push(`${key} must be <= ${rule.max}`);
                    }
                }
                if (rule.validator && !rule.validator(value)) {
                    errors.push(`${key} failed validation`);
                }
            }
        }
        return errors;
    }
    /**
     * Build and return the final filter configuration
     */
    build() {
        if (!this.validate()) {
            const errors = this.getValidationErrors();
            return (0, neverthrow_1.err)(new Error(`Filter validation failed: ${errors.join(', ')}`));
        }
        return (0, neverthrow_1.ok)({ ...this.filters });
    }
    /**
     * Get current filter state (without validation)
     */
    getFilters() {
        return { ...this.filters };
    }
    /**
     * Check if any filters are set
     */
    isEmpty() {
        return Object.keys(this.filters).length === 0;
    }
    /**
     * Get a summary of applied filters
     */
    getSummary() {
        const activeFilters = Object.keys(this.filters).filter(key => this.filters[key] !== undefined);
        return activeFilters.length > 0 ? `Active filters: ${activeFilters.join(', ')}` : 'No filters applied';
    }
}
exports.FilterBuilder = FilterBuilder;
//# sourceMappingURL=FilterBuilder.js.map