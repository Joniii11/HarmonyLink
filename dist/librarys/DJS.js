"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DJSLibrary = void 0;
const AbstractLibraryClass_1 = __importDefault(require("./AbstractLibraryClass"));
class DJSLibrary extends AbstractLibraryClass_1.default {
    get userID() {
        return this.client.user.id;
    }
    ;
    sendPacket(shardId, payload, important = false) {
        return this.client.ws.shards.get(shardId)?.send(payload, important);
    }
    ;
    listen(nodes) {
        this.client.once("ready", async () => this.ready(nodes));
        // Getting the raw data from the gateway
        this.client.on("raw", this.raw.bind(this));
    }
    ;
}
exports.DJSLibrary = DJSLibrary;
//# sourceMappingURL=DJS.js.map