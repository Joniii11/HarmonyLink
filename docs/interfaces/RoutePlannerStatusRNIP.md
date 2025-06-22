[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / RoutePlannerStatusRNIP

# Interface: RoutePlannerStatusRNIP

## Properties

### class

> **class**: `"RotatingNanoIpRoutePlanner"`

The name of the RoutePlanner implementation being used by this server

#### Defined in

[typings/node/rest.ts:324](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/rest.ts#L324)

***

### details

> **details**: [`RoutePlannerStatusBase`](RoutePlannerStatusBase.md) & `object`

The status details of the RoutePlanner

#### Type declaration

##### currentAddressIndex

> **currentAddressIndex**: `string`

The current offset in the ip block

##### blockIndex

> **blockIndex**: `string`

The information in which /64 block ips are chosen. This number increases on each ban.

#### Defined in

[typings/node/rest.ts:329](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/node/rest.ts#L329)
