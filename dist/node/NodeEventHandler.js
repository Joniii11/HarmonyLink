"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlayerEvent {
    manager;
    node;
    constructor(node) {
        this.node = node;
        this.manager = this.node.manager;
        this.listen();
    }
    ;
    listen() {
        this.node.on("lavalinkEvent", this.onLavalinkEvent.bind(this));
        this.node.on("lavalinkWSClose", this.onWSCloseEvent.bind(this));
        this.node.on("lavalinkWSError", this.onWSErrorEvent.bind(this));
        this.node.on("lavalinkWSOpen", this.onWSOpenEvent.bind(this));
    }
    ;
    destroy() {
        this.node.removeAllListeners();
    }
    async onLavalinkEvent(data, interceptor) {
        try {
            const packet = interceptor ? interceptor(JSON.parse(data)) : JSON.parse(data);
            if (!packet?.op)
                return;
            switch (packet.op) {
                case "ready":
                    {
                        this.node.setSessionId(packet.sessionId);
                        this.manager.emit("debug", `[Web Socket] Node ${this.node.options.name} is ready.`);
                        if (this.manager.options.resume && this.manager.options.resumeTimeout) {
                            await this.node.driver.updateSessions(packet.sessionId, this.manager.options.resume, this.manager.options.resumeTimeout);
                        }
                        ;
                        break;
                    }
                    ;
                case "stats":
                    {
                        delete packet.op;
                        this.node.stats = packet;
                        break;
                    }
                    ;
                case "event":
                    {
                        if (!packet.guildId)
                            return;
                        const player = this.manager.playerManager.get(packet.guildId);
                        if (!player)
                            break;
                        player.emit(packet.op, packet);
                        break;
                    }
                    ;
                case "playerUpdate":
                    {
                        if (!packet.guildId)
                            return;
                        const player = this.manager.playerManager.get(packet.guildId);
                        if (!player)
                            break;
                        player.emit(packet.op, packet);
                        break;
                    }
                    ;
                default: break;
            }
        }
        catch (err) {
            this.manager.emit("debug", "[Web Socket] Error while parsing the payload.", err);
        }
    }
    ;
    onWSOpenEvent() {
        try {
            if (this.node.options.reconnectAttemptTimeout) {
                clearTimeout(this.node.options.reconnectAttemptTimeout);
                this.node.options.reconnectAttemptTimeout = null;
                if (this.manager.options.reconnectVoiceConnection)
                    this.node.players.forEach((player) => player.reconnect(true));
            }
            ;
            this.manager.emit("nodeConnect", this.node);
            this.node.isConnected = true;
            this.manager.emit("debug", `[HarmonyLink] [Node ${this.node.options.name}] [Web Socket] Connected to the node.`);
            this.node.options.currentAttempts = 0;
        }
        catch (err) {
            this.manager.emit("debug", `[HarmonyLink] [Node ${this.node.options.name}] [Web Socket] Error while parsing the payload.`, err);
        }
        ;
    }
    ;
    async onWSCloseEvent(code, reason) {
        try {
            this.node.disconnect();
            this.manager.emit("nodeDisconnect", this.node, code);
            this.manager.emit("debug", `[HarmonyLink] [Node ${this.node.options.name}] [Web Socket] Disconnected from the node. [${code}] [${reason.toString("utf-8")}]`);
            if (code !== 100)
                await this.node.reconnect();
        }
        catch (err) {
            this.manager.emit("debug", `[HarmonyLink] [Node ${this.node.options.name}] [Web Socket] Error while parsing the payload.`, err);
        }
        ;
    }
    ;
    onWSErrorEvent(error) {
        try {
            if (!error)
                return;
            this.manager.emit("nodeError", this.node, error);
            this.manager.emit("debug", `[HarmonyLink] [Node ${this.node.options.name}] [Web Socket] Error from the node.`, error);
        }
        catch (err) {
            this.manager.emit("debug", `[HarmonyLink] [Node ${this.node.options.name}] [Web Socket] Error while parsing the payload.`, err);
        }
    }
}
exports.default = PlayerEvent;
//# sourceMappingURL=NodeEventHandler.js.map