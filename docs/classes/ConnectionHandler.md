[**harmonylink**](../README.md) • **Docs**

***

[harmonylink](../globals.md) / ConnectionHandler

# Class: ConnectionHandler

## Constructors

### new ConnectionHandler()

> **new ConnectionHandler**(`player`, `options`): [`ConnectionHandler`](ConnectionHandler.md)

#### Parameters

• **player**: [`Player`](Player.md)

• **options**: [`PlayerOptions`](../interfaces/PlayerOptions.md)

#### Returns

[`ConnectionHandler`](ConnectionHandler.md)

#### Defined in

src/player/Connection.ts:10

## Properties

### options

> **options**: [`ConnectionOptions`](../interfaces/ConnectionOptions.md)

#### Defined in

src/player/Connection.ts:8

***

### player

> `readonly` **player**: [`Player`](Player.md)

#### Defined in

src/player/Connection.ts:7

## Methods

### setServersUpdate()

> **setServersUpdate**(`data`): `Promise`\<`void`\>

Updates the voice server of the player.

#### Parameters

• **data**: [`VoiceServer`](../interfaces/VoiceServer.md)

The incoming data from the voice server from discord.

#### Returns

`Promise`\<`void`\>

#### Defined in

src/player/Connection.ts:19

***

### setStateUpdate()

> **setStateUpdate**(`data`): `void`

Updates the state of the player.

#### Parameters

• **data**: [`SetStateUpdate`](../interfaces/SetStateUpdate.md)

The incoming data from the voice server from discord.

#### Returns

`void`

#### Defined in

src/player/Connection.ts:48
