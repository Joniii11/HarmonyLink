[**harmonylink**](../README.md) • **Docs**

***

[harmonylink](../globals.md) / LavalinkPlayerUpdatePacket

# Interface: LavalinkPlayerUpdatePacket

Dispatched every x seconds with the latest player state

## Properties

### guildId

> **guildId**: `string`

The guild id of the player

#### Defined in

src/typings/node/index.ts:362

***

### op

> **op**: `"playerUpdate"`

#### Defined in

src/typings/node/index.ts:357

***

### state

> **state**: `object`

The player state

#### connected

> **connected**: `true`

Whether Lavalink is connected to the voice gateway

#### ping

> **ping**: `number`

The ping of the node to the Discord voice server in milliseconds (-1 if not connected)

#### position

> **position**: `number`

The position of the track in milliseconds

#### time

> **time**: `number`

Unix timestamp in milliseconds

#### Defined in

src/typings/node/index.ts:367
