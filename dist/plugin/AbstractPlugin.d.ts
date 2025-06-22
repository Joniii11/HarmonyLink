import { HarmonyLink } from "../HarmonyLink";
import { Result } from 'neverthrow';
/**
 * Plugin error types for better error handling
 */
export declare enum PluginErrorType {
    ALREADY_LOADED = "ALREADY_LOADED",
    NOT_LOADED = "NOT_LOADED",
    DISABLED = "DISABLED",
    INCOMPATIBLE_VERSION = "INCOMPATIBLE_VERSION",
    MISSING_DEPENDENCIES = "MISSING_DEPENDENCIES",
    LOAD_FAILED = "LOAD_FAILED",
    UNLOAD_FAILED = "UNLOAD_FAILED",
    CONFIG_INVALID = "CONFIG_INVALID"
}
export declare class PluginError extends Error {
    readonly type: PluginErrorType;
    readonly pluginName?: string | undefined;
    readonly cause?: Error | undefined;
    constructor(type: PluginErrorType, message: string, pluginName?: string | undefined, cause?: Error | undefined);
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
export declare abstract class AbstractPlugin<TConfig extends PluginConfig = PluginConfig> {
    /**
     * Plugin metadata - readonly for immutability
     */
    abstract readonly metadata: PluginMetadata;
    /**
     * The HarmonyLink instance that the plugin interacts with
     */
    manager: HarmonyLink | undefined;
    /**
     * Plugin configuration with type safety
     */
    protected config: TConfig;
    /**
     * Plugin initialization state
     */
    private _isLoaded;
    constructor(config: TConfig);
    /**
     * Get plugin metadata safely
     */
    get name(): string;
    get version(): string;
    get author(): string;
    get description(): string | undefined;
    get isLoaded(): boolean;
    /**
     * Main plugin initialization method with Result type
     * @param manager The HarmonyLink instance
     */
    initialize(manager: HarmonyLink): Promise<Result<void, PluginError>>;
    /**
     * Plugin cleanup method with Result type
     */
    shutdown(): Promise<Result<void, PluginError>>;
    /**
     * Update plugin configuration with validation
     */
    updateConfig(newConfig: Partial<TConfig>): Result<void, PluginError>;
    /**
     * Get current configuration
     */
    getConfig(): Readonly<TConfig>;
    /**
     * Validate plugin compatibility with Result type
     */
    validateCompatibility(harmonyLinkVersion: string): Result<void, PluginError>;
    /**
     * Check if all dependencies are satisfied with Result type
     */
    validateDependencies(availablePlugins: readonly string[]): Result<void, PluginError>;
    /**
     * Validate plugin configuration (override in derived classes)
     */
    protected validateConfig(config: TConfig): Result<void, PluginError>;
    protected abstract load(manager: HarmonyLink): Promise<Result<void, PluginError>>;
    protected abstract unload(manager: HarmonyLink): Promise<Result<void, PluginError>>;
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
    register<T extends AbstractPlugin>(name: string, pluginConstructor: PluginConstructor<T>, config: PluginConfig): Result<void, PluginError>;
    unregister(name: string): Result<void, PluginError>;
    get<T extends AbstractPlugin = AbstractPlugin>(name: string): T | undefined;
    getAll(): readonly AbstractPlugin[];
    loadAll(manager: HarmonyLink): Promise<Result<void, PluginError[]>>;
    unloadAll(): Promise<Result<void, PluginError[]>>;
}
