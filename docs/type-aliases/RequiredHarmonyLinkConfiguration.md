[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / RequiredHarmonyLinkConfiguration

# Type Alias: RequiredHarmonyLinkConfiguration

> **RequiredHarmonyLinkConfiguration**: `Omit`\<`Required`\<[`HarmonyLinkConfiguration`](../interfaces/HarmonyLinkConfiguration.md)\>, `"customAutoplay"` \| `"nodeAdder"` \| `"nodeResolver"` \| `"nodes"`\> & `object`

## Type declaration

### nodes?

> `optional` **nodes**: [`NodeGroup`](../interfaces/NodeGroup.md)[]

### customAutoplay

> **customAutoplay**: (`player`) => `Promise`\<[`Player`](../classes/Player.md) \| `void`\> \| `undefined`

### nodeResolver

> **nodeResolver**: (`nodes`) => `Promise`\<[`Node`](../classes/Node.md) \| `void`\> \| `undefined`

### nodeAdder

> **nodeAdder**: (`nodeManager`, `node`) => `Promise`\<[`Node`](../classes/Node.md) \| `void`\> \| `undefined`

## Defined in

[typings/HarmonyLink.ts:188](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L188)
