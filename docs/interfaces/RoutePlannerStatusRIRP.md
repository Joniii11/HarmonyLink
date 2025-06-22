[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / RoutePlannerStatusRIRP

# Interface: RoutePlannerStatusRIRP

## Properties

### class

> **class**: `"RotatingIpRoutePlanner"`

The name of the RoutePlanner implementation being used by this server

#### Defined in

[typings/node/rest.ts:280](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/rest.ts#L280)

***

### details

> **details**: [`RoutePlannerStatusBase`](RoutePlannerStatusBase.md) & `object`

The status details of the RoutePlanner

#### Type declaration

##### rotateIndex

> **rotateIndex**: `string`

The number of rotations

##### ipIndex

> **ipIndex**: `string`

The current offset in the block

##### currentAddress

> **currentAddress**: `string`

The current address being used

#### Defined in

[typings/node/rest.ts:285](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/rest.ts#L285)
