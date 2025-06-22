"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelToSnake = exports.snakeToCamel = exports.parseOptions = void 0;
const node_1 = require("../constants/node");
const node_2 = require("../typings/node");
function parseOptions(options, harmonyLinkOptions) {
    return {
        name: options.name,
        host: options.host,
        port: options.port ?? 2333,
        password: options.password ?? "youshallnotpass",
        secure: options.secure ?? false,
        type: options.type ?? node_2.NodeType.LavaLinkV4,
        ...(0, node_1.defaultOptions)(harmonyLinkOptions)
    };
}
exports.parseOptions = parseOptions;
;
function snakeToCamel(obj) {
    if (typeof obj !== 'object')
        return {};
    if (JSON.stringify(obj) === '{}')
        return {};
    const result = { ...obj };
    const allKeys = Object.keys(obj);
    for (const key of allKeys) {
        let newKey;
        if (/(?:[-_][a-z])/.test(key)) {
            newKey = key
                .toLowerCase()
                .replace(/(?:[-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', ''));
            result[newKey] = result[key];
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete result[key];
        }
        ;
        if (newKey && typeof obj[newKey] !== 'object' && typeof obj[key] !== 'object')
            continue;
        if (newKey) {
            snakeToCamel(obj[newKey]);
        }
        else {
            snakeToCamel(obj[key]);
        }
    }
    return result;
}
exports.snakeToCamel = snakeToCamel;
;
function camelToSnake(obj) {
    if (typeof obj !== 'object')
        return {};
    if (JSON.stringify(obj) === '{}')
        return {};
    const result = { ...obj };
    const allKeys = Object.keys(result);
    const regex = /^(?:[a-z]{1,})(?:_[a-z0-9]{1,})*$/;
    for (const key of allKeys) {
        let newKey;
        if (!regex.test(key)) {
            newKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
            result[newKey] = result[key];
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete result[key];
        }
        if (newKey && typeof result[newKey] !== 'object' && typeof result[key] !== 'object')
            continue;
        if (newKey) {
            result[newKey] = camelToSnake(result[newKey]);
        }
        else if (typeof result[key] === 'object' && result[key] !== null) {
            result[key] = camelToSnake(result[key]);
        }
    }
    return result;
}
exports.camelToSnake = camelToSnake;
;
//# sourceMappingURL=index.js.map