import { TrackData } from "@/typings/node/rest";
import { NodeType } from "@t/node";

export default class Decoder {
    protected buffer: Buffer;
    protected position: number;
    protected type: NodeType
    protected track: string;
    
    constructor(track: string, type: NodeType) {
        this.position = 0;
        this.buffer = Buffer.from(track, "base64");
        this.type = type;
        this.track = track;
    };

    public get getTrack() {        
        switch (this.type) {
            case NodeType.FrequenC: return this.FrequenCDecoder;

            case NodeType.LavaLinkV4:
            case NodeType.NodeLink: return this.NodeLinkDecoder;
            default: return null;
        }
    };

    private get NodeLinkDecoder(): TrackData | null {
        try {
            const isVersioned = (((this.readInt() & 0xc0000000) >> 30) & 1) !== 0;
            const version = isVersioned ? Number(this.readByte()) : 1;

            switch (version) {
                case 1: {
                    return {
                        encoded: this.track,
                        info: {
                            title: this.readUTF(),
                            author: this.readUTF(),
                            length: Number(this.readLong()),
                            identifier: this.readUTF(),
                            isSeekable: true,
                            isStream: !!this.readByte(),
                            uri: null,
                            artworkUrl: null,
                            isrc: null,
                            sourceName: this.readUTF().toLowerCase(),
                            position: Number(this.readLong())
                        },
                        pluginInfo: {},
                    }
                };

                case 2: {
                    return {
                        encoded: this.track,
                        info: {
                            title: this.readUTF(),
                            author: this.readUTF(),
                            length: Number(this.readLong()),
                            identifier: this.readUTF(),
                            isSeekable: true,
                            isStream: !!this.readByte(),
                            uri: this.readByte() ? this.readUTF() : null,
                            artworkUrl: null,
                            isrc: null,
                            sourceName: this.readUTF().toLowerCase(),
                            position: Number(this.readLong())
                        },
                        pluginInfo: {},
                    }
                };

                case 3: {
                    return {
                        encoded: this.track,
                        info: {
                            title: this.readUTF(),
                            author: this.readUTF(),
                            length: Number(this.readLong()),
                            identifier: this.readUTF(),
                            isSeekable: true,
                            isStream: !!this.readByte(),
                            uri: this.readByte() ? this.readUTF() : null,
                            artworkUrl: this.readByte() ? this.readUTF() : null,
                            isrc: this.readByte() ? this.readUTF() : null,
                            sourceName: this.readUTF().toLowerCase(),
                            position: Number(this.readLong())
                        },
                        pluginInfo: {},
                    }
                };

                default: {
                    return null;
                }
            };
        } catch (err) {
            return null;
        };
    };

    private get FrequenCDecoder(): TrackData | null {
        try {
			(((this.readInt() & 0xc0000000) >> 30) & 1) !== 0 ? this.readByte() : 1;

			return {
				encoded: this.track,
				info: {
					title: this.readUTF(),
					author: this.readUTF(),
					length: Number(this.readLongFrequenC()),
					identifier: this.readUTF(),
					isSeekable: true,
					isStream: this.readByte() === 1,
					uri: this.readUTF(),
					artworkUrl: this.readByte() === 1 ? this.readUTF() : null,
					isrc: this.readByte() === 1 ? this.readUTF() : null,
					sourceName: this.readUTF().toLowerCase(),
					position: 0,
				},
				pluginInfo: {},
			};
		} catch (err) {
			return null;
		}
    };

    private changeBytes(bytes: number) {
        this.position += bytes
        return this.position - bytes
    };
    
    private readByte() {
        return this.buffer[this.changeBytes(1)]
    };
    
    private readUShort() {
        return this.buffer.readUInt16BE(this.changeBytes(2))
    };
    
    private readInt() {
        return this.buffer.readInt32BE(this.changeBytes(4))
    };
    
    private readLong() {
        return this.buffer.readBigInt64BE(this.changeBytes(8))
    };

    private readLongFrequenC() {
        const msg = BigInt(this.readInt());
        const lsb = BigInt(this.readInt());

        return msg * BigInt(2 ** 32) + lsb;
    };
    
    private readUTF() {
        const len = Number(this.readUShort())
        const start = Number(this.changeBytes(len))
    
        return this.buffer.toString('utf8', start, start + len)
    };
};