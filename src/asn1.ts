import { Int10 } from './int10';
import { cleanZeros, hex2AB } from "./util";

const ellipsis = "\u2026",
    reTimeS = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,
    reTimeL = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;

function stringCut(str, len) {
    if (str.length > len)
        str = str.substring(0, len) + ellipsis;
    return str;
}

export class Stream {
    enc: any;
    pos: any;

    constructor(enc, pos = 0) {
        if (enc instanceof Stream) {
            this.enc = enc.enc;
            this.pos = enc.pos;
        } else {
            this.enc = enc;
            this.pos = pos;
        }
    }

    get(pos) {
        if (pos === undefined)
            pos = this.pos++;
        if (pos >= this.enc.length)
            throw 'Requesting byte offset ' + pos + ' on a stream of length ' + this.enc.length;
        return (typeof this.enc == "string") ? this.enc.charCodeAt(pos) : this.enc[pos];
    };

    hexDigits = "0123456789ABCDEF";

    hexByte(b) {
        return this.hexDigits.charAt((b >> 4) & 0xF) + this.hexDigits.charAt(b & 0xF);
    };

    hexDump(start, end, raw) {
        var s = "";
        for (var i = start; i < end; ++i) {
            s += this.hexByte(this.get(i));
            if (raw !== true)
                switch (i & 0xF) {
                    case 0x7:
                        s += "  ";
                        break;
                    case 0xF:
                        s += "\n";
                        break;
                    default:
                        s += " ";
                }
        }
        return s;
    };

    isASCII(start, end) {
        for (var i = start; i < end; ++i) {
            var c = this.get(i);
            if (c < 32 || c > 176)
                return false;
        }
        return true;
    };

    parseStringISO(start, end) {
        var s = "";
        for (var i = start; i < end; ++i)
            s += String.fromCharCode(this.get(i));
        return s;
    };

    parseStringUTF(start, end) {
        var s = "";
        for (var i = start; i < end;) {
            var c = this.get(i++);
            if (c < 128)
                s += String.fromCharCode(c);
            else if ((c > 191) && (c < 224))
                s += String.fromCharCode(((c & 0x1F) << 6) | (this.get(i++) & 0x3F));
            else
                s += String.fromCharCode(((c & 0x0F) << 12) | ((this.get(i++) & 0x3F) << 6) | (this.get(i++) & 0x3F));
        }
        return s;
    };

    parseStringBMP(start, end) {
        var str = "", hi, lo;
        for (var i = start; i < end;) {
            hi = this.get(i++);
            lo = this.get(i++);
            str += String.fromCharCode((hi << 8) | lo);
        }
        return str;
    };

    parseTime(start, end, shortYear) {
        var s = this.parseStringISO(start, end),
            m = (shortYear ? reTimeS : reTimeL).exec(s);
        if (!m)
            return "Unrecognized time: " + s;
        if (shortYear) {
            var t = +m[1], y = (t < 70) ? 2000 : 1900;
            m[1] = y + "";
        }
        s = m[1] + "-" + m[2] + "-" + m[3] + " " + m[4];
        if (m[5]) {
            s += ":" + m[5];
            if (m[6]) {
                s += ":" + m[6];
                if (m[7])
                    s += "." + m[7];
            }
        }
        if (m[8]) {
            s += " UTC";
            if (m[8] != 'Z') {
                s += m[8];
                if (m[9])
                    s += ":" + m[9];
            }
        }
        return s;
    };

    parseInteger(start, end) {
        var v = this.get(start),
            neg = (v > 127),
            pad = neg ? 255 : 0,
            len,
            s = '';
        while (v == pad && ++start < end)
            v = this.get(start);
        len = end - start;
        if (len === 0)
            return neg ? -1 : 0;
        if (len > 4) {
            let t = +v;
            len <<= 3;
            while (((t ^ pad) & 0x80) === 0) {
                t <<= 1;
                --len;
            }
            s = "(" + len + " bit)\n";
        }
        if (neg) v = v - 256;
        const n = new Int10(v);
        for (let i = start + 1; i < end; ++i)
            n.mulAdd(256, this.get(i));
        return s + n.toString();
    };

    parseBitString(start, end, maxLength) {
        var unusedBit = this.get(start),
            lenBit = ((end - start - 1) << 3) - unusedBit,
            intro = "(" + lenBit + " bit)\n",
            s = "";
        for (var i = start + 1; i < end; ++i) {
            var b = this.get(i),
                skip = (i == end - 1) ? unusedBit : 0;
            for (var j = 7; j >= skip; --j)
                s += (b >> j) & 1 ? "1" : "0";
            if (s.length > maxLength)
                return intro + stringCut(s, maxLength);
        }
        return intro + s;
    };

