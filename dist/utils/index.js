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
    const allKeys = Object.keys(obj);
    for (const key of allKeys) {
        let newKey;
        if (/(?:[-_][a-z])/.test(key)) {
            newKey = key
                .toLowerCase()
                .replace(/(?:[-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', ''));
            obj[newKey] = obj[key];
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete obj[key];
        }
        ;
        if (newKey && typeof obj[newKey] !== 'object' && typeof obj[key] !== 'object')
            continue;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        newKey
            ? snakeToCamel(obj[newKey])
            : snakeToCamel(obj[key]);
    }
    return obj;
}
exports.snakeToCamel = snakeToCamel;
;
function camelToSnake(obj) {
    if (typeof obj !== 'object')
        return {};
    if (JSON.stringify(obj) === '{}')
        return {};
    const allKeys = Object.keys(obj);
    const regex = /^(?:[a-z]{1,})(?:_[a-z0-9]{1,})*$/;
    for (const key of allKeys) {
        let newKey;
        if (!regex.test(key)) {
            newKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
            obj[newKey] = obj[key];
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete obj[key];
        }
        if (newKey && typeof obj[newKey] !== 'object' && typeof obj[key] !== 'object')
            continue;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        newKey
            ? camelToSnake(obj[newKey])
            : camelToSnake(obj[key]);
    }
    return obj;
}
exports.camelToSnake = camelToSnake;
;
//# sourceMappingURL=index.js.map