[**harmonylink**](../README.md) • **Docs**

***

[harmonylink](../globals.md) / UpdatePlayerOptions

# Interface: UpdatePlayerOptions

## Properties

### endTime?

> `optional` **endTime**: `number`

The track end time in milliseconds (must be > 0). null resets this if it was set previously

#### Defined in

src/typings/node/rest.ts:183

***

### filters?

> `optional` **filters**: `Partial`\<[`FiltersOptions`](FiltersOptions.md)\>

The new filters to apply. This will override all previously applied filters

#### Defined in

src/typings/node/rest.ts:198

***

### paused?

> `optional` **paused**: `boolean`

Whether the player is paused

#### Defined in

src/typings/node/rest.ts:193

***

### position?

> `optional` **position**: `number`

The track position in milliseconds

#### Defined in

src/typings/node/rest.ts:178

***

### track?

> `optional` **track**: [`UpdatePlayerTrack`](UpdatePlayerTrack.md)

Specification for a new track to load, as well as user data to set

#### Defined in

src/typings/node/rest.ts:173

***

### voice?

> `optional` **voice**: `Required`\<[`VoiceServer`](VoiceServer.md)\>

Information required for connecting to Discord

#### Defined in

src/typings/node/rest.ts:203

***

### volume?

> `optional` **volume**: `number`

The player volume, in percentage, from 0 to 1000

#### Defined in

src/typings/node/rest.ts:188
