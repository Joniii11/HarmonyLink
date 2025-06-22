import { defaultOptions } from "@/constants/node";

import { HarmonyLinkConfiguration } from "@t/HarmonyLink";
import { NodeType, NodeGroup, NodeOptions } from "@t/node";

export function parseOptions(options: NodeGroup, harmonyLinkOptions: Omit<HarmonyLinkConfiguration, "nodes"> & { nodes?: NodeGroup[] | undefined; }): Required<NodeOptions> {
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


export type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${P1}${Uppercase<P2>}${CamelCase<P3>}`
    : S;

export type SnakeToCamel<T> = T extends Record<string, any> ? {
    [K in keyof T as K extends string ? CamelCase<K> : K]: T[K] extends Record<string, any> 
        ? SnakeToCamel<T[K]> 
        : T[K]
} : T;

export function snakeToCamel<T extends Record<string, any>>(obj: T): SnakeToCamel<T> {
    if (typeof obj !== 'object') return {} as SnakeToCamel<T>;
    if (JSON.stringify(obj) === '{}') return {} as SnakeToCamel<T>;

    const result = { ...obj } as any;
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
        };

        if (newKey && typeof obj[newKey] !== 'object' && typeof obj[key] !== 'object') continue;

        if (newKey) {
            snakeToCamel(obj[newKey] as Record<string, unknown>);
        } else {
            snakeToCamel(obj[key] as Record<string, unknown>);
        }
    }
    
    return result as SnakeToCamel<T>;
};

export type SnakeCase<S extends string> = S extends `${infer P1}${infer P2}`
    ? P2 extends Uncapitalize<P2>
        ? `${Lowercase<P1>}${SnakeCase<P2>}`
        : `${Lowercase<P1>}_${SnakeCase<Uncapitalize<P2>>}`
    : S;

export type CamelToSnake<T> = T extends Record<string, any> ? {
    [K in keyof T as K extends string ? SnakeCase<K> : K]: T[K] extends Record<string, any> 
        ? CamelToSnake<T[K]> 
        : T[K]
} : T;

export function camelToSnake<T extends Record<string, any>>(obj: T): CamelToSnake<T> {
    if (typeof obj !== 'object') return {} as CamelToSnake<T>;
    if (JSON.stringify(obj) === '{}') return {} as CamelToSnake<T>;

    const result = { ...obj } as any;
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
        
        if (newKey && typeof result[newKey] !== 'object' && typeof result[key] !== 'object') continue;

        if (newKey) {
            result[newKey] = camelToSnake(result[newKey] as Record<string, unknown>);
        } else if (typeof result[key] === 'object' && result[key] !== null) {
            result[key] = camelToSnake(result[key] as Record<string, unknown>);
        }
    }
    return result as CamelToSnake<T>;
};