[**harmonylink**](../README.md) • **Docs**

***

[harmonylink](../globals.md) / TrackLoadResultPlaylist

# Interface: TrackLoadResultPlaylist

## Properties

### data

> **data**: `object`

#### info

> **info**: `object`

The info of the playlist

#### info.name

> **name**: `string`

The name of the playlist

#### info.selectedTrack

> **selectedTrack**: `number`

The selected track of the playlist (-1 if no track is selected)

#### pluginInfo

> **pluginInfo**: `Record`\<`string`, `unknown`\>

Addition playlist info provided by plugins

#### tracks

> **tracks**: [`TrackData`](TrackData.md)[]

The tracks of the playlist

#### Defined in

src/typings/node/rest.ts:43

***

### loadType

> **loadType**: `"playlist"`

#### Defined in

src/typings/node/rest.ts:42
