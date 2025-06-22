[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / PluginError

# Class: PluginError

## Extends

- `Error`

## Constructors

### new PluginError()

> **new PluginError**(`type`, `message`, `pluginName`?, `cause`?): [`PluginError`](PluginError.md)

#### Parameters

• **type**: [`PluginErrorType`](../enumerations/PluginErrorType.md)

• **message**: `string`

• **pluginName?**: `string`

• **cause?**: `Error`

#### Returns

[`PluginError`](PluginError.md)

#### Overrides

`Error.constructor`

#### Defined in

[plugin/AbstractPlugin.ts:19](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L19)

## Properties

### type

> `readonly` **type**: [`PluginErrorType`](../enumerations/PluginErrorType.md)

#### Defined in

[plugin/AbstractPlugin.ts:20](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L20)

***

### pluginName?

> `readonly` `optional` **pluginName**: `string`

#### Defined in

[plugin/AbstractPlugin.ts:22](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L22)

***

### cause?

> `readonly` `optional` **cause**: `Error`

#### Inherited from

`Error.cause`

#### Defined in

[plugin/AbstractPlugin.ts:23](https://github.com/Joniii11/HarmonyLink/blob/master/src/plugin/AbstractPlugin.ts#L23)
