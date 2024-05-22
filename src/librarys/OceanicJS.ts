import AbstractLibraryClass from './AbstractLibraryClass';

import type { AnyOtherPacket } from '@t/librarys';

export class OceanicJS extends AbstractLibraryClass {
    public get userID(): string {
        return this.client.user.id;
    };

    public sendPacket(shardId: number, payload: AnyOtherPacket, important: boolean = false): void {
        return this.client.shards.get(shardId)?.send(payload.op, payload.d, important);
    };

    public listen(): void {
        this.client.on('packet', this.raw.bind(this));
    };
}