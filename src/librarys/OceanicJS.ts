import AbstractLibraryClass from './AbstractLibraryClass';

import type { NodeGroup } from "@t/node";
import type { AnyOtherPacket } from '@t/librarys';

export class OceanicJS extends AbstractLibraryClass {
    public get userID(): string {
        return this.client.user.id;
    };

    public sendPacket(shardId: number, payload: AnyOtherPacket, important: boolean = false): void {
        return this.client.shards.get(shardId)?.send(payload.op, payload.d, important);
    };

    public listen(nodes: NodeGroup[]): void {
        this.client.once("ready", () => this.ready(nodes))
        
        this.client.on("packet", this.raw.bind(this));
    };
}