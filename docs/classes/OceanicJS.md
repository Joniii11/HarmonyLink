[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / OceanicJS

# Class: OceanicJS

## Extends

- `default`\<`OceanicJSLikeClient`\>

## Constructors

### new OceanicJS()

> **new OceanicJS**(`client`): [`OceanicJS`](OceanicJS.md)

#### Parameters

• **client**: `OceanicJSLikeClient`

#### Returns

[`OceanicJS`](OceanicJS.md)

#### Inherited from

`AbstractLibraryClass<OceanicJSLikeClient>.constructor`

#### Defined in

[librarys/AbstractLibraryClass.ts:19](https://github.com/Joniii11/HarmonyLink/blob/master/src/librarys/AbstractLibraryClass.ts#L19)

## Properties

### client

> `protected` `readonly` **client**: `OceanicJSLikeClient`

#### Inherited from

`AbstractLibraryClass.client`

#### Defined in

[librarys/AbstractLibraryClass.ts:16](https://github.com/Joniii11/HarmonyLink/blob/master/src/librarys/AbstractLibraryClass.ts#L16)

***

### manager

> `protected` **manager**: `null` \| [`HarmonyLink`](HarmonyLink.md) = `null`

#### Inherited from

`AbstractLibraryClass.manager`

#### Defined in

[librarys/AbstractLibraryClass.ts:17](https://github.com/Joniii11/HarmonyLink/blob/master/src/librarys/AbstractLibraryClass.ts#L17)

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

[librarys/OceanicJS.ts:8](https://github.com/Joniii11/HarmonyLink/blob/master/src/librarys/OceanicJS.ts#L8)

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

[librarys/AbstractLibraryClass.ts:29](https://github.com/Joniii11/HarmonyLink/blob/master/src/librarys/AbstractLibraryClass.ts#L29)

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

[librarys/AbstractLibraryClass.ts:38](https://github.com/Joniii11/HarmonyLink/blob/master/src/librarys/AbstractLibraryClass.ts#L38)

***

### ready()

> `protected` **ready**(`nodes`): `Promise`\<`Result`\<`boolean`, `Error`\>\>

#### Parameters

• **nodes**: [`NodeGroup`](../interfaces/NodeGroup.md)[]

#### Returns

`Promise`\<`Result`\<`boolean`, `Error`\>\>

#### Inherited from

`AbstractLibraryClass.ready`

#### Defined in

[librarys/AbstractLibraryClass.ts:74](https://github.com/Joniii11/HarmonyLink/blob/master/src/librarys/AbstractLibraryClass.ts#L74)

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

[librarys/OceanicJS.ts:12](https://github.com/Joniii11/HarmonyLink/blob/master/src/librarys/OceanicJS.ts#L12)

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

[librarys/OceanicJS.ts:16](https://github.com/Joniii11/HarmonyLink/blob/master/src/librarys/OceanicJS.ts#L16)

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

[librarys/OceanicJS.ts:20](https://github.com/Joniii11/HarmonyLink/blob/master/src/librarys/OceanicJS.ts#L20)
