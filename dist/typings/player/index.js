"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceConnectionState = exports.PlayerConnectionState = exports.PlayerLoop = void 0;
;
;
var PlayerLoop;
(function (PlayerLoop) {
    PlayerLoop["NONE"] = "NONE";
    PlayerLoop["QUEUE"] = "QUEUE";
    PlayerLoop["TRACK"] = "TRACK";
})(PlayerLoop || (exports.PlayerLoop = PlayerLoop = {}));
;
var PlayerConnectionState;
(function (PlayerConnectionState) {
    PlayerConnectionState[PlayerConnectionState["CONNECTED"] = 0] = "CONNECTED";
    PlayerConnectionState[PlayerConnectionState["DISCONNECTED"] = 1] = "DISCONNECTED";
    PlayerConnectionState[PlayerConnectionState["DESTROYED"] = 2] = "DESTROYED";
})(PlayerConnectionState || (exports.PlayerConnectionState = PlayerConnectionState = {}));
;
var VoiceConnectionState;
(function (VoiceConnectionState) {
    VoiceConnectionState[VoiceConnectionState["CONNECTING"] = 0] = "CONNECTING";
    VoiceConnectionState[VoiceConnectionState["NEARLY"] = 1] = "NEARLY";
    VoiceConnectionState[VoiceConnectionState["CONNECTED"] = 2] = "CONNECTED";
    VoiceConnectionState[VoiceConnectionState["RECONNECTING"] = 3] = "RECONNECTING";
    VoiceConnectionState[VoiceConnectionState["DISCONNECTING"] = 4] = "DISCONNECTING";
    VoiceConnectionState[VoiceConnectionState["DISCONNECTED"] = 5] = "DISCONNECTED";
})(VoiceConnectionState || (exports.VoiceConnectionState = VoiceConnectionState = {}));
;
//# sourceMappingURL=index.js.map