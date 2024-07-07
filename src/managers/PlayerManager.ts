import { Player } from "@/player/Player";

import { HarmonyLink } from "@/HarmonyLink";
import { Snowflake } from "@/typings";
import { Node } from "@/node/Node";
import { PlayerConnectionState, PlayerOptions } from "@/typings/player";
import { ConnectionOptions, DiscordVoiceStates } from "@/typings/player/connection";
import { UpdatePlayerInfo } from "@/typings/node/rest";
export default class PlayerManager extends Map<Snowflake, Player> {
    public readonly manager: HarmonyLink;
    
    public constructor(manager: HarmonyLink) {
        super();
        this.manager = manager;
    };

    public async createPlayer(options: PlayerOptions): Promise<Player> {
        if (this.has(options.guildId)) return this.get(options.guildId)!;
        
        const node = options.node ?? await this.leastUsedNode()
        let newPlayer = new Player(this.manager, node, options)

        this.set(options.guildId, newPlayer);

        try {
            newPlayer = await newPlayer.connect()
        } catch (err) {
            this.delete(options.guildId)

            throw err
        };

        const onUpdate = async (state: DiscordVoiceStates): Promise<void> => {
            if (state !== DiscordVoiceStates.SESSION_READY) return;

            await newPlayer.node.rest.updatePlayer(this.playerUpdateObject(options.guildId, newPlayer.ConnectionHandler.options))
        };

        await newPlayer.node.rest.updatePlayer(this.playerUpdateObject(options.guildId, newPlayer.ConnectionHandler.options))

        newPlayer.on("connectionUpdate", onUpdate);
        newPlayer.state = PlayerConnectionState.CONNECTED

        this.manager.emit("debug", `[HarmonyLink] [PlayerManager] Created a new player for guild ${options.guildId} on node ${node.options.name}.`);

        return newPlayer;
    };

    public async removePlayer(guildId: string): Promise<Player | null> {
        const player = this.get(guildId);
        if (!player) return null;

        await player.destroy();
        this.delete(guildId);
        return player;
    };

    public async leastUsedNode(): Promise<Node> {
        return await this.manager.nodeManager.getLeastUsedNode() as Node | undefined ?? this.manager.nodeManager.allNodes[Math.floor(Math.random() * this.manager.nodeManager.allNodes.length)]
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