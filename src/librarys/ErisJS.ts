import AbstractLibraryClass from "./AbstractLibraryClass";

import type { AnyOtherPacket } from "@t/librarys";

export class ErisJS extends AbstractLibraryClass {
    public get userID(): string {
        return this.client.user.id;
    };

    public sendPacket(shardId: number, payload: AnyOtherPacket, important: boolean = false): void {
        return this.client.shards.get(shardId)?.sendWS(payload.op, payload.d, important);
    };

    public listen(): void {
        this.client.on("rawWS", this.raw.bind(this));
    };
}