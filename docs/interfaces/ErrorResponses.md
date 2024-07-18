[**harmonylink**](../README.md) • **Docs**

***

[harmonylink](../globals.md) / ErrorResponses

# Interface: ErrorResponses

This interface represents the LavaLink V4 Error Responses

## See

https://lavalink.dev/api/rest.html#error-responses

## Properties

### error

> **error**: `string`

The HTTP status code message

#### Defined in

src/typings/node/rest.ts:133

***

### message

> **message**: `string`

The error message

#### Defined in

src/typings/node/rest.ts:144

***

### path

> **path**: `string`

The path of the request

#### Defined in

src/typings/node/rest.ts:149

***

### status

> **status**: `number`

The HTTP status code

#### Defined in

src/typings/node/rest.ts:128

***

### timestamp

> **timestamp**: `number`

The timestamp of the error in milliseconds since the Unix epoch

#### Defined in

src/typings/node/rest.ts:123

***

### trace?

> `optional` **trace**: `string`

The stack trace of the error when trace=true as query param has been sent

#### Optional

#### Defined in

src/typings/node/rest.ts:139
