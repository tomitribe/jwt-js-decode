import pako from 'pako';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const max = 10000000000000; // biggest 10^n integer that can still fit 2^53 when multiplied by 256
class Int10 {
    constructor(value) {
        this.buf = [+value || 0];
    }
    mulAdd(m, c) {
        // assert(m <= 256)
        const b = this.buf, l = b.length;
        let i, t;
        for (i = 0; i < l; ++i) {
            t = b[i] * m + c;
            if (t < max)
                c = 0;
            else {
                c = 0 | (t / max);
                t -= c * max;
            }
            b[i] = t;
        }
        if (c > 0)
            b[i] = c;
    }
    sub(c) {
        // assert(m <= 256)
        const b = this.buf, l = b.length;
        let i, t;
        for (i = 0; i < l; ++i) {
            t = b[i] - c;
            if (t < 0) {
                t += max;
                c = 1;
            }
            else
                c = 0;
            b[i] = t;
        }
        while (b[b.length - 1] === 0)
            b.pop();
    }
    toString(base) {
        if ((base || 10) != 10)
            throw 'only base 10 is supported';
        const b = this.buf;
        let s = b[b.length - 1].toString();
        for (let i = b.length - 2; i >= 0; --i)
            s += (max + b[i]).toString().substring(1);
        return s;
    }
    valueOf() {
        const b = this.buf;
        let v = 0;
        for (let i = b.length - 1; i >= 0; --i)
            v = v * max + b[i];
        return v;
    }
    simplify() {
        const b = this.buf;
        return b.length == 1 ? b[0] : this;
    }
}

const UNSUPPORTED_ALGORITHM = 'Unsupported algorithm name specified! Supported algorithms: "HS256", "HS384", "HS512", "RS256", "RS384", "RS512" and "none".';
const ILLEGAL_ARGUMENT = 'Illegal argument specified!';
const CRYPTO_NOT_FOUND = "Could not find 'crypto'.";
const PAKO_NOT_FOUND = "Could not find 'pako'.";
const UNSUPPORTED_ZIP_TYPE = 'Unsupported zip type.';
function generateErrorMessage(value, callee, argumentName = 'argument', defaultType = 'string') {
    let message = `Invalid argument passed to ${callee}.`;
    if (typeof value !== defaultType) {
        message += ` Expected type '${defaultType}', received '${typeof value}'.`;
    }
    else if (!value) {
        message += ` Provided ${argumentName} is empty.`;
    }
    else if (argumentName !== 'argument') {
        message += ` Provided ${argumentName} is invalid.`;
    }
    return message;
}
// clean leading zeros
function cleanZeros(b) {
    return b[0] === 0 ? cleanZeros(b.slice(1)) : b;
}
function hex2AB(hex) {
    if (!hex)
        throw new Error(ILLEGAL_ARGUMENT);
    const match = hex.match(/[0-9A-F]{2}/gi);
    if (!match)
        throw new Error(ILLEGAL_ARGUMENT);
    return new Uint8Array(match.map((i) => parseInt(i, 16)));
}

