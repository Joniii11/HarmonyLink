import AbstractLibraryClass from "./AbstractLibraryClass";

import { NodeGroup } from "@t/node";
import { AnyOtherPacket } from "@t/librarys";

export class ErisJS extends AbstractLibraryClass {
    public get userID(): string {
        return this.client.user.id;
    };

    public shardID(guildId: string): number {
        return this.client.guilds.get(guildId)?.shard.id;
    };

    public sendPacket(shardId: number, payload: AnyOtherPacket, important: boolean = false): void {
        return this.client.shards.get(shardId)?.sendWS(payload.op, payload.d, important);
    };

    public listen(nodes: NodeGroup[]): void {
        this.client.once("ready", () => this.ready(nodes));

        this.client.on("rawWS", this.raw.bind(this));
    };
}