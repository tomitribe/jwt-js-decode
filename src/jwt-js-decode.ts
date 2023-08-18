import pako from "pako";
/* Issue3: Works, but ASN1 adds 14kb of code to this lib
import ASN1 from "asn1js";
*/
// Simplified/improved version of
// "asn1js": "git+https://github.com/lapo-luchini/asn1js.git",
import { ASN1 } from "./asn1";
import {
    AB2hex,
    cleanZeros,
    CRYPTO_NOT_FOUND,
    generateErrorMessage,
    hex2AB,
    ILLEGAL_ARGUMENT,
    num2hex,
    PAKO_NOT_FOUND,
    UNSUPPORTED_ALGORITHM,
    UNSUPPORTED_ZIP_TYPE
} from "./util";
/*
//crypto-browserify:
import { createHmac, createSign, createVerify } from "crypto-browserify";
//or browserify hmac/sign
import { createHmac } from "create-hmac";
import { createSign, createVerify } from "browserify-sign";

//node.js
import { createHmac, createSign, createVerify } from "crypto";
*/
export const webCrypto = typeof window === "object" && (window.crypto || window['msCrypto']);
export const webCryptoSubtle = webCrypto && (webCrypto.subtle || webCrypto['webkitSubtle'] || webCrypto['Subtle']);

/**
 * Class for creating a JwtSplit object with three parts of JWT Token as strings
 *
 * @class  JwtSplit
 */
export class JwtSplit {
    /**
     * Header (first) part of JWT Token
     *
     * @name  header
     * @type {string}
     */
    public header: string = '';

    /**
     * Payload (second) part of JWT Token
     *
     * @name  payload
     * @type {string}
     */
    public payload: string = '';

    /**
     * Signature (third) part of JWT Token
     *
     * @name  signature
     * @type {string}
     */
    public signature: string = '';

    constructor(str: string, callee = 'JwtSplit') {
        if (typeof str !== 'string') {
            throw new Error(generateErrorMessage(str, callee, 'JWT string'));
        }
        this.fromString(str, callee);
    }

    public fromString(str: string, callee = 'JwtSplit.fromString') {
        
        const jwtArr = str.split('.');
        if (jwtArr.length !== 3) {
            throw new Error(generateErrorMessage(str, callee, 'JWT string'));
        }

        const [header, payload, signature] = jwtArr;
        this.header = header;
        this.payload = payload;
        this.signature = signature;
    }

    public toString(): string {
        return this.header + '.' + this.payload + '.' + this.signature
    }
}

/** JwtPart interface basically object type definition used as a placeholder */
interface JwtPart {
    [key: string]: any
}

/**
 * Class for creating a JwtDecode object with three parts of JWT Token, header and payload decoded and parsed, signature in initial form
 *
 * @class  JwtDecode
 */
export class JwtDecode {
    /**
     * Header (first) part of JWT Token
     *
     * @name  header
     * @type {JwtPart}
     */
    public header: JwtPart = {};

    /**
     * Payload (second) part of JWT Token
     *
     * @name  payload
     * @type {JwtPart}
     */
    public payload: JwtPart = {};

    /**
     * Signature (third) part of JWT Token
     *
     * @name  signature
     * @type {string}
     */
    public signature: string = '';

    constructor(str: string, callee = 'JwtDecode') {
        if (typeof str !== 'string') {
            throw new Error(generateErrorMessage(str, callee, 'JWT string'));
        }
        this.fromString(str, callee);
    }

    public isGzip(): boolean {
        return isGzip(this.header);
    }

    public fromString(str, callee = 'JwtDecode.fromString'): void {
        const jwtObj: JwtSplit = jwtSplit(str, callee);
        if (jwtObj) {
            this.header = jwtObj.header ? s2J(bu2s(jwtObj.header)) : {};
            this.payload = jwtObj.payload ? (this.isGzip() ? s2J(zbu2s(jwtObj.payload)) : s2J(bu2s(jwtObj.payload))) : {};
            this.signature = jwtObj.signature || '';
        }
    }

    public toString(): string {
        return s2bu(J2s(this.header)) + '.' + (this.isGzip() ? s2zbu(J2s(this.payload)) : s2bu(J2s(this.payload))) + '.' + this.signature
    }
}

/**
 * Try running function and replace it's response as Promise.resolve/reject
 *
 * @param {function} fn - fn to call in for response
 *
 * @returns {Promise<any>} resulting Promise
 */