const ellipsis = '\u2026', reTimeS = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/, reTimeL = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
function stringCut(str, len) {
    if (str.length > len)
        str = str.substring(0, len) + ellipsis;
    return str;
}
class Stream {
    constructor(enc, pos = 0) {
        this.hexDigits = '0123456789ABCDEF';
        if (enc instanceof Stream) {
            this.enc = enc.enc;
            this.pos = enc.pos;
        }
        else {
            this.enc = enc;
            this.pos = pos;
        }
    }
    get(pos) {
        if (pos === undefined)
            pos = this.pos++;
        if (pos >= this.enc.length)
            throw 'Requesting byte offset ' + pos + ' on a stream of length ' + this.enc.length;
        return typeof this.enc == 'string' ? this.enc.charCodeAt(pos) : this.enc[pos];
    }
    hexByte(b) {
        return this.hexDigits.charAt((b >> 4) & 0xf) + this.hexDigits.charAt(b & 0xf);
    }
    hexDump(start, end, raw) {
        let s = '';
        for (let i = start; i < end; ++i) {
            s += this.hexByte(this.get(i));
            if (raw !== true)
                switch (i & 0xf) {
                    case 0x7:
                        s += '  ';
                        break;
                    case 0xf:
                        s += '\n';
                        break;
                    default:
                        s += ' ';
                }
        }
        return s;
    }
    isASCII(start, end) {
        for (let i = start; i < end; ++i) {
            const c = this.get(i);
            if (c < 32 || c > 176)
                return false;
        }
        return true;
    }
    parseStringISO(start, end) {
        let s = '';
        for (let i = start; i < end; ++i)
            s += String.fromCharCode(this.get(i));
        return s;
    }
    parseStringUTF(start, end) {
        let s = '';
        for (let i = start; i < end;) {
            const c = this.get(i++);
            if (c < 128)
                s += String.fromCharCode(c);
            else if (c > 191 && c < 224)
                s += String.fromCharCode(((c & 0x1f) << 6) | (this.get(i++) & 0x3f));
            else
                s += String.fromCharCode(((c & 0x0f) << 12) | ((this.get(i++) & 0x3f) << 6) | (this.get(i++) & 0x3f));
        }
        return s;
    }
    parseStringBMP(start, end) {
        let str = '', hi, lo;
        for (let i = start; i < end;) {
            hi = this.get(i++);
            lo = this.get(i++);
            str += String.fromCharCode((hi << 8) | lo);
        }
        return str;
    }
    parseTime(start, end, shortYear) {
        let s = this.parseStringISO(start, end);
        const m = (shortYear ? reTimeS : reTimeL).exec(s);
        if (!m)
            return 'Unrecognized time: ' + s;
        if (shortYear) {
            const t = +m[1], y = t < 70 ? 2000 : 1900;
            m[1] = y + '';
        }
        s = m[1] + '-' + m[2] + '-' + m[3] + ' ' + m[4];
        if (m[5]) {
            s += ':' + m[5];
            if (m[6]) {
                s += ':' + m[6];
                if (m[7])
                    s += '.' + m[7];
            }
        }
        if (m[8]) {
            s += ' UTC';
            if (m[8] != 'Z') {
                s += m[8];
                if (m[9])
                    s += ':' + m[9];
            }
        }
        return s;
    }
    parseInteger(start, end) {
        let v = this.get(start), len, s = '';
        const neg = v > 127, pad = neg ? 255 : 0;
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
            s = '(' + len + ' bit)\n';
        }
        if (neg)
            v = v - 256;
        const n = new Int10(v);
        for (let i = start + 1; i < end; ++i)
            n.mulAdd(256, this.get(i));
        return s + n.toString();
    }
    parseBitString(start, end, maxLength) {
        const unusedBit = this.get(start), lenBit = ((end - start - 1) << 3) - unusedBit, intro = '(' + lenBit + ' bit)\n';
        let s = '';
        for (let i = start + 1; i < end; ++i) {
            const b = this.get(i), skip = i == end - 1 ? unusedBit : 0;
            for (let j = 7; j >= skip; --j)
                s += (b >> j) & 1 ? '1' : '0';
            if (s.length > maxLength)
                return intro + stringCut(s, maxLength);
        }
        return intro + s;
    }
    parseOctetString(start, end, maxLength) {
        if (this.isASCII(start, end))
            return stringCut(this.parseStringISO(start, end), maxLength);
        const len = end - start;
        let s = '(' + len + ' byte)\n';
        maxLength /= 2;
        if (len > maxLength)
            end = start + maxLength;
        for (let i = start; i < end; ++i)
            s += this.hexByte(this.get(i));
        if (len > maxLength)
            s += ellipsis;
        return s;
    }
    parseOID(start, end, maxLength) {
        let s = '', n = new Int10(), bits = 0;
        for (let i = start; i < end; ++i) {
            const v = this.get(i);
            n.mulAdd(128, v & 0x7f);
            bits += 7;
            if (!(v & 0x80)) {
                if (s === '') {
                    n = n.simplify();
                    if (n instanceof Int10) {
                        n.sub(80);
                        s = '2.' + n.toString();
                    }
                    else {
                        const m = n < 80 ? (n < 40 ? 0 : 1) : 2;
                        s = m + '.' + (n - m * 40);
                    }
                }
                else
                    s += '.' + n.toString();
                if (s.length > maxLength)
                    return stringCut(s, maxLength);
                n = new Int10();
                bits = 0;
            }
        }
        if (bits > 0)
            s += '.incomplete';
        return s;
    }
}
class ASN1 {
    constructor(stream, header, length, tag, sub) {
        if (!(tag instanceof ASN1Tag))
            throw 'Invalid tag value.';
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
                        return 'EOC';
                    case 0x01:
                        return 'BOOLEAN';
                    case 0x02:
                        return 'INTEGER';
                    case 0x03:
                        return 'BIT_STRING';
                    case 0x04:
                        return 'OCTET_STRING';
                    case 0x05:
                        return 'NULL';
                    case 0x06:
                        return 'OBJECT_IDENTIFIER';
                    case 0x07:
                        return 'ObjectDescriptor';
                    case 0x08:
                        return 'EXTERNAL';
                    case 0x09:
                        return 'REAL';
                    case 0x0a:
                        return 'ENUMERATED';
                    case 0x0b:
                        return 'EMBEDDED_PDV';
                    case 0x0c:
                        return 'UTF8String';
                    case 0x10:
                        return 'SEQUENCE';
                    case 0x11:
                        return 'SET';
                    case 0x12:
                        return 'NumericString';
                    case 0x13:
                        return 'PrintableString';
                    case 0x14:
                        return 'TeletexString';
                    case 0x15:
                        return 'VideotexString';
                    case 0x16:
                        return 'IA5String';
                    case 0x17:
                        return 'UTCTime';
                    case 0x18:
                        return 'GeneralizedTime';
                    case 0x19:
                        return 'GraphicString';
                    case 0x1a:
                        return 'VisibleString';
                    case 0x1b:
                        return 'GeneralString';
                    case 0x1c:
                        return 'UniversalString';
                    case 0x1e:
                        return 'BMPString';
                }
                return 'Universal_' + this.tag.tagNumber.toString();
            case 1:
                return 'Application_' + this.tag.tagNumber.toString();
            case 2:
                return '[' + this.tag.tagNumber.toString() + ']';
            case 3:
                return 'Private_' + this.tag.tagNumber.toString();
        }
    }
    content(maxLength) {
        if (this.tag === undefined)
            return null;
        if (maxLength === undefined)
            maxLength = Infinity;
        const content = this.posContent(), len = Math.abs(this.length);
        if (!this.tag.isUniversal()) {
            if (this.sub !== null)
                return '(' + this.sub.length + ' elem)';
            return this.stream.parseOctetString(content, content + len, maxLength);
        }
        switch (this.tag.tagNumber) {
            case 0x01:
                return this.stream.get(content) === 0 ? 'false' : 'true';
            case 0x02:
                return this.stream.parseInteger(content, content + len);
            case 0x03:
                return this.sub
                    ? '(' + this.sub.length + ' elem)'
                    : this.stream.parseBitString(content, content + len, maxLength);
            case 0x04:
                return this.sub
                    ? '(' + this.sub.length + ' elem)'
                    : this.stream.parseOctetString(content, content + len, maxLength);
            case 0x06:
                return this.stream.parseOID(content, content + len, maxLength);
            case 0x10:
            case 0x11:
                if (this.sub !== null)
                    return '(' + this.sub.length + ' elem)';
                else
                    return '(no elem)';
            case 0x0c:
                return stringCut(this.stream.parseStringUTF(content, content + len), maxLength);
            case 0x12:
            case 0x13:
            case 0x14:
            case 0x15:
            case 0x16:
            case 0x1a:
                return stringCut(this.stream.parseStringISO(content, content + len), maxLength);
            case 0x1e:
                return stringCut(this.stream.parseStringBMP(content, content + len), maxLength);
            case 0x17:
            case 0x18:
                return this.stream.parseTime(content, content + len, this.tag.tagNumber == 0x17);
        }
        return null;
    }
    toString() {
        return (this.typeName() +
            '@' +
            this.stream.pos +
            '[header:' +
            this.header +
            ',length:' +
            this.length +
            ',sub:' +
            (this.sub === null ? 'null' : this.sub.length) +
            ']');
    }
    posStart() {
        return this.stream.pos;
    }
    posContent() {
        return this.stream.pos + this.header;
    }
    posEnd() {
        return this.stream.pos + this.header + Math.abs(this.length);
    }
    toHexString() {
        return this.stream.hexDump(this.posStart(), this.posEnd(), true);
    }
    getHex() {
        return this.stream.hexDump(this.posContent(), this.posEnd(), true);
    }
    getAB(clean = true) {
        return clean ? cleanZeros(hex2AB(this.getHex())) : hex2AB(this.getHex());
    }
    static decodeLength(stream) {
        let buf = stream.get();
        const len = buf & 0x7f;
        if (len == buf)
            return len;
        if (len > 6)
            throw 'Length over 48 bits not supported at position ' + (stream.pos - 1);
        if (len === 0)
            return null;
        buf = 0;
        for (let i = 0; i < len; ++i)
            buf = buf * 256 + stream.get();
        return buf;
    }
    static decode(stream) {
        if (!(stream instanceof Stream))
            stream = new Stream(stream, 0);
        const streamStart = new Stream(stream);
        const tag = new ASN1Tag(stream);
        let len = ASN1.decodeLength(stream), sub = null;
        const start = stream.pos;
        const header = start - streamStart.pos;
        const getSub = function () {
            sub = [];
            if (len !== null) {
                const end = start + len;
                while (stream.pos < end)
                    sub[sub.length] = ASN1.decode(stream);
                if (stream.pos != end)
                    throw 'Content size is not correct for container starting at offset ' + start;
            }
            else {
                try {
                    for (;;) {
                        const s = ASN1.decode(stream);
                        if (s.tag.isEOC())
                            break;
                        sub[sub.length] = s;
                    }
                    len = start - stream.pos;
                }
                catch (e) {
                    throw 'Exception while decoding undefined length content: ' + e;
                }
            }
        };
        if (tag.tagConstructed) {
            getSub();
        }
        else if (tag.isUniversal() && (tag.tagNumber == 0x03 || tag.tagNumber == 0x04)) {
            try {
                if (tag.tagNumber == 0x03)
                    if (stream.get() != 0)
                        throw 'BIT STRINGs with unused bits cannot encapsulate.';
                getSub();
                for (let i = 0; i < sub.length; ++i)
                    if (sub[i].tag.isEOC())
                        throw 'EOC is not supposed to be actual content.';
            }
            catch (e) {
                sub = null;
            }
        }
        if (sub === null) {
            if (len === null)
                throw "We can't skip over an invalid tag with undefined length at offset " + start;
            stream.pos = start + Math.abs(len);
        }
        return new ASN1(streamStart, header, len, tag, sub);
    }
}
class ASN1Tag {
    constructor(stream) {
        let buf = stream.get();
        this.tagClass = buf >> 6;
        this.tagConstructed = (buf & 0x20) !== 0;
        this.tagNumber = buf & 0x1f;
        if (this.tagNumber == 0x1f) {
            const n = new Int10();
            do {
                buf = stream.get();
                n.mulAdd(128, buf & 0x7f);
            } while (buf & 0x80);
            this.tagNumber = n.simplify();
        }
    }
    isUniversal() {
        return this.tagClass === 0x00;
    }
    isEOC() {
        return this.tagClass === 0x00 && this.tagNumber === 0x00;
    }
}

