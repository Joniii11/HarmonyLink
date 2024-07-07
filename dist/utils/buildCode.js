"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const package_json_1 = __importDefault(require("../package.json"));
void (async () => {
    const files = node_fs_1.default.readdirSync(node_path_1.default.join(__dirname));
    files.map((file) => {
        if (file.endsWith(".js")) {
            node_fs_1.default.readFile(node_path_1.default.join(__dirname, `/${file}`), { encoding: "utf-8" }, (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                // Search for the require statements and replace @ or @t with the correct path which is specified in the package.json file
                const result = data.replace(/require\(['"]@['"]\)/g, `require('${package_json_1.default._moduleAliases["@"]}')`);
                node_fs_1.default.writeFile(node_path_1.default.join(__dirname, `/${file}`), result, (error) => {
                    if (error) {
                        console.error(error);
                    }
                });
            });
        }
    });
})().catch((e) => console.error(e));
//# sourceMappingURL=buildCode.js.map