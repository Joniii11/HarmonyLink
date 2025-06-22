[**HarmonyLink v2.0.0**](../README.md) • **Docs**

***

[HarmonyLink v2.0.0](../globals.md) / PlayerEvents

# Interface: PlayerEvents

## Properties

### playerUpdate()

> **playerUpdate**: (`data`) => `void`

#### Parameters

• **data**: [`LavalinkPlayerUpdatePacket`](LavalinkPlayerUpdatePacket.md)

The data that the node sends

#### Returns

`void`

void

#### Defined in

[typings/player/index.ts:11](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/player/index.ts#L11)

***

### event()

> **event**: (`data`) => `void`

#### Parameters

• **data**: [`LavalinkEventPacket`](../type-aliases/LavalinkEventPacket.md)

#### Returns

`void`

void

#### Defined in

[typings/player/index.ts:17](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/player/index.ts#L17)

***

### connectionUpdate()

> **connectionUpdate**: (`state`) => `void`

#### Parameters

• **state**: [`DiscordVoiceStates`](../enumerations/DiscordVoiceStates.md)

#### Returns

`void`

void

#### Defined in

[typings/player/index.ts:23](https://github.com/Joniii11/HarmonyLink/blob/master/src/typings/player/index.ts#L23)
