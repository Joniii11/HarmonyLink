/* eslint-disable max-lines */
import { 
    Band, 
    karaokeOptions, 
    tremoloOptions, 
    vibratoOptions, 
    rotationOptions, 
    distortionOptions, 
    channelMixOptions, 
    lowPassOptions, 
    timescaleOptions, 
    FiltersOptions 
} from "@t/player/filters";
import { Result, err, ok } from 'neverthrow';

/**
 * Type-safe filter validation rules
 */
type FilterValidationRules<T> = {
    [K in keyof T]?: {
        min?: number;
        max?: number;
        required?: boolean;
        validator?: (value: T[K]) => boolean;
    };
};

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
export class FilterBuilder<T extends FiltersOptions = FiltersOptions> {
    private filters: Partial<T> = {};
    private validationRules: FilterValidationRules<T> = {};
    
    // Predefined filter presets
    private static readonly PRESETS: FilterPresets = {
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
    private initializeValidationRules(): void {
        this.validationRules = {
            volume: { min: 0, max: 5 },
            equalizer: {
                validator: (bands: Band[]) => {
                    if (!Array.isArray(bands)) return false;
                    return bands.every(band => 
                        typeof band.band === 'number' && 
                        band.band >= 0 && 
                        band.band <= 14 &&
                        typeof band.gain === 'number' && 
                        band.gain >= -0.25 && 
                        band.gain <= 1.0
                    );
                }
            },
            karaoke: {
                validator: (karaoke: karaokeOptions) => {
                    if (!karaoke) return true;
                    return (
                        karaoke.level >= 0 && karaoke.level <= 1 &&
                        karaoke.monoLevel >= 0 && karaoke.monoLevel <= 1 &&
                        karaoke.filterBand > 0 &&
                        karaoke.filterWidth > 0
                    );
                }
            },
            timescale: {
                validator: (timescale: timescaleOptions) => {
                    if (!timescale || !(timescale.speed && timescale.pitch && timescale.rate)) return true;
                    return (
                        timescale.speed >= 0.1 && timescale.speed <= 3.0 &&
                        timescale.pitch >= 0.1 && timescale.pitch <= 3.0 &&
                        timescale.rate >= 0.1 && timescale.rate <= 3.0
                    );
                }
            },
            tremolo: {
                validator: (tremolo: tremoloOptions) => {
                    if (!tremolo) return true;
                    return (
                        tremolo.frequency > 0 &&
                        tremolo.depth >= 0 && tremolo.depth <= 1
                    );
                }
            },
            vibrato: {
                validator: (vibrato: vibratoOptions) => {
                    if (!vibrato) return true;
                    return (
                        vibrato.frequency > 0 && vibrato.frequency <= 14 &&
                        vibrato.depth >= 0 && vibrato.depth <= 1
                    );
                }
            },
            rotation: {
                validator: (rotation: rotationOptions) => {
                    if (!rotation) return true;
                    return rotation.rotationHz >= 0;
                }
            },
            lowPass: {
                validator: (lowPass: lowPassOptions) => {
                    if (!lowPass) return true;
                    return lowPass.smoothing >= 1.0;
                }
            }
        } as FilterValidationRules<T>;
    }

    /**
     * Set volume filter
     */
    public volume(volume: number): this {
        this.filters.volume = volume as T['volume'];
        return this;
    }

    /**
     * Set equalizer bands
     */
    public equalizer(bands: Band[]): this {
        this.filters.equalizer = bands as T['equalizer'];
        return this;
    }

    /**
     * Set karaoke filter
     */
    public karaoke(options?: karaokeOptions): this {
        this.filters.karaoke = options as T['karaoke'];
        return this;
    }

    /**
     * Set timescale filter
     */
    public timescale(options?: timescaleOptions): this {
        this.filters.timescale = options as T['timescale'];
        return this;
    }

    /**
     * Set tremolo filter
     */
    public tremolo(options?: tremoloOptions): this {
        this.filters.tremolo = options as T['tremolo'];
        return this;
    }

    /**
     * Set vibrato filter
     */
    public vibrato(options?: vibratoOptions): this {
        this.filters.vibrato = options as T['vibrato'];
        return this;
    }

    /**
     * Set rotation filter
     */
    public rotation(options?: rotationOptions): this {
        this.filters.rotation = options as T['rotation'];
        return this;
    }

    /**
     * Set distortion filter
     */
    public distortion(options?: distortionOptions): this {
        this.filters.distortion = options as T['distortion'];
        return this;
    }

    /**
     * Set channel mix filter
     */
    public channelMix(options?: channelMixOptions): this {
        this.filters.channelMix = options as T['channelMix'];
        return this;
    }

    /**
     * Set low pass filter
     */
    public lowPass(options?: lowPassOptions): this {
        this.filters.lowPass = options as T['lowPass'];
        return this;
    }

    /**
     * Apply a predefined preset
     */
    public preset(name: keyof FilterPresets | string): Result<this, Error> {
        const presetConfig = FilterBuilder.PRESETS[name];
        if (!presetConfig) {
            return err(new Error(`Unknown preset: ${name}`));
        }

        // Apply preset configuration
        Object.assign(this.filters, presetConfig);
        return ok(this);
    }

    /**
     * Add a custom preset
     */
    static addPreset(name: string, config: Partial<FiltersOptions>): void {
        FilterBuilder.PRESETS[name] = config;
    }

    /**
     * Get available presets
     */
    static getPresets(): string[] {
        return Object.keys(FilterBuilder.PRESETS);
    }

    /**
     * Merge with another filter configuration
     */
    public merge(other: Partial<T>): this {
        Object.assign(this.filters, other);
        return this;
    }

    /**
     * Reset all filters to default values
     */
    public reset(): this {
        this.filters = {};
        return this;
    }

    /**
     * Clone the current builder
     */
    public clone(): FilterBuilder<T> {
        const cloned = new FilterBuilder<T>();
        cloned.filters = { ...this.filters };
        cloned.validationRules = { ...this.validationRules };
        return cloned;
    }

    /**
     * Validate the current filter configuration
     */
    public validate(): boolean {
        for (const [key, value] of Object.entries(this.filters)) {
            const rule = this.validationRules[key as keyof T];
            if (!rule) continue;

            if (rule.required && (value === undefined || value === null)) {
                return false;
            }

            if (value !== undefined && value !== null) {
                if (typeof value === 'number') {
                    if (rule.min !== undefined && value < rule.min) return false;
                    if (rule.max !== undefined && value > rule.max) return false;
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
    public getValidationErrors(): string[] {
        const errors: string[] = [];

        for (const [key, value] of Object.entries(this.filters)) {
            const rule = this.validationRules[key as keyof T];
            if (!rule) continue;

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
    public build(): Result<Partial<T>, Error> {
        if (!this.validate()) {
            const errors = this.getValidationErrors();
            return err(new Error(`Filter validation failed: ${errors.join(', ')}`));
        }

        return ok({ ...this.filters });
    }

    /**
     * Get current filter state (without validation)
     */
    public getFilters(): Partial<T> {
        return { ...this.filters };
    }

    /**
     * Check if any filters are set
     */
    public isEmpty(): boolean {
        return Object.keys(this.filters).length === 0;
    }

    /**
     * Get a summary of applied filters
     */
    public getSummary(): string {
        const activeFilters = Object.keys(this.filters).filter(key => this.filters[key as keyof T] !== undefined);
        return activeFilters.length > 0 ? `Active filters: ${activeFilters.join(', ')}` : 'No filters applied';
    }
}