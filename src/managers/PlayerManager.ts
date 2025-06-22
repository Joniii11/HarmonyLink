import { Player } from "@/player/Player";

import { HarmonyLink } from "@/HarmonyLink";
import { Snowflake } from "@/typings";
import { Node } from "@/node/Node";
import { PlayerConnectionState, PlayerOptions } from "@/typings/player";
import { ConnectionOptions, DiscordVoiceStates } from "@/typings/player/connection";
import { UpdatePlayerInfo } from "@/typings/node/rest";
import { Result, err, ok } from 'neverthrow';
export default class PlayerManager extends Map<Snowflake, Player> {
    public readonly manager: HarmonyLink;
    
    public constructor(manager: HarmonyLink) {
        super();
        this.manager = manager;
    };

    public async createPlayer(options: PlayerOptions): Promise<Result<Player, Error>> {
        if (this.has(options.guildId)) return ok(this.get(options.guildId)!);
        
        const node = options.node ?? (await this.leastUsedNode()).unwrapOr(null)
        if (!node) return err(new Error("[HarmonyLink] [PlayerManager] No nodes available to create a player."));

        let newPlayer = new Player(this.manager, node, options)

        this.set(options.guildId, newPlayer);        
        
        const newPlayerResult = await newPlayer.connect();

        if (newPlayerResult.isErr()) {
            this.delete(options.guildId);
            return err(new Error(`[HarmonyLink] [PlayerManager] Failed to create player for guild ${options.guildId} on node ${node.options.name}. Error: ${newPlayerResult.error}`));
        }

        newPlayer = newPlayerResult.value;

        const onUpdate = async (state: DiscordVoiceStates): Promise<void> => {
            if (state !== DiscordVoiceStates.SESSION_READY) return;

            await newPlayer.node.rest.updatePlayer(this.playerUpdateObject(options.guildId, newPlayer.ConnectionHandler.options))
        };

        await newPlayer.node.rest.updatePlayer(this.playerUpdateObject(options.guildId, newPlayer.ConnectionHandler.options))

        newPlayer.on("connectionUpdate", onUpdate);
        newPlayer.state = PlayerConnectionState.CONNECTED

        this.manager.emit("debug", `[HarmonyLink] [PlayerManager] Created a new player for guild ${options.guildId} on node ${node.options.name}.`);

        return ok(newPlayer);
    };

    public async removePlayer(guildId: string): Promise<Result<Player, Error>> {
        const player = this.get(guildId);
        if (!player) return err(new Error(`[HarmonyLink] [PlayerManager] No player found for guild ${guildId}.`));

        await player.destroy();
        this.delete(guildId);

        return ok(player);
    };

    public async leastUsedNode(): Promise<Result<Node, Error>> {
        return await this.manager.nodeManager.getLeastUsedNode() ?? ok(this.manager.nodeManager.allNodes[Math.floor(Math.random() * this.manager.nodeManager.allNodes.length)])
    };

    // eslint-disable-next-line class-methods-use-this
    private playerUpdateObject(guildId: string, options: ConnectionOptions): UpdatePlayerInfo {
        return {
            guildId,
            playerOptions: {
                voice: {
                    endpoint: options.voice.endpoint!,
                    token: options.voice.token!,
                    sessionId: options.voice.sessionId!,
                }
            }
        };
    }
}