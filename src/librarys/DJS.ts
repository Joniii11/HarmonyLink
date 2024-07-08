import AbstractLibraryClass from "./AbstractLibraryClass";

import { NodeGroup } from "@t/node";
import { AnyOtherPacket } from "@t/librarys";

export class DJSLibrary extends AbstractLibraryClass {
    public get userID(): string {
        return this.client.user.id;
    };

    public shardID(guildId: string): number {
        return this.client.guilds.cache.get(guildId)?.shardId
    };

    public sendPacket(shardId: number, payload: AnyOtherPacket, important: boolean = false): void {
        return this.client.ws.shards.get(shardId)?.send(payload, important);
    };

    public listen(nodes: NodeGroup[]): void {
        this.client.once("ready", async () => this.ready(nodes))

        // Getting the raw data from the gateway
        this.client.on("raw", this.raw.bind(this));
    };
}