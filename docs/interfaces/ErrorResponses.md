[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / ErrorResponses

# Interface: ErrorResponses

This interface represents the LavaLink V4 Error Responses

## See

https://lavalink.dev/api/rest.html#error-responses

## Properties

### timestamp

> **timestamp**: `number`

The timestamp of the error in milliseconds since the Unix epoch

#### Defined in

[typings/node/rest.ts:123](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/rest.ts#L123)

***

### status

> **status**: `number`

The HTTP status code

#### Defined in

[typings/node/rest.ts:128](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/rest.ts#L128)

***

### error

> **error**: `string`

The HTTP status code message

#### Defined in

[typings/node/rest.ts:133](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/rest.ts#L133)

***

### trace?

> `optional` **trace**: `string`

The stack trace of the error when trace=true as query param has been sent

#### Optional

#### Defined in

[typings/node/rest.ts:139](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/rest.ts#L139)

***

### message

> **message**: `string`

The error message

#### Defined in

[typings/node/rest.ts:144](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/rest.ts#L144)

***

### path

> **path**: `string`

The path of the request

#### Defined in

[typings/node/rest.ts:149](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/rest.ts#L149)
