"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Decoder_1 = __importDefault(require("./Decoder"));
const node_1 = require("../typings/node");
const neverthrow_1 = require("neverthrow");
class AbstractNodeDriver {
    get defaultHeaders() {
        const headers = {
            Authorization: this.node.options.password,
            "User-Agent": this.clientId,
            "Content-Type": "application/json"
        };
        if (this.type === node_1.NodeType.NodeLink) {
            headers["Accept-Encoding"] = (process.isBun) ? "gzip, deflate" : "br, gzip, deflate";
        }
        ;
        return headers;
    }
    ;
    setSessionId(sessionId) {
        this.sessionId = sessionId;
    }
    ;
    eventHandler(data) {
        if (!this.node)
            return (0, neverthrow_1.ok)(false);
        return (0, neverthrow_1.ok)(this.node.emit("lavalinkEvent", data.toString()));
    }
    ;
    openHandler() {
        if (!this.node)
            return (0, neverthrow_1.ok)(false);
        return (0, neverthrow_1.ok)(this.node.emit("lavalinkWSOpen"));
    }
    ;
    closeHandler(code, reason) {
        if (!this.node)
            return (0, neverthrow_1.ok)(false);
        return (0, neverthrow_1.ok)(this.node.emit("lavalinkWSClose", code, reason));
    }
    ;
    errorHandler(data) {
        if (!this.node)
            return (0, neverthrow_1.ok)(false);
        return (0, neverthrow_1.ok)(this.node.emit("lavalinkWSError", data));
    }
    decoder = (base64EncodedTrack) => {
        const decoderInstance = new Decoder_1.default(base64EncodedTrack, this.type);
        return decoderInstance.getTrack;
    };
}
exports.default = AbstractNodeDriver;
;
//# sourceMappingURL=AbstractNodeDriver.js.map