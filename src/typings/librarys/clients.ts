import { EventEmitter } from "node:stream";

export interface DiscordJSLikeClient {
    user: { id: string };
    guilds: {
        cache: Map<string, { shardId: number }>;
    };
    ws: {
        shards: Map<number, { send: (payload: unknown, important?: boolean) => void } & EventEmitter>;
    } & EventEmitter;
    once(event: 'ready', listener: () => void): void;
    on(event: 'raw', listener: (data: any) => void): void;
}

export interface ErisJSLikeClient {
    user: { id: string };
    guilds: Map<string, { shard: { id: number } }>;
    shards: Map<number, { sendWS: (op: number, d: any, important?: boolean) => void }>;
    once(event: 'ready', listener: () => void): void;
    on(event: 'rawWS', listener: (data: any) => void): void;
}

export interface OceanicJSLikeClient {
    user: { id: string };
    guilds: Map<string, { shard: { id: number } }>;
    shards: Map<number, { send: (op: number, d: any, important?: boolean) => void }>;
    once(event: 'ready', listener: () => void): void;
    on(event: 'packet', listener: (data: any) => void): void;
}