[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / ConnectionHandler

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

[player/Connection.ts:11](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Connection.ts#L11)

## Properties

### player

> `readonly` **player**: [`Player`](Player.md)

#### Defined in

[player/Connection.ts:8](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Connection.ts#L8)

***

### options

> **options**: [`ConnectionOptions`](../interfaces/ConnectionOptions.md)

#### Defined in

[player/Connection.ts:9](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Connection.ts#L9)

## Methods

### setServersUpdate()

> **setServersUpdate**(`data`): `Promise`\<`Result`\<`void`, `Error`\>\>

Updates the voice server of the player.

#### Parameters

• **data**: [`VoiceServer`](../interfaces/VoiceServer.md)

The incoming data from the voice server from discord.

#### Returns

`Promise`\<`Result`\<`void`, `Error`\>\>

#### Defined in

[player/Connection.ts:20](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Connection.ts#L20)

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

[player/Connection.ts:65](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Connection.ts#L65)
