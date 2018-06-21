(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('pako'), require('crypto')) :
    typeof define === 'function' && define.amd ? define(['exports', 'pako', 'crypto'], factory) :
    (factory((global.jwtJsDecode = {}),null,null));
}(this, (function (exports,pako,crypto) { 'use strict';

    pako = pako && pako.hasOwnProperty('default') ? pako['default'] : pako;
    crypto = crypto && crypto.hasOwnProperty('default') ? crypto['default'] : crypto;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var max = 10000000000000; // biggest 10^n integer that can still fit 2^53 when multiplied by 256
    var Int10 = /** @class */ (function () {
        function Int10(value) {
            this.buf = [+value || 0];
        }
        Int10.prototype.mulAdd = function (m, c) {
            // assert(m <= 256)
            var b = this.buf, l = b.length, i, t;
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
        };
        Int10.prototype.sub = function (c) {
            // assert(m <= 256)
            var b = this.buf, l = b.length, i, t;
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
        };
        Int10.prototype.toString = function (base) {
            if ((base || 10) != 10)
                throw 'only base 10 is supported';
            var b = this.buf, s = b[b.length - 1].toString();
            for (var i = b.length - 2; i >= 0; --i)
                s += (max + b[i]).toString().substring(1);
            return s;
        };
        Int10.prototype.valueOf = function () {
            var b = this.buf, v = 0;
            for (var i = b.length - 1; i >= 0; --i)
                v = v * max + b[i];
            return v;
        };
        Int10.prototype.simplify = function () {
            var b = this.buf;
            return (b.length == 1) ? b[0] : this;
        };
        return Int10;
    }());

    var UNSUPPORTED_ALGORITHM = 'Unsupported algorithm name specified! Supported algorithms: "HS256", "HS384", "HS512", "RS256", "RS384", "RS512" and "none".';
    var ILLEGAL_ARGUMENT = 'Illegal argument specified!';
    // clean leading zeros
    function cleanZeros(b) {
        return b[0] === 0 ? cleanZeros(b.slice(1)) : b;
    }
    function hex2AB(hex) {
        if (!hex)
            throw new Error(ILLEGAL_ARGUMENT);
        var match = hex.match(/[0-9A-F]{2}/ig);
        if (!match)
            throw new Error(ILLEGAL_ARGUMENT);
        return new Uint8Array(match.map(function (i) { return parseInt(i, 16); }));
    }

    var ellipsis = "\u2026", reTimeS = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/, reTimeL = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
    function stringCut(str, len) {
        if (str.length > len)
            str = str.substring(0, len) + ellipsis;
        return str;
    }
    var Stream = /** @class */ (function () {
        function Stream(enc, pos) {
            if (pos === void 0) { pos = 0; }
            this.hexDigits = "0123456789ABCDEF";
            if (enc instanceof Stream) {
                this.enc = enc.enc;
                this.pos = enc.pos;
            }
            else {
                this.enc = enc;
                this.pos = pos;
            }
        }
        Stream.prototype.get = function (pos) {
            if (pos === undefined)
                pos = this.pos++;
            if (pos >= this.enc.length)
                throw 'Requesting byte offset ' + pos + ' on a stream of length ' + this.enc.length;
            return (typeof this.enc == "string") ? this.enc.charCodeAt(pos) : this.enc[pos];
        };
        Stream.prototype.hexByte = function (b) {
            return this.hexDigits.charAt((b >> 4) & 0xF) + this.hexDigits.charAt(b & 0xF);
        };
        Stream.prototype.hexDump = function (start, end, raw) {
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
        Stream.prototype.isASCII = function (start, end) {
            for (var i = start; i < end; ++i) {
                var c = this.get(i);
                if (c < 32 || c > 176)
                    return false;
            }
            return true;
        };
        Stream.prototype.parseStringISO = function (start, end) {
            var s = "";
            for (var i = start; i < end; ++i)
                s += String.fromCharCode(this.get(i));
            return s;
        };
        Stream.prototype.parseStringUTF = function (start, end) {
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
        Stream.prototype.parseStringBMP = function (start, end) {
            var str = "", hi, lo;
            for (var i = start; i < end;) {
                hi = this.get(i++);
                lo = this.get(i++);
                str += String.fromCharCode((hi << 8) | lo);
            }
            return str;
        };
        Stream.prototype.parseTime = function (start, end, shortYear) {
            var s = this.parseStringISO(start, end), m = (shortYear ? reTimeS : reTimeL).exec(s);
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
        Stream.prototype.parseInteger = function (start, end) {
            var v = this.get(start), neg = (v > 127), pad = neg ? 255 : 0, len, s = '';
            while (v == pad && ++start < end)
                v = this.get(start);
            len = end - start;
            if (len === 0)
                return neg ? -1 : 0;
            if (len > 4) {
                var t = +v;
                len <<= 3;
                while (((t ^ pad) & 0x80) === 0) {
                    t <<= 1;
                    --len;
                }
                s = "(" + len + " bit)\n";
            }
            if (neg)
                v = v - 256;
            var n = new Int10(v);
            for (var i = start + 1; i < end; ++i)
                n.mulAdd(256, this.get(i));
            return s + n.toString();
        };
        Stream.prototype.parseBitString = function (start, end, maxLength) {
            var unusedBit = this.get(start), lenBit = ((end - start - 1) << 3) - unusedBit, intro = "(" + lenBit + " bit)\n", s = "";
            for (var i = start + 1; i < end; ++i) {
                var b = this.get(i), skip = (i == end - 1) ? unusedBit : 0;
                for (var j = 7; j >= skip; --j)
                    s += (b >> j) & 1 ? "1" : "0";
                if (s.length > maxLength)
                    return intro + stringCut(s, maxLength);
            }
            return intro + s;
        };
        Stream.prototype.parseOctetString = function (start, end, maxLength) {
            if (this.isASCII(start, end))
                return stringCut(this.parseStringISO(start, end), maxLength);
            var len = end - start, s = "(" + len + " byte)\n";
            maxLength /= 2;
            if (len > maxLength)
                end = start + maxLength;
            for (var i = start; i < end; ++i)
                s += this.hexByte(this.get(i));
            if (len > maxLength)
                s += ellipsis;
            return s;
        };
        Stream.prototype.parseOID = function (start, end, maxLength) {
            var s = '', n = new Int10(), bits = 0;
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
                        }
                        else {
                            var m = n < 80 ? n < 40 ? 0 : 1 : 2;
                            s = m + "." + (n - m * 40);
                        }
                    }
                    else
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
        return Stream;
    }());
    var ASN1 = /** @class */ (function () {
        function ASN1(stream, header, length, tag, sub) {
            if (!(tag instanceof ASN1Tag))
                throw 'Invalid tag value.';
            this.stream = stream;
            this.header = header;
            this.length = length;
            this.tag = tag;
            this.sub = sub;
        }
        ASN1.prototype.typeName = function () {
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
        ASN1.prototype.content = function (maxLength) {
            if (this.tag === undefined)
                return null;
            if (maxLength === undefined)
                maxLength = Infinity;
            var content = this.posContent(), len = Math.abs(this.length);
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
        ASN1.prototype.toString = function () {
            return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + ((this.sub === null) ? 'null' : this.sub.length) + "]";
        };
        ASN1.prototype.posStart = function () {
            return this.stream.pos;
        };
        ASN1.prototype.posContent = function () {
            return this.stream.pos + this.header;
        };
        ASN1.prototype.posEnd = function () {
            return this.stream.pos + this.header + Math.abs(this.length);
        };
        ASN1.prototype.toHexString = function (root) {
            return this.stream.hexDump(this.posStart(), this.posEnd(), true);
        };
        ASN1.prototype.getAB = function (clean) {
            if (clean === void 0) { clean = true; }
            return clean ? cleanZeros(hex2AB(this.toHexString())) : hex2AB(this.toHexString());
        };
        ASN1.decodeLength = function (stream) {
            var buf = stream.get();
            var len = buf & 0x7F;
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
        ASN1.decode = function (stream) {
            if (!(stream instanceof Stream))
                stream = new Stream(stream, 0);
            var streamStart = new Stream(stream);
            var tag = new ASN1Tag(stream);
            var len = ASN1.decodeLength(stream), sub = null;
            var start = stream.pos;
            var header = start - streamStart.pos;
            var getSub = function () {
                sub = [];
                if (len !== null) {
                    var end = start + len;
                    while (stream.pos < end)
                        sub[sub.length] = ASN1.decode(stream);
                    if (stream.pos != end)
                        throw "Content size is not correct for container starting at offset " + start;
                }
                else {
                    try {
                        for (;;) {
                            var s = ASN1.decode(stream);
                            if (s.tag.isEOC())
                                break;
                            sub[sub.length] = s;
                        }
                        len = start - stream.pos;
                    }
                    catch (e) {
                        throw "Exception while decoding undefined length content: " + e;
                    }
                }
            };
            if (tag.tagConstructed) {
                getSub();
            }
            else if (tag.isUniversal() && ((tag.tagNumber == 0x03) || (tag.tagNumber == 0x04))) {
                try {
                    if (tag.tagNumber == 0x03)
                        if (stream.get() != 0)
                            throw "BIT STRINGs with unused bits cannot encapsulate.";
                    getSub();
                    for (var i = 0; i < sub.length; ++i)
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
        };
        return ASN1;
    }());
    var ASN1Tag = /** @class */ (function () {
        function ASN1Tag(stream) {
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
        ASN1Tag.prototype.isUniversal = function () {
            return this.tagClass === 0x00;
        };
        ASN1Tag.prototype.isEOC = function () {
            return this.tagClass === 0x00 && this.tagNumber === 0x00;
        };
        return ASN1Tag;
    }());

    /*
    //crypto-browserify:
    import { createHmac, createSign, createVerify } from "crypto-browserify";
    //or browserify hmac/sign
    import { createHmac } from "create-hmac";
    import { createSign, createVerify } from "browserify-sign";

    //node.js
    import { createHmac, createSign, createVerify } from "crypto";
    */
    var webCrypto = typeof window === "object" && (window.crypto || window['msCrypto']);
    var webCryptoSubtle = webCrypto && (webCrypto.subtle || webCrypto['webkitSubtle'] || webCrypto['Subtle']);
    /**
     * Class for creating a JwtSplit object with three parts of JWT Token as strings
     *
     * @class  JwtSplit
     */
    var JwtSplit = /** @class */ (function () {
        function JwtSplit(str) {
            if (typeof str !== 'string') {
                throw new Error(ILLEGAL_ARGUMENT);
            }
            var jwtArr = str.split('.');
            if (jwtArr.length !== 3) {
                throw new Error(ILLEGAL_ARGUMENT);
            }
            var header = jwtArr[0], payload = jwtArr[1], signature = jwtArr[2];
            this.header = header;
            this.payload = payload;
            this.signature = signature;
        }
        JwtSplit.prototype.toString = function () {
            return this.header + '.' + this.payload + '.' + this.signature;
        };
        return JwtSplit;
    }());
    /**
     * Class for creating a JwtDecode object with three parts of JWT Token, header and payload decoded and parsed, signature in initial form
     *
     * @class  JwtDecode
     */
    var JwtDecode = /** @class */ (function () {
        function JwtDecode(str) {
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
                throw new Error(ILLEGAL_ARGUMENT);
            }
            var jwtObj = jwtSplit(str);
            if (jwtObj) {
                this.header = jwtObj.header ? s2J(bu2s(jwtObj.header)) : {};
                this.payload = jwtObj.payload ? (isGzip(this.header) ? s2J(zbu2s(jwtObj.payload)) : s2J(bu2s(jwtObj.payload))) : {};
                this.signature = jwtObj.signature || '';
            }
        }
        JwtDecode.prototype.toString = function () {
            return s2bu(J2s(this.header)) + '.' + (isGzip(this.header) ? s2zbu(J2s(this.payload)) : s2bu(J2s(this.payload))) + '.' + this.signature;
        };
        return JwtDecode;
    }());
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
        try {
            return JSON.parse(str);
        }
        catch (e) {
            throw new Error(e.message);
        }
    }
    /**
     * Converts JSON object to string
     *
     * @param {object} obj - JSON object to convert
     *
     * @returns {string} resulting string
     */
    function J2s(obj) {
        try {
            return JSON.stringify(obj);
        }
        catch (e) {
            throw new Error(e.message);
        }
    }
    /**
     * Converts string to base64 string
     *
     * @param {string} str - data string to convert
     *
     * @returns {string} decoded data string
     */
    function b2s(str) {
        try {
            if (typeof window === 'object' && typeof window.atob === 'function') {
                return window.atob(str);
            }
            else if (typeof Buffer !== 'undefined') {
                return Buffer.from(str, 'base64').toString('binary');
            }
            else
                throw new Error(ILLEGAL_ARGUMENT);
        }
        catch (e) {
            throw new Error(e);
        }
    }
    /**
     * Converts base64 string to base64url string
     *
     * @param {string} str - data string to convert
     *
     * @returns {string} base64url string
     */
    function b2bu(str) {
        if ((typeof str !== 'string') || (str.length % 4 !== 0)) {
            throw new Error(ILLEGAL_ARGUMENT);
        }
        return str
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
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
        if ((typeof str !== 'string') || (str.length % 4 === 1)) {
            throw new Error(ILLEGAL_ARGUMENT);
        }
        for (; (str.length % 4 !== 0);) {
            str += '=';
        }
        return str
            .replace(/\-/g, '+')
            .replace(/_/g, '/');
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
    function jwtDecode(str) {
        return new JwtDecode(str);
    }
    /**
     * Split jwtToken into object {header, payload, signature}
     *
     * @param {string} str - data string to split
     *
     * @returns {JwtSplit} jwt split object of three strings
     */
    function jwtSplit(str) {
        return new JwtSplit(str);
    }
    var splitJwt = jwtSplit;
    /**
     * Converts base64 string to string
     *
     * @param {string} str - data string to convert
     *
     * @returns {string} base64 string
     */
    function s2b(str) {
        try {
            if (typeof window === 'object' && typeof window.atob === 'function') {
                return window.btoa(str);
            }
            else if (typeof Buffer !== 'undefined') {
                return Buffer.from(str).toString('base64');
            }
            else
                throw new Error(ILLEGAL_ARGUMENT);
        }
        catch (e) {
            throw new Error(e);
        }
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
     * Gzip and encode data string to base64url string
     *
     * @param {string} str - data string to encode
     *
     * @returns {string} base64url string
     */
    function s2zbu(str) {
        return s2bu(zip(str));
    }
    /**
     * Converts from gzip data string to string
     *
     * @param {string} str - data string to convert
     *
     * @returns {string} decoded data string
     */
    function unzip(str) {
        if (typeof str !== 'string') {
            throw new Error(ILLEGAL_ARGUMENT);
        }
        return pako.inflate(str, {
            raw: false,
            from: 'string',
            to: 'string'
        });
    }
    /**
     * Decode from base64url and unzip data string
     *
     * @param {string} str - data string to decode
     *
     * @returns {string} decoded data string
     */
    function zbu2s(str) {
        return unzip(bu2s(str));
    }
    /**
     * Converts string to gzip data string
     *
     * @param {string} str - data string to convert
     *
     * @returns {string} gzip data string
     */
    function zip(str) {
        if (typeof str !== 'string') {
            throw new Error(ILLEGAL_ARGUMENT);
        }
        return pako.deflate(str, {
            raw: false,
            from: 'string',
            to: 'string'
        });
    }
    /**
     * Converts string to ArrayBuffer
     *
     * @param {string} str - data string to convert
     *
     * @returns {ArrayBuffer | Uint8Array} charCode ArrayBuffer
     */
    function s2AB(str) {
        var buff = new Uint8Array(str.length);
        for (var i = 0; i < str.length; i++)
            buff[i] = str.charCodeAt(i);
        return buff;
    }
    /**
     * Converts ArrayBuffer to string
     *
     * @param {ArrayBuffer | Uint8Array} buff - charCode ArrayBuffer to convert
     *
     * @returns {string} data string
     */
    function AB2s(buff) {
        if (buff instanceof ArrayBuffer)
            buff = new Uint8Array(buff);
        return String.fromCharCode.apply(String, buff);
    }
    /**
     * Async function inspired by createHmac in crypto (used WebCrypto Api supported by most browsers)
     *
     */
    function createHmac(name, secret) {
        return __awaiter(this, void 0, void 0, function () {
            var keyData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!webCryptoSubtle) return [3 /*break*/, 2];
                        keyData = s2AB(secret);
                        return [4 /*yield*/, webCryptoSubtle.importKey('raw', keyData, { name: 'HMAC', hash: { name: name } }, true, ['sign']).then(function (key) {
                                return {
                                    update: function (thing) {
                                        return __awaiter(this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, webCryptoSubtle.sign('HMAC', key, s2AB(thing))];
                                                    case 1: return [2 /*return*/, _a.sent()];
                                                }
                                            });
                                        });
                                    }
                                };
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, !!crypto && crypto.createHmac ? Promise.resolve(crypto.createHmac(name.replace('SHA-', 'sha'), secret)) : Promise.reject(webCrypto)];
                }
            });
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
            return __awaiter(this, void 0, void 0, function () {
                var hmac, _a, _b, _c, _d, _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0: return [4 /*yield*/, createHmac('SHA-' + bits, secret)];
                        case 1:
                            hmac = _g.sent();
                            _b = (_a = Promise).resolve;
                            if (!webCryptoSubtle) return [3 /*break*/, 4];
                            _d = s2bu;
                            _e = AB2s;
                            _f = hmac;
                            if (!_f) return [3 /*break*/, 3];
                            return [4 /*yield*/, hmac.update(thing)];
                        case 2:
                            _f = (_g.sent());
                            _g.label = 3;
                        case 3:
                            _c = _d.apply(void 0, [_e.apply(void 0, [_f])]);
                            return [3 /*break*/, 5];
                        case 4:
                            _c = b2bu(hmac && hmac.update(thing).digest('base64'));
                            _g.label = 5;
                        case 5: return [2 /*return*/, _b.apply(_a, [_c])];
                    }
                });
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
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, algHSsign(bits)(thing, secret)];
                        case 1: return [2 /*return*/, (_a.sent()) === signature];
                    }
                });
            });
        };
    }
    function s2pem(secret) {
        if (typeof secret !== 'string') {
            throw new Error(ILLEGAL_ARGUMENT);
        }
        var type = 'public';
        function ignore(line) {
            if (ignoreLinesPriv.some(function (ign) { return line.toUpperCase().indexOf(ign) > -1; })) {
                type = 'private';
                return false;
            }
            return !ignoreLinesPub.some(function (ign) { return line.toUpperCase().indexOf(ign) > -1; });
        }
        var lines = secret.split('\n'), ignoreLinesPriv = [
            '-BEGIN RSA PRIVATE KEY-',
            '-END RSA PRIVATE KEY-'
        ], ignoreLinesPub = [
            '-BEGIN RSA PUBLIC KEY-',
            '-BEGIN PUBLIC KEY-',
            '-END PUBLIC KEY-',
            '-END RSA PUBLIC KEY-'
        ], body = lines.map(function (line) { return line.trim(); }).filter(function (line) {
            return line.length && ignore(line);
        }).join('');
        if (body.length) {
            return { body: s2AB(b2s(body)), type: type };
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
        return cleanZeros(hex2AB(this.toHexString()));
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
            res['publicExponent'] = parseInt(asn1.sub[2].toHexString(), 16); // int
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
            res['publicExponent'] = parseInt(asn1.sub[1].toHexString(), 16); // int
        }
        return res;
    }
    */
    var Asn1Tag = /** @class */ (function () {
        function Asn1Tag(stream) {
            this.tagClass = 0;
            this.tagConstructed = false;
            this.tagNumber = 0;
            var buf = stream.read();
            this.tagClass = buf >> 6;
            this.tagConstructed = ((buf & 0x20) !== 0);
            this.tagNumber = buf & 0x1F;
        }
        return Asn1Tag;
    }());
    function pem2asn1(buff) {
        if (!buff)
            throw new Error(ILLEGAL_ARGUMENT);
        if (buff instanceof ArrayBuffer)
            buff = new Uint8Array(buff);
        var asn1 = ASN1.decode(buff), res = {};
        if (asn1.sub.length === 3) {
            asn1 = asn1.sub[2].sub[0];
        }
        if (asn1.sub.length === 9) {
            // Parse the private key.
            res['modulus'] = asn1.sub[1].getAB(); // ArrayBuffer
            res['publicExponent'] = parseInt(asn1.sub[2].toHexString(), 16); // int
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
            res['publicExponent'] = parseInt(asn1.sub[1].toHexString(), 16); // int
        }
        res['bits'] = (res['modulus'].length - 1) * 8 + Math.ceil(Math.log(res['modulus'][0] + 1) / Math.log(2));
        if (!res['bits']) {
            throw new Error(ILLEGAL_ARGUMENT);
        }
        return res;
    }
    function asn12jwk(asn1, type, extra) {
        var pemTypes = ['public', 'private'];
        if (!asn1)
            throw new Error(ILLEGAL_ARGUMENT);
        type = ((typeof type === 'string') && type.toLowerCase())
            || pemTypes[!!asn1.privateExponent ? 1 : 0];
        if (type === 'private' && !asn1.privateExponent) {
            throw new Error(ILLEGAL_ARGUMENT);
        }
        var v = asn1.publicExponent;
        var expSize = Math.ceil(Math.log(v) / Math.log(256));
        var exp = new Uint8Array(expSize).map(function (el) {
            el = v % 256;
            v = Math.floor(v / 256);
            return el;
        }).reverse();
        var jwk = Object.assign({ kty: 'RSA' }, extra, {
            n: s2bu(AB2s(asn1.modulus)),
            e: s2bu(AB2s(exp))
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
    function pem2jwk(secret, type, extra) {
        return tryPromise(function () {
            var pem = s2pem(secret);
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
        if (webCryptoSubtle) {
            return {
                update: function (thing) {
                    return {
                        sign: function (secret, encoding) {
                            return __awaiter(this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, pem2jwk(secret, 'private', {
                                                key_ops: ['sign'],
                                                alg: name.replace('SHA-', 'RS')
                                            }).then(function (keyData) { return __awaiter(_this, void 0, void 0, function () {
                                                var _this = this;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, webCryptoSubtle.importKey('jwk', keyData, { name: 'RSASSA-PKCS1-v1_5', hash: { name: name } }, true, ['sign']).then(function (key) { return __awaiter(_this, void 0, void 0, function () {
                                                                return __generator(this, function (_a) {
                                                                    switch (_a.label) {
                                                                        case 0: return [4 /*yield*/, webCryptoSubtle.sign({ name: 'RSASSA-PKCS1-v1_5', hash: { name: name } }, key, s2AB(thing)).then(AB2s).then(s2b)];
                                                                        case 1: return [2 /*return*/, _a.sent()];
                                                                    }
                                                                });
                                                            }); })];
                                                        case 1: return [2 /*return*/, _a.sent()];
                                                    }
                                                });
                                            }); })];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            });
                        }
                    };
                }
            };
        }
        else {
            if (!!crypto && crypto.createSign) {
                return crypto.createSign(name.replace('SHA-', 'RSA-SHA'));
            }
            else {
                throw new Error(ILLEGAL_ARGUMENT);
            }
        }
    }
    function algRSsign(bits) {
        return function sign(thing, privateKey) {
            return __awaiter(this, void 0, void 0, function () {
                var res, _a, e_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, createSign('SHA-' + bits)];
                        case 1:
                            res = _b.sent();
                            _a = b2bu;
                            return [4 /*yield*/, res.update(thing).sign(privateKey, 'base64')];
                        case 2: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
                        case 3:
                            e_1 = _b.sent();
                            return [2 /*return*/, Promise.reject(new Error(e_1.message))];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
    }
    function createVerify(name) {
        if (webCryptoSubtle) {
            return {
                update: function (thing) {
                    return {
                        verify: function (secret, signature, encoding) {
                            return __awaiter(this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, pem2jwk(secret, 'public', {
                                                key_ops: ['verify'],
                                                alg: name.replace('SHA-', 'RS')
                                            }).then(function (_a) {
                                                var kty = _a.kty, n = _a.n, e = _a.e;
                                                return __awaiter(_this, void 0, void 0, function () {
                                                    var _this = this;
                                                    return __generator(this, function (_b) {
                                                        switch (_b.label) {
                                                            case 0: return [4 /*yield*/, webCryptoSubtle.importKey('jwk', { kty: kty, n: n, e: e }, { name: 'RSASSA-PKCS1-v1_5', hash: { name: name } }, false, ['verify']).then(function (key) { return __awaiter(_this, void 0, void 0, function () {
                                                                    return __generator(this, function (_a) {
                                                                        switch (_a.label) {
                                                                            case 0: return [4 /*yield*/, webCryptoSubtle.verify('RSASSA-PKCS1-v1_5', key, s2AB(bu2s(signature)), s2AB(thing))];
                                                                            case 1: return [2 /*return*/, _a.sent()];
                                                                        }
                                                                    });
                                                                }); })];
                                                            case 1: return [2 /*return*/, _b.sent()];
                                                        }
                                                    });
                                                });
                                            })];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            });
                        }
                    };
                }
            };
        }
        else {
            if (!!crypto && crypto.createVerify) {
                return crypto.createVerify(name.replace('SHA-', 'RSA-SHA'));
            }
            else {
                throw new Error(ILLEGAL_ARGUMENT);
            }
        }
    }
    function algRSverify(bits) {
        return function verify(thing, signature, publicKey) {
            return __awaiter(this, void 0, void 0, function () {
                var rsaVerify, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            signature = bu2b(signature);
                            return [4 /*yield*/, createVerify('SHA-' + bits)];
                        case 1:
                            rsaVerify = _a.sent();
                            return [4 /*yield*/, rsaVerify.update(thing).verify(publicKey, signature, 'base64')];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            e_2 = _a.sent();
                            return [2 /*return*/, Promise.reject(new Error(e_2.message))];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
    }
    /**
     * Universal algorithm verifier
     *
     */
    function algVerify(algorithm, thing, signature, secret) {
        return __awaiter(this, void 0, void 0, function () {
            var algo, type, bits, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (typeof algorithm !== 'string' || algorithm.length < 4) {
                            throw new Error(UNSUPPORTED_ALGORITHM);
                        }
                        algo = algorithm.toLowerCase();
                        if (algo === 'none') {
                            return [2 /*return*/, signature === ''];
                        }
                        type = algo.slice(0, 2), bits = parseInt(algo.slice(2));
                        if (isNaN(bits) || ([256, 384, 512].indexOf(bits) < 0)) {
                            throw new Error(UNSUPPORTED_ALGORITHM);
                        }
                        _a = type;
                        switch (_a) {
                            case 'rs': return [3 /*break*/, 1];
                            case 'hs': return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, algRSverify(bits)(thing, signature, secret)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [4 /*yield*/, algHSverify(bits)(thing, signature, secret)];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5: throw new Error(UNSUPPORTED_ALGORITHM);
                }
            });
        });
    }
    /**
     * Universal algorithm signer
     *
     */
    function algSign(algorithm, thing, secret) {
        return __awaiter(this, void 0, void 0, function () {
            var algo, type, bits, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (typeof algorithm !== 'string' || algorithm.length < 4) {
                            throw new Error(UNSUPPORTED_ALGORITHM);
                        }
                        algo = algorithm.toLowerCase();
                        if (algo === 'none') {
                            return [2 /*return*/, ''];
                        }
                        type = algo.slice(0, 2), bits = parseInt(algo.slice(2));
                        if (isNaN(bits) || ([256, 384, 512].indexOf(bits) < 0)) {
                            throw new Error(UNSUPPORTED_ALGORITHM);
                        }
                        _a = type;
                        switch (_a) {
                            case 'rs': return [3 /*break*/, 1];
                            case 'hs': return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, algRSsign(bits)(thing, secret)];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3: return [4 /*yield*/, algHSsign(bits)(thing, secret)];
                    case 4: return [2 /*return*/, _b.sent()];
                    case 5: throw new Error(UNSUPPORTED_ALGORITHM);
                }
            });
        });
    }
    function jwtVerify(jwtStr, secret) {
        return __awaiter(this, void 0, void 0, function () {
            var jwt, header, thing;
            return __generator(this, function (_a) {
                jwt = jwtSplit(jwtStr), header = s2J(bu2s(jwt.header)), thing = jwt.header + '.' + jwt.payload;
                return [2 /*return*/, tryPromise(function () { return algVerify(header.alg, thing, jwt.signature, secret); })];
            });
        });
    }
    var verifyJwt = jwtVerify;
    function jwtSign(jwtStr, secret) {
        var _this = this;
        var jwt = jwtSplit(jwtStr), header = s2J(bu2s(jwt.header)), thing = jwt.header + '.' + jwt.payload;
        return tryPromise(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, algSign(header.alg, thing, secret)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); });
    }
    var signJwt = jwtSign;
    function jwtResign(jwtStr, secret, alg) {
        return __awaiter(this, void 0, void 0, function () {
            var jwt, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        jwt = jwtDecode(jwtStr);
                        if (!!alg)
                            jwt.header.alg = alg;
                        _a = jwt;
                        return [4 /*yield*/, jwtSign(jwt.toString(), secret)];
                    case 1:
                        _a.signature = _b.sent();
                        return [2 /*return*/, jwt.toString()];
                }
            });
        });
    }
    var resignJwt = jwtResign;
    /**
     * Used for testing only
     *
     * @hidden
     */
    function cryptoType() {
        return crypto ? crypto['type'] || 'crypto-node' : 'undefined';
    }

    exports.webCrypto = webCrypto;
    exports.webCryptoSubtle = webCryptoSubtle;
    exports.JwtSplit = JwtSplit;
    exports.JwtDecode = JwtDecode;
    exports.tryPromise = tryPromise;
    exports.s2J = s2J;
    exports.J2s = J2s;
    exports.b2s = b2s;
    exports.b2bu = b2bu;
    exports.bu2b = bu2b;
    exports.bu2s = bu2s;
    exports.isGzip = isGzip;
    exports.jwtDecode = jwtDecode;
    exports.jwtSplit = jwtSplit;
    exports.splitJwt = splitJwt;
    exports.s2b = s2b;
    exports.s2bu = s2bu;
    exports.s2zbu = s2zbu;
    exports.unzip = unzip;
    exports.zbu2s = zbu2s;
    exports.zip = zip;
    exports.s2AB = s2AB;
    exports.AB2s = AB2s;
    exports.createHmac = createHmac;
    exports.algHSsign = algHSsign;
    exports.algHSverify = algHSverify;
    exports.s2pem = s2pem;
    exports.Asn1Tag = Asn1Tag;
    exports.pem2asn1 = pem2asn1;
    exports.asn12jwk = asn12jwk;
    exports.pem2jwk = pem2jwk;
    exports.createSign = createSign;
    exports.algRSsign = algRSsign;
    exports.createVerify = createVerify;
    exports.algRSverify = algRSverify;
    exports.algVerify = algVerify;
    exports.algSign = algSign;
    exports.jwtVerify = jwtVerify;
    exports.verifyJwt = verifyJwt;
    exports.jwtSign = jwtSign;
    exports.signJwt = signJwt;
    exports.jwtResign = jwtResign;
    exports.resignJwt = resignJwt;
    exports.cryptoType = cryptoType;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=jwt-js-decode.umd.js.map