/*
//crypto-browserify:
import { createHmac, createSign, createVerify } from "crypto-browserify";
//or browserify hmac/sign
import { createHmac } from "create-hmac";
import { createSign, createVerify } from "browserify-sign";

//node.js
import { createHmac, createSign, createVerify } from "crypto";
*/
const webCrypto = typeof window === 'object' && (window.crypto || window['msCrypto']);
const webCryptoSubtle = webCrypto && (webCrypto.subtle || webCrypto['webkitSubtle'] || webCrypto['Subtle']);
/**
 * Class for creating a JwtSplit object with three parts of JWT Token as strings
 *
 * @class  JwtSplit
 */
class JwtSplit {
    constructor(str, callee = 'JwtSplit') {
        /**
         * Header (first) part of JWT Token
         *
         * @name  header
         * @type {string}
         */
        this.header = '';
        /**
         * Payload (second) part of JWT Token
         *
         * @name  payload
         * @type {string}
         */
        this.payload = '';
        /**
         * Signature (third) part of JWT Token
         *
         * @name  signature
         * @type {string}
         */
        this.signature = '';
        if (typeof str !== 'string') {
            throw new Error(generateErrorMessage(str, callee, 'JWT string'));
        }
        this.fromString(str, callee);
    }
    fromString(str, callee = 'JwtSplit.fromString') {
        const jwtArr = str.split('.');
        if (jwtArr.length !== 3) {
            throw new Error(generateErrorMessage(str, callee, 'JWT string'));
        }
        const [header, payload, signature] = jwtArr;
        this.header = header;
        this.payload = payload;
        this.signature = signature;
    }
    toString() {
        return this.header + '.' + this.payload + '.' + this.signature;
    }
}
/**
 * Class for creating a JwtDecode object with three parts of JWT Token, header and payload decoded and parsed, signature in initial form
 *
 * @class  JwtDecode
 */
