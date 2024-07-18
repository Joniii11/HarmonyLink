[**harmonylink**](../README.md) • **Docs**

***

[harmonylink](../globals.md) / Track

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

src/player/Track.ts:18

## Properties

### info

> **info**: [`TrackDataInfo`](../interfaces/TrackDataInfo.md) & `object`

#### Type declaration

##### requester?

> `optional` **requester**: `any`

#### Defined in

src/player/Track.ts:9

***

### pluginInfo

> **pluginInfo**: `Record`\<`string`, `unknown`\>

#### Defined in

src/player/Track.ts:10

***

### track

> **track**: `string`

#### Defined in

src/player/Track.ts:8

***

### userData

> **userData**: `Record`\<`string`, `unknown`\>

#### Defined in

src/player/Track.ts:11

## Methods

### resolve()

> **resolve**(`manager`): `Promise`\<[`Track`](Track.md)\>

This function will resolve the track and return the track as resolved

#### Parameters

• **manager**: [`HarmonyLink`](HarmonyLink.md)

The HarmonyLink instance

#### Returns

`Promise`\<[`Track`](Track.md)\>

The resolved track

#### Defined in

src/player/Track.ts:36
