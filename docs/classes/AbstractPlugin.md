[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / AbstractPlugin

# Class: `abstract` AbstractPlugin\<TConfig\>

Enhanced abstract plugin class with better typing and lifecycle management

## Type Parameters

• **TConfig** *extends* [`PluginConfig`](../interfaces/PluginConfig.md) = [`PluginConfig`](../interfaces/PluginConfig.md)

## Constructors

### new AbstractPlugin()

> **new AbstractPlugin**\<`TConfig`\>(`config`): [`AbstractPlugin`](AbstractPlugin.md)\<`TConfig`\>

#### Parameters

• **config**: `TConfig`

#### Returns

[`AbstractPlugin`](AbstractPlugin.md)\<`TConfig`\>

#### Defined in

[plugin/AbstractPlugin.ts:86](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L86)

## Properties

### metadata

> `abstract` `readonly` **metadata**: [`PluginMetadata`](../interfaces/PluginMetadata.md)

Plugin metadata - readonly for immutability

#### Defined in

[plugin/AbstractPlugin.ts:69](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L69)

***

### manager

> **manager**: `undefined` \| [`HarmonyLink`](HarmonyLink.md)

The HarmonyLink instance that the plugin interacts with

#### Defined in

[plugin/AbstractPlugin.ts:74](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L74)

***

### config

> `protected` **config**: `TConfig`

Plugin configuration with type safety

#### Defined in

[plugin/AbstractPlugin.ts:79](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L79)

## Accessors

### name

> `get` **name**(): `string`

Get plugin metadata safely

#### Returns

`string`

#### Defined in

[plugin/AbstractPlugin.ts:93](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L93)

***

### version

> `get` **version**(): `string`

#### Returns

`string`

#### Defined in

[plugin/AbstractPlugin.ts:97](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L97)

***

### author

> `get` **author**(): `string`

#### Returns

`string`

#### Defined in

[plugin/AbstractPlugin.ts:101](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L101)

***

### description

> `get` **description**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Defined in

[plugin/AbstractPlugin.ts:105](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L105)

***

### isLoaded

> `get` **isLoaded**(): `boolean`

#### Returns

`boolean`

#### Defined in

[plugin/AbstractPlugin.ts:109](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L109)

## Methods

### initialize()

> **initialize**(`manager`): `Promise`\<`Result`\<`void`, [`PluginError`](PluginError.md)\>\>

Main plugin initialization method with Result type

#### Parameters

• **manager**: [`HarmonyLink`](HarmonyLink.md)

The HarmonyLink instance

#### Returns

`Promise`\<`Result`\<`void`, [`PluginError`](PluginError.md)\>\>

#### Defined in

[plugin/AbstractPlugin.ts:117](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L117)

***

### shutdown()

> **shutdown**(): `Promise`\<`Result`\<`void`, [`PluginError`](PluginError.md)\>\>

Plugin cleanup method with Result type

#### Returns

`Promise`\<`Result`\<`void`, [`PluginError`](PluginError.md)\>\>

#### Defined in

[plugin/AbstractPlugin.ts:171](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L171)

***

### updateConfig()

> **updateConfig**(`newConfig`): `Result`\<`void`, [`PluginError`](PluginError.md)\>

Update plugin configuration with validation

#### Parameters

• **newConfig**: `Partial`\<`TConfig`\>

#### Returns

`Result`\<`void`, [`PluginError`](PluginError.md)\>

#### Defined in

[plugin/AbstractPlugin.ts:209](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L209)

***

### getConfig()

> **getConfig**(): `Readonly`\<`TConfig`\>

Get current configuration

#### Returns

`Readonly`\<`TConfig`\>

#### Defined in

[plugin/AbstractPlugin.ts:233](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L233)

***

### validateCompatibility()

> **validateCompatibility**(`harmonyLinkVersion`): `Result`\<`void`, [`PluginError`](PluginError.md)\>

Validate plugin compatibility with Result type

#### Parameters

• **harmonyLinkVersion**: `string`

#### Returns

`Result`\<`void`, [`PluginError`](PluginError.md)\>

#### Defined in

[plugin/AbstractPlugin.ts:240](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L240)

***

### validateDependencies()

> **validateDependencies**(`availablePlugins`): `Result`\<`void`, [`PluginError`](PluginError.md)\>

Check if all dependencies are satisfied with Result type

#### Parameters

• **availablePlugins**: readonly `string`[]

#### Returns

`Result`\<`void`, [`PluginError`](PluginError.md)\>

#### Defined in

[plugin/AbstractPlugin.ts:259](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L259)

***

### validateConfig()

> `protected` **validateConfig**(`config`): `Result`\<`void`, [`PluginError`](PluginError.md)\>

Validate plugin configuration (override in derived classes)

#### Parameters

• **config**: `TConfig`

#### Returns

`Result`\<`void`, [`PluginError`](PluginError.md)\>

#### Defined in

[plugin/AbstractPlugin.ts:279](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L279)

***

### load()

> `abstract` `protected` **load**(`manager`): `Promise`\<`Result`\<`void`, [`PluginError`](PluginError.md)\>\>

#### Parameters

• **manager**: [`HarmonyLink`](HarmonyLink.md)

#### Returns

`Promise`\<`Result`\<`void`, [`PluginError`](PluginError.md)\>\>

#### Defined in

[plugin/AbstractPlugin.ts:291](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L291)

***

### unload()

> `abstract` `protected` **unload**(`manager`): `Promise`\<`Result`\<`void`, [`PluginError`](PluginError.md)\>\>

#### Parameters

• **manager**: [`HarmonyLink`](HarmonyLink.md)

#### Returns

`Promise`\<`Result`\<`void`, [`PluginError`](PluginError.md)\>\>

#### Defined in

[plugin/AbstractPlugin.ts:292](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L292)

***

### onConfigUpdate()?

> `protected` `optional` **onConfigUpdate**(`config`): `void`

#### Parameters

• **config**: `TConfig`

#### Returns

`void`

#### Defined in

[plugin/AbstractPlugin.ts:295](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L295)
