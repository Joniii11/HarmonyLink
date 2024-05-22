import AbstractLibraryClass from "./AbstractLibraryClass";

import type { NodeGroup } from "@t/node";
import type { AnyOtherPacket } from "@t/librarys";

export class ErisJS extends AbstractLibraryClass {
    public get userID(): string {
        return this.client.user.id;
    };

    public sendPacket(shardId: number, payload: AnyOtherPacket, important: boolean = false): void {
        return this.client.shards.get(shardId)?.sendWS(payload.op, payload.d, important);
    };

    public listen(nodes: NodeGroup[]): void {
        this.client.once("ready", () => this.ready(nodes));

        this.client.on("rawWS", this.raw.bind(this));
    };
}