class JwtDecode {
    constructor(str, callee = 'JwtDecode') {
        /**
         * Header (first) part of JWT Token
         *
         * @name  header
         * @type {JwtPart}
         */
        this.header = {};
        /**
         * Payload (second) part of JWT Token
         *
         * @name  payload
         * @type {JwtPart}
         */
        this.payload = {};
        /**
         * Signature (third) part of JWT Token
         *
         * @name  signature
         * @type {string}
         */
        this.signature = '';
        if (typeof str !== 'string') {
            throw new Error(generateErrorMessage(str, callee, 'JWT string'));
        }
        this.fromString(str, callee);
    }
    isGzip() {
        return isGzip(this.header);
    }
    fromString(str, callee = 'JwtDecode.fromString') {
        const jwtObj = jwtSplit(str, callee);
        if (jwtObj) {
            this.header = jwtObj.header ? s2J(bu2s(jwtObj.header)) : {};
            this.payload = jwtObj.payload
                ? this.isGzip()
                    ? s2J(zbu2s(jwtObj.payload))
                    : s2J(bu2s(jwtObj.payload))
                : {};
            this.signature = jwtObj.signature || '';
        }
    }
    toString() {
        return (s2bu(J2s(this.header)) +
            '.' +
            (this.isGzip() ? s2zbu(J2s(this.payload)) : s2bu(J2s(this.payload))) +
            '.' +
            this.signature);
    }
}
/**
 * Try running function and replace it's response as Promise.resolve/reject
 *
 * @param {function} fn - fn to call in for response
 *
 * @returns {Promise<any>} resulting Promise
 */
function tryPromise(fn) {
    try {
        return Promise.resolve(fn());
    }
    catch (e) {
        return Promise.reject(e);
    }
}
/**
 * Converts string to JSON object
 *
 * @param {string} str - data string to convert
 *
 * @returns {object} resulting object
 */
function s2J(str) {
    return JSON.parse(str);
}
/**
 * Converts JSON object to string
 *
 * @param {object} obj - JSON object to convert
 *
 * @returns {string} resulting string
 */
function J2s(obj) {
    return JSON.stringify(obj);
}
/**
 * Converts string to base64 string
 *
 * @param {string} str - data string to convert
 *
 * @returns {string} decoded data string
 */
function b2s(str) {
    if (typeof Buffer !== 'undefined') {
        return textDecode(Buffer.from(str, 'base64'));
    }
    else if (typeof atob !== 'undefined') {
        return textDecode(atob(str));
    }
    else
        throw new Error(ILLEGAL_ARGUMENT);
}
/**
 * Converts base64 string to base64url string
 *
 * @param {string} str - data string to convert
 *
 * @returns {string} base64url string
 */
function b2bu(str) {
    if (typeof str !== 'string' || str.length % 4 !== 0) {
        throw new Error(ILLEGAL_ARGUMENT);
    }
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
/**
 *
 * Converts base64url string to base64 string
 *
 * @param {string} str - data string to convert
 *
 * @returns {string} base64 string
 */
function bu2b(str) {
    if (typeof str !== 'string' || str.length % 4 === 1) {
        throw new Error(ILLEGAL_ARGUMENT);
    }
    for (; str.length % 4 !== 0;) {
        str += '=';
    }
    return str.replace(/-/g, '+').replace(/_/g, '/');
}
/**
 * Converts base64url string to string
 *
 * @param {string} str - base64url string to convert
 *
 * @returns {string} decoded data string
 */
function bu2s(str) {
    return b2s(bu2b(str));
}
/**
 * Check if header has zip property (and it is equal to 'GZIP', ignorecase)
 *
 * @param {string} header - object to check
 *
 * @returns {boolean} does it have gzip in zip property
 */
function isGzip(header) {
    return typeof header === 'object' && typeof header.zip === 'string' && header.zip.toUpperCase() === 'GZIP';
}
/**
 * Decode jwtToken header and payload
 *
 * @param {string} str - data string to decode
 *
 * @returns {JwtDecode} object with decoded header and body, and signature untouched
 */
function jwtDecode(str, callee = 'jwtDecode') {
    return new JwtDecode(str, callee);
}
const decodeJwt = jwtDecode;
const decode = jwtDecode;
/**
 * Split jwtToken into object {header, payload, signature}
 *
 * @param {string} str - data string to split
 *
 * @returns {JwtSplit} jwt split object of three strings
 */
function jwtSplit(str, callee = 'jwtSplit') {
    return new JwtSplit(str, callee);
}
const splitJwt = jwtSplit;
const split = jwtSplit;
/**
 * Converts base64 string to string
 *
 * @param {string} str - data string to convert
 *
 * @returns {string} base64 string
 */
function s2b(str) {
    if (typeof Buffer !== 'undefined') {
        return Buffer.from(textEncode(str)).toString('base64');
    }
    else if (typeof btoa !== 'undefined') {
        return btoa(AB2s(textEncode(str)));
    }
    else
        throw new Error(ILLEGAL_ARGUMENT);
}
/**
 * Converts string to base64url string
 *
 * @param {string} str - data string to convert
 *
 * @returns {string} base64url string
 */
function s2bu(str) {
    return b2bu(s2b(str));
}
/**
 * Zip and encode data string to base64url string
 *
 * @param {string} str - data string to encode
 * @param {string} type - type of zip type: "zlib", "gzip". default: "zlib"
 *
 * @returns {string} base64url string
 */
function s2zbu(str, type = 'zlib') {
    return s2bu(zip(str, type));
}
/**
 * Converts from zip data string to string
 *
 * @param {string} str - data string to convert
 *
 * @returns {string} decoded data string
 */
function unzip(str) {
    if (typeof str !== 'string') {
        throw new Error(ILLEGAL_ARGUMENT);
    }
    if (!!pako && (pako.inflate || pako.ungzip)) {
        const buffer = s2U8A(str);
        let inflated;
        try {
            inflated = pako.inflate(buffer, { raw: false });
        }
        catch (_a) {
            try {
                inflated = pako.ungzip(buffer, { raw: false });
            }
            catch (_b) {
                throw new Error(UNSUPPORTED_ZIP_TYPE);
            }
        }
        return AB2s(inflated);
    }
    else {
        throw new Error(PAKO_NOT_FOUND);
    }
}
/**
 * Decode from base64url and unzip data string
 *
 * @param {string} str - data string to decode
 *
 * @returns {string} decoded data string
 */
function zbu2s(str) {
    return textDecode(unzip(bu2s(str)));
}
/**
 * Converts string to zip data string
 *
 * @param {string} str - data string to convert
 * @param {string} type - type of zip type: "zlib", "gzip". default: "zlib"
 *
 * @returns {string} zip data string
 */
function zip(str, type = 'zlib') {
    if (typeof str !== 'string') {
        throw new Error(ILLEGAL_ARGUMENT);
    }
    if (!!pako && (pako.deflate || pako.gzip)) {
        let deflated;
        if (type === 'gzip') {
            deflated = pako.gzip(str, {
                raw: false,
            });
        }
        else if (type === 'zlib') {
            deflated = pako.deflate(str, {
                raw: false,
            });
        }
        else
            throw new Error(UNSUPPORTED_ZIP_TYPE);
        return AB2s(deflated);
    }
    else {
        throw new Error(PAKO_NOT_FOUND);
    }
}
/**
 * Converts string to ArrayBuffer
 *
 * @param {string} str - data string to convert
 *
 * @returns {ArrayBuffer} charCode ArrayBuffer
 */
function s2AB(str) {
    const buff = new ArrayBuffer(str.length);
    const view = new Uint8Array(buff);
    for (let i = 0; i < str.length; i++)
        view[i] = str.charCodeAt(i);
    return buff;
}
/**
 * Converts string to Uint8Array
 *
 * @param {string} str - data string to convert
 *
 * @returns {Uint8Array} charCode Uint8Array
 */
function s2U8A(str) {
    const buff = new ArrayBuffer(str.length);
    const view = new Uint8Array(buff);
    for (let i = 0; i < str.length; i++)
        view[i] = str.charCodeAt(i);
    return view;
}
/**
 * Converts ArrayBuffer to string
 *
 * @param {ArrayBuffer | Uint8Array} buff - charCode ArrayBuffer to convert
 *
 * @returns {string} data string
 */
function AB2s(buff) {
    if (!(buff instanceof Uint8Array))
        buff = new Uint8Array(buff);
    return String.fromCharCode(...Array.from(buff));
}
/**
 * Async function inspired by createHmac in crypto (used WebCrypto Api supported by most browsers)
 *
 */
function createHmac(name, secret) {
    return __awaiter(this, void 0, void 0, function* () {
        if (webCryptoSubtle) {
            const keyData = s2U8A(secret);
            return yield webCryptoSubtle
                .importKey('raw', keyData, { name: 'HMAC', hash: { name: name } }, true, ['sign'])
                .then((key) => {
                return {
                    update: function (thing) {
                        return __awaiter(this, void 0, void 0, function* () {
                            return yield webCryptoSubtle.sign('HMAC', key, s2U8A(thing));
                        });
                    },
                };
            });
        }
        else {
            const crypto = yield import('crypto');
            return !!crypto && crypto.createHmac
                ? Promise.resolve(crypto.createHmac(name.replace('SHA-', 'sha'), secret))
                : Promise.reject(webCrypto);
        }
    });
}
/**
 * Algorithm HMAC sign generator
 *
 */
function algHSsign(bits) {
    /**
     * Algorithm HMAC signer
     *
     */
    return function sign(thing, secret) {
        return __awaiter(this, void 0, void 0, function* () {
            const hmac = yield createHmac('SHA-' + bits, secret);
            if (webCryptoSubtle) {
                if (!hmac)
                    return Promise.reject(ILLEGAL_ARGUMENT);
                return Promise.resolve(s2bu(AB2s(yield hmac.update(thing))));
            }
            return Promise.resolve(b2bu(hmac.update(thing).digest('base64')));
        });
    };
}
/**
 * Algorithm HMAC verify generator
 *
 */
function algHSverify(bits) {
    /**
     * Algorithm HMAC verifier
     *
     */
    return function verify(thing, signature, secret) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield algHSsign(bits)(thing, secret)) === signature;
        });
    };
}
function s2pem(secret) {
    if (typeof secret !== 'string') {
        throw new Error(ILLEGAL_ARGUMENT);
    }
    let type = 'public';
    function ignore(line) {
        if (ignoreLinesPriv.some((ign) => line.toUpperCase().indexOf(ign) > -1)) {
            type = 'private';
            return false;
        }
        return !ignoreLinesPub.some((ign) => line.toUpperCase().indexOf(ign) > -1);
    }
    const lines = secret.split('\n'), ignoreLinesPriv = ['-BEGIN RSA PRIVATE KEY-', '-END RSA PRIVATE KEY-'], ignoreLinesPub = ['-BEGIN RSA PUBLIC KEY-', '-BEGIN PUBLIC KEY-', '-END PUBLIC KEY-', '-END RSA PUBLIC KEY-'], body = lines
        .map((line) => line.trim())
        .filter((line) => line.length && ignore(line))
        .join('');
    if (body.length) {
        return { body: s2U8A(b2s(bu2b(body))), type: type };
    }
    else {
        throw new Error(ILLEGAL_ARGUMENT);
    }
}
/* Issue2: not universal does not work with structured PEM keys
export function pem2asn1(buff: ArrayBuffer | Uint8Array, type: 'private' | 'public'): any {
    if (!buff || !type) throw new Error(ILLEGAL_ARGUMENT);
    if (buff instanceof ArrayBuffer) buff = new Uint8Array(buff);
    let data = new DataView(buff.buffer);

    let res = {};
    let offset = {
        private: buff[1] & 0x80 ? buff[1] - 0x80 + 5 : 7,
        public: buff[1] & 0x80 ? buff[1] - 0x80 + 2 : 2,
    }[type.toLowerCase()];

    function read() {
        if ((offset + 1) < buff.byteLength) {
            let s = data.getUint8(offset + 1);
            if (s & 0x80) {
                let n = s - 0x80;
                s = data[[
                    'getUint8', 'getInt16'
                ][n - 1]](offset + 2, false);
                offset += n;
            }
            offset += 2;
            let b = (<Uint8Array>buff).slice(offset, offset + s);
            offset += s;
            return cleanZeros(b);
        }
        return new Uint8Array();
    }

    res['modulus'] = read();
    res['bits'] = (res['modulus'].length - 1) * 8 + Math.ceil(
        Math.log(res['modulus'][0] + 1) / Math.log(2)
    );
    if (!res['bits']) {
        throw new Error(ILLEGAL_ARGUMENT);
    }
    res['publicExponent'] = parseInt(AB2hex(read()), 16);
    if (type === 'private') {
        res['privateExponent'] = read();
        res['prime1'] = read();
        res['prime2'] = read();
        res['exponent1'] = read();
        res['exponent2'] = read();
        res['coefficient'] = read();
    }
    return res;
}

export function asn12jwk(asn1: any, type: string, extra?: any): any {
    const pemTypes = ['public', 'private'];
    if (!asn1) throw new Error(ILLEGAL_ARGUMENT);

    type = ((typeof type === 'string') && type.toLowerCase())
        || pemTypes[!!asn1.privateExponent ? 1 : 0];
    if ((type === 'private' && !asn1.privateExponent)
        || pemTypes.indexOf(type) < 0) {
        throw new Error(ILLEGAL_ARGUMENT);
    }
    let v = asn1.publicExponent;
    const expSize = Math.ceil(Math.log(v) / Math.log(256));
    const exp = new Uint8Array(expSize).map(function (el) {
        el = v % 256;
        v = Math.floor(v / 256);
        return el
    }).reverse();

    let jwk = Object.assign({ kty: 'RSA' }, extra, {
        n: s2bu(AB2s(asn1.modulus)),
        e: s2bu(AB2s(exp)),
    });

    if (type === 'private') {
        Object.assign(jwk, {
            d: s2bu(AB2s(asn1.privateExponent)),
            p: s2bu(AB2s(asn1.prime1)),
            q: s2bu(AB2s(asn1.prime2)),
            dp: s2bu(AB2s(asn1.exponent1)),
            dq: s2bu(AB2s(asn1.exponent2)),
            qi: s2bu(AB2s(asn1.coefficient))
        });
    }
    return jwk;
}
*/
/* Issue3: Works, but ASN1 adds 14kb of code to this lib
ASN1.prototype.getAB = function() {
    return cleanZeros(hex2AB(this.getHex()));
};

export function pem2asn1(buff: ArrayBuffer | Uint8Array): any {
    if (!buff) throw new Error(ILLEGAL_ARGUMENT);
    if (buff instanceof ArrayBuffer) buff = new Uint8Array(buff);
    let asn1 = ASN1.decode(buff), res = {};

    // add different PEM key structures and use sub.structure for ordering
    if (asn1.sub.length === 3) {
        asn1 = asn1.sub[2].sub[0];
    }
    if (asn1.sub.length === 9) {
        // Parse the private key.
        res['modulus'] = asn1.sub[1].getAB(); // ArrayBuffer
        res['publicExponent'] = parseInt(asn1.sub[2].getHex(), 16); // int
        res['privateExponent'] = asn1.sub[3].getAB(); // ArrayBuffer
        res['prime1'] = asn1.sub[4].getAB(); // ArrayBuffer
        res['prime2'] = asn1.sub[5].getAB(); // ArrayBuffer
        res['exponent1'] = asn1.sub[6].getAB(); // ArrayBuffer
        res['exponent2'] = asn1.sub[7].getAB(); // ArrayBuffer
        res['coefficient'] = asn1.sub[8].getAB(); // ArrayBuffer

    } else if (asn1.sub.length === 2) {
        // Parse the public key.
        asn1 = asn1.sub[1].sub[0];

        res['modulus'] = asn1.sub[0].getAB(); // ArrayBuffer
        res['publicExponent'] = parseInt(asn1.sub[1].getHex(), 16); // int
    }
    return res;
}
*/
class Asn1Tag {
    constructor(stream) {
        this.tagClass = 0;
        this.tagConstructed = false;
        this.tagNumber = 0;
        const buf = stream.read();
        this.tagClass = buf >> 6;
        this.tagConstructed = (buf & 0x20) !== 0;
        this.tagNumber = buf & 0x1f;
    }
}
function pem2asn1(buff) {
    if (!buff)
        throw new Error(ILLEGAL_ARGUMENT);
    if (buff instanceof ArrayBuffer)
        buff = new Uint8Array(buff);
    let asn1 = ASN1.decode(buff);
    const res = {};
    if (asn1.sub.length === 3) {
        asn1 = asn1.sub[2].sub[0];
    }
    if (asn1.sub.length === 9) {
        // Parse the private key.
        res['modulus'] = asn1.sub[1].getAB(); // ArrayBuffer
        res['publicExponent'] = parseInt(asn1.sub[2].getHex(), 16); // int
        res['privateExponent'] = asn1.sub[3].getAB(); // ArrayBuffer
        res['prime1'] = asn1.sub[4].getAB(); // ArrayBuffer
        res['prime2'] = asn1.sub[5].getAB(); // ArrayBuffer
        res['exponent1'] = asn1.sub[6].getAB(); // ArrayBuffer
        res['exponent2'] = asn1.sub[7].getAB(); // ArrayBuffer
        res['coefficient'] = asn1.sub[8].getAB(); // ArrayBuffer
    }
    else if (asn1.sub.length === 2) {
        // Parse the public key.
        asn1 = asn1.sub[1].sub[0];
        res['modulus'] = asn1.sub[0].getAB(); // ArrayBuffer
        res['publicExponent'] = parseInt(asn1.sub[1].getHex(), 16); // int
    }
    res['bits'] = (res['modulus'].length - 1) * 8 + Math.ceil(Math.log(res['modulus'][0] + 1) / Math.log(2));
    if (!res['bits']) {
        throw new Error(ILLEGAL_ARGUMENT);
    }
    return res;
}
function asn12jwk(asn1, type, extra) {
    const pemTypes = ['public', 'private'];
    if (!asn1)
        throw new Error(ILLEGAL_ARGUMENT);
    type = (typeof type === 'string' && type.toLowerCase()) || pemTypes[!!asn1.privateExponent ? 1 : 0];
    if (type === 'private' && !asn1.privateExponent) {
        throw new Error(ILLEGAL_ARGUMENT);
    }
    let v = asn1.publicExponent;
    const expSize = Math.ceil(Math.log(v) / Math.log(256));
    const exp = new Uint8Array(expSize)
        .map(function (el) {
        el = v % 256;
        v = Math.floor(v / 256);
        return el;
    })
        .reverse();
    const jwk = Object.assign({ kty: 'RSA' }, extra, {
        n: s2bu(AB2s(asn1.modulus)),
        e: s2bu(AB2s(exp)),
    });
    if (type === 'private') {
        Object.assign(jwk, {
            d: s2bu(AB2s(asn1.privateExponent)),
            p: s2bu(AB2s(asn1.prime1)),
            q: s2bu(AB2s(asn1.prime2)),
            dp: s2bu(AB2s(asn1.exponent1)),
            dq: s2bu(AB2s(asn1.exponent2)),
            qi: s2bu(AB2s(asn1.coefficient)),
        });
    }
    return jwk;
}
function pem2jwk(secret, type, extra) {
    return tryPromise(() => {
        const pem = s2pem(secret);
        return asn12jwk(pem2asn1(pem.body), type, extra);
    });
}
/* Issue1: does not work with all versions of PEM keys...
export function parsePem(secret: string, concType?: "public" | "private", extra?): Promise<PEM> {
    return tryPromise(() => {
            const pem = s2pem(secret);
            if (!concType) concType = pem.type;
            if (concType !== pem.type) throw new Error(ILLEGAL_ARGUMENT);
            return pem
        })
}
*/
function createSign(name) {
    return __awaiter(this, void 0, void 0, function* () {
        if (webCryptoSubtle) {
            return {
                update: function (thing) {
                    return {
                        sign: function (secret) {
                            return __awaiter(this, void 0, void 0, function* () {
                                return yield pem2jwk(secret, 'private', {
                                    key_ops: ['sign'],
                                    alg: name.replace('SHA-', 'RS'),
                                }).then((keyData) => __awaiter(this, void 0, void 0, function* () {
                                    return yield webCryptoSubtle
                                        .importKey('jwk', keyData, { name: 'RSASSA-PKCS1-v1_5', hash: { name: name } }, true, [
                                        'sign',
                                    ])
                                        .then((key) => __awaiter(this, void 0, void 0, function* () {
                                        return yield webCryptoSubtle
                                            .sign({ name: 'RSASSA-PKCS1-v1_5', hash: { name: name } }, key, s2U8A(thing))
                                            .then(AB2s)
                                            .then(s2b);
                                    }));
                                }));
                                /* Issue1: does not work with all versions of PEM keys...
                                return await parsePem(secret, 'private').then(async pem => {
                                    return await webCryptoSubtle.importKey(
                                        'pkcs8',
                                        pem.body,
                                        { name: 'RSASSA-PKCS1-v1_5', hash: { name: name } },
                                        true,
                                        ['sign']
                                    ).then(async key => {
                                        return await webCryptoSubtle.sign(
                                            'RSASSA-PKCS1-v1_5',
                                            key,
                                            s2U8A(thing)
                                        ).then(AB2s).then(s2b)
                                    })
                                })
                                */
                            });
                        },
                    };
                },
            };
        }
        else {
            const crypto = yield import('crypto');
            if (!!crypto && crypto.createSign) {
                return crypto.createSign(name.replace('SHA-', 'RSA-SHA'));
            }
            else {
                throw new Error(CRYPTO_NOT_FOUND);
            }
        }
    });
}
function algRSsign(bits) {
    return function sign(thing, privateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield createSign('SHA-' + bits);
                return b2bu(yield res.update(thing).sign(privateKey, 'base64'));
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    };
}
function createVerify(name) {
    return __awaiter(this, void 0, void 0, function* () {
        if (webCryptoSubtle) {
            return {
                update: function (thing) {
                    return {
                        verify: function (secret, signature) {
                            return __awaiter(this, void 0, void 0, function* () {
                                return yield pem2jwk(secret, 'public', {
                                    key_ops: ['verify'],
                                    alg: name.replace('SHA-', 'RS'),
                                }).then(({ kty, n, e }) => __awaiter(this, void 0, void 0, function* () {
                                    return yield webCryptoSubtle
                                        .importKey('jwk', { kty, n, e }, { name: 'RSASSA-PKCS1-v1_5', hash: { name: name } }, false, ['verify'])
                                        .then((key) => __awaiter(this, void 0, void 0, function* () {
                                        return yield webCryptoSubtle.verify('RSASSA-PKCS1-v1_5', key, s2U8A(bu2s(signature)), s2U8A(thing));
                                    }));
                                }));
                                /* Issue1: does not work with all versions of PEM keys...
                                return await parsePem(secret, 'public').then(async pem => {
                                    return await webCryptoSubtle.importKey(
                                        'spki',
                                        pem.body,
                                        { name: 'RSASSA-PKCS1-v1_5', hash: { name: name } },
                                        true,
                                        ['verify']
                                    ).then(async key => {
                                        return await webCryptoSubtle.verify(
                                            'RSASSA-PKCS1-v1_5',
                                            key,
                                            s2U8A(bu2s(signature)),
                                            s2U8A(thing)
                                        )
                                    })
                                })*/
                            });
                        },
                    };
                },
            };
        }
        else {
            const crypto = yield import('crypto');
            if (!!crypto && crypto.createVerify) {
                return crypto.createVerify(name.replace('SHA-', 'RSA-SHA'));
            }
            else {
                throw new Error(CRYPTO_NOT_FOUND);
            }
        }
    });
}
function algRSverify(bits) {
    return function verify(thing, signature, publicKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                signature = bu2b(signature);
                const rsaVerify = yield createVerify('SHA-' + bits);
                return yield rsaVerify.update(thing).verify(publicKey, signature, 'base64');
            }
            catch (e) {
                return Promise.reject(e);
            }
        });
    };
}
/**
 * Universal algorithm verifier
 *
 */
