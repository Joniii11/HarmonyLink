[**harmonylink**](../README.md) • **Docs**

***

[harmonylink](../globals.md) / WebSocketClosedEvent

# Interface: WebSocketClosedEvent

Represents an event indicating that a WebSocket connection was closed.

## Extends

- [`PlayerEvent`](PlayerEvent.md)

## Properties

### byRemote

> **byRemote**: `boolean`

#### Defined in

src/typings/node/playerEvents.ts:59

***

### code

> **code**: `number`

#### Defined in

src/typings/node/playerEvents.ts:58

***

### guildId

> **guildId**: `string`

#### Inherited from

[`PlayerEvent`](PlayerEvent.md).[`guildId`](PlayerEvent.md#guildid)

#### Defined in

src/typings/node/playerEvents.ts:16

***

### op

> **op**: `"event"`

#### Inherited from

[`PlayerEvent`](PlayerEvent.md).[`op`](PlayerEvent.md#op)

#### Defined in

src/typings/node/playerEvents.ts:14

***

### reason

> **reason**: `string`

#### Defined in

src/typings/node/playerEvents.ts:60

***

### type

> **type**: `"WebSocketClosedEvent"`

#### Overrides

[`PlayerEvent`](PlayerEvent.md).[`type`](PlayerEvent.md#type)

#### Defined in

src/typings/node/playerEvents.ts:57
