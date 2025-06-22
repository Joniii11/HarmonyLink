[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / Node

# Class: Node

## Extends

- `EventEmitter`

## Constructors

### new Node()

> **new Node**(`manager`, `options`): [`Node`](Node.md)

#### Parameters

• **manager**: [`HarmonyLink`](HarmonyLink.md)

• **options**: [`NodeGroup`](../interfaces/NodeGroup.md)

#### Returns

[`Node`](Node.md)

#### Defined in

[node/Node.ts:40](https://github.com/Joniii11/HarmonyLink/blob/master/src/node/Node.ts#L40)

## Properties

### on()

> **on**: \<`K`\>(`event`, `listener`) => `this`

#### Type Parameters

• **K** *extends* keyof [`NodeEvents`](../interfaces/NodeEvents.md)

#### Parameters

• **event**: `K`

• **listener**: [`NodeEvents`](../interfaces/NodeEvents.md)\[`K`\]

#### Returns

`this`

#### Defined in

[node/Node.ts:19](https://github.com/Joniii11/HarmonyLink/blob/master/src/node/Node.ts#L19)

***

### once()

> **once**: \<`K`\>(`event`, `listener`) => `this`

#### Type Parameters

• **K** *extends* keyof [`NodeEvents`](../interfaces/NodeEvents.md)

#### Parameters

• **event**: `K`

• **listener**: [`NodeEvents`](../interfaces/NodeEvents.md)\[`K`\]

#### Returns

`this`

#### Defined in

[node/Node.ts:20](https://github.com/Joniii11/HarmonyLink/blob/master/src/node/Node.ts#L20)

***

### emit()

> **emit**: \<`K`\>(`event`, ...`args`) => `boolean`

#### Type Parameters

• **K** *extends* keyof [`NodeEvents`](../interfaces/NodeEvents.md)

#### Parameters

• **event**: `K`

• ...**args**: `Parameters`\<[`NodeEvents`](../interfaces/NodeEvents.md)\[`K`\]\>

#### Returns

`boolean`

#### Defined in

[node/Node.ts:21](https://github.com/Joniii11/HarmonyLink/blob/master/src/node/Node.ts#L21)

***

### off()

> **off**: \<`K`\>(`event`, `listener`) => `this`

#### Type Parameters

• **K** *extends* keyof [`NodeEvents`](../interfaces/NodeEvents.md)

#### Parameters

• **event**: `K`

• **listener**: [`NodeEvents`](../interfaces/NodeEvents.md)\[`K`\]

#### Returns

`this`

#### Defined in

[node/Node.ts:25](https://github.com/Joniii11/HarmonyLink/blob/master/src/node/Node.ts#L25)

***

### options

> **options**: `Required`\<[`NodeOptions`](../type-aliases/NodeOptions.md)\>

#### Defined in

[node/Node.ts:29](https://github.com/Joniii11/HarmonyLink/blob/master/src/node/Node.ts#L29)

***

### stats

> **stats**: [`NodeStats`](../interfaces/NodeStats.md)

#### Defined in

[node/Node.ts:30](https://github.com/Joniii11/HarmonyLink/blob/master/src/node/Node.ts#L30)

***

### isConnected

> **isConnected**: `boolean` = `false`

#### Defined in

[node/Node.ts:31](https://github.com/Joniii11/HarmonyLink/blob/master/src/node/Node.ts#L31)

***

### manager

> `readonly` **manager**: [`HarmonyLink`](HarmonyLink.md)

#### Defined in

[node/Node.ts:33](https://github.com/Joniii11/HarmonyLink/blob/master/src/node/Node.ts#L33)

***

### rest

> `readonly` **rest**: `Rest`

#### Defined in

[node/Node.ts:34](https://github.com/Joniii11/HarmonyLink/blob/master/src/node/Node.ts#L34)

***

### driver

> `readonly` **driver**: `AbstractNodeDriver`

#### Defined in

[node/Node.ts:35](https://github.com/Joniii11/HarmonyLink/blob/master/src/node/Node.ts#L35)

***

### players

> `readonly` **players**: `Map`\<`string`, [`Player`](Player.md)\>

#### Defined in

[node/Node.ts:36](https://github.com/Joniii11/HarmonyLink/blob/master/src/node/Node.ts#L36)

***

### NodeEventsHandler

> `protected` `readonly` **NodeEventsHandler**: `PlayerEvent`

#### Defined in

[node/Node.ts:38](https://github.com/Joniii11/HarmonyLink/blob/master/src/node/Node.ts#L38)

## Accessors

### isReady

> `get` **isReady**(): `boolean`

This method is used to check if the node is ready.

#### Returns

`boolean`

#### Defined in

[node/Node.ts:63](https://github.com/Joniii11/HarmonyLink/blob/master/src/node/Node.ts#L63)

## Methods

### setSessionId()

> **setSessionId**(`sessionId`): `void`

This method is used to set the session id.

#### Parameters

• **sessionId**: `string`

The session id.

#### Returns

`void`

#### Defined in

[node/Node.ts:71](https://github.com/Joniii11/HarmonyLink/blob/master/src/node/Node.ts#L71)

***

### connect()

> **connect**(): `Promise`\<`Result`\<`WebSocket`, `Error`\>\>

This method is used to connect to the node.

#### Returns

`Promise`\<`Result`\<`WebSocket`, `Error`\>\>

The websocket connection.

#### Defined in

[node/Node.ts:80](https://github.com/Joniii11/HarmonyLink/blob/master/src/node/Node.ts#L80)

***

### disconnect()

> **disconnect**(): `void`

This method is used to disconnect from the node.

#### Returns

`void`

Resolves once the node is disconnected.

#### Defined in

[node/Node.ts:98](https://github.com/Joniii11/HarmonyLink/blob/master/src/node/Node.ts#L98)

***

### reconnect()

> **reconnect**(): `Promise`\<`void`\>

This method is used to reconnect to the node.

#### Returns

`Promise`\<`void`\>

Resolves once the node is reconnected.

#### Defined in

[node/Node.ts:110](https://github.com/Joniii11/HarmonyLink/blob/master/src/node/Node.ts#L110)

***

### getStats()

> **getStats**(): `Promise`\<[`NodeStats`](../interfaces/NodeStats.md)\>

This method is used to get the node stats.

#### Returns

`Promise`\<[`NodeStats`](../interfaces/NodeStats.md)\>

The node stats.

#### Defined in

[node/Node.ts:133](https://github.com/Joniii11/HarmonyLink/blob/master/src/node/Node.ts#L133)

***

### getRoutePlannerStatus()

> **getRoutePlannerStatus**(): `Promise`\<[`RoutePlannerStatus`](../type-aliases/RoutePlannerStatus.md)\>

This method is used to get the route planner status.

#### Returns

`Promise`\<[`RoutePlannerStatus`](../type-aliases/RoutePlannerStatus.md)\>

The route planner status.

#### See

https://lavalink.dev/api/rest.html#get-routeplanner-status

#### Defined in

[node/Node.ts:150](https://github.com/Joniii11/HarmonyLink/blob/master/src/node/Node.ts#L150)

***

### unmarkAllFailingAddresses()

> **unmarkAllFailingAddresses**(): `Promise`\<`Result`\<`undefined`, `Error` \| [`ErrorResponses`](../interfaces/ErrorResponses.md)\>\>

This method is used to unmark all failed addresses.

#### Returns

`Promise`\<`Result`\<`undefined`, `Error` \| [`ErrorResponses`](../interfaces/ErrorResponses.md)\>\>

204 - No content.

#### See

https://lavalink.dev/api/rest.html#unmark-all-failed-address

#### Defined in

[node/Node.ts:160](https://github.com/Joniii11/HarmonyLink/blob/master/src/node/Node.ts#L160)

***

### unmarkFailingAddress()

> **unmarkFailingAddress**(`address`): `Promise`\<`Result`\<`undefined`, `Error` \| [`ErrorResponses`](../interfaces/ErrorResponses.md)\>\>

This method is used to unmark a failed address.

#### Parameters

• **address**: `string`

The address to unmark.

#### Returns

`Promise`\<`Result`\<`undefined`, `Error` \| [`ErrorResponses`](../interfaces/ErrorResponses.md)\>\>

204 - No content.

#### See

https://lavalink.dev/api/rest.html#unmark-a-failed-address

#### Defined in

[node/Node.ts:171](https://github.com/Joniii11/HarmonyLink/blob/master/src/node/Node.ts#L171)
