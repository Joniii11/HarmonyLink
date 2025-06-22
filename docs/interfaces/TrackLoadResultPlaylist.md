[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / TrackLoadResultPlaylist

# Interface: TrackLoadResultPlaylist

## Properties

### loadType

> **loadType**: `"playlist"`

#### Defined in

[typings/node/rest.ts:42](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/rest.ts#L42)

***

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

[typings/node/rest.ts:43](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/rest.ts#L43)
