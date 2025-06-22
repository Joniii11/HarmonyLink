[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / UpdatePlayerOptions

# Interface: UpdatePlayerOptions

## Properties

### track?

> `optional` **track**: [`UpdatePlayerTrack`](UpdatePlayerTrack.md)

Specification for a new track to load, as well as user data to set

#### Defined in

[typings/node/rest.ts:173](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/rest.ts#L173)

***

### position?

> `optional` **position**: `number`

The track position in milliseconds

#### Defined in

[typings/node/rest.ts:178](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/rest.ts#L178)

***

### endTime?

> `optional` **endTime**: `number`

The track end time in milliseconds (must be > 0). null resets this if it was set previously

#### Defined in

[typings/node/rest.ts:183](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/rest.ts#L183)

***

### volume?

> `optional` **volume**: `number`

The player volume, in percentage, from 0 to 1000

#### Defined in

[typings/node/rest.ts:188](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/rest.ts#L188)

***

### paused?

> `optional` **paused**: `boolean`

Whether the player is paused

#### Defined in

[typings/node/rest.ts:193](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/rest.ts#L193)

***

### filters?

> `optional` **filters**: `Partial`\<[`FiltersOptions`](FiltersOptions.md)\>

The new filters to apply. This will override all previously applied filters

#### Defined in

[typings/node/rest.ts:198](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/rest.ts#L198)

***

### voice?

> `optional` **voice**: `Required`\<[`VoiceServer`](VoiceServer.md)\>

Information required for connecting to Discord

#### Defined in

[typings/node/rest.ts:203](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/rest.ts#L203)
