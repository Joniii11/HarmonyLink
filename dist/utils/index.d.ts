import { HarmonyLinkConfiguration } from "../typings/HarmonyLink";
import { NodeGroup, NodeOptions } from "../typings/node";
export declare function parseOptions(options: NodeGroup, harmonyLinkOptions: Omit<HarmonyLinkConfiguration, "nodes"> & {
    nodes?: NodeGroup[] | undefined;
}): Required<NodeOptions>;
export type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}` ? `${P1}${Uppercase<P2>}${CamelCase<P3>}` : S;
export type SnakeToCamel<T> = T extends Record<string, any> ? {
    [K in keyof T as K extends string ? CamelCase<K> : K]: T[K] extends Record<string, any> ? SnakeToCamel<T[K]> : T[K];
} : T;
export declare function snakeToCamel<T extends Record<string, any>>(obj: T): SnakeToCamel<T>;
export type SnakeCase<S extends string> = S extends `${infer P1}${infer P2}` ? P2 extends Uncapitalize<P2> ? `${Lowercase<P1>}${SnakeCase<P2>}` : `${Lowercase<P1>}_${SnakeCase<Uncapitalize<P2>>}` : S;
export type CamelToSnake<T> = T extends Record<string, any> ? {
    [K in keyof T as K extends string ? SnakeCase<K> : K]: T[K] extends Record<string, any> ? CamelToSnake<T[K]> : T[K];
} : T;
export declare function camelToSnake<T extends Record<string, any>>(obj: T): CamelToSnake<T>;