function algVerify(algorithm, thing, signature, secret) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof algorithm !== 'string' || algorithm.length < 4) {
            throw new Error(UNSUPPORTED_ALGORITHM);
        }
        const algo = algorithm.toLowerCase();
        if (algo === 'none') {
            return signature === '';
        }
        const type = algo.slice(0, 2), bits = parseInt(algo.slice(2));
        if (isNaN(bits) || [256, 384, 512].indexOf(bits) < 0) {
            throw new Error(UNSUPPORTED_ALGORITHM);
        }
        switch (type) {
            case 'rs':
                return yield algRSverify(bits)(thing, signature, secret);
            case 'hs':
                return yield algHSverify(bits)(thing, signature, secret);
            default:
                throw new Error(UNSUPPORTED_ALGORITHM);
        }
    });
}
/**
 * Universal algorithm signer
 *
 */
function algSign(algorithm, thing, secret) {
    return __awaiter(this, void 0, void 0, function* () {
        if (typeof algorithm !== 'string' || algorithm.length < 4) {
            throw new Error(UNSUPPORTED_ALGORITHM);
        }
        const algo = algorithm.toLowerCase();
        if (algo === 'none') {
            return '';
        }
        const type = algo.slice(0, 2), bits = parseInt(algo.slice(2));
        if (isNaN(bits) || [256, 384, 512].indexOf(bits) < 0) {
            throw new Error(UNSUPPORTED_ALGORITHM);
        }
        switch (type) {
            case 'rs':
                return yield algRSsign(bits)(thing, secret);
            case 'hs':
                return yield algHSsign(bits)(thing, secret);
            default:
                throw new Error(UNSUPPORTED_ALGORITHM);
        }
    });
}
function jwtVerify(jwtStr, secret) {
    return __awaiter(this, void 0, void 0, function* () {
        const jwt = jwtSplit(jwtStr, 'jwtVerify'), header = s2J(bu2s(jwt.header)), thing = jwt.header + '.' + jwt.payload;
        return tryPromise(() => algVerify(header.alg, thing, jwt.signature, secret));
    });
}
const verifyJwt = jwtVerify;
const verify = jwtVerify;
function jwtSign(jwtStr, secret) {
    const jwt = jwtSplit(jwtStr, 'jwtSign'), header = s2J(bu2s(jwt.header)), thing = jwt.header + '.' + jwt.payload;
    return tryPromise(() => __awaiter(this, void 0, void 0, function* () { return yield algSign(header.alg, thing, secret); }));
}
const signJwt = jwtSign;
const sign = jwtSign;
function jwtResign(jwtStr, secret, alg) {
    return __awaiter(this, void 0, void 0, function* () {
        const jwt = jwtDecode(jwtStr, 'jwtResign');
        if (!!alg)
            jwt.header.alg = alg;
        jwt.signature = yield jwtSign(jwt.toString(), secret);
        return jwt.toString();
    });
}
const resignJwt = jwtResign;
const resign = jwtResign;
/**
 * Used for testing only
 *
 * @hidden
 */
