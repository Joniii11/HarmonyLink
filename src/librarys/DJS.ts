import AbstractLibraryClass from "./AbstractLibraryClass";

import type { AnyOtherPacket } from "@t/librarys";

export class DJSLibrary extends AbstractLibraryClass {
    public get userID(): string {
        return this.client.user.id;
    };

    public sendPacket(shardId: number, payload: AnyOtherPacket, important: boolean = false): void {
        return this.client.ws.shards.get(shardId)?.send(payload, important);
    };

    public listen(): void {
        this.client.on("raw", this.raw.bind(this));
    };
}