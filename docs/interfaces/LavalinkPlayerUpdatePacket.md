[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / LavalinkPlayerUpdatePacket

# Interface: LavalinkPlayerUpdatePacket

Dispatched every x seconds with the latest player state

## Properties

### op

> **op**: `"playerUpdate"`

#### Defined in

[typings/node/index.ts:328](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L328)

***

### guildId

> **guildId**: `string`

The guild id of the player

#### Defined in

[typings/node/index.ts:333](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L333)

***

### state

> **state**: `object`

The player state

#### time

> **time**: `number`

Unix timestamp in milliseconds

#### position

> **position**: `number`

The position of the track in milliseconds

#### connected

> **connected**: `true`

Whether Lavalink is connected to the voice gateway

#### ping

> **ping**: `number`

The ping of the node to the Discord voice server in milliseconds (-1 if not connected)

#### Defined in

[typings/node/index.ts:338](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L338)
