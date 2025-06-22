[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / PluginHooks

# Interface: PluginHooks

Plugin lifecycle hooks for better extensibility

## Methods

### onLoad()?

> `optional` **onLoad**(`manager`): `Result`\<`void`, [`PluginError`](../classes/PluginError.md)\> \| `Promise`\<`Result`\<`void`, [`PluginError`](../classes/PluginError.md)\>\>

#### Parameters

• **manager**: [`HarmonyLink`](../classes/HarmonyLink.md)

#### Returns

`Result`\<`void`, [`PluginError`](../classes/PluginError.md)\> \| `Promise`\<`Result`\<`void`, [`PluginError`](../classes/PluginError.md)\>\>

#### Defined in

[plugin/AbstractPlugin.ts:46](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L46)

***

### onUnload()?

> `optional` **onUnload**(`manager`): `Result`\<`void`, [`PluginError`](../classes/PluginError.md)\> \| `Promise`\<`Result`\<`void`, [`PluginError`](../classes/PluginError.md)\>\>

#### Parameters

• **manager**: [`HarmonyLink`](../classes/HarmonyLink.md)

#### Returns

`Result`\<`void`, [`PluginError`](../classes/PluginError.md)\> \| `Promise`\<`Result`\<`void`, [`PluginError`](../classes/PluginError.md)\>\>

#### Defined in

[plugin/AbstractPlugin.ts:47](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L47)

***

### onPlayerCreate()?

> `optional` **onPlayerCreate**(`playerId`): `Result`\<`void`, [`PluginError`](../classes/PluginError.md)\> \| `Promise`\<`Result`\<`void`, [`PluginError`](../classes/PluginError.md)\>\>

#### Parameters

• **playerId**: `string`

#### Returns

`Result`\<`void`, [`PluginError`](../classes/PluginError.md)\> \| `Promise`\<`Result`\<`void`, [`PluginError`](../classes/PluginError.md)\>\>

#### Defined in

[plugin/AbstractPlugin.ts:48](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L48)

***

### onPlayerDestroy()?

> `optional` **onPlayerDestroy**(`playerId`): `Result`\<`void`, [`PluginError`](../classes/PluginError.md)\> \| `Promise`\<`Result`\<`void`, [`PluginError`](../classes/PluginError.md)\>\>

#### Parameters

• **playerId**: `string`

#### Returns

`Result`\<`void`, [`PluginError`](../classes/PluginError.md)\> \| `Promise`\<`Result`\<`void`, [`PluginError`](../classes/PluginError.md)\>\>

#### Defined in

[plugin/AbstractPlugin.ts:49](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L49)

***

### onTrackStart()?

> `optional` **onTrackStart**(`playerId`, `track`): `Result`\<`void`, [`PluginError`](../classes/PluginError.md)\> \| `Promise`\<`Result`\<`void`, [`PluginError`](../classes/PluginError.md)\>\>

#### Parameters

• **playerId**: `string`

• **track**: `any`

#### Returns

`Result`\<`void`, [`PluginError`](../classes/PluginError.md)\> \| `Promise`\<`Result`\<`void`, [`PluginError`](../classes/PluginError.md)\>\>

#### Defined in

[plugin/AbstractPlugin.ts:50](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L50)

***

### onTrackEnd()?

> `optional` **onTrackEnd**(`playerId`, `track`): `Result`\<`void`, [`PluginError`](../classes/PluginError.md)\> \| `Promise`\<`Result`\<`void`, [`PluginError`](../classes/PluginError.md)\>\>

#### Parameters

• **playerId**: `string`

• **track**: `any`

#### Returns

`Result`\<`void`, [`PluginError`](../classes/PluginError.md)\> \| `Promise`\<`Result`\<`void`, [`PluginError`](../classes/PluginError.md)\>\>

#### Defined in

[plugin/AbstractPlugin.ts:51](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L51)