function cryptoType() {
    return __awaiter(this, void 0, void 0, function* () {
        const crypto = webCrypto || (yield import('crypto'));
        return crypto ? crypto['type'] || 'crypto-node' : 'undefined';
    });
}
function notLatin1String(str) {
    return Array.prototype.some.apply(str, [(str) => str.charCodeAt(0) > 255]);
}
function textEncode(input) {
    if (notLatin1String(input)) {
        const encoder = getTextEncoder();
        if (!!encoder) {
            return encoder.encode(input);
        }
    }
    return s2U8A(input);
}
function textDecode(input) {
    if (typeof input === 'string') {
        try {
            const decoder = getTextDecoder('utf8', { fatal: true });
            if (!!decoder) {
                return decoder.decode(s2U8A(input));
            }
        }
        catch (_a) {
            /* empty */
        }
        return input;
    }
    try {
        const decoder = getTextDecoder('utf8', { fatal: true });
        if (!!decoder) {
            return decoder.decode(input);
        }
    }
    catch (_b) {
        /* empty */
    }
    return input.toString('binary');
}
function getTextEncoder() {
    if (typeof TextEncoder !== 'undefined') {
        return new TextEncoder();
    }
    if (typeof require !== 'undefined') {
        const encoder = require('util');
        if (typeof (encoder === null || encoder === void 0 ? void 0 : encoder.TextEncoder) !== 'undefined') {
            return new encoder.TextEncoder();
        }
    }
    return false;
}
function getTextDecoder(...args) {
    if (typeof TextDecoder !== 'undefined') {
        return new TextDecoder(...args);
    }
    if (typeof require !== 'undefined') {
        const decoder = require('util');
        if (typeof (decoder === null || decoder === void 0 ? void 0 : decoder.TextDecoder) !== 'undefined') {
            return new decoder.TextDecoder(...args);
        }
    }
    return false;
}

export { AB2s, Asn1Tag, J2s, JwtDecode, JwtSplit, algHSsign, algHSverify, algRSsign, algRSverify, algSign, algVerify, asn12jwk, b2bu, b2s, bu2b, bu2s, createHmac, createSign, createVerify, cryptoType, decode, decodeJwt, getTextDecoder, getTextEncoder, isGzip, jwtDecode, jwtResign, jwtSign, jwtSplit, jwtVerify, notLatin1String, pem2asn1, pem2jwk, resign, resignJwt, s2AB, s2J, s2U8A, s2b, s2bu, s2pem, s2zbu, sign, signJwt, split, splitJwt, textDecode, textEncode, tryPromise, unzip, verify, verifyJwt, webCrypto, webCryptoSubtle, zbu2s, zip };
//# sourceMappingURL=jwt-js-decode.es6.js.map
