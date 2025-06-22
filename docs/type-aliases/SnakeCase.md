[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / SnakeCase

# Type Alias: SnakeCase\<S\>

> **SnakeCase**\<`S`\>: `S` *extends* \`$\{infer P1\}$\{infer P2\}\` ? `P2` *extends* `Uncapitalize`\<`P2`\> ? \`$\{Lowercase\<P1\>\}$\{SnakeCase\<P2\>\}\` : \`$\{Lowercase\<P1\>\}\_$\{SnakeCase\<Uncapitalize\<P2\>\>\}\` : `S`

## Type Parameters

• **S** *extends* `string`

## Defined in

[utils/index.ts:62](https://github.com/Joniii11/HarmonyLink/blob/master/src/utils/index.ts#L62)
