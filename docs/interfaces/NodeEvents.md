[**harmonylink**](../README.md) • **Docs**

***

[harmonylink](../globals.md) / NodeEvents

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

src/typings/node/index.ts:9

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

src/typings/node/index.ts:23

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

src/typings/node/index.ts:30

***

### lavalinkWSOpen()

> **lavalinkWSOpen**: () => `void`

#### Returns

`void`

void

#### Defined in

src/typings/node/index.ts:15
