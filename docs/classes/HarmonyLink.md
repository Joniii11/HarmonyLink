[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / HarmonyLink

# Class: HarmonyLink

## Extends

- `EventEmitter`

## Constructors

### new HarmonyLink()

> **new HarmonyLink**(`options`): [`HarmonyLink`](HarmonyLink.md)

#### Parameters

• **options**: [`HarmonyLinkConfiguration`](../interfaces/HarmonyLinkConfiguration.md)

#### Returns

[`HarmonyLink`](HarmonyLink.md)

#### Defined in

[HarmonyLink.ts:59](https://github.com/Joniii11/HarmonyLink/blob/master/src/HarmonyLink.ts#L59)

## Properties

### on()

> **on**: \<`K`\>(`event`, `listener`) => `this`

#### Type Parameters

• **K** *extends* keyof [`HarmonyLinkEvents`](../interfaces/HarmonyLinkEvents.md)

#### Parameters

• **event**: `K`

• **listener**: [`HarmonyLinkEvents`](../interfaces/HarmonyLinkEvents.md)\[`K`\]

#### Returns

`this`

#### Defined in

[HarmonyLink.ts:35](https://github.com/Joniii11/HarmonyLink/blob/master/src/HarmonyLink.ts#L35)

***

### once()

> **once**: \<`K`\>(`event`, `listener`) => `this`

#### Type Parameters

• **K** *extends* keyof [`HarmonyLinkEvents`](../interfaces/HarmonyLinkEvents.md)

#### Parameters

• **event**: `K`

• **listener**: [`HarmonyLinkEvents`](../interfaces/HarmonyLinkEvents.md)\[`K`\]

#### Returns

`this`

#### Defined in

[HarmonyLink.ts:36](https://github.com/Joniii11/HarmonyLink/blob/master/src/HarmonyLink.ts#L36)

***

### emit()

> **emit**: \<`K`\>(`event`, ...`args`) => `boolean`

#### Type Parameters

• **K** *extends* keyof [`HarmonyLinkEvents`](../interfaces/HarmonyLinkEvents.md)

#### Parameters

• **event**: `K`

• ...**args**: `Parameters`\<[`HarmonyLinkEvents`](../interfaces/HarmonyLinkEvents.md)\[`K`\]\>

#### Returns

`boolean`

#### Defined in

[HarmonyLink.ts:37](https://github.com/Joniii11/HarmonyLink/blob/master/src/HarmonyLink.ts#L37)

***

### off()

> **off**: \<`K`\>(`event`, `listener`) => `this`

#### Type Parameters

• **K** *extends* keyof [`HarmonyLinkEvents`](../interfaces/HarmonyLinkEvents.md)

#### Parameters

• **event**: `K`

• **listener**: [`HarmonyLinkEvents`](../interfaces/HarmonyLinkEvents.md)\[`K`\]

#### Returns

`this`

#### Defined in

[HarmonyLink.ts:41](https://github.com/Joniii11/HarmonyLink/blob/master/src/HarmonyLink.ts#L41)

***

### botID

> **botID**: `string` = `""`

#### Defined in

[HarmonyLink.ts:45](https://github.com/Joniii11/HarmonyLink/blob/master/src/HarmonyLink.ts#L45)

***

### isReady

> **isReady**: `boolean` = `false`

#### Defined in

[HarmonyLink.ts:46](https://github.com/Joniii11/HarmonyLink/blob/master/src/HarmonyLink.ts#L46)

***

### version

> `readonly` **version**: `string` = `config.version`

#### Defined in

[HarmonyLink.ts:48](https://github.com/Joniii11/HarmonyLink/blob/master/src/HarmonyLink.ts#L48)

***

### config

> `readonly` **config**: [`Config`](../interfaces/Config.md)

#### Defined in

[HarmonyLink.ts:49](https://github.com/Joniii11/HarmonyLink/blob/master/src/HarmonyLink.ts#L49)

***

### library

> `readonly` **library**: `AbstractLibraryClass`\<`any`\>

#### Defined in

[HarmonyLink.ts:50](https://github.com/Joniii11/HarmonyLink/blob/master/src/HarmonyLink.ts#L50)

***

### nodes

> `readonly` **nodes**: [`NodeGroup`](../interfaces/NodeGroup.md)[]

#### Defined in

[HarmonyLink.ts:51](https://github.com/Joniii11/HarmonyLink/blob/master/src/HarmonyLink.ts#L51)

***

### options

> `readonly` **options**: [`RequiredHarmonyLinkConfiguration`](../type-aliases/RequiredHarmonyLinkConfiguration.md)

#### Defined in

[HarmonyLink.ts:52](https://github.com/Joniii11/HarmonyLink/blob/master/src/HarmonyLink.ts#L52)

***

### drivers

> `readonly` **drivers**: `AbstractNodeDriver`[] = `[]`

#### Defined in

[HarmonyLink.ts:53](https://github.com/Joniii11/HarmonyLink/blob/master/src/HarmonyLink.ts#L53)

***

### nodeManager

> `readonly` **nodeManager**: `NodeManager`

#### Defined in

[HarmonyLink.ts:56](https://github.com/Joniii11/HarmonyLink/blob/master/src/HarmonyLink.ts#L56)

***

### playerManager

> `readonly` **playerManager**: `PlayerManager`

#### Defined in

[HarmonyLink.ts:57](https://github.com/Joniii11/HarmonyLink/blob/master/src/HarmonyLink.ts#L57)

## Methods

### resolve()

> **resolve**(`options`, `node`?): `Promise`\<`Result`\<[`Response`](Response.md), `Error`\>\>

Resolves a track.

#### Parameters

• **options**: [`ResolveOptions`](../interfaces/ResolveOptions.md)

Options for resolving tracks.

• **node?**: [`Node`](Node.md)

Node to use for resolution.

#### Returns

`Promise`\<`Result`\<[`Response`](Response.md), `Error`\>\>

The response containing resolved tracks.

#### Defined in

[HarmonyLink.ts:89](https://github.com/Joniii11/HarmonyLink/blob/master/src/HarmonyLink.ts#L89)

***

### createPlayer()

> **createPlayer**(`playerOptions`, `node`?): `Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

Creates a player.

#### Parameters

• **playerOptions**: `Omit`\<[`PlayerOptions`](../interfaces/PlayerOptions.md), `"node"`\>

Options for the player.

• **node?**: [`Node`](Node.md)

Node to use for the player.

#### Returns

`Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

The created player.

#### Defined in

[HarmonyLink.ts:107](https://github.com/Joniii11/HarmonyLink/blob/master/src/HarmonyLink.ts#L107)

***

### destroyPlayer()

> **destroyPlayer**(`guildId`): `Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

Destroys a player.

#### Parameters

• **guildId**: `string`

The guild ID of the player to destroy.

#### Returns

`Promise`\<`Result`\<[`Player`](Player.md), `Error`\>\>

The destroyed player.

#### Defined in

[HarmonyLink.ts:116](https://github.com/Joniii11/HarmonyLink/blob/master/src/HarmonyLink.ts#L116)

***

### addNode()

Adds a node or multiple nodes to the node manager.

#### Param

The node or nodes to add. Can be a single NodeGroup or an array of NodeGroups.

#### addNode(nodes)

> **addNode**(`nodes`): `Promise`\<`Result`\<[`Node`](Node.md)[], `Error`[]\>\>

Adds a node to the node manager.

##### Parameters

• **nodes**: [`NodeGroup`](../interfaces/NodeGroup.md)[]

The nodes to add.

##### Returns

`Promise`\<`Result`\<[`Node`](Node.md)[], `Error`[]\>\>

The added nodes.

##### Defined in

[HarmonyLink.ts:125](https://github.com/Joniii11/HarmonyLink/blob/master/src/HarmonyLink.ts#L125)

#### addNode(node)

> **addNode**(`node`): `Promise`\<`Result`\<[`Node`](Node.md), `Error`\>\>

Adds a node to the node manager.

##### Parameters

• **node**: [`NodeGroup`](../interfaces/NodeGroup.md)

The node to add.

##### Returns

`Promise`\<`Result`\<[`Node`](Node.md), `Error`\>\>

The added node.

##### Defined in

[HarmonyLink.ts:131](https://github.com/Joniii11/HarmonyLink/blob/master/src/HarmonyLink.ts#L131)

***

### removeNode()

> **removeNode**(`nodeName`): `Promise`\<`Result`\<[`Node`](Node.md), `Error`\>\>

Removes a node from the node manager.

#### Parameters

• **nodeName**: `string`

The name of the node to remove.

#### Returns

`Promise`\<`Result`\<[`Node`](Node.md), `Error`\>\>

The removed node.

#### Defined in

[HarmonyLink.ts:165](https://github.com/Joniii11/HarmonyLink/blob/master/src/HarmonyLink.ts#L165)

***

### decodeTracks()

> **decodeTracks**(`tracks`, `node`?): `Promise`\<`Result`\<[`TrackData`](../interfaces/TrackData.md)[], `Error`\>\>

Decodes a or multiple encoded tracks.

#### Parameters

• **tracks**: `string` \| `string`[]

The track to decode.

• **node?**: [`Node`](Node.md)

#### Returns

`Promise`\<`Result`\<[`TrackData`](../interfaces/TrackData.md)[], `Error`\>\>

- A Promise that resolves to the decoded track.

#### Defined in

[HarmonyLink.ts:176](https://github.com/Joniii11/HarmonyLink/blob/master/src/HarmonyLink.ts#L176)
