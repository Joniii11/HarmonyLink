[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / HarmonyLinkEvents

# Interface: HarmonyLinkEvents

## Properties

### debug()

> **debug**: (...`args`) => `void`

#### Parameters

• ...**args**: `unknown`[]

The arguments to log.

#### Returns

`void`

#### Defined in

[typings/HarmonyLink.ts:217](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L217)

***

### nodeReconnect()

> **nodeReconnect**: (`node`) => `void`

#### Parameters

• **node**: [`Node`](../classes/Node.md)

The node that reconnected.

#### Returns

`void`

#### Defined in

[typings/HarmonyLink.ts:224](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L224)

***

### nodeDisconnect()

> **nodeDisconnect**: (`node`, `code`) => `void`

#### Parameters

• **node**: [`Node`](../classes/Node.md)

The node that disconnected.

• **code**: `number`

The code for the disconnection.

#### Returns

`void`

#### Defined in

[typings/HarmonyLink.ts:232](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L232)

***

### nodeConnect()

> **nodeConnect**: (`node`) => `void`

#### Parameters

• **node**: [`Node`](../classes/Node.md)

The node that connected.

#### Returns

`void`

#### Defined in

[typings/HarmonyLink.ts:239](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L239)

***

### nodeError()

> **nodeError**: (`node`, `error`) => `void`

#### Parameters

• **node**: [`Node`](../classes/Node.md)

The node that threw the error.

• **error**: `Error`

The error that was thrown.

#### Returns

`void`

#### Defined in

[typings/HarmonyLink.ts:247](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L247)

***

### playerCreate()

> **playerCreate**: (`player`) => `void`

#### Parameters

• **player**: [`Player`](../classes/Player.md)

The player that was created.

#### Returns

`void`

#### Defined in

[typings/HarmonyLink.ts:254](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L254)

***

### playerDestroy()

> **playerDestroy**: (`player`) => `void`

#### Parameters

• **player**: [`Player`](../classes/Player.md)

The player that was destroyed.

#### Returns

`void`

#### Defined in

[typings/HarmonyLink.ts:261](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L261)

***

### playerUpdate()

> **playerUpdate**: (`player`, `packet`) => `void`

#### Parameters

• **player**: [`Player`](../classes/Player.md)

The player that was updated.

• **packet**: [`LavalinkPlayerUpdatePacket`](LavalinkPlayerUpdatePacket.md)

The packet that was sent.

#### Returns

`void`

#### Defined in

[typings/HarmonyLink.ts:269](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L269)

***

### trackEnd()

> **trackEnd**: (`player`, `previousTrack`, `packet`?) => `void`

#### Parameters

• **player**: [`Player`](../classes/Player.md)

The player that the track ended on.

• **previousTrack**: [`Track`](../classes/Track.md)

The track that ended.

• **packet?**: [`TrackEndEvent`](TrackEndEvent.md) & `object`

The packet that was sent.

#### Returns

`void`

#### Defined in

[typings/HarmonyLink.ts:278](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L278)

***

### trackStart()

> **trackStart**: (`player`, `track`) => `void`

#### Parameters

• **player**: [`Player`](../classes/Player.md)

The player that the track started on.

• **track**: [`Track`](../classes/Track.md)

The track that started.

#### Returns

`void`

#### Defined in

[typings/HarmonyLink.ts:286](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L286)

***

### trackError()

> **trackError**: (`player`, `track`, `error`) => `void`

#### Parameters

• **player**: [`Player`](../classes/Player.md)

The player that the track errored on.

• **track**: [`Track`](../classes/Track.md)

The track that errored.

• **error**: `object` & [`TrackStuckEvent`](TrackStuckEvent.md) \| [`TrackExceptionEvent`](TrackExceptionEvent.md)

The error that was sent.

#### Returns

`void`

#### Defined in

[typings/HarmonyLink.ts:295](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L295)

***

### socketClose()

> **socketClose**: (`player`, `track`, `wsCloseData`) => `void`

#### Parameters

• **player**: [`Player`](../classes/Player.md)

The player that the socket disconnection occured on

• **track**: [`Track`](../classes/Track.md)

The track that was playing during the socket disconnection.

• **wsCloseData**: [`WebSocketClosedEvent`](WebSocketClosedEvent.md) & `object`

#### Returns

`void`

#### Defined in

[typings/HarmonyLink.ts:304](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L304)

***

### queueEmpty()

> **queueEmpty**: (`player`) => `void`

#### Parameters

• **player**: [`Player`](../classes/Player.md)

The player that the queue emptied on.

#### Returns

`void`

#### Defined in

[typings/HarmonyLink.ts:311](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L311)
