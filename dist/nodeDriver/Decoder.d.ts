/// <reference types="node" />
/// <reference types="node" />
import { TrackData } from "../typings/track";
import { NodeType } from "../typings/node";
import { Result } from 'neverthrow';
export default class Decoder {
    protected buffer: Buffer;
    protected position: number;
    protected type: NodeType;
    protected track: string;
    constructor(track: string, type: NodeType);
    get getTrack(): Result<TrackData, Error>;
    private get NodeLinkDecoder();
    private get FrequenCDecoder();
    private changeBytes;
    private readByte;
    private readUShort;
    private readInt;
    private readLong;
    private readLongFrequenC;
    private readUTF;
}
