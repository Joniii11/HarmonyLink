[**harmonylink**](../README.md) • **Docs**

***

[harmonylink](../globals.md) / HarmonyLinkEvents

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

src/typings/HarmonyLink.ts:187

***

### nodeConnect()

> **nodeConnect**: (`node`) => `void`

#### Parameters

• **node**: [`Node`](../classes/Node.md)

The node that connected.

#### Returns

`void`

#### Defined in

src/typings/HarmonyLink.ts:209

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

src/typings/HarmonyLink.ts:202

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

src/typings/HarmonyLink.ts:217

***

### nodeReconnect()

> **nodeReconnect**: (`node`) => `void`

#### Parameters

• **node**: [`Node`](../classes/Node.md)

The node that reconnected.

#### Returns

`void`

#### Defined in

src/typings/HarmonyLink.ts:194

***

### playerCreate()

> **playerCreate**: (`player`) => `void`

#### Parameters

• **player**: [`Player`](../classes/Player.md)

The player that was created.

#### Returns

`void`

#### Defined in

src/typings/HarmonyLink.ts:224

***

### playerDestroy()

> **playerDestroy**: (`player`) => `void`

#### Parameters

• **player**: [`Player`](../classes/Player.md)

The player that was destroyed.

#### Returns

`void`

#### Defined in

src/typings/HarmonyLink.ts:231

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

src/typings/HarmonyLink.ts:239

***

### queueEmpty()

> **queueEmpty**: (`player`) => `void`

#### Parameters

• **player**: [`Player`](../classes/Player.md)

The player that the queue emptied on.

#### Returns

`void`

#### Defined in

src/typings/HarmonyLink.ts:281

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

src/typings/HarmonyLink.ts:274

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

src/typings/HarmonyLink.ts:248

***

### trackError()

> **trackError**: (`player`, `track`, `error`) => `void`

#### Parameters

• **player**: [`Player`](../classes/Player.md)

The player that the track errored on.

• **track**: [`Track`](../classes/Track.md)

The track that errored.

• **error**: `object` & [`TrackExceptionEvent`](TrackExceptionEvent.md) \| [`TrackStuckEvent`](TrackStuckEvent.md)

The error that was sent.

#### Returns

`void`

#### Defined in

src/typings/HarmonyLink.ts:265

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

src/typings/HarmonyLink.ts:256
