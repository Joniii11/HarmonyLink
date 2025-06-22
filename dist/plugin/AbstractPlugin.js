"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractPlugin = exports.PluginError = exports.PluginErrorType = void 0;
const neverthrow_1 = require("neverthrow");
/**
 * Plugin error types for better error handling
 */
var PluginErrorType;
(function (PluginErrorType) {
    PluginErrorType["ALREADY_LOADED"] = "ALREADY_LOADED";
    PluginErrorType["NOT_LOADED"] = "NOT_LOADED";
    PluginErrorType["DISABLED"] = "DISABLED";
    PluginErrorType["INCOMPATIBLE_VERSION"] = "INCOMPATIBLE_VERSION";
    PluginErrorType["MISSING_DEPENDENCIES"] = "MISSING_DEPENDENCIES";
    PluginErrorType["LOAD_FAILED"] = "LOAD_FAILED";
    PluginErrorType["UNLOAD_FAILED"] = "UNLOAD_FAILED";
    PluginErrorType["CONFIG_INVALID"] = "CONFIG_INVALID";
})(PluginErrorType || (exports.PluginErrorType = PluginErrorType = {}));
class PluginError extends Error {
    type;
    pluginName;
    cause;
    constructor(type, message, pluginName, cause) {
        super(message);
        this.type = type;
        this.pluginName = pluginName;
        this.cause = cause;
        this.name = 'PluginError';
    }
}
exports.PluginError = PluginError;
/**
 * Enhanced abstract plugin class with better typing and lifecycle management
 */
class AbstractPlugin {
    /**
     * The HarmonyLink instance that the plugin interacts with
     */
    manager;
    /**
     * Plugin configuration with type safety
     */
    config;
    /**
     * Plugin initialization state
     */
    _isLoaded = false;
    constructor(config) {
        this.config = config;
    }
    /**
     * Get plugin metadata safely
     */
    get name() {
        return this.metadata.name;
    }
    get version() {
        return this.metadata.version;
    }
    get author() {
        return this.metadata.author;
    }
    get description() {
        return this.metadata.description;
    }
    get isLoaded() {
        return this._isLoaded;
    }
    /**
     * Main plugin initialization method with Result type
     * @param manager The HarmonyLink instance
     */
    async initialize(manager) {
        if (this._isLoaded) {
            return (0, neverthrow_1.err)(new PluginError(PluginErrorType.ALREADY_LOADED, `Plugin ${this.name} is already loaded`, this.name));
        }
        if (!this.config.enabled) {
            return (0, neverthrow_1.err)(new PluginError(PluginErrorType.DISABLED, `Plugin ${this.name} is disabled`, this.name));
        }
        // Check compatibility
        // eslint-disable-next-line neverthrow/must-use-result
        const compatibilityResult = this.validateCompatibility(manager.version);
        if (compatibilityResult.isErr()) {
            return (0, neverthrow_1.err)(compatibilityResult.error);
        }
        this.manager = manager;
        try {
            const loadResult = await this.load(manager);
            if (loadResult.isErr()) {
                return (0, neverthrow_1.err)(new PluginError(PluginErrorType.LOAD_FAILED, `Failed to load plugin ${this.name}: ${loadResult.error.message}`, this.name, loadResult.error));
            }
            this._isLoaded = true;
            console.log(`Plugin ${this.name} v${this.version} loaded successfully`);
            return (0, neverthrow_1.ok)(undefined);
        }
        catch (error) {
            const pluginError = new PluginError(PluginErrorType.LOAD_FAILED, `Failed to load plugin ${this.name}: ${error instanceof Error ? error.message : String(error)}`, this.name, error instanceof Error ? error : undefined);
            return (0, neverthrow_1.err)(pluginError);
        }
    }
    /**
     * Plugin cleanup method with Result type
     */
    async shutdown() {
        if (!this._isLoaded || !this.manager) {
            return (0, neverthrow_1.err)(new PluginError(PluginErrorType.NOT_LOADED, `Plugin ${this.name} is not loaded`, this.name));
        }
        try {
            const unloadResult = await this.unload(this.manager);
            if (unloadResult.isErr()) {
                return (0, neverthrow_1.err)(new PluginError(PluginErrorType.UNLOAD_FAILED, `Failed to unload plugin ${this.name}: ${unloadResult.error.message}`, this.name, unloadResult.error));
            }
            this._isLoaded = false;
            this.manager = undefined;
            console.log(`Plugin ${this.name} unloaded successfully`);
            return (0, neverthrow_1.ok)(undefined);
        }
        catch (error) {
            const pluginError = new PluginError(PluginErrorType.UNLOAD_FAILED, `Failed to unload plugin ${this.name}: ${error instanceof Error ? error.message : String(error)}`, this.name, error instanceof Error ? error : undefined);
            return (0, neverthrow_1.err)(pluginError);
        }
    }
    /**
     * Update plugin configuration with validation
     */
    updateConfig(newConfig) {
        try {
            // eslint-disable-next-line neverthrow/must-use-result
            const validationResult = this.validateConfig({ ...this.config, ...newConfig });
            if (validationResult.isErr()) {
                return (0, neverthrow_1.err)(validationResult.error);
            }
            this.config = { ...this.config, ...newConfig };
            this.onConfigUpdate?.(this.config);
            return (0, neverthrow_1.ok)(undefined);
        }
        catch (error) {
            return (0, neverthrow_1.err)(new PluginError(PluginErrorType.CONFIG_INVALID, `Invalid configuration for plugin ${this.name}: ${error instanceof Error ? error.message : String(error)}`, this.name, error instanceof Error ? error : undefined));
        }
    }
    /**
     * Get current configuration
     */
    getConfig() {
        return { ...this.config };
    }
    /**
     * Validate plugin compatibility with Result type
     */
    validateCompatibility(harmonyLinkVersion) {
        if (!this.metadata.compatibleVersions || this.metadata.compatibleVersions.length === 0) {
            return (0, neverthrow_1.ok)(undefined); // Assume compatible if not specified
        }
        if (!this.metadata.compatibleVersions.includes(harmonyLinkVersion)) {
            return (0, neverthrow_1.err)(new PluginError(PluginErrorType.INCOMPATIBLE_VERSION, `Plugin ${this.name} is not compatible with HarmonyLink v${harmonyLinkVersion}. Compatible versions: ${this.metadata.compatibleVersions.join(', ')}`, this.name));
        }
        return (0, neverthrow_1.ok)(undefined);
    }
    /**
     * Check if all dependencies are satisfied with Result type
     */
    validateDependencies(availablePlugins) {
        if (!this.metadata.dependencies || this.metadata.dependencies.length === 0) {
            return (0, neverthrow_1.ok)(undefined);
        }
        const missingDeps = this.metadata.dependencies.filter(dep => !availablePlugins.includes(dep));
        if (missingDeps.length > 0) {
            return (0, neverthrow_1.err)(new PluginError(PluginErrorType.MISSING_DEPENDENCIES, `Plugin ${this.name} has missing dependencies: ${missingDeps.join(', ')}`, this.name));
        }
        return (0, neverthrow_1.ok)(undefined);
    }
    /**
     * Validate plugin configuration (override in derived classes)
     */
    validateConfig(config) {
        if (typeof config.enabled !== 'boolean') {
            return (0, neverthrow_1.err)(new PluginError(PluginErrorType.CONFIG_INVALID, 'enabled property must be a boolean', this.name));
        }
        return (0, neverthrow_1.ok)(undefined);
    }
}
exports.AbstractPlugin = AbstractPlugin;
//# sourceMappingURL=AbstractPlugin.js.map