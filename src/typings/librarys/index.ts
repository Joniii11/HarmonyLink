import type { VoiceServer, SetStateUpdate } from "@t/player/connection";

export type Packet = PacketVoiceStateUpdate | PacketVoiceServerUpdate | AnyOtherPacket;

export interface PacketVoiceStateUpdate {
    op: number;
    d: SetStateUpdate;
    t: "VOICE_STATE_UPDATE";
};

export interface PacketVoiceServerUpdate {
    op: number;
    d: VoiceServer;
    t: "VOICE_SERVER_UPDATE";
};

export interface AnyOtherPacket {
    op: number;
    d: any;
    t: string;
};