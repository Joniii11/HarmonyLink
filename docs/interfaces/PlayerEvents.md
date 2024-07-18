[**harmonylink**](../README.md) • **Docs**

***

[harmonylink](../globals.md) / PlayerEvents

# Interface: PlayerEvents

## Properties

### connectionUpdate()

> **connectionUpdate**: (`state`) => `void`

#### Parameters

• **state**: [`DiscordVoiceStates`](../enumerations/DiscordVoiceStates.md)

#### Returns

`void`

void

#### Defined in

src/typings/player/index.ts:23

***

### event()

> **event**: (`data`) => `void`

#### Parameters

• **data**: [`LavalinkEventPacket`](../type-aliases/LavalinkEventPacket.md)

#### Returns

`void`

void

#### Defined in

src/typings/player/index.ts:17

***

### playerUpdate()

> **playerUpdate**: (`data`) => `void`

#### Parameters

• **data**: [`LavalinkPlayerUpdatePacket`](LavalinkPlayerUpdatePacket.md)

The data that the node sends

#### Returns

`void`

void

#### Defined in

src/typings/player/index.ts:11