    parseOctetString(start, end, maxLength) {
        if (this.isASCII(start, end))
            return stringCut(this.parseStringISO(start, end), maxLength);
        var len = end - start,
            s = "(" + len + " byte)\n";
        maxLength /= 2;
        if (len > maxLength)
            end = start + maxLength;
        for (var i = start; i < end; ++i)
            s += this.hexByte(this.get(i));
        if (len > maxLength)
            s += ellipsis;
        return s;
    };

    parseOID(start, end, maxLength) {
        var s = '',
            n = new Int10(),
            bits = 0;
        for (var i = start; i < end; ++i) {
            var v = this.get(i);
            n.mulAdd(128, v & 0x7F);
            bits += 7;
            if (!(v & 0x80)) {
                if (s === '') {
                    n = n.simplify();
                    if (n instanceof Int10) {
                        n.sub(80);
                        s = "2." + n.toString();
                    } else {
                        var m = n < 80 ? n < 40 ? 0 : 1 : 2;
                        s = m + "." + (n - m * 40);
                    }
                } else
                    s += "." + n.toString();
                if (s.length > maxLength)
                    return stringCut(s, maxLength);
                n = new Int10();
                bits = 0;
            }
        }
        if (bits > 0)
            s += ".incomplete";
        return s;
    };
}

export class ASN1 {
    stream: any;
    header: any;
    length: any;
    tag: any;
    sub: any;

    constructor(stream, header, length, tag, sub) {
        if (!(tag instanceof ASN1Tag)) throw 'Invalid tag value.';
        this.stream = stream;
        this.header = header;
        this.length = length;
        this.tag = tag;
        this.sub = sub;
    }

    typeName() {
        switch (this.tag.tagClass) {
            case 0: 
                switch (this.tag.tagNumber) {
                    case 0x00:
                        return "EOC";
                    case 0x01:
                        return "BOOLEAN";
                    case 0x02:
                        return "INTEGER";
                    case 0x03:
                        return "BIT_STRING";
                    case 0x04:
                        return "OCTET_STRING";
                    case 0x05:
                        return "NULL";
                    case 0x06:
                        return "OBJECT_IDENTIFIER";
                    case 0x07:
                        return "ObjectDescriptor";
                    case 0x08:
                        return "EXTERNAL";
                    case 0x09:
                        return "REAL";
                    case 0x0A:
                        return "ENUMERATED";
                    case 0x0B:
                        return "EMBEDDED_PDV";
                    case 0x0C:
                        return "UTF8String";
                    case 0x10:
                        return "SEQUENCE";
                    case 0x11:
                        return "SET";
                    case 0x12:
                        return "NumericString";
                    case 0x13:
                        return "PrintableString"; 
                    case 0x14:
                        return "TeletexString"; 
                    case 0x15:
                        return "VideotexString";
                    case 0x16:
                        return "IA5String"; 
                    case 0x17:
                        return "UTCTime";
                    case 0x18:
                        return "GeneralizedTime";
                    case 0x19:
                        return "GraphicString";
                    case 0x1A:
                        return "VisibleString"; 
                    case 0x1B:
                        return "GeneralString";
                    case 0x1C:
                        return "UniversalString";
                    case 0x1E:
                        return "BMPString";
                }
                return "Universal_" + this.tag.tagNumber.toString();
            case 1:
                return "Application_" + this.tag.tagNumber.toString();
            case 2:
                return "[" + this.tag.tagNumber.toString() + "]"; 
            case 3:
                return "Private_" + this.tag.tagNumber.toString();
        }
    };

