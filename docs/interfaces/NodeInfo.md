[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / NodeInfo

# Interface: NodeInfo

## Properties

### version

> **version**: `object`

The version of this Lavalink server

#### semver

> **semver**: `string`

The full version string of this Lavalink server

#### major

> **major**: `number`

The major version of this Lavalink server

#### minor

> **minor**: `number`

The minor version of this Lavalink server

#### patch

> **patch**: `number`

The patch version of this Lavalink server

#### preRelease?

> `optional` **preRelease**: `string`

The pre-release version according to semver as a `.` separated list of identifiers

#### build?

> `optional` **build**: `string`

The build metadata according to semver as a `.` separated list of identifiers

#### Defined in

[typings/node/index.ts:104](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L104)

***

### buildTime

> **buildTime**: `number`

The millisecond unix timestamp when this Lavalink jar was built

#### Defined in

[typings/node/index.ts:139](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L139)

***

### git

> **git**: `object`

The git information of this Lavalink server

#### branch

> **branch**: `string`

The branch this Lavalink server was built on

#### commit

> **commit**: `string`

The commit this Lavalink server was built on

#### commitTime

> **commitTime**: `number`

The millisecond unix timestamp for when the commit was created

#### Defined in

[typings/node/index.ts:144](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L144)

***

### jvm

> **jvm**: `string`

The JVM version this Lavalink server runs on

#### Defined in

[typings/node/index.ts:164](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L164)

***

### lavaplayer

> **lavaplayer**: `string`

The Lavaplayer version being used by this server

#### Defined in

[typings/node/index.ts:169](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L169)

***

### sourceManagers

> **sourceManagers**: `string`[]

The enabled source managers for this server

#### Defined in

[typings/node/index.ts:174](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L174)

***

### filters

> **filters**: `string`[]

The enabled filters for this server

#### Defined in

[typings/node/index.ts:179](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L179)

***

### plugins

> **plugins**: `object`[]

The enabled plugins for this server

#### Defined in

[typings/node/index.ts:184](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/index.ts#L184)
