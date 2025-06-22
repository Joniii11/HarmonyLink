import { HarmonyLink } from "@/HarmonyLink";
import { Result, ok, err } from 'neverthrow';

/**
 * Plugin error types for better error handling
 */
export enum PluginErrorType {
    ALREADY_LOADED = 'ALREADY_LOADED',
    NOT_LOADED = 'NOT_LOADED',
    DISABLED = 'DISABLED',
    INCOMPATIBLE_VERSION = 'INCOMPATIBLE_VERSION',
    MISSING_DEPENDENCIES = 'MISSING_DEPENDENCIES',
    LOAD_FAILED = 'LOAD_FAILED',
    UNLOAD_FAILED = 'UNLOAD_FAILED',
    CONFIG_INVALID = 'CONFIG_INVALID'
}

export class PluginError extends Error {
    constructor(
        public readonly type: PluginErrorType,
        message: string,
        public readonly pluginName?: string,
        public readonly cause?: Error
    ) {
        super(message);
        this.name = 'PluginError';
    }
}

/**
 * Plugin metadata interface for better type safety
 */
export interface PluginMetadata {
    readonly name: string;
    readonly version: string;
    readonly author: string;
    readonly description?: string;
    readonly dependencies?: readonly string[];
    readonly compatibleVersions?: readonly string[];
}

/**
 * Plugin lifecycle hooks for better extensibility
 */
export interface PluginHooks {
    onLoad?(manager: HarmonyLink): Promise<Result<void, PluginError>> | Result<void, PluginError>;
    onUnload?(manager: HarmonyLink): Promise<Result<void, PluginError>> | Result<void, PluginError>;
    onPlayerCreate?(playerId: string): Promise<Result<void, PluginError>> | Result<void, PluginError>;
    onPlayerDestroy?(playerId: string): Promise<Result<void, PluginError>> | Result<void, PluginError>;
    onTrackStart?(playerId: string, track: any): Promise<Result<void, PluginError>> | Result<void, PluginError>;
    onTrackEnd?(playerId: string, track: any): Promise<Result<void, PluginError>> | Result<void, PluginError>;
}

/**
 * Plugin configuration interface
 */
export interface PluginConfig {
    enabled: boolean;
    [key: string]: any;
}

/**
 * Enhanced abstract plugin class with better typing and lifecycle management
 */
export abstract class AbstractPlugin<TConfig extends PluginConfig = PluginConfig> {
    /**
     * Plugin metadata - readonly for immutability
     */
    public abstract readonly metadata: PluginMetadata;

    /**
     * The HarmonyLink instance that the plugin interacts with
     */
    public manager: HarmonyLink | undefined;

    /**
     * Plugin configuration with type safety
     */
    protected config: TConfig;

    /**
     * Plugin initialization state
     */
    private _isLoaded: boolean = false;

    constructor(config: TConfig) {
        this.config = config;
    }

    /**
     * Get plugin metadata safely
     */
    public get name(): string {
        return this.metadata.name;
    }

    public get version(): string {
        return this.metadata.version;
    }

    public get author(): string {
        return this.metadata.author;
    }

    public get description(): string | undefined {
        return this.metadata.description;
    }

    public get isLoaded(): boolean {
        return this._isLoaded;
    }

    /**
     * Main plugin initialization method with Result type
     * @param manager The HarmonyLink instance
     */
    public async initialize(manager: HarmonyLink): Promise<Result<void, PluginError>> {
        if (this._isLoaded) {
            return err(new PluginError(
                PluginErrorType.ALREADY_LOADED,
                `Plugin ${this.name} is already loaded`,
                this.name
            ));
        }

        if (!this.config.enabled) {
            return err(new PluginError(
                PluginErrorType.DISABLED,
                `Plugin ${this.name} is disabled`,
                this.name
            ));
        }

        // Check compatibility
        // eslint-disable-next-line neverthrow/must-use-result
        const compatibilityResult = this.validateCompatibility(manager.version);
        if (compatibilityResult.isErr()) {
            return err(compatibilityResult.error);
        }

        this.manager = manager;

        try {
            const loadResult = await this.load(manager);
            if (loadResult.isErr()) {
                return err(new PluginError(
                    PluginErrorType.LOAD_FAILED,
                    `Failed to load plugin ${this.name}: ${loadResult.error.message}`,
                    this.name,
                    loadResult.error
                ));
            }

            this._isLoaded = true;
            console.log(`Plugin ${this.name} v${this.version} loaded successfully`);
            return ok(undefined);
        } catch (error) {
            const pluginError = new PluginError(
                PluginErrorType.LOAD_FAILED,
                `Failed to load plugin ${this.name}: ${error instanceof Error ? error.message : String(error)}`,
                this.name,
                error instanceof Error ? error : undefined
            );
            return err(pluginError);
        }
    }

