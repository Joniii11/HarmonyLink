[**harmonylink**](../README.md) • **Docs**

***

[harmonylink](../globals.md) / RoutePlannerStatusRNIP

# Interface: RoutePlannerStatusRNIP

## Properties

### class

> **class**: `"RotatingNanoIpRoutePlanner"`

The name of the RoutePlanner implementation being used by this server

#### Defined in

src/typings/node/rest.ts:324

***

### details

> **details**: [`RoutePlannerStatusBase`](RoutePlannerStatusBase.md) & `object`

The status details of the RoutePlanner

#### Type declaration

##### blockIndex

> **blockIndex**: `string`

The information in which /64 block ips are chosen. This number increases on each ban.

##### currentAddressIndex

> **currentAddressIndex**: `string`

The current offset in the ip block

#### Defined in

src/typings/node/rest.ts:329
