import AbstractLibraryClass from "./AbstractLibraryClass";
import { NodeGroup } from "../typings/node";
import { AnyOtherPacket } from "../typings/librarys";
export declare class DJSLibrary extends AbstractLibraryClass {
    get userID(): string;
    sendPacket(shardId: number, payload: AnyOtherPacket, important?: boolean): void;
    listen(nodes: NodeGroup[]): void;
}
