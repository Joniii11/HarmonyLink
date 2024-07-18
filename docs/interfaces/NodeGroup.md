[**harmonylink**](../README.md) • **Docs**

***

[harmonylink](../globals.md) / NodeGroup

# Interface: NodeGroup

## Properties

### host

> **host**: `string`

The URL or IP address of the node to connect to

#### Defined in

src/typings/node/index.ts:284

***

### name

> **name**: `string`

The name of the node group

#### Defined in

src/typings/node/index.ts:279

***

### password?

> `optional` **password**: `string`

The password for authenticating with the node.

#### Default

```ts
"youshallnotpass"
```

#### Defined in

src/typings/node/index.ts:291

***

### port?

> `optional` **port**: `number`

The port number of the node.

#### Default

```ts
2333
```

#### Defined in

src/typings/node/index.ts:298

***

### secure?

> `optional` **secure**: `boolean`

Indicates whether the node uses a secure connection (HTTPS).

#### Default

```ts
false
```

#### Defined in

src/typings/node/index.ts:305

***

### type?

> `optional` **type**: [`NodeType`](../enumerations/NodeType.md)

The type of the node

#### Default

```ts
NodeType.LavaLinkV4
```

#### Defined in

src/typings/node/index.ts:312
