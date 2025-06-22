[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / NodeStats

# Interface: NodeStats

## Extended by

- [`LavalinkNodeStatsPacket`](LavalinkNodeStatsPacket.md)

## Properties

### players

> **players**: `number`

The amount of players connected to the node

#### Defined in

[typings/node/index.ts:15](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L15)

***

### playingPlayers

> **playingPlayers**: `number`

The amount of players that are playing music

#### Defined in

[typings/node/index.ts:20](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L20)

***

### uptime

> **uptime**: `number`

The uptime of the node

#### Defined in

[typings/node/index.ts:25](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L25)

***

### cpu

> **cpu**: `object`

The CPU usage of the node

#### cores

> **cores**: `number`

The amount of CPU cores

#### systemLoad

> **systemLoad**: `number`

The system load of the CPU

#### lavalinkLoad

> **lavalinkLoad**: `number`

The load of the Lavalink

#### Defined in

[typings/node/index.ts:30](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L30)

***

### memory

> **memory**: `object`

The memory usage of the node

#### reservable

> **reservable**: `number`

The amount of memory that is reservable

#### used

> **used**: `number`

The amount of memory that is used

#### free

> **free**: `number`

The amount of free memory

#### allocated

> **allocated**: `number`

The amount of memory that is allocated

#### Defined in

[typings/node/index.ts:50](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L50)

***

### frameStats

> **frameStats**: `object`

The frame stats of the node

#### sent

> **sent**: `number`

The amount of frames sent

#### deficit

> **deficit**: `number`

The amount of frames that have a deficit

#### nulled

> **nulled**: `number`

The amount of nulled frames

#### Attention

This is by default NOT included in LavaLink however in NodeLink it is

#### Defined in

[typings/node/index.ts:76](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L76)
