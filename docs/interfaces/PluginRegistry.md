[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / PluginRegistry

# Interface: PluginRegistry

Plugin registry interface with Result types

## Methods

### register()

> **register**\<`T`\>(`name`, `pluginConstructor`, `config`): `Result`\<`void`, [`PluginError`](../classes/PluginError.md)\>

#### Type Parameters

• **T** *extends* [`AbstractPlugin`](../classes/AbstractPlugin.md)\<[`PluginConfig`](PluginConfig.md)\>

#### Parameters

• **name**: `string`

• **pluginConstructor**: [`PluginConstructor`](../type-aliases/PluginConstructor.md)\<`T`\>

• **config**: [`PluginConfig`](PluginConfig.md)

#### Returns

`Result`\<`void`, [`PluginError`](../classes/PluginError.md)\>

#### Defined in

[plugin/AbstractPlugin.ts:307](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L307)

***

### unregister()

> **unregister**(`name`): `Result`\<`void`, [`PluginError`](../classes/PluginError.md)\>

#### Parameters

• **name**: `string`

#### Returns

`Result`\<`void`, [`PluginError`](../classes/PluginError.md)\>

#### Defined in

[plugin/AbstractPlugin.ts:313](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L313)

***

### get()

> **get**\<`T`\>(`name`): `undefined` \| `T`

#### Type Parameters

• **T** *extends* [`AbstractPlugin`](../classes/AbstractPlugin.md)\<[`PluginConfig`](PluginConfig.md)\> = [`AbstractPlugin`](../classes/AbstractPlugin.md)\<[`PluginConfig`](PluginConfig.md)\>

#### Parameters

• **name**: `string`

#### Returns

`undefined` \| `T`

#### Defined in

[plugin/AbstractPlugin.ts:315](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L315)

***

### getAll()

> **getAll**(): readonly [`AbstractPlugin`](../classes/AbstractPlugin.md)\<[`PluginConfig`](PluginConfig.md)\>[]

#### Returns

readonly [`AbstractPlugin`](../classes/AbstractPlugin.md)\<[`PluginConfig`](PluginConfig.md)\>[]

#### Defined in

[plugin/AbstractPlugin.ts:317](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L317)

***

### loadAll()

> **loadAll**(`manager`): `Promise`\<`Result`\<`void`, [`PluginError`](../classes/PluginError.md)[]\>\>

#### Parameters

• **manager**: [`HarmonyLink`](../classes/HarmonyLink.md)

#### Returns

`Promise`\<`Result`\<`void`, [`PluginError`](../classes/PluginError.md)[]\>\>

#### Defined in

[plugin/AbstractPlugin.ts:319](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L319)

***

### unloadAll()

> **unloadAll**(): `Promise`\<`Result`\<`void`, [`PluginError`](../classes/PluginError.md)[]\>\>

#### Returns

`Promise`\<`Result`\<`void`, [`PluginError`](../classes/PluginError.md)[]\>\>

#### Defined in

[plugin/AbstractPlugin.ts:321](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L321)
