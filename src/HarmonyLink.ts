import EventEmitter from "events";
import { config } from "./constants";

import type { Config } from "@t/constants";

export class HarmonyLink extends EventEmitter {
    private readonly config: Config = config;
    
    constructor() {
        super()
    }
}