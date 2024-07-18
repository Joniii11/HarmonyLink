[**harmonylink**](../README.md) • **Docs**

***

[harmonylink](../globals.md) / AbstractPlugin

# Class: `abstract` AbstractPlugin

## Constructors

### new AbstractPlugin()

> **new AbstractPlugin**(): [`AbstractPlugin`](AbstractPlugin.md)

#### Returns

[`AbstractPlugin`](AbstractPlugin.md)

## Properties

### author

> `abstract` **author**: `string`

This will be the author of the plugin aka you.

#### Defined in

src/plugin/AbstractPlugin.ts:17

***

### manager

> `abstract` **manager**: `undefined` \| [`HarmonyLink`](HarmonyLink.md)

This will be the HarmonyLink instance that the plugin will interact with.

#### Defined in

src/plugin/AbstractPlugin.ts:22

***

### name

> `abstract` **name**: `string`

This will be the name of the plugin.

#### Defined in

src/plugin/AbstractPlugin.ts:7

***

### version

> `abstract` **version**: `string`

This will be the version of the plugin.

#### Defined in

src/plugin/AbstractPlugin.ts:12

## Methods

### load()

> `abstract` **load**(`manager`): `void` \| `Promise`\<`void`\>

This will be your entrypoint for your plugin to load and initialize it. You will also get the HarmonyLink instance to interact with the library.

#### Parameters

• **manager**: [`HarmonyLink`](HarmonyLink.md)

The HarmonyLink instance

#### Returns

`void` \| `Promise`\<`void`\>

If you return a promise, the library will wait for it to resolve before continuing.

#### Defined in

src/plugin/AbstractPlugin.ts:30
