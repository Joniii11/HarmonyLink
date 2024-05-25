import { EventEmitter } from "events"

import type { HarmonyLink } from "@/HarmonyLink"

export class Player extends EventEmitter {
    public node: Node;
    public manager: HarmonyLink;

    
};