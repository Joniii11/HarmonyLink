"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("@/player/Player");
const player_1 = require("@/typings/player");
const connection_1 = require("@/typings/player/connection");
class PlayerManager extends Map {
    manager;
    constructor(manager) {
        super();
        this.manager = manager;
    }
    ;
    async createPlayer(options) {
        if (this.has(options.guildId))
            return this.get(options.guildId);
        const node = options.node ?? await this.leastUsedNode();
        let newPlayer = new Player_1.Player(this.manager, node, options);
        this.set(options.guildId, newPlayer);
        try {
            newPlayer = await newPlayer.connect();
        }
        catch (err) {
            this.delete(options.guildId);
            throw err;
        }
        ;
        const onUpdate = async (state) => {
            if (state !== connection_1.DiscordVoiceStates.SESSION_READY)
                return;
            await newPlayer.node.rest.updatePlayer(this.playerUpdateObject(options.guildId, newPlayer.ConnectionHandler.options));
        };
        await newPlayer.node.rest.updatePlayer(this.playerUpdateObject(options.guildId, newPlayer.ConnectionHandler.options));
        newPlayer.on("connectionUpdate", onUpdate);
        newPlayer.state = player_1.PlayerConnectionState.CONNECTED;
        this.manager.emit("debug", `[HarmonyLink] [PlayerManager] Created a new player for guild ${options.guildId} on node ${node.options.name}.`);
        return newPlayer;
    }
    ;
    /* public async removePlayer(guildId: string): Promise<Player | null> {
        const player = this.get(guildId);
        if (!player) return null;

        await player.destroy();
        this.delete(guildId);
        return player;
    };*/
    async leastUsedNode() {
        return await this.manager.nodeManager.getLeastUsedNode() ?? this.manager.nodeManager.allNodes[Math.floor(Math.random() * this.manager.nodeManager.allNodes.length)];
    }
    ;
    // eslint-disable-next-line class-methods-use-this
    playerUpdateObject(guildId, options) {
        return {
            guildId,
            playerOptions: {
                voice: {
                    endpoint: options.voice.endpoint,
                    token: options.voice.token,
                    sessionId: options.voice.sessionId,
                }
            }
        };
    }
}
exports.default = PlayerManager;
//# sourceMappingURL=PlayerManager.js.map