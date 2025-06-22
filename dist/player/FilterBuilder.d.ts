import { Band, karaokeOptions, tremoloOptions, vibratoOptions, rotationOptions, distortionOptions, channelMixOptions, lowPassOptions, timescaleOptions, FiltersOptions } from "../typings/player/filters";
import { Result } from 'neverthrow';
/**
 * Predefined filter presets
 */
type FilterPresets = {
    bassBoost: Partial<FiltersOptions>;
    nightcore: Partial<FiltersOptions>;
    vaporwave: Partial<FiltersOptions>;
    pop: Partial<FiltersOptions>;
    soft: Partial<FiltersOptions>;
    treblebass: Partial<FiltersOptions>;
    earrape: Partial<FiltersOptions>;
    [key: string]: Partial<FiltersOptions>;
};
/**
 * Advanced, type-safe, generic FilterBuilder for audio filters
 */
export declare class FilterBuilder<T extends FiltersOptions = FiltersOptions> {
    private filters;
    private validationRules;
    private static readonly PRESETS;
    constructor();
    /**
     * Initialize validation rules for filter parameters
     */
    private initializeValidationRules;
    /**
     * Set volume filter
     */
    volume(volume: number): this;
    /**
     * Set equalizer bands
     */
    equalizer(bands: Band[]): this;
    /**
     * Set karaoke filter
     */
    karaoke(options?: karaokeOptions): this;
    /**
     * Set timescale filter
     */
    timescale(options?: timescaleOptions): this;
    /**
     * Set tremolo filter
     */
    tremolo(options?: tremoloOptions): this;
    /**
     * Set vibrato filter
     */
    vibrato(options?: vibratoOptions): this;
    /**
     * Set rotation filter
     */
    rotation(options?: rotationOptions): this;
    /**
     * Set distortion filter
     */
    distortion(options?: distortionOptions): this;
    /**
     * Set channel mix filter
     */
    channelMix(options?: channelMixOptions): this;
    /**
     * Set low pass filter
     */
    lowPass(options?: lowPassOptions): this;
    /**
     * Apply a predefined preset
     */
    preset(name: keyof FilterPresets | string): Result<this, Error>;
    /**
     * Add a custom preset
     */
    static addPreset(name: string, config: Partial<FiltersOptions>): void;
    /**
     * Get available presets
     */
    static getPresets(): string[];
    /**
     * Merge with another filter configuration
     */
    merge(other: Partial<T>): this;
    /**
     * Reset all filters to default values
     */
    reset(): this;
    /**
     * Clone the current builder
     */
    clone(): FilterBuilder<T>;
    /**
     * Validate the current filter configuration
     */
    validate(): boolean;
    /**
     * Get validation errors
     */
    getValidationErrors(): string[];
    /**
     * Build and return the final filter configuration
     */
    build(): Result<Partial<T>, Error>;
    /**
     * Get current filter state (without validation)
     */
    getFilters(): Partial<T>;
    /**
     * Check if any filters are set
     */
    isEmpty(): boolean;
    /**
     * Get a summary of applied filters
     */
    getSummary(): string;
}
export {};
