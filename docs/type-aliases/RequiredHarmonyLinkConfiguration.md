[**harmonylink**](../README.md) • **Docs**

***

[harmonylink](../globals.md) / RequiredHarmonyLinkConfiguration

# Type Alias: RequiredHarmonyLinkConfiguration

> **RequiredHarmonyLinkConfiguration**: `Omit`\<`Required`\<[`HarmonyLinkConfiguration`](../interfaces/HarmonyLinkConfiguration.md)\>, `"customAutoplay"` \| `"nodeResolver"` \| `"nodes"`\> & `object`

## Type declaration

### customAutoplay

> **customAutoplay**: (`player`) => `Promise`\<[`Player`](../classes/Player.md) \| `void`\> \| `undefined`

### nodeResolver

> **nodeResolver**: (`nodes`) => `Promise`\<[`Node`](../classes/Node.md) \| `void`\> \| `undefined`

### nodes?

> `optional` **nodes**: [`NodeGroup`](../interfaces/NodeGroup.md)[]

## Defined in

src/typings/HarmonyLink.ts:179
