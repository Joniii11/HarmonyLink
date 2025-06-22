[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / Queue

# Class: Queue

## Extends

- `Array`\<[`Track`](Track.md)\>

## Constructors

### new Queue()

> **new Queue**(): [`Queue`](Queue.md)

#### Returns

[`Queue`](Queue.md)

#### Overrides

`Array<Track>.constructor`

#### Defined in

[player/Queue.ts:8](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Queue.ts#L8)

## Properties

### currentTrack

> **currentTrack**: `null` \| [`Track`](Track.md) = `null`

#### Defined in

[player/Queue.ts:5](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Queue.ts#L5)

***

### previousTrack

> **previousTrack**: `null` \| [`Track`](Track.md) = `null`

#### Defined in

[player/Queue.ts:6](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Queue.ts#L6)

## Accessors

### size

> `get` **size**(): `number`

Returns the number of tracks in the queue.

#### Returns

`number`

#### Defined in

[player/Queue.ts:16](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Queue.ts#L16)

***

### current

> `get` **current**(): `null` \| [`Track`](Track.md)

Returns the first track in the queue.

#### Returns

`null` \| [`Track`](Track.md)

The first track in the queue, or undefined if the queue is empty.

#### Defined in

[player/Queue.ts:24](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Queue.ts#L24)

***

### next

> `get` **next**(): [`Track`](Track.md)

Returns the next track in the queue.

#### Returns

[`Track`](Track.md)

The next track in the queue, or undefined if the queue is empty.

#### Defined in

[player/Queue.ts:32](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Queue.ts#L32)

***

### previous

> `get` **previous**(): `null` \| [`Track`](Track.md)

#### Returns

`null` \| [`Track`](Track.md)

#### Defined in

[player/Queue.ts:36](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Queue.ts#L36)

## Methods

### add()

> **add**(`track`): `this`

Adds a track to the queue.

#### Parameters

• **track**: [`Track`](Track.md)

The track to add to the queue.

#### Returns

`this`

The queue with the added track.

#### Defined in

[player/Queue.ts:45](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Queue.ts#L45)

***

### remove()

> **remove**(`index`): `this`

Removes a track from the queue by its index.

#### Parameters

• **index**: `number`

The index of the track to remove.

#### Returns

`this`

The queue with the removed track.

#### Defined in

[player/Queue.ts:55](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Queue.ts#L55)

***

### clear()

> **clear**(): [] \| [`Track`](Track.md)[]

Clears the entire queue.

#### Returns

[] \| [`Track`](Track.md)[]

An array containing all the cleared tracks, or an empty array if the queue was already empty.

#### Defined in

[player/Queue.ts:64](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Queue.ts#L64)

***

### shuffle()

> **shuffle**(): `this`

Shuffles the tracks in the queue.

#### Returns

`this`

Returns the shuffled queue.

#### Defined in

[player/Queue.ts:72](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Queue.ts#L72)

***

### \_next()

> **\_next**(): `null` \| [`Track`](Track.md)

Shifts the queue to the next track.

#### Returns

`null` \| [`Track`](Track.md)

The next track in the queue, or null if the queue is empty.

#### Defined in

[player/Queue.ts:85](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Queue.ts#L85)

***

### \_cleanUp()

> **\_cleanUp**(): `void`

#### Returns

`void`

#### Defined in

[player/Queue.ts:93](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Queue.ts#L93)
