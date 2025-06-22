[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / SetStateUpdate

# Interface: SetStateUpdate

[From the discord docs](https://discord.com/developers/docs/resources/voice#voice-state-object)

 SetStateUpdate

## Description

This interface is used to update the voice state of a user.

## Properties

### guild\_id?

> `optional` **guild\_id**: `string`

the guild id this voice state is for

#### Defined in

[typings/player/connection.ts:31](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/player/connection.ts#L31)

***

### channel\_id

> **channel\_id**: `string`

the channel id this user is connected to

#### Defined in

[typings/player/connection.ts:36](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/player/connection.ts#L36)

***

### user\_id

> **user\_id**: `string`

the user id this voice state is for

#### Defined in

[typings/player/connection.ts:41](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/player/connection.ts#L41)

***

### member?

> `optional` **member**: `Record`\<`string`, `unknown`\>

the guild member this voice state is for

#### Defined in

[typings/player/connection.ts:46](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/player/connection.ts#L46)

***

### session\_id

> **session\_id**: `string`

the session id for this voice state

#### Defined in

[typings/player/connection.ts:51](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/player/connection.ts#L51)

***

### deaf

> **deaf**: `boolean`

whether this user is deafened by the server

#### Defined in

[typings/player/connection.ts:56](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/player/connection.ts#L56)

***

### mute

> **mute**: `boolean`

whether this user is muted by the server

#### Defined in

[typings/player/connection.ts:61](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/player/connection.ts#L61)

***

### self\_deaf

> **self\_deaf**: `boolean`

whether this user is locally deafened

#### Defined in

[typings/player/connection.ts:66](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/player/connection.ts#L66)

***

### self\_mute

> **self\_mute**: `boolean`

whether this user is locally muted

#### Defined in

[typings/player/connection.ts:71](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/player/connection.ts#L71)

***

### self\_stream?

> `optional` **self\_stream**: `boolean`

whether this user is streaming using "Go Live"

#### Defined in

[typings/player/connection.ts:76](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/player/connection.ts#L76)

***

### self\_video

> **self\_video**: `boolean`

whether this user's camera is enabled

#### Defined in

[typings/player/connection.ts:81](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/player/connection.ts#L81)

***

### suppress

> **suppress**: `boolean`

whether this user is muted by the current user

#### Defined in

[typings/player/connection.ts:86](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/player/connection.ts#L86)

***

### request\_to\_speak\_timestamp?

> `optional` **request\_to\_speak\_timestamp**: \`$\{number\}$\{number\}$\{number\}$\{number\}-$\{number\}$\{number\}-$\{number\}$\{number\}T$\{number\}$\{number\}:$\{number\}$\{number\}:$\{number\}$\{number\}.$\{number\}$\{number\}$\{number\}Z\`

the time at which the user requested to speak

#### Defined in

[typings/player/connection.ts:91](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/player/connection.ts#L91)
