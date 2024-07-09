import AbstractLibraryClass from "./AbstractLibraryClass";
import { NodeGroup } from "../typings/node";
import { AnyOtherPacket } from "../typings/librarys";
export declare class ErisJS extends AbstractLibraryClass {
    get userID(): string;
    shardID(guildId: string): number;
    sendPacket(shardId: number, payload: AnyOtherPacket, important?: boolean): void;
    listen(nodes: NodeGroup[]): void;
}
