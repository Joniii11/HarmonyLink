[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / SnakeToCamel

# Type Alias: SnakeToCamel\<T\>

> **SnakeToCamel**\<`T`\>: `T` *extends* `Record`\<`string`, `any`\> ? `{ [K in keyof T as K extends string ? CamelCase<K> : K]: T[K] extends Record<string, any> ? SnakeToCamel<T[K]> : T[K] }` : `T`

## Type Parameters

• **T**

## Defined in

[utils/index.ts:23](https://github.com/Joniii11/HarmonyLink/blob/master/src/utils/index.ts#L23)
