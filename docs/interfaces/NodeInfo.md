[**harmonylink**](../README.md) • **Docs**

***

[harmonylink](../globals.md) / NodeInfo

# Interface: NodeInfo

## Properties

### buildTime

> **buildTime**: `number`

The millisecond unix timestamp when this Lavalink jar was built

#### Defined in

src/typings/node/index.ts:169

***

### filters

> **filters**: `string`[]

The enabled filters for this server

#### Defined in

src/typings/node/index.ts:209

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

src/typings/node/index.ts:174

***

### jvm

> **jvm**: `string`

The JVM version this Lavalink server runs on

#### Defined in

src/typings/node/index.ts:194

***

### lavaplayer

> **lavaplayer**: `string`

The Lavaplayer version being used by this server

#### Defined in

src/typings/node/index.ts:199

***

### plugins

> **plugins**: `object`[]

The enabled plugins for this server

#### Defined in

src/typings/node/index.ts:214

***

### sourceManagers

> **sourceManagers**: `string`[]

The enabled source managers for this server

#### Defined in

src/typings/node/index.ts:204

***

### version

> **version**: `object`

The version of this Lavalink server

#### build?

> `optional` **build**: `string`

The build metadata according to semver as a `.` separated list of identifiers

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

#### semver

> **semver**: `string`

The full version string of this Lavalink server

#### Defined in

src/typings/node/index.ts:134
