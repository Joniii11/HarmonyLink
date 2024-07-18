[**harmonylink**](../README.md) • **Docs**

***

[harmonylink](../globals.md) / RoutePlannerStatusRIRP

# Interface: RoutePlannerStatusRIRP

## Properties

### class

> **class**: `"RotatingIpRoutePlanner"`

The name of the RoutePlanner implementation being used by this server

#### Defined in

src/typings/node/rest.ts:280

***

### details

> **details**: [`RoutePlannerStatusBase`](RoutePlannerStatusBase.md) & `object`

The status details of the RoutePlanner

#### Type declaration

##### currentAddress

> **currentAddress**: `string`

The current address being used

##### ipIndex

> **ipIndex**: `string`

The current offset in the block

##### rotateIndex

> **rotateIndex**: `string`

The number of rotations

#### Defined in

src/typings/node/rest.ts:285
