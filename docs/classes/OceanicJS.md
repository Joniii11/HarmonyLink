[**harmonylink**](../README.md) • **Docs**

***

[harmonylink](../globals.md) / OceanicJS

# Class: OceanicJS

## Extends

- `default`

## Constructors

### new OceanicJS()

> **new OceanicJS**(`client`): [`OceanicJS`](OceanicJS.md)

#### Parameters

• **client**: `any`

#### Returns

[`OceanicJS`](OceanicJS.md)

#### Inherited from

`AbstractLibraryClass.constructor`

#### Defined in

src/librarys/AbstractLibraryClass.ts:17

## Properties

### client

> `protected` `readonly` **client**: `any`

#### Inherited from

`AbstractLibraryClass.client`

#### Defined in

src/librarys/AbstractLibraryClass.ts:14

***

### manager

> `protected` **manager**: `null` \| [`HarmonyLink`](HarmonyLink.md) = `null`

#### Inherited from

`AbstractLibraryClass.manager`

#### Defined in

src/librarys/AbstractLibraryClass.ts:15

## Accessors

### userID

> `get` **userID**(): `string`

Get the user ID of the bot

#### Abstract

getter method for the user ID of the bot

#### Returns

`string`

#### Overrides

`AbstractLibraryClass.userID`

#### Defined in

src/librarys/OceanicJS.ts:7

## Methods

### initialize()

> **initialize**(`manager`): `this`

Initialize the library class

#### Parameters

• **manager**: [`HarmonyLink`](HarmonyLink.md)

The HarmonyLink instance

#### Returns

`this`

the instance of the class

#### Inherited from

`AbstractLibraryClass.initialize`

#### Defined in

src/librarys/AbstractLibraryClass.ts:27

***

### listen()

> **listen**(`nodes`): `void`

Listen for events from the discord gateway that are arriving on the library

#### Parameters

• **nodes**: [`NodeGroup`](../interfaces/NodeGroup.md)[]

#### Returns

`void`

#### Abstract

method to listen for events from the discord gateway that are arriving on the library

#### Overrides

`AbstractLibraryClass.listen`

#### Defined in

src/librarys/OceanicJS.ts:19

***

### raw()

> `protected` **raw**(`incomingData`): `Promise`\<[`OceanicJS`](OceanicJS.md)\>

Handle raw packets from the gateway

#### Parameters

• **incomingData**: [`Packet`](../type-aliases/Packet.md)

The packet to handle

#### Returns

`Promise`\<[`OceanicJS`](OceanicJS.md)\>

#### Inherited from

`AbstractLibraryClass.raw`

#### Defined in

src/librarys/AbstractLibraryClass.ts:36

***

### ready()

> `protected` **ready**(`nodes`): `Promise`\<`void`\>

#### Parameters

• **nodes**: [`NodeGroup`](../interfaces/NodeGroup.md)[]

#### Returns

`Promise`\<`void`\>

#### Inherited from

`AbstractLibraryClass.ready`

#### Defined in

src/librarys/AbstractLibraryClass.ts:72

***

### sendPacket()

> **sendPacket**(`shardId`, `payload`, `important`): `void`

Send raw packets to the gateway to communicate with the Discord API

#### Parameters

• **shardId**: `number`

The shard ID to send the packet with

• **payload**: [`AnyOtherPacket`](../interfaces/AnyOtherPacket.md)

The payload to send

• **important**: `boolean` = `false`

Whether the packet is important or not (default: false)

#### Returns

`void`

#### Abstract

method to send packets to the gateway

#### Overrides

`AbstractLibraryClass.sendPacket`

#### Defined in

src/librarys/OceanicJS.ts:15

***

### shardID()

> **shardID**(`guildId`): `number`

#### Parameters

• **guildId**: `string`

#### Returns

`number`

#### Overrides

`AbstractLibraryClass.shardID`

#### Defined in

src/librarys/OceanicJS.ts:11
