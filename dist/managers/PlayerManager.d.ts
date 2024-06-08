import { Player } from "@/player/Player";
import { HarmonyLink } from "@/HarmonyLink";
import { Snowflake } from "@/typings";
import { Node } from "@/node/Node";
import { PlayerOptions } from "@/typings/player";
export default class PlayerManager extends Map<Snowflake, Player> {
    readonly manager: HarmonyLink;
    constructor(manager: HarmonyLink);
    createPlayer(options: PlayerOptions): Promise<Player>;
    leastUsedNode(): Promise<Node>;
    private playerUpdateObject;
}
