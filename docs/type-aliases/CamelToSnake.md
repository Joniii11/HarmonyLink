[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / CamelToSnake

# Type Alias: CamelToSnake\<T\>

> **CamelToSnake**\<`T`\>: `T` *extends* `Record`\<`string`, `any`\> ? `{ [K in keyof T as K extends string ? SnakeCase<K> : K]: T[K] extends Record<string, any> ? CamelToSnake<T[K]> : T[K] }` : `T`

## Type Parameters

• **T**

## Defined in

[utils/index.ts:68](https://github.com/Joniii11/HarmonyLink/blob/master/src/utils/index.ts#L68)
