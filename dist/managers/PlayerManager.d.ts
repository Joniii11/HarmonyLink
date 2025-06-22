import { Player } from "../player/Player";
import { HarmonyLink } from "../HarmonyLink";
import { Snowflake } from "../typings";
import { Node } from "../node/Node";
import { PlayerOptions } from "../typings/player";
import { Result } from 'neverthrow';
export default class PlayerManager extends Map<Snowflake, Player> {
    readonly manager: HarmonyLink;
    constructor(manager: HarmonyLink);
    createPlayer(options: PlayerOptions): Promise<Result<Player, Error>>;
    removePlayer(guildId: string): Promise<Result<Player, Error>>;
    leastUsedNode(): Promise<Result<Node, Error>>;
    private playerUpdateObject;
}
