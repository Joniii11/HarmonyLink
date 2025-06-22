[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / HarmonyLinkConfiguration

# Interface: HarmonyLinkConfiguration

## Properties

### library

> **library**: `AbstractLibraryClass`\<`any`\>

The library instance used for interacting with the Discord client.
This should be an instance of a class extending `AbstractLibraryClass`.

```ts
import { DJSLibrary } from "HarmonyLink";
import { Client } from "discord.js"

// Initialize your client
const client = new Client();

const config: HarmonyLinkConfiguration = {
  ...YourConfiguration
  library: new DJSLibrary(client),
}
```

#### Defined in

[typings/HarmonyLink.ts:33](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L33)

***

### nodes

> **nodes**: [`NodeGroup`](NodeGroup.md)[]

The nodes to use and connect to

#### Defined in

[typings/HarmonyLink.ts:38](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L38)

***

### resume?

> `optional` **resume**: `boolean`

Whether to automatically resume players when the node is reconnected (Note: DOES NOT RESUME WHEN THE LAVALINK SERVER DIES)

#### Default

```ts
true
```

#### Defined in

[typings/HarmonyLink.ts:45](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L45)

***

### plugins?

> `optional` **plugins**: [`AbstractPlugin`](../classes/AbstractPlugin.md)\<[`PluginConfig`](PluginConfig.md)\>[]

Additional plugins to use for the library

#### Default

```ts
[]
```

#### Defined in

[typings/HarmonyLink.ts:52](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L52)

***

### additionalDriver?

> `optional` **additionalDriver**: `AbstractNodeDriver`[]

Additional drivers to use for connecting to other nodes.

#### See

 - If you are using a custom driver, you should extend `AbstractNodeDriver` and implement the methods.
 - If you want, you can go onto our github and create a pull request to add your driver to the main repository so that it is supported by default.

#### Default

```ts
[]
```

#### Defined in

[typings/HarmonyLink.ts:62](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L62)

***

### resumeTimeout?

> `optional` **resumeTimeout**: `number`

The timeout to use when resuming players

#### Default

```ts
10000
```

#### Defined in

[typings/HarmonyLink.ts:69](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L69)

***

### reconnectTries?

> `optional` **reconnectTries**: `number`

The amount of times to try to reconnect to the node

#### Default

```ts
5
```

#### Defined in

[typings/HarmonyLink.ts:76](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L76)

***

### reconnectTimeout?

> `optional` **reconnectTimeout**: `number`

The timeout for the reconnect

#### Default

```ts
5000
```

#### Defined in

[typings/HarmonyLink.ts:83](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L83)

***

### nodeResolver()?

> `optional` **nodeResolver**: (`nodes`) => `Promise`\<`void` \| [`Node`](../classes/Node.md)\>

A custom resolver for the NodeResolver

#### Parameters

• **nodes**: `NodeManager`

#### Returns

`Promise`\<`void` \| [`Node`](../classes/Node.md)\>

#### Default

```ts
 const nodes = this.allNodes;

 const onlineNodes = nodes.filter(node => node.isConnected);

 if (!onlineNodes || onlineNodes.length === 0) {
     throw new Error("[HarmonyLink] [NodeManager] No nodes are online.");
 };

 const promises = onlineNodes.map( node => {
     const stats = node.stats;
     return { node, stats };
 });

 const results = await Promise.all(promises);
 const sorted = results.sort((a, b) => a.stats.players - b.stats.players);

 return sorted[0].node;
```

#### Defined in

[typings/HarmonyLink.ts:109](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L109)

***

### nodeAdder()?

> `optional` **nodeAdder**: (`nodeManager`, `node`) => `Promise`\<`void` \| [`Node`](../classes/Node.md)\>

A custom resolver for adding Nodes.

#### Parameters

• **nodeManager**: `NodeManager`

• **node**: [`NodeGroup`](NodeGroup.md)

#### Returns

`Promise`\<`void` \| [`Node`](../classes/Node.md)\>

#### Default

```ts
undefined
```

#### Defined in

[typings/HarmonyLink.ts:116](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L116)

***

### customAutoplay()?

> `optional` **customAutoplay**: (`player`) => `Promise`\<`void` \| [`Player`](../classes/Player.md)\>

A custom autoplay function to use for autoplaying tracks

#### Parameters

• **player**: [`Player`](../classes/Player.md)

#### Returns

`Promise`\<`void` \| [`Player`](../classes/Player.md)\>

#### Default

```ts
 try {
     const prevTrack = previousTrack ?? this.queue.previousTrack;
     if (!prevTrack) return this;

     switch (prevTrack.info.sourceName) {
          case "soundcloud": {
              const response = await this.resolve({ query: `${prevTrack.info.title}`, requester: prevTrack.info.requester, source: "scsearch" });
          
              if (!response.tracks.length || response.tracks.length === 0 || ["error", "empty"].includes(response.loadType)) return await this.skip();

             this.queue.add(response.tracks[Math.floor(Math.random() * Math.floor(response.tracks.length))]);
             return await this.play();
          };

          case "youtube":
          default: {
             const searchedURL = `https://www.youtube.com/watch?v=${prevTrack.info.identifier || this.queue.currentTrack?.info.identifier}&list=RD${prevTrack.info.identifier || this.queue.currentTrack?.info.identifier}`;
             const response = await this.resolve({ query: searchedURL, requester: prevTrack.info.requester, source: "ytmsearch" });

             if (!response.tracks.length || response.tracks.length === 0 || ["error", "empty"].includes(response.loadType)) return await this.skip();
         
             response.tracks.shift();
         
             const track = response.tracks[Math.floor(Math.random() * Math.floor(response.tracks.length))];
             this.queue.add(track);

             return await this.play();
         };
     }
 } catch {
     return this.skip()
 }
```

#### Defined in

[typings/HarmonyLink.ts:157](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L157)

***

### defaultVolume?

> `optional` **defaultVolume**: `number`

The default volume to use for players

#### Default

```ts
100
```

#### Defined in

[typings/HarmonyLink.ts:164](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L164)

***

### defaultPlatform?

> `optional` **defaultPlatform**: `string`

The default source (platform) to use for resolving tracks

#### Default

```ts
"ytsearch"
```

#### Defined in

[typings/HarmonyLink.ts:171](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L171)

***

### voiceConnectionTimeout?

> `optional` **voiceConnectionTimeout**: `number`

The timeout to use for voice connections

#### Default

```ts
10000
```

#### Defined in

[typings/HarmonyLink.ts:178](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L178)

***

### reconnectVoiceConnection?

> `optional` **reconnectVoiceConnection**: `boolean`

Reconnect the player when the voice connection is lost and recovered

#### Default

```ts
true
```

#### Defined in

[typings/HarmonyLink.ts:185](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/HarmonyLink.ts#L185)
