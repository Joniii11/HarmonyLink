"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("@t/node");
class Decoder {
    buffer;
    position;
    type;
    track;
    constructor(track, type) {
        this.position = 0;
        this.buffer = Buffer.from(track, "base64");
        this.type = type;
        this.track = track;
    }
    ;
    get getTrack() {
        switch (this.type) {
            case node_1.NodeType.FrequenC: return this.FrequenCDecoder;
            case node_1.NodeType.LavaLinkV4:
            case node_1.NodeType.NodeLink: return this.NodeLinkDecoder;
            default: return null;
        }
    }
    ;
    get NodeLinkDecoder() {
        try {
            const isVersioned = (((this.readInt() & 0xc0000000) >> 30) & 1) !== 0;
            const version = isVersioned ? Number(this.readByte()) : 1;
            switch (version) {
                case 1:
                    {
                        return {
                            encoded: this.track,
                            info: {
                                title: this.readUTF(),
                                author: this.readUTF(),
                                length: Number(this.readLong()),
                                identifier: this.readUTF(),
                                isSeekable: true,
                                isStream: Boolean(this.readByte()),
                                uri: null,
                                artworkUrl: null,
                                isrc: null,
                                sourceName: this.readUTF().toLowerCase(),
                                position: Number(this.readLong())
                            },
                            pluginInfo: {},
                            userData: {}
                        };
                    }
                    ;
                case 2:
                    {
                        return {
                            encoded: this.track,
                            info: {
                                title: this.readUTF(),
                                author: this.readUTF(),
                                length: Number(this.readLong()),
                                identifier: this.readUTF(),
                                isSeekable: true,
                                isStream: Boolean(this.readByte()),
                                uri: this.readByte() ? this.readUTF() : null,
                                artworkUrl: null,
                                isrc: null,
                                sourceName: this.readUTF().toLowerCase(),
                                position: Number(this.readLong())
                            },
                            pluginInfo: {},
                            userData: {}
                        };
                    }
                    ;
                case 3:
                    {
                        return {
                            encoded: this.track,
                            info: {
                                title: this.readUTF(),
                                author: this.readUTF(),
                                length: Number(this.readLong()),
                                identifier: this.readUTF(),
                                isSeekable: true,
                                isStream: Boolean(this.readByte()),
                                uri: this.readByte() ? this.readUTF() : null,
                                artworkUrl: this.readByte() ? this.readUTF() : null,
                                isrc: this.readByte() ? this.readUTF() : null,
                                sourceName: this.readUTF().toLowerCase(),
                                position: Number(this.readLong())
                            },
                            pluginInfo: {},
                            userData: {}
                        };
                    }
                    ;
                default: {
                    return null;
                }
            }
            ;
        }
        catch {
            return null;
        }
        ;
    }
    ;
    get FrequenCDecoder() {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-negated-condition
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
                userData: {}
            };
        }
        catch {
            return null;
        }
    }
    ;
    changeBytes(bytes) {
        this.position += bytes;
        return this.position - bytes;
    }
    ;
    readByte() {
        return this.buffer[this.changeBytes(1)];
    }
    ;
    readUShort() {
        return this.buffer.readUInt16BE(this.changeBytes(2));
    }
    ;
    readInt() {
        return this.buffer.readInt32BE(this.changeBytes(4));
    }
    ;
    readLong() {
        return this.buffer.readBigInt64BE(this.changeBytes(8));
    }
    ;
    readLongFrequenC() {
        const msg = BigInt(this.readInt());
        const lsb = BigInt(this.readInt());
        return msg * BigInt(2 ** 32) + lsb;
    }
    ;
    readUTF() {
        const len = Number(this.readUShort());
        const start = Number(this.changeBytes(len));
        return this.buffer.toString('utf8', start, start + len);
    }
    ;
}
exports.default = Decoder;
;
//# sourceMappingURL=Decoder.js.map