export function tryPromise(fn) {
    try {
        return Promise.resolve(fn());
    } catch (e) {
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
export function s2J(str: string): any {
    try {
        return JSON.parse(str);
    } catch (e) {
        throw e;
    }
}

/**
 * Converts JSON object to string
 *
 * @param {object} obj - JSON object to convert
 *
 * @returns {string} resulting string
 */
export function J2s(obj: any): string {
    try {
        return JSON.stringify(obj);
    } catch (e) {
        throw e;
    }
}

/**
 * Converts string to base64 string
 *
 * @param {string} str - data string to convert
 *
 * @returns {string} decoded data string
 */
export function b2s(str: string): string {
    try {
        if (typeof Buffer !== 'undefined') {
            return decode(Buffer.from(str, 'base64'));
        } else if (typeof atob !== 'undefined') {
            return decode(atob(str));
        } else throw new Error(ILLEGAL_ARGUMENT);
    } catch (e) {
        throw e;
    }
}

/**
 * Converts base64 string to base64url string
 *
 * @param {string} str - data string to convert
 *
 * @returns {string} base64url string
 */
export function b2bu(str: string): string {
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
export function bu2b(str: string): string {
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
export function bu2s(str: string): string {
    return b2s(bu2b(str));
}

/**
 * Check if header has zip property (and it is equal to 'GZIP', ignorecase)
 *
 * @param {string} header - object to check
 *
 * @returns {boolean} does it have gzip in zip property
 */
export function isGzip(header: JwtPart): boolean {
    return typeof header === 'object' && typeof header.zip === 'string' && header.zip.toUpperCase() === 'GZIP'
}

/**
 * Decode jwtToken header and payload
 *
 * @param {string} str - data string to decode
 *
 * @returns {JwtDecode} object with decoded header and body, and signature untouched
 */
export function jwtDecode(str: string, callee = 'jwtDecode'): JwtDecode {
    return new JwtDecode(str, callee);
}

/**
 * Split jwtToken into object {header, payload, signature}
 *
 * @param {string} str - data string to split
 *
 * @returns {JwtSplit} jwt split object of three strings
 */
export function jwtSplit(str: string, callee = 'jwtSplit'): JwtSplit {
    return new JwtSplit(str, callee);
}

export const splitJwt = jwtSplit;

/**
 * Converts base64 string to string
 *
 * @param {string} str - data string to convert
 *
 * @returns {string} base64 string
 */
export function s2b(str: string): string {
    try {
        if (typeof Buffer !== 'undefined') {
            return Buffer.from(encode(str)).toString('base64');
        } else if (typeof btoa !== 'undefined') {
            return btoa(AB2s(encode(str)));
        } else throw new Error(ILLEGAL_ARGUMENT);
    } catch (e) {
        throw e;
    }
}

/**
 * Converts string to base64url string
 *
 * @param {string} str - data string to convert
 *
 * @returns {string} base64url string
 */
export function s2bu(str: string): string {
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
export function s2zbu(str: string, type = 'zlib'): string {
    return s2bu(zip(str, type));
}

/**
 * Converts from zip data string to string
 *
 * @param {string} str - data string to convert
 *
 * @returns {string} decoded data string
 */
export function unzip(str: string): string {
    if (typeof str !== 'string') {
        throw new Error(ILLEGAL_ARGUMENT);
    }

    if (!!pako && (pako.inflate || pako.ungzip)) {
        const buffer = s2U8A(str);
        let inflated;
        try {
            inflated = pako.inflate(buffer, { raw: false });
        } catch { 
            try {
                inflated = pako.ungzip(buffer, { raw: false });
            } catch { 
                throw new Error(UNSUPPORTED_ZIP_TYPE);
            };
        };
        
        return AB2s(inflated);
    } else {
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
export function zbu2s(str: string): string {
    return decode(unzip(bu2s(str)));
}

/**
 * Converts string to zip data string
 *
 * @param {string} str - data string to convert
 * @param {string} type - type of zip type: "zlib", "gzip". default: "zlib"
 *
 * @returns {string} zip data string
 */
export function zip(str: string, type = 'zlib'): string {
    if (typeof str !== 'string') {
        throw new Error(ILLEGAL_ARGUMENT);
    }

    if (!!pako && (pako.deflate || pako.gzip)) {
        let deflated;
        if (type === 'gzip') {
            deflated = pako.gzip(str, {
                raw: false
            })
        } else if (type === 'zlib') {
            deflated = pako.deflate(str, {
                raw: false
            })
        } else throw new Error(UNSUPPORTED_ZIP_TYPE);
        return AB2s(deflated);
    } else {
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
export function s2AB(str: string): ArrayBuffer {
    const buff = new ArrayBuffer(str.length);
    const view = new Uint8Array(buff);
    for (let i = 0; i < str.length; i++) view[i] = str.charCodeAt(i);
    return buff;
}

/**
 * Converts string to Uint8Array
 *
 * @param {string} str - data string to convert
 *
 * @returns {Uint8Array} charCode Uint8Array
 */
export function s2U8A(str: string): ArrayBuffer {
    const buff = new ArrayBuffer(str.length);
    const view = new Uint8Array(buff);
    for (let i = 0; i < str.length; i++) view[i] = str.charCodeAt(i);
    return view;
}

/**
 * Converts ArrayBuffer to string
 *
 * @param {ArrayBuffer | Uint8Array} buff - charCode ArrayBuffer to convert
 *
 * @returns {string} data string
 */
export function AB2s(buff: ArrayBuffer | Uint8Array): string {
    if (!(buff instanceof Uint8Array)) buff = new Uint8Array(buff);
    return String.fromCharCode.apply(String, Array.from(buff as any));
}

/**
 * Async function inspired by createHmac in crypto (used WebCrypto Api supported by most browsers)
 *
 */

export async function createHmac(name: string, secret: string): Promise<any> {
    if (webCryptoSubtle) {
        const keyData = s2U8A(secret);
        return await webCryptoSubtle.importKey(
            'raw',
            keyData,
            { name: 'HMAC', hash: { name: name } },
            true,
            ['sign']
        ).then(key => {
            return {
                update: async function (thing): Promise<ArrayBuffer> {
                    return await webCryptoSubtle.sign(
                        'HMAC',
                        key,
                        s2U8A(thing)
                    )
                }
            }
        })
    } else {
        const crypto = await import("crypto");
        return !!crypto && crypto.createHmac ? Promise.resolve(crypto.createHmac(name.replace('SHA-', 'sha'), secret)) : Promise.reject(webCrypto);
    }
}

/**
 * Algorithm HMAC sign generator
 *
 */
export function algHSsign(bits: number) {
    /**
     * Algorithm HMAC signer
     *
     */
    return async function sign(thing: string, secret: string): Promise<string> {
        const hmac = await createHmac('SHA-' + bits, secret);
        if (webCryptoSubtle) {
            if (!hmac) return Promise.reject(ILLEGAL_ARGUMENT);
            return Promise.resolve(s2bu(AB2s(await hmac.update(thing))));
        }
        return Promise.resolve(b2bu(hmac.update(thing).digest('base64')));
    }
}

/**
 * Algorithm HMAC verify generator
 *
 */
export function algHSverify(bits: number) {
    /**
     * Algorithm HMAC verifier
     *
     */
    return async function verify(thing: string, signature: string, secret: string): Promise<boolean> {
        return await algHSsign(bits)(thing, secret) === signature;
    }
}

export interface PEM {
    body: ArrayBuffer | Uint8Array,
    type: 'private' | 'public'
}

export function s2pem(secret: string): PEM {
    if (typeof secret !== 'string') {
        throw new Error(ILLEGAL_ARGUMENT);
    }
    let type = 'public';

    function ignore(line: string): boolean {
        if (ignoreLinesPriv.some(ign => line.toUpperCase().indexOf(ign) > -1)) {
            type = 'private';
            return false;
        }
        return !ignoreLinesPub.some(ign => line.toUpperCase().indexOf(ign) > -1);
    }

    const lines = secret.split('\n'),
        ignoreLinesPriv = [
            '-BEGIN RSA PRIVATE KEY-',
            '-END RSA PRIVATE KEY-'],
        ignoreLinesPub = [
            '-BEGIN RSA PUBLIC KEY-',
            '-BEGIN PUBLIC KEY-',
            '-END PUBLIC KEY-',
            '-END RSA PUBLIC KEY-'
        ], body = lines.map(line => line.trim()).filter(line =>
            line.length && ignore(line)).join('');
    if (body.length) {
        return { body: s2U8A(b2s(bu2b(body))), type: <'private' | 'public'>type };
    } else {
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
export class Asn1Tag {
    tagClass: number = 0;
    tagConstructed: boolean = false;
    tagNumber: number = 0;

    constructor(stream) {
        const buf = stream.read();
        this.tagClass = buf >> 6;
        this.tagConstructed = ((buf & 0x20) !== 0);
        this.tagNumber = buf & 0x1F;
    }
}

export function pem2asn1(buff: ArrayBuffer | Uint8Array): any {
    if (!buff) throw new Error(ILLEGAL_ARGUMENT);

    if (buff instanceof ArrayBuffer) buff = new Uint8Array(buff);
    let asn1 = ASN1.decode(buff), res = {};

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

    res['bits'] = (res['modulus'].length - 1) * 8 + Math.ceil(
        Math.log(res['modulus'][0] + 1) / Math.log(2)
    );

    if (!res['bits']) {
        throw new Error(ILLEGAL_ARGUMENT);
    }

    return res;
}

export function asn12jwk(asn1: any, type?: string, extra?: any): any {
    const pemTypes = ['public', 'private'];
    if (!asn1) throw new Error(ILLEGAL_ARGUMENT);

    type = ((typeof type === 'string') && type.toLowerCase())
        || pemTypes[!!asn1.privateExponent ? 1 : 0];

    if (type === 'private' && !asn1.privateExponent) {
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

export function pem2jwk(secret: string, type?: "public" | "private", extra?): Promise<any> {
    return tryPromise(() => {
        const pem = s2pem(secret);
        return asn12jwk(pem2asn1(pem.body), type, extra)
    })
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

export async function createSign(name: string): Promise<any> {
    if (webCryptoSubtle) {
        return {
            update: function (thing: string): any {
                return {
                    sign: async function (secret: string, encoding: string): Promise<any> {
                        return await pem2jwk(secret, 'private', {
                            key_ops: ['sign'],
                            alg: name.replace('SHA-', 'RS')
                        }).then(async keyData => {
                            return await webCryptoSubtle.importKey(
                                'jwk',
                                keyData,
                                { name: 'RSASSA-PKCS1-v1_5', hash: { name: name } },
                                true,
                                ['sign']
                            ).then(async key => {
                                return await webCryptoSubtle.sign(
                                    { name: 'RSASSA-PKCS1-v1_5', hash: { name: name } },
                                    key,
                                    s2U8A(thing)
                                ).then(AB2s).then(s2b)
                            })
                        });

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
                    }
                }
            }
        }
    } else {
        const crypto = await import("crypto");
        if (!!crypto && crypto.createSign) {
            return crypto.createSign(name.replace('SHA-', 'RSA-SHA'))
        } else {
            throw new Error(CRYPTO_NOT_FOUND);
        }
    }
}

export function algRSsign(bits: number) {
    return async function sign(thing: string, privateKey: string): Promise<string> {
        try {
            const res = await createSign('SHA-' + bits);
            return b2bu(await res.update(thing).sign(privateKey, 'base64'));
        } catch (e) {
            return Promise.reject(e);
        }
    }
}

export async function createVerify(name: string): Promise<any> {
    if (webCryptoSubtle) {
        return {
            update: function (thing: string): any {
                return {
                    verify: async function (secret: string, signature: string, encoding: string): Promise<boolean> {
                        return await pem2jwk(secret, 'public', {
                            key_ops: ['verify'],
                            alg: name.replace('SHA-', 'RS')
                        }).then(async ({ kty, n, e }) => {
                            return await webCryptoSubtle.importKey(
                                'jwk',
                                { kty, n, e },
                                { name: 'RSASSA-PKCS1-v1_5', hash: { name: name } },
                                false,
                                ['verify']
                            ).then(async key => {
                                return await webCryptoSubtle.verify(
                                    'RSASSA-PKCS1-v1_5',
                                    key,
                                    s2U8A(bu2s(signature)),
                                    s2U8A(thing)
                                )
                            })
                        });
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

                    }
                }
            }
        }
    } else {
        const crypto = await import("crypto");
        if (!!crypto && crypto.createVerify) {
            return crypto.createVerify(name.replace('SHA-', 'RSA-SHA'))
        } else {
            throw new Error(CRYPTO_NOT_FOUND);
        }
    }
}

export function algRSverify(bits: number) {
    return async function verify(thing: string, signature: string, publicKey: string): Promise<boolean> {
        try {
            signature = bu2b(signature);
            const rsaVerify = await createVerify('SHA-' + bits);
            return await rsaVerify.update(thing).verify(publicKey, signature, 'base64');
        } catch (e) {
            return Promise.reject(e);
        }
    }
}

/**
 * Universal algorithm verifier
 *
 */
export async function algVerify(algorithm: string, thing: string, signature: string, secret: string): Promise<boolean> {
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
        case 'rs':
            return await algRSverify(bits)(thing, signature, secret);
        case 'hs':
            return await algHSverify(bits)(thing, signature, secret);
        default:
            throw new Error(UNSUPPORTED_ALGORITHM);
    }
}

/**
 * Universal algorithm signer
 *
 */
export async function algSign(algorithm: string, thing: string, secret: string): Promise<string> {
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
        case 'rs':
            return await algRSsign(bits)(thing, secret);
        case 'hs':
            return await algHSsign(bits)(thing, secret);
        default:
            throw new Error(UNSUPPORTED_ALGORITHM);
    }
}

export async function jwtVerify(jwtStr: string, secret: string): Promise<boolean> {
    const jwt = jwtSplit(jwtStr, 'jwtVerify'),
        header = s2J(bu2s(jwt.header)),
        thing = jwt.header + '.' + jwt.payload;
    return tryPromise(() => algVerify(header.alg, thing, jwt.signature, secret));
}

export const verifyJwt = jwtVerify;

export function jwtSign(jwtStr: string, secret: string): Promise<string> {
    const jwt = jwtSplit(jwtStr, 'jwtSign'),
        header = s2J(bu2s(jwt.header)),
        thing = jwt.header + '.' + jwt.payload;
    return tryPromise(async () => await algSign(header.alg, thing, secret));
}

export const signJwt = jwtSign;

export async function jwtResign(jwtStr: string, secret: string, alg?: string): Promise<string> {
    const jwt = jwtDecode(jwtStr, 'jwtResign');
    if (!!alg) jwt.header.alg = alg;
    jwt.signature = await jwtSign(jwt.toString(), secret);
    return jwt.toString();
}

export const resignJwt = jwtResign;

/**
 * Used for testing only
 *
 * @hidden
 */
export async function cryptoType(): Promise<string> {
    const crypto = webCrypto || await import("crypto");
    return crypto ? crypto['type'] || 'crypto-node' : 'undefined';
}

export function notLatin1String(str): boolean {
    return Array.prototype.some.apply(str, [str => str.charCodeAt(0) > 255]);
}

export function encode(input: string) {
    if (notLatin1String(input)) {
        const encoder = getTextEncoder();
        if (!!encoder) {
            return encoder.encode(input);
        }
    }
    return s2U8A(input);
}

export function decode(input: string | Buffer) {
    if(typeof input === 'string') {
        try{
            const decoder = getTextDecoder("utf8", { fatal: true });
            if (!!decoder) {
                return decoder.decode(s2U8A(input));
            }
        }catch{}
        return input;
    }
    try{
        const decoder = getTextDecoder("utf8", { fatal: true });
        if (!!decoder) {
            return decoder.decode(input);
        }
    }catch{}
    return input.toString('binary');
}

export function getTextEncoder(): TextEncoder | false {
    if (typeof TextEncoder !== 'undefined') {
        return new TextEncoder();
    }
    if (typeof require !== 'undefined') {
        const encoder = require("util");
        if (typeof encoder?.TextEncoder !== 'undefined') {
            return new encoder.TextEncoder();
        }
    }
    return false;
}

export function getTextDecoder(...args): TextDecoder | false {
    if (typeof TextDecoder !== 'undefined') {
        return new TextDecoder(...args);
    }
    if (typeof require !== 'undefined') {
        const decoder = require("util");
        if (typeof decoder?.TextDecoder !== 'undefined') {
            return new decoder.TextDecoder(...args);
        }
    }
    return false;
}

export default {
    ILLEGAL_ARGUMENT,
    UNSUPPORTED_ALGORITHM,
    resignJwt,
    signJwt,
    splitJwt,
    verifyJwt,
    AB2hex,
    AB2s,
    J2s,
    algHSsign,
    algHSverify,
    algRSsign,
    algRSverify,
    algSign,
    algVerify,
    asn12jwk,
    b2bu,
    b2s,
    bu2b,
    bu2s,
    cleanZeros,
    createHmac,
    createSign,
    createVerify,
    hex2AB,
    isGzip,
    jwtDecode,
    jwtResign,
    jwtSign,
    jwtSplit,
    jwtVerify,
    num2hex,
    pem2asn1,
    pem2jwk,
    s2AB,
    s2J,
    s2U8A,
    s2b,
    s2bu,
    s2pem,
    s2zbu,
    tryPromise,
    unzip,
    zbu2s,
    zip,
    notLatin1String,
    encode,
    decode,
    getTextEncoder,
    getTextDecoder
};