    /**
     * Plugin cleanup method with Result type
     */
    public async shutdown(): Promise<Result<void, PluginError>> {
        if (!this._isLoaded || !this.manager) {
            return err(new PluginError(
                PluginErrorType.NOT_LOADED,
                `Plugin ${this.name} is not loaded`,
                this.name
            ));
        }

        try {
            const unloadResult = await this.unload(this.manager);
            if (unloadResult.isErr()) {
                return err(new PluginError(
                    PluginErrorType.UNLOAD_FAILED,
                    `Failed to unload plugin ${this.name}: ${unloadResult.error.message}`,
                    this.name,
                    unloadResult.error
                ));
            }

            this._isLoaded = false;
            this.manager = undefined;
            console.log(`Plugin ${this.name} unloaded successfully`);
            return ok(undefined);
        } catch (error) {
            const pluginError = new PluginError(
                PluginErrorType.UNLOAD_FAILED,
                `Failed to unload plugin ${this.name}: ${error instanceof Error ? error.message : String(error)}`,
                this.name,
                error instanceof Error ? error : undefined
            );
            return err(pluginError);
        }
    }

    /**
     * Update plugin configuration with validation
     */
    public updateConfig(newConfig: Partial<TConfig>): Result<void, PluginError> {
        try {
            // eslint-disable-next-line neverthrow/must-use-result
            const validationResult = this.validateConfig({ ...this.config, ...newConfig });
            if (validationResult.isErr()) {
                return err(validationResult.error);
            }

            this.config = { ...this.config, ...newConfig };
            this.onConfigUpdate?.(this.config);
            return ok(undefined);
        } catch (error) {
            return err(new PluginError(
                PluginErrorType.CONFIG_INVALID,
                `Invalid configuration for plugin ${this.name}: ${error instanceof Error ? error.message : String(error)}`,
                this.name,
                error instanceof Error ? error : undefined
            ));
        }
    }

    /**
     * Get current configuration
     */
    public getConfig(): Readonly<TConfig> {
        return { ...this.config };
    }

    /**
     * Validate plugin compatibility with Result type
     */
    public validateCompatibility(harmonyLinkVersion: string): Result<void, PluginError> {
        if (!this.metadata.compatibleVersions || this.metadata.compatibleVersions.length === 0) {
            return ok(undefined); // Assume compatible if not specified
        }

        if (!this.metadata.compatibleVersions.includes(harmonyLinkVersion)) {
            return err(new PluginError(
                PluginErrorType.INCOMPATIBLE_VERSION,
                `Plugin ${this.name} is not compatible with HarmonyLink v${harmonyLinkVersion}. Compatible versions: ${this.metadata.compatibleVersions.join(', ')}`,
                this.name
            ));
        }

        return ok(undefined);
    }

    /**
     * Check if all dependencies are satisfied with Result type
     */
    public validateDependencies(availablePlugins: readonly string[]): Result<void, PluginError> {
        if (!this.metadata.dependencies || this.metadata.dependencies.length === 0) {
            return ok(undefined);
        }

        const missingDeps = this.metadata.dependencies.filter(dep => !availablePlugins.includes(dep));
        if (missingDeps.length > 0) {
            return err(new PluginError(
                PluginErrorType.MISSING_DEPENDENCIES,
                `Plugin ${this.name} has missing dependencies: ${missingDeps.join(', ')}`,
                this.name
            ));
        }

        return ok(undefined);
    }

    /**
     * Validate plugin configuration (override in derived classes)
     */
    protected validateConfig(config: TConfig): Result<void, PluginError> {
        if (typeof config.enabled !== 'boolean') {
            return err(new PluginError(
                PluginErrorType.CONFIG_INVALID,
                'enabled property must be a boolean',
                this.name
            ));
        }
        return ok(undefined);
    }

    // Abstract methods that plugins must implement with Result types
    protected abstract load(manager: HarmonyLink): Promise<Result<void, PluginError>>;
    protected abstract unload(manager: HarmonyLink): Promise<Result<void, PluginError>>;

    // Optional lifecycle hooks
    protected onConfigUpdate?(config: TConfig): void;
}

/**
 * Utility type for creating strongly-typed plugin classes
 */
export type PluginConstructor<T extends AbstractPlugin = AbstractPlugin> = new (config: any) => T;

/**
 * Plugin registry interface with Result types
 */
export interface PluginRegistry {
    register<T extends AbstractPlugin>(
        name: string, 
        pluginConstructor: PluginConstructor<T>, 
        config: PluginConfig
    ): Result<void, PluginError>;
    
    unregister(name: string): Result<void, PluginError>;
    
    get<T extends AbstractPlugin = AbstractPlugin>(name: string): T | undefined;
    
    getAll(): readonly AbstractPlugin[];
    
    loadAll(manager: HarmonyLink): Promise<Result<void, PluginError[]>>;
    
    unloadAll(): Promise<Result<void, PluginError[]>>;
}