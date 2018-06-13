import pako from 'pako';

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

const crypto = require("crypto");
/*
browserify
import { createHmac, createSign, createVerify } from "crypto-browserify";

node.js
import { createHmac, createSign, createVerify } from "crypto";
*/
const webCrypto = typeof window === "object" && (window.crypto || window['msCrypto']);
const webCryptoSubtle = webCrypto && (webCrypto.subtle || webCrypto['webkitSubtle'] || webCrypto['Subtle']);
const UNSUPPORTED_ALGORITHM = 'Unsupported algorithm name specified! Supported algorithms: "HS256", "HS384", "HS512", "RS256", "RS384", "RS512" and "none".';
const ILLEGAL_ARGUMENT = 'Illegal argument specified!';
/**
 * Class for creating a JwtSplit object with three parts of JWT Token as strings
 *
 * @class  JwtSplit
 */
class JwtSplit {
    constructor(str) {
        if (typeof str !== 'string') {
            throw new Error(ILLEGAL_ARGUMENT);
        }
        const jwtArr = str.split('.');
        if (jwtArr.length !== 3) {
            throw new Error(ILLEGAL_ARGUMENT);
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
    constructor(str) {
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
        const jwtObj = jwtSplit(str);
        if (jwtObj) {
            this.header = jwtObj.header ? s2J(bu2s(jwtObj.header)) : {};
            this.payload = jwtObj.payload ? (isGzip(this.header) ? s2J(zbu2s(jwtObj.payload)) : s2J(bu2s(jwtObj.payload))) : {};
            this.signature = jwtObj.signature || '';
        }
    }
    toString() {
        return s2bu(JSON.stringify(this.header)) + '.' + (isGzip(this.header) ? s2zbu(JSON.stringify(this.payload)) : s2bu(JSON.stringify(this.payload))) + '.' + this.signature;
    }
}
/**
 * Converts string to base64 string
 *
 * @param {string} str - data string to convert
 *
 * @returns {string} decoded data string
 */
function s2J(str) {
    try {
        return JSON.parse(str);
    }
    catch (e) {
        throw new Error(ILLEGAL_ARGUMENT);
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
            return new Buffer(str, 'base64').toString('binary');
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
            return new Buffer(str).toString('base64');
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
    const buff = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++)
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
/*
export function algHSsign(bits: number) {
    return function sign(thing: string, secret: string): string {
        const hmac = createHmac('sha' + bits, secret);
        return b2bu(hmac.update(thing).digest('base64'));
    }
}

export function algHSverify(bits: number) {
    return function verify(thing: string, signature: string, secret: string): boolean {
        return signature === algHSsign(bits)(thing, secret);
    }
}

export function algRSsign(bits: number) {
    return function sign(thing: string, privateKey: string): string {
        const rsaSign = createSign('RSA-SHA' + bits);
        return b2bu(rsaSign.update(thing).sign(privateKey, 'base64'));
    }
}

export function algRSverify(bits: number) {
    return function verify(thing: string, signature: string, publicKey: string): boolean {
        signature = bu2b(signature);
        const rsaVerify = createVerify('RSA-SHA' + bits);
        rsaVerify.update(thing);
        return rsaVerify.verify(publicKey, signature, 'base64');
    }
}*/
/**
 * Async function inspired by createHmac in crypto (used WebCrypto Api supported by most browsers)
 *
 */
function createHmac(name, secret) {
    return __awaiter(this, void 0, void 0, function* () {
        if (webCryptoSubtle) {
            const keyData = s2AB(secret);
            return yield webCryptoSubtle.importKey('raw', keyData, { name: 'HMAC', hash: { name: name } }, true, ['sign']).then(key => {
                return {
                    _key: key,
                    update: function (thing) {
                        return __awaiter(this, void 0, void 0, function* () {
                            return yield webCryptoSubtle.sign('HMAC', key, s2AB(thing));
                        });
                    }
                };
            });
        }
        else {
            return !!crypto && crypto.createHmac ? Promise.resolve(crypto.createHmac(name.replace('SHA-', 'sha'), secret)) : Promise.reject(webCrypto);
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
            return Promise.resolve(webCryptoSubtle ? s2bu(AB2s(hmac && (yield hmac.update(thing)))) : b2bu(hmac && hmac.update(thing).digest('base64')));
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
/*export function algRSsign(bits: number) {
    return function sign(thing: string, privateKey: string): string {
        const rsaSign = crypto.createSign('RSA-SHA' + bits);
        return b2bu(rsaSign.update(thing).sign(privateKey, 'base64'));
    }
}

export function algRSverify(bits: number) {
    return function verify(thing: string, signature: string, publicKey: string): boolean {
        signature = bu2b(signature);
        const rsaVerify = crypto.createVerify('RSA-SHA' + bits);
        rsaVerify.update(thing);
        return rsaVerify.verify(publicKey, signature, 'base64');
    }
}*/
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
        if (isNaN(bits) || ([256, 384, 512].indexOf(bits) < 0)) {
            throw new Error(UNSUPPORTED_ALGORITHM);
        }
        switch (type) {
            //case 'rs':
            //return await algRSverify(bits)(thing, signature, secret);
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
        if (isNaN(bits) || ([256, 384, 512].indexOf(bits) < 0)) {
            throw new Error(UNSUPPORTED_ALGORITHM);
        }
        switch (type) {
            //case 'rs':
            //return await algRSsign(bits)(thing, secret);
            case 'hs':
                return yield algHSsign(bits)(thing, secret);
            default:
                throw new Error(UNSUPPORTED_ALGORITHM);
        }
    });
}
function jwtVerify(jwtStr, secret) {
    return __awaiter(this, void 0, void 0, function* () {
        const jwt = jwtSplit(jwtStr), header = s2J(bu2s(jwt.header)), thing = jwt.header + '.' + jwt.payload;
        return yield algVerify(header.alg, thing, jwt.signature, secret);
    });
}
function jwtSign(jwtStr, secret) {
    return __awaiter(this, void 0, void 0, function* () {
        const jwt = jwtSplit(jwtStr), header = s2J(bu2s(jwt.header)), thing = jwt.header + '.' + jwt.payload;
        return yield algSign(header.alg, thing, secret);
    });
}
function resignJwt(jwtStr, secret) {
    return __awaiter(this, void 0, void 0, function* () {
        const jwt = jwtSplit(jwtStr), header = s2J(bu2s(jwt.header)), thing = jwt.header + '.' + jwt.payload;
        return thing + '.' + (yield algSign(header.alg, thing, secret));
    });
}
/**
 * Used for testing only
 *
 * @hidden
 */
function cryptoType() {
    return crypto ? crypto['type'] || 'crypto-node' : 'undefined';
}

export { webCrypto, webCryptoSubtle, UNSUPPORTED_ALGORITHM, ILLEGAL_ARGUMENT, JwtSplit, JwtDecode, s2J, b2s, b2bu, bu2b, bu2s, isGzip, jwtDecode, jwtSplit, s2b, s2bu, s2zbu, unzip, zbu2s, zip, createHmac, algHSsign, algHSverify, algVerify, algSign, jwtVerify, jwtSign, resignJwt, cryptoType };
//# sourceMappingURL=jwt-js-decode.es6.js.map
