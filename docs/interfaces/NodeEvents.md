[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / NodeEvents

# Interface: NodeEvents

## Properties

### lavalinkEvent()

> **lavalinkEvent**: (`data`, `interceptor`?) => `void`

#### Parameters

• **data**: `string`

The data that the node sends

• **interceptor?**

#### Returns

`void`

void

#### Defined in

[typings/node/index.ts:381](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L381)

***

### lavalinkWSOpen()

> **lavalinkWSOpen**: () => `void`

#### Returns

`void`

void

#### Defined in

[typings/node/index.ts:387](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L387)

***

### lavalinkWSClose()

> **lavalinkWSClose**: (`code`, `reason`) => `void`

#### Parameters

• **code**: `number`

The event code of the WebSocket

• **reason**: `Buffer`

The reason of the WebSocket

#### Returns

`void`

void

#### Defined in

[typings/node/index.ts:395](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L395)

***

### lavalinkWSError()

> **lavalinkWSError**: (`event`) => `void`

#### Parameters

• **event**: `Error`

The event of the WebSocket

#### Returns

`void`

void

#### Defined in

[typings/node/index.ts:402](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L402)
