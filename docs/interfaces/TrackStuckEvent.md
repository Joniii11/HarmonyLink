[**harmonylink**](../README.md) • **Docs**

***

[harmonylink](../globals.md) / TrackStuckEvent

# Interface: TrackStuckEvent

Represents an event indicating that a track got stuck while playing.

## Extends

- [`PlayerEvent`](PlayerEvent.md)

## Properties

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

### thresholdMs

> **thresholdMs**: `number`

#### Defined in

src/typings/node/playerEvents.ts:42

***

### track

> **track**: `any`

#### Defined in

src/typings/node/playerEvents.ts:41

***

### type

> **type**: `"TrackStuckEvent"`

#### Overrides

[`PlayerEvent`](PlayerEvent.md).[`type`](PlayerEvent.md#type)

#### Defined in

src/typings/node/playerEvents.ts:40
