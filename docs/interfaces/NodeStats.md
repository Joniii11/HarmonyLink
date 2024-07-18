[**harmonylink**](../README.md) • **Docs**

***

[harmonylink](../globals.md) / NodeStats

# Interface: NodeStats

## Extended by

- [`LavalinkNodeStatsPacket`](LavalinkNodeStatsPacket.md)

## Properties

### cpu

> **cpu**: `object`

The CPU usage of the node

#### cores

> **cores**: `number`

The amount of CPU cores

#### lavalinkLoad

> **lavalinkLoad**: `number`

The load of the Lavalink

#### systemLoad

> **systemLoad**: `number`

The system load of the CPU

#### Defined in

src/typings/node/index.ts:60

***

### frameStats

> **frameStats**: `object`

The frame stats of the node

#### deficit

> **deficit**: `number`

The amount of frames that have a deficit

#### nulled

> **nulled**: `number`

The amount of nulled frames

#### sent

> **sent**: `number`

The amount of frames sent

#### Attention

This is by default NOT included in LavaLink however in NodeLink it is

#### Defined in

src/typings/node/index.ts:106

***

### memory

> **memory**: `object`

The memory usage of the node

#### allocated

> **allocated**: `number`

The amount of memory that is allocated

#### free

> **free**: `number`

The amount of free memory

#### reservable

> **reservable**: `number`

The amount of memory that is reservable

#### used

> **used**: `number`

The amount of memory that is used

#### Defined in

src/typings/node/index.ts:80

***

### players

> **players**: `number`

The amount of players connected to the node

#### Defined in

src/typings/node/index.ts:45

***

### playingPlayers

> **playingPlayers**: `number`

The amount of players that are playing music

#### Defined in

src/typings/node/index.ts:50

***

### uptime

> **uptime**: `number`

The uptime of the node

#### Defined in

src/typings/node/index.ts:55
