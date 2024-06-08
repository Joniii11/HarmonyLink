"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OceanicJS = void 0;
const AbstractLibraryClass_1 = __importDefault(require("./AbstractLibraryClass"));
class OceanicJS extends AbstractLibraryClass_1.default {
    get userID() {
        return this.client.user.id;
    }
    ;
    sendPacket(shardId, payload, important = false) {
        return this.client.shards.get(shardId)?.send(payload.op, payload.d, important);
    }
    ;
    listen(nodes) {
        this.client.once("ready", () => this.ready(nodes));
        this.client.on("packet", this.raw.bind(this));
    }
    ;
}
exports.OceanicJS = OceanicJS;
//# sourceMappingURL=OceanicJS.js.map