import { defaultOptions } from "@/constants/node";

import type { HarmonyLinkConfiguration } from "@t/HarmonyLink";
import { NodeType, NodeGroup, NodeOptions } from "@t/node";

export function parseOptions(options: NodeGroup, harmonyLinkOptions: HarmonyLinkConfiguration): Required<NodeOptions> {
    return {
        name: options.name,
        host: options.host,
        port: options.port ?? 2333,
        password: options.password ?? "youshallnotpass",
        secure: options.secure ?? false,
        type: options.type ?? NodeType.LavaLinkV4,
        ...defaultOptions(harmonyLinkOptions)
    } satisfies Required<NodeGroup>
};