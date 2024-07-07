import AbstractLibraryClass from "./AbstractLibraryClass";
import { NodeGroup } from "@t/node";
import { AnyOtherPacket } from "@t/librarys";
export declare class ErisJS extends AbstractLibraryClass {
    get userID(): string;
    sendPacket(shardId: number, payload: AnyOtherPacket, important?: boolean): void;
    listen(nodes: NodeGroup[]): void;
}
