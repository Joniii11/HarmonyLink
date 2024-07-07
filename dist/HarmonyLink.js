"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HarmonyLink = void 0;
const events_1 = __importDefault(require("events"));
// Managers
const NodeManager_1 = __importDefault(require("./managers/NodeManager"));
const PlayerManager_1 = __importDefault(require("./managers/PlayerManager"));
// Drivers
const LavalinkV4_1 = __importDefault(require("./nodeDriver/LavalinkV4"));
const NodeLink_1 = __importDefault(require("./nodeDriver/NodeLink"));
const FrequenC_1 = __importDefault(require("./nodeDriver/FrequenC"));
// Constants
const constants_1 = require("./constants");
class HarmonyLink extends events_1.default {
    botID = "";
    isReady = false;
    config = constants_1.config;
    library;
    nodes;
    options;
    drivers = [];
    /* Managers */
    nodeManager = new NodeManager_1.default(this);
    playerManager = new PlayerManager_1.default(this);
    constructor(options) {
        super();
        // Initialize the library
        this.library = options.library.initialize(this);
        // Set some stuff
        this.nodes = options.nodes;
        this.options = options;
        this.drivers = [new LavalinkV4_1.default(), new NodeLink_1.default(), new FrequenC_1.default(), ...(options.additionalDriver ?? [])];
        // Listen for updates in the ws on the client
        this.library.listen(this.nodes);
    }
    ;
}
exports.HarmonyLink = HarmonyLink;
//# sourceMappingURL=HarmonyLink.js.map