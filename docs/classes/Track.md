[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / Track

# Class: Track

## Constructors

### new Track()

> **new Track**(`data`, `requester`?): [`Track`](Track.md)

Constructor

#### Parameters

• **data**: [`TrackData`](../interfaces/TrackData.md)

• **requester?**: `any`

#### Returns

[`Track`](Track.md)

#### Defined in

[player/Track.ts:19](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Track.ts#L19)

## Properties

### track

> **track**: `string`

#### Defined in

[player/Track.ts:9](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Track.ts#L9)

***

### info

> **info**: [`TrackDataInfo`](../interfaces/TrackDataInfo.md) & `object`

#### Type declaration

##### requester?

> `optional` **requester**: `any`

#### Defined in

[player/Track.ts:10](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Track.ts#L10)

***

### pluginInfo

> **pluginInfo**: `Record`\<`string`, `unknown`\>

#### Defined in

[player/Track.ts:11](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Track.ts#L11)

***

### userData

> **userData**: `Record`\<`string`, `unknown`\>

#### Defined in

[player/Track.ts:12](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Track.ts#L12)

## Methods

### resolve()

> **resolve**(`manager`): `Promise`\<`Result`\<[`Track`](Track.md), `Error`\>\>

This function will resolve the track and return the track as resolved

#### Parameters

• **manager**: [`HarmonyLink`](HarmonyLink.md)

The HarmonyLink instance

#### Returns

`Promise`\<`Result`\<[`Track`](Track.md), `Error`\>\>

The resolved track

#### Defined in

[player/Track.ts:37](https://github.com/Joniii11/HarmonyLink/blob/master/src/player/Track.ts#L37)
