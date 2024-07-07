"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOptions = void 0;
const defaultOptions = (harmoyLinkConfiguration) => {
    const { reconnectTimeout, reconnectTries, resumeTimeout } = harmoyLinkConfiguration;
    return {
        reconnectAttemptTimeout: null,
        reconnectTries: reconnectTries ?? 5,
        currentAttempts: 0,
        reconnectTimeout: reconnectTimeout ?? 5000,
        resumeTimeout: resumeTimeout ?? 60
    };
};
exports.defaultOptions = defaultOptions;
//# sourceMappingURL=node.js.map