[**harmonylink**](../README.md) • **Docs**

***

[harmonylink](../globals.md) / SetStateUpdate

# Interface: SetStateUpdate

[From the discord docs](https://discord.com/developers/docs/resources/voice#voice-state-object)

 SetStateUpdate

## Description

This interface is used to update the voice state of a user.

## Properties

### channel\_id

> **channel\_id**: `string`

the channel id this user is connected to

#### Defined in

src/typings/player/connection.ts:36

***

### deaf

> **deaf**: `boolean`

whether this user is deafened by the server

#### Defined in

src/typings/player/connection.ts:56

***

### guild\_id?

> `optional` **guild\_id**: `string`

the guild id this voice state is for

#### Defined in

src/typings/player/connection.ts:31

***

### member?

> `optional` **member**: `Record`\<`string`, `unknown`\>

the guild member this voice state is for

#### Defined in

src/typings/player/connection.ts:46

***

### mute

> **mute**: `boolean`

whether this user is muted by the server

#### Defined in

src/typings/player/connection.ts:61

***

### request\_to\_speak\_timestamp?

> `optional` **request\_to\_speak\_timestamp**: \`$\{number\}$\{number\}$\{number\}$\{number\}-$\{number\}$\{number\}-$\{number\}$\{number\}T$\{number\}$\{number\}:$\{number\}$\{number\}:$\{number\}$\{number\}.$\{number\}$\{number\}$\{number\}Z\`

the time at which the user requested to speak

#### Defined in

src/typings/player/connection.ts:91

***

### self\_deaf

> **self\_deaf**: `boolean`

whether this user is locally deafened

#### Defined in

src/typings/player/connection.ts:66

***

### self\_mute

> **self\_mute**: `boolean`

whether this user is locally muted

#### Defined in

src/typings/player/connection.ts:71

***

### self\_stream?

> `optional` **self\_stream**: `boolean`

whether this user is streaming using "Go Live"

#### Defined in

src/typings/player/connection.ts:76

***

### self\_video

> **self\_video**: `boolean`

whether this user's camera is enabled

#### Defined in

src/typings/player/connection.ts:81

***

### session\_id

> **session\_id**: `string`

the session id for this voice state

#### Defined in

src/typings/player/connection.ts:51

***

### suppress

> **suppress**: `boolean`

whether this user is muted by the current user

#### Defined in

src/typings/player/connection.ts:86

***

### user\_id

> **user\_id**: `string`

the user id this voice state is for

#### Defined in

src/typings/player/connection.ts:41