    content(maxLength?) { 
        if (this.tag === undefined)
            return null;
        if (maxLength === undefined)
            maxLength = Infinity;
        var content = this.posContent(),
            len = Math.abs(this.length);
        if (!this.tag.isUniversal()) {
            if (this.sub !== null)
                return "(" + this.sub.length + " elem)";
            return this.stream.parseOctetString(content, content + len, maxLength);
        }
        switch (this.tag.tagNumber) {
            case 0x01: 
                return (this.stream.get(content) === 0) ? "false" : "true";
            case 0x02: 
                return this.stream.parseInteger(content, content + len);
            case 0x03: 
                return this.sub ? "(" + this.sub.length + " elem)" :
                    this.stream.parseBitString(content, content + len, maxLength);
            case 0x04: 
                return this.sub ? "(" + this.sub.length + " elem)" :
                    this.stream.parseOctetString(content, content + len, maxLength);
            
            case 0x06: 
                return this.stream.parseOID(content, content + len, maxLength);
            
            
            
            
            
            case 0x10: 
            case 0x11: 
                if (this.sub !== null)
                    return "(" + this.sub.length + " elem)";
                else
                    return "(no elem)";
            case 0x0C: 
                return stringCut(this.stream.parseStringUTF(content, content + len), maxLength);
            case 0x12: 
            case 0x13: 
            case 0x14: 
            case 0x15: 
            case 0x16: 
            
            case 0x1A: 
                
                
                return stringCut(this.stream.parseStringISO(content, content + len), maxLength);
            case 0x1E: 
                return stringCut(this.stream.parseStringBMP(content, content + len), maxLength);
            case 0x17: 
            case 0x18: 
                return this.stream.parseTime(content, content + len, (this.tag.tagNumber == 0x17));
        }
        return null;
    };

    toString() {
        return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + ((this.sub === null) ? 'null' : this.sub.length) + "]";
    };

    posStart() {
        return this.stream.pos;
    };

    posContent() {
        return this.stream.pos + this.header;
    };

    posEnd() {
        return this.stream.pos + this.header + Math.abs(this.length);
    };

    toHexString(root?) {
        return this.stream.hexDump(this.posStart(), this.posEnd(), true);
    };

    getHex() {
        return this.stream.hexDump(this.posContent(), this.posEnd(), true);
    };

    getAB(clean = true) {
        return clean ? cleanZeros(hex2AB(this.getHex())) : hex2AB(this.getHex());
    };

    static decodeLength(stream) {
        let buf = stream.get();
        const len = buf & 0x7F;
        if (len == buf)
            return len;
        if (len > 6)
            throw "Length over 48 bits not supported at position " + (stream.pos - 1);
        if (len === 0)
            return null; 
        buf = 0;
        for (var i = 0; i < len; ++i)
            buf = (buf * 256) + stream.get();
        return buf;
    };

    static decode(stream) {
        if (!(stream instanceof Stream))
            stream = new Stream(stream, 0);
        const streamStart = new Stream(stream);
        const tag = new ASN1Tag(stream);
        let len = ASN1.decodeLength(stream), sub: any = null;
        const start = stream.pos;
        const header = start - streamStart.pos;
        const getSub = function () {
            sub = [];
            if (len !== null) {
                var end = start + len;
                while (stream.pos < end)
                    sub[sub.length] = ASN1.decode(stream);
                if (stream.pos != end)
                    throw "Content size is not correct for container starting at offset " + start;
            } else {
                try {
                    for (; ;) {
                        const s = ASN1.decode(stream);
                        if (s.tag.isEOC())
                            break;
                        sub[sub.length] = s;
                    }
                    len = start - stream.pos; 
                } catch (e) {
                    throw "Exception while decoding undefined length content: " + e;
                }
            }
        };
        if (tag.tagConstructed) {
            getSub();
        } else if (tag.isUniversal() && ((tag.tagNumber == 0x03) || (tag.tagNumber == 0x04))) {
            try {
                if (tag.tagNumber == 0x03)
                    if (stream.get() != 0)
                        throw "BIT STRINGs with unused bits cannot encapsulate.";
                getSub();
                for (var i = 0; i < sub.length; ++i)
                    if (sub[i].tag.isEOC())
                        throw 'EOC is not supposed to be actual content.';
            } catch (e) {
                
                sub = null;
            }
        }
        if (sub === null) {
            if (len === null)
                throw "We can't skip over an invalid tag with undefined length at offset " + start;
            stream.pos = start + Math.abs(len);
        }
        return new ASN1(streamStart, header, len, tag, sub);
    };
}

class ASN1Tag {
    tagClass: any;
    tagConstructed: any;
    tagNumber: any;

    constructor(stream) {
        var buf = stream.get();
        this.tagClass = buf >> 6;
        this.tagConstructed = ((buf & 0x20) !== 0);
        this.tagNumber = buf & 0x1F;
        if (this.tagNumber == 0x1F) { 
            var n = new Int10();
            do {
                buf = stream.get();
                n.mulAdd(128, buf & 0x7F);
            } while (buf & 0x80);
            this.tagNumber = n.simplify();
        }
    }

    isUniversal() {
        return this.tagClass === 0x00;
    };

    isEOC() {
        return this.tagClass === 0x00 && this.tagNumber === 0x00;
    };
}
