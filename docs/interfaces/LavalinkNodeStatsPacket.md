[**harmonylink**](../README.md) • **Docs**

***

[harmonylink](../globals.md) / LavalinkNodeStatsPacket

# Interface: LavalinkNodeStatsPacket

Dispatched when the node sends stats every x seconds

## Extends

- [`NodeStats`](NodeStats.md)

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

#### Inherited from

[`NodeStats`](NodeStats.md).[`cpu`](NodeStats.md#cpu)

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

#### Inherited from

[`NodeStats`](NodeStats.md).[`frameStats`](NodeStats.md#framestats)

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

#### Inherited from

[`NodeStats`](NodeStats.md).[`memory`](NodeStats.md#memory)

#### Defined in

src/typings/node/index.ts:80

***

### op

> **op**: `"stats"`

#### Defined in

src/typings/node/index.ts:394

***

### players

> **players**: `number`

The amount of players connected to the node

#### Inherited from

[`NodeStats`](NodeStats.md).[`players`](NodeStats.md#players)

#### Defined in

src/typings/node/index.ts:45

***

### playingPlayers

> **playingPlayers**: `number`

The amount of players that are playing music

#### Inherited from

[`NodeStats`](NodeStats.md).[`playingPlayers`](NodeStats.md#playingplayers)

#### Defined in

src/typings/node/index.ts:50

***

### uptime

> **uptime**: `number`

The uptime of the node

#### Inherited from

[`NodeStats`](NodeStats.md).[`uptime`](NodeStats.md#uptime)

#### Defined in

src/typings/node/index.ts:55
