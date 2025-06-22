import AbstractLibraryClass from './AbstractLibraryClass';
import { NodeGroup } from "../typings/node";
import { AnyOtherPacket } from "../typings/librarys";
import { OceanicJSLikeClient } from "../typings/librarys/clients";
export declare class OceanicJS extends AbstractLibraryClass<OceanicJSLikeClient> {
    get userID(): string;
    shardID(guildId: string): number;
    sendPacket(shardId: number, payload: AnyOtherPacket, important?: boolean): void;
    listen(nodes: NodeGroup[]): void;
}
