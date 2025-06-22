[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / Player

# Class: Player

## Extends

- `EventEmitter`

## Constructors

### new Player()

> **new Player**(`manager`, `node`, `options`): [`Player`](Player.md)

#### Parameters

• **manager**: [`HarmonyLink`](HarmonyLink.md)

• **node**: [`Node`](Node.md)

• **options**: [`PlayerOptions`](../interfaces/PlayerOptions.md)

#### Returns

[`Player`](Player.md)

#### Defined in

[player/Player.ts:60](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L60)

## Properties

### on()

> **on**: \<`K`\>(`event`, `listener`) => `this`

#### Type Parameters

• **K** *extends* keyof [`PlayerEvents`](../interfaces/PlayerEvents.md)

#### Parameters

• **event**: `K`

• **listener**: [`PlayerEvents`](../interfaces/PlayerEvents.md)\[`K`\]

#### Returns

`this`

#### Defined in

[player/Player.ts:22](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L22)

***

### once()

> **once**: \<`K`\>(`event`, `listener`) => `this`

#### Type Parameters

• **K** *extends* keyof [`PlayerEvents`](../interfaces/PlayerEvents.md)

#### Parameters

• **event**: `K`

• **listener**: [`PlayerEvents`](../interfaces/PlayerEvents.md)\[`K`\]

#### Returns

`this`

#### Defined in

[player/Player.ts:23](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L23)

***

### emit()

> **emit**: \<`K`\>(`event`, ...`args`) => `boolean`

#### Type Parameters

• **K** *extends* keyof [`PlayerEvents`](../interfaces/PlayerEvents.md)

#### Parameters

• **event**: `K`

• ...**args**: `Parameters`\<[`PlayerEvents`](../interfaces/PlayerEvents.md)\[`K`\]\>

#### Returns

`boolean`

#### Defined in

[player/Player.ts:24](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L24)

***

### off()

> **off**: \<`K`\>(`event`, `listener`) => `this`

#### Type Parameters

• **K** *extends* keyof [`PlayerEvents`](../interfaces/PlayerEvents.md)

#### Parameters

• **event**: `K`

• **listener**: [`PlayerEvents`](../interfaces/PlayerEvents.md)\[`K`\]

#### Returns

`this`

#### Defined in

[player/Player.ts:28](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L28)

***

### node

> `readonly` **node**: [`Node`](Node.md)

#### Defined in

[player/Player.ts:32](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L32)

***

### manager

> `readonly` **manager**: [`HarmonyLink`](HarmonyLink.md)

#### Defined in

[player/Player.ts:33](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L33)

***

### ConnectionHandler

> `readonly` **ConnectionHandler**: [`ConnectionHandler`](ConnectionHandler.md)

#### Defined in

[player/Player.ts:34](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L34)

***

### queue

> `readonly` **queue**: [`Queue`](Queue.md)

#### Defined in

[player/Player.ts:35](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L35)

***

### filters

> **filters**: `Filters`

#### Defined in

[player/Player.ts:36](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L36)

***

### voiceChannelId

> **voiceChannelId**: `string`

#### Defined in

[player/Player.ts:38](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L38)

***

### textChannelId

> **textChannelId**: `string`

#### Defined in

[player/Player.ts:39](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L39)

***

### guildId

> **guildId**: `string`

#### Defined in

[player/Player.ts:40](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L40)

***

### shardId

> **shardId**: `string`

#### Defined in

[player/Player.ts:41](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L41)

***

### isConnected

> **isConnected**: `boolean`

#### Defined in

[player/Player.ts:42](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L42)

***

### isPlaying

> **isPlaying**: `boolean`

#### Defined in

[player/Player.ts:43](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L43)

***

### isPaused

> **isPaused**: `boolean`

#### Defined in

[player/Player.ts:44](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L44)

***

### state

> **state**: [`PlayerConnectionState`](../enumerations/PlayerConnectionState.md)

#### Defined in

[player/Player.ts:45](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L45)

***

### voiceState

> **voiceState**: [`VoiceConnectionState`](../enumerations/VoiceConnectionState.md)

#### Defined in

[player/Player.ts:46](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L46)

***

### loop

> **loop**: `"NONE"` \| `"QUEUE"` \| `"TRACK"` \| [`PlayerLoop`](../enumerations/PlayerLoop.md)

#### Defined in

[player/Player.ts:47](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L47)

***

### isAutoplay

> **isAutoplay**: `boolean`

#### Defined in

[player/Player.ts:48](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L48)

***

### volume

> **volume**: `number`

#### Defined in

[player/Player.ts:49](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L49)

***

### ping

> **ping**: `number`

The ping of the node to the Discord voice server in milliseconds (-1 if not connected)

#### Defined in

[player/Player.ts:54](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L54)

***

### timestamp

> **timestamp**: `number`

#### Defined in

[player/Player.ts:55](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L55)

***

### position

> **position**: `number`

#### Defined in

[player/Player.ts:58](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L58)

## Methods

### connect()

> **connect**(): `Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

Connects the player to the voice channel.

#### Returns

`Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

- A Promise that resolves to the Player instance.

#### Defined in

[player/Player.ts:119](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L119)

***

### reconnect()

> **reconnect**(`restartSong`?): `Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

Reconnects the player to the voice channel.

#### Parameters

• **restartSong?**: `boolean` = `true`

Whether to restart the current song or not.

#### Returns

`Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

- A Promise that resolves to the Player instance.

#### Defined in

[player/Player.ts:182](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L182)

***

### decodeTracks()

> **decodeTracks**(`tracks`): `Promise`\<`Result`\<[`TrackData`](../interfaces/TrackData.md)[], `Error`\>\>

Decodes a or multiple encoded tracks.

#### Parameters

• **tracks**: `string` \| `string`[]

The track to decode.

#### Returns

`Promise`\<`Result`\<[`TrackData`](../interfaces/TrackData.md)[], `Error`\>\>

- A Promise that resolves to the decoded track.

#### Defined in

[player/Player.ts:234](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L234)

***

### setLoop()

> **setLoop**(`mode`?): [`Player`](Player.md)

Sets the loop mode for the player.

#### Parameters

• **mode?**: `"NONE"` \| `"QUEUE"` \| `"TRACK"` \| [`PlayerLoop`](../enumerations/PlayerLoop.md)

The loop mode to set.

#### Returns

[`Player`](Player.md)

- A Promise that resolves to the Player instance.

#### Defined in

[player/Player.ts:245](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L245)

***

### setTextChannel()

> **setTextChannel**(`channelId`): [`Player`](Player.md)

Sets the voice channel for the player.

#### Parameters

• **channelId**: `string`

The channel ID to set for the player.

#### Returns

[`Player`](Player.md)

- A Promise that resolves to the Player instance.

#### Defined in

[player/Player.ts:279](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L279)

***

### setVoiceChannel()

> **setVoiceChannel**(`channelId`): `Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

Sets a new voice channel for the player.

#### Parameters

• **channelId**: `string`

The channel ID to set for the player.

#### Returns

`Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

- A Promise that resolves to the Player instance.

#### Defined in

[player/Player.ts:290](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L290)

***

### setAutoplay()

> **setAutoplay**(`toggle`?): [`Player`](Player.md)

Sets the autoplay mode for the player.

#### Parameters

• **toggle?**: `boolean`

Whether to enable or disable autoplay.

#### Returns

[`Player`](Player.md)

- A Promise that resolves to the Player instance.

#### Defined in

[player/Player.ts:308](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L308)

***

### setVolume()

> **setVolume**(`volume`): `Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

Sets the volume for the player.

#### Parameters

• **volume**: `number`

The volume to set. Must be between 0 and 1000.

#### Returns

`Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

- A Promise that resolves to the Player instance.

#### Defined in

[player/Player.ts:320](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L320)

***

### seekTo()

> **seekTo**(`position`): `Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

Seeks to a position in the current track.

#### Parameters

• **position**: `number`

The position to seek to in milliseconds. Must be between 0 and `<Track>.info.length`

#### Returns

`Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

- A Promise that resolves to the Player instance.

#### Defined in

[player/Player.ts:345](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L345)

***

### play()

> **play**(): `Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

Plays the current track in the queue.

#### Returns

`Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

- A Promise that resolves to the Player instance.

#### Defined in

[player/Player.ts:375](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L375)

***

### destroy()

> **destroy**(): `Promise`\<`Result`\<`boolean`, `Error`\>\>

Destroys the player and cleans up associated resources.

#### Returns

`Promise`\<`Result`\<`boolean`, `Error`\>\>

- A Promise that resolves to a boolean which is true if an element in the Map existed and has been removed, or false if the element does not exist.

#### Defined in

[player/Player.ts:406](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L406)

***

### skip()

> **skip**(): `Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

Skips the current track.

#### Returns

`Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

- A Promise that resolves to the Player instance.

#### Defined in

[player/Player.ts:422](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L422)

***

### pause()

> **pause**(`toggle`?): `Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

Pauses the current track.

#### Parameters

• **toggle?**: `boolean` = `true`

Whether to pause or resume the track.

#### Returns

`Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

- A Promise that resolves to the Player instance.

#### Defined in

[player/Player.ts:450](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L450)

***

### resolve()

> **resolve**(`options`?, `node`?): `Promise`\<`Result`\<[`Response`](Response.md), `Error`\>\>

Resolves a track.

#### Parameters

• **options?**: [`ResolveOptions`](../interfaces/ResolveOptions.md)

Options for resolving tracks.

• **node?**: [`Node`](Node.md)

Node to use for resolution.

#### Returns

`Promise`\<`Result`\<[`Response`](Response.md), `Error`\>\>

The response containing resolved tracks.

#### Defined in

[player/Player.ts:474](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L474)

***

### autoplay()

> **autoplay**(`previousTrack`?): `Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

Autoplays a track.

#### Parameters

• **previousTrack?**: `null` \| [`Track`](Track.md) = `null`

The previous track to use for autoplay

#### Returns

`Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

- A Promise that resolves to the Player instance.

#### Defined in

[player/Player.ts:485](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L485)

***

### setMute()

> **setMute**(`mute`): `Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

Sets the mute state for the player.

#### Parameters

• **mute**: `boolean`

Whether to mute or unmute the player in the voice channel.

#### Returns

`Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

- A Promise that resolves to the Player instance.

#### Defined in

[player/Player.ts:533](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L533)

***

### setDeaf()

> **setDeaf**(`deaf`): `Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

Sets the deaf state for the player.

#### Parameters

• **deaf**: `boolean`

Whether to deafen or undeafen the player in the voice channel.

#### Returns

`Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

- A Promise that resolves to the Player instance.

#### Defined in

[player/Player.ts:554](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L554)

***

### disconnect()

> `protected` **disconnect**(`cleanQueue`): `Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

#### Parameters

• **cleanQueue**: `boolean` = `false`

#### Returns

`Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

#### Defined in

[player/Player.ts:565](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L565)

***

### checkDestroyed()

> `protected` **checkDestroyed**(): `Result`\<`void`, `Error`\>

#### Returns

`Result`\<`void`, `Error`\>

#### Defined in

[player/Player.ts:588](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Player.ts#L588)
