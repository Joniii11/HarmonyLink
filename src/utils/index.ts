import { defaultOptions } from "@/constants/node";

import { HarmonyLinkConfiguration } from "@t/HarmonyLink";
import { NodeType, NodeGroup, NodeOptions } from "@t/node";

export function parseOptions(options: NodeGroup, harmonyLinkOptions: HarmonyLinkConfiguration): Required<NodeOptions> {
    return {
        name: options.name,
        host: options.host,
        port: options.port ?? 2333,
        password: options.password ?? "youshallnotpass",
        secure: options.secure ?? false,
        type: options.type ?? NodeType.LavaLinkV4,
        ...defaultOptions(harmonyLinkOptions)
    } satisfies Required<NodeGroup>
};

export function snakeToCamel<T>(obj: Record<string, any>): Record<string, unknown> | T  {
    if (typeof obj !== 'object') return {};
    if (JSON.stringify(obj) === '{}') return {};

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
        };

        if (newKey && typeof obj[newKey] !== 'object' && typeof obj[key] !== 'object') continue;

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        newKey
            ? snakeToCamel(obj[newKey] as Record<string, unknown>)
            : snakeToCamel(obj[key] as Record<string, unknown>);
    }
    
    return obj;
};

export function camelToSnake(obj: Record<string, unknown>): Record<string, unknown> {
    if (typeof obj !== 'object') return {};
    if (JSON.stringify(obj) === '{}') return {};

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
        
        if (newKey && typeof obj[newKey] !== 'object' && typeof obj[key] !== 'object') continue;

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        newKey
            ? camelToSnake(obj[newKey] as Record<string, unknown>)
            : camelToSnake(obj[key] as Record<string, unknown>);
    }
    return obj;
};