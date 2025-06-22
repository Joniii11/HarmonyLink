import AbstractLibraryClass from './AbstractLibraryClass';

import { NodeGroup } from "@t/node";
import { AnyOtherPacket } from '@t/librarys';
import { OceanicJSLikeClient } from '@/typings/librarys/clients';

export class OceanicJS extends AbstractLibraryClass<OceanicJSLikeClient> {
    public get userID(): string {
        return this.client.user.id;
    };

    public shardID(guildId: string): number {
        return this.client.guilds.get(guildId)?.shard.id ?? 0;
    }

    public sendPacket(shardId: number, payload: AnyOtherPacket, important: boolean = false): void {
        return this.client.shards.get(shardId)?.send(payload.op, payload.d, important);
    };

    public listen(nodes: NodeGroup[]): void {
        this.client.once("ready", () => this.ready(nodes))
        
        this.client.on("packet", this.raw.bind(this));
    };
}