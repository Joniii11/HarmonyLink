[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / NodeGroup

# Interface: NodeGroup

## Properties

### name

> **name**: `string`

The name of the node group

#### Defined in

[typings/node/index.ts:249](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L249)

***

### host

> **host**: `string`

The URL or IP address of the node to connect to

#### Defined in

[typings/node/index.ts:254](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L254)

***

### password?

> `optional` **password**: `string`

The password for authenticating with the node.

#### Default

```ts
"youshallnotpass"
```

#### Defined in

[typings/node/index.ts:261](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L261)

***

### port?

> `optional` **port**: `number`

The port number of the node.

#### Default

```ts
2333
```

#### Defined in

[typings/node/index.ts:268](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L268)

***

### secure?

> `optional` **secure**: `boolean`

Indicates whether the node uses a secure connection (HTTPS).

#### Default

```ts
false
```

#### Defined in

[typings/node/index.ts:275](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L275)

***

### type?

> `optional` **type**: [`NodeType`](../enumerations/NodeType.md)

The type of the node

#### Default

```ts
NodeType.LavaLinkV4
```

#### Defined in

[typings/node/index.ts:282](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L282)
