[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / WebSocketClosedEvent

# Interface: WebSocketClosedEvent

Represents an event indicating that a WebSocket connection was closed.

## Extends

- [`PlayerEvent`](PlayerEvent.md)

## Properties

### op

> **op**: `"event"`

#### Inherited from

[`PlayerEvent`](PlayerEvent.md).[`op`](PlayerEvent.md#op)

#### Defined in

[typings/node/playerEvents.ts:8](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/playerEvents.ts#L8)

***

### guildId

> **guildId**: `string`

#### Inherited from

[`PlayerEvent`](PlayerEvent.md).[`guildId`](PlayerEvent.md#guildid)

#### Defined in

[typings/node/playerEvents.ts:10](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/playerEvents.ts#L10)

***

### type

> **type**: `"WebSocketClosedEvent"`

#### Overrides

[`PlayerEvent`](PlayerEvent.md).[`type`](PlayerEvent.md#type)

#### Defined in

[typings/node/playerEvents.ts:51](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/playerEvents.ts#L51)

***

### code

> **code**: `number`

#### Defined in

[typings/node/playerEvents.ts:52](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/playerEvents.ts#L52)

***

### byRemote

> **byRemote**: `boolean`

#### Defined in

[typings/node/playerEvents.ts:53](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/playerEvents.ts#L53)

***

### reason

> **reason**: `string`

#### Defined in

[typings/node/playerEvents.ts:54](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/playerEvents.ts#L54)
