import pako from "pako";
import crypto from "crypto";
/*
browserify
import { createHmac, createSign, createVerify } from "crypto-browserify";

node.js
import { createHmac, createSign, createVerify } from "crypto";
*/
export const webCrypto = typeof window === "object" && (window.crypto || window['msCrypto']);
export const webCryptoSubtle = webCrypto && (webCrypto.subtle ||  webCrypto['webkitSubtle'] || webCrypto['Subtle']);

export const UNSUPPORTED_ALGORITHM = 'Unsupported algorithm name specified! Supported algorithms: "HS256", "HS384", "HS512", "RS256", "RS384", "RS512" and "none".';
export const ILLEGAL_ARGUMENT = 'Illegal argument specified!';


/**
 * Pako 1.0.6 has 'from' property which is not included in current version of typeDef @types/pako@1.0.0
 *
 * @hidden
 */
declare namespace Pako {
    export interface DeflateOptions {
        raw?: boolean;
        from?: string;
        to?: string;
    }

    export interface InflateOptions {
        raw?: boolean;
        from?: string;
        to?: string;
    }
}

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
    header: string;

    /**
     * Payload (second) part of JWT Token
     *
     * @name  payload
     * @type {string}
     */
    payload: string;

    /**
     * Signature (third) part of JWT Token
     *
     * @name  signature
     * @type {string}
     */
    signature: string;

    constructor(str: string) {
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

    constructor(str: string) {
        if (typeof str !== 'string') {
            throw new Error(ILLEGAL_ARGUMENT);
        }
        const jwtObj: JwtSplit = jwtSplit(str);
        if (jwtObj) {
            this.header = jwtObj.header ? s2J(bu2s(jwtObj.header)) : {};
            this.payload = jwtObj.payload ? (isGzip(this.header) ? s2J(zbu2s(jwtObj.payload)) : s2J(bu2s(jwtObj.payload))) : {};
            this.signature = jwtObj.signature || '';
        }
    }

    public toString(): string {
        return s2bu(JSON.stringify(this.header)) + '.' + (isGzip(this.header) ? s2zbu(JSON.stringify(this.payload)) : s2bu(JSON.stringify(this.payload))) + '.' + this.signature
    }
}
/**
 * Converts string to base64 string
 *
 * @param {string} str - data string to convert
 *
 * @returns {string} decoded data string
 */
export function s2J(str: string): any {
    try{
        return JSON.parse(str);
    } catch(e) {
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
export function b2s(str: string): string {
    try{
        if(typeof window === 'object' && typeof window.atob === 'function') {
            return window.atob(str);
        } else if(typeof Buffer !== 'undefined') {
            return Buffer.from(str, 'base64').toString('binary')
        } else throw new Error(ILLEGAL_ARGUMENT);
    } catch(e) {
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
export function jwtDecode(str: string): JwtDecode {
    return new JwtDecode(str);
}

/**
 * Split jwtToken into object {header, payload, signature}
 *
 * @param {string} str - data string to split
 *
 * @returns {JwtSplit} jwt split object of three strings
 */
export function jwtSplit(str: string): JwtSplit {
    return new JwtSplit(str);
}

/**
 * Converts base64 string to string
 *
 * @param {string} str - data string to convert
 *
 * @returns {string} base64 string
 */
export function s2b(str: string): string {
    try{
        if(typeof window === 'object' && typeof window.atob === 'function') {
            return window.btoa(str);
        } else if(typeof Buffer !== 'undefined') {
            return Buffer.from(str).toString('base64');
        } else throw new Error(ILLEGAL_ARGUMENT);
    } catch(e) {
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
export function s2bu(str: string): string {
    return b2bu(s2b(str));
}

/**
 * Gzip and encode data string to base64url string
 *
 * @param {string} str - data string to encode
 *
 * @returns {string} base64url string
 */
export function s2zbu(str: string): string {
    return s2bu(zip(str));
}

/**
 * Converts from gzip data string to string
 *
 * @param {string} str - data string to convert
 *
 * @returns {string} decoded data string
 */
export function unzip(str: string): string {
    if (typeof str !== 'string') {
        throw new Error(ILLEGAL_ARGUMENT);
    }

    return pako.inflate(str, {
        raw: false,
        from: 'string',
        to: 'string'
    } as Pako.InflateOptions & { to: 'string' });
}

/**
 * Decode from base64url and unzip data string
 *
 * @param {string} str - data string to decode
 *
 * @returns {string} decoded data string
 */
export function zbu2s(str: string): string {
    return unzip(bu2s(str));
}

/**
 * Converts string to gzip data string
 *
 * @param {string} str - data string to convert
 *
 * @returns {string} gzip data string
 */
export function zip(str: string): string {
    if (typeof str !== 'string') {
        throw new Error(ILLEGAL_ARGUMENT);
    }

    return pako.deflate(str, {
        raw: false,
        from: 'string',
        to: 'string'
    } as Pako.DeflateOptions & { to: 'string' });
}

/**
 * Converts string to ArrayBuffer
 *
 * @param {string} str - data string to convert
 *
 * @returns {ArrayBuffer | Uint8Array} charCode ArrayBuffer
 */
function s2AB(str: string): ArrayBuffer | Uint8Array {
    const buff = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) buff[i] = str.charCodeAt(i);
    return buff;
}

/**
 * Converts ArrayBuffer to string
 *
 * @param {ArrayBuffer | Uint8Array} buff - charCode ArrayBuffer to convert
 *
 * @returns {string} data string
 */
function AB2s(buff: ArrayBuffer | Uint8Array): string {
    if (buff instanceof ArrayBuffer) buff = new Uint8Array(buff);
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

export async function createHmac(name: string, secret: string): Promise<any> {
    if (webCryptoSubtle) {
        const keyData = s2AB(secret);
        return await webCryptoSubtle.importKey(
            'raw',
            keyData,
            { name: 'HMAC', hash: { name: name } },
            true,
            ['sign']
        ).then(key => {
            return {
                _key: key,
                update: async function (thing): Promise<ArrayBuffer> {
                    return await webCryptoSubtle.sign(
                        'HMAC',
                        key,
                        s2AB(thing)
                    )
                }
            }
        })
    } else {
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
        return Promise.resolve(webCryptoSubtle ? s2bu(AB2s(hmac && await hmac.update(thing))) : b2bu(hmac && hmac.update(thing).digest('base64')));
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

export function RS2AB(secret: string) : ArrayBuffer | Uint8Array  {
    if (typeof secret !== 'string') {
        throw new Error(ILLEGAL_ARGUMENT);
    }
    const lines = secret.split('\n'),
        ignoreLines = [
        '-BEGIN RSA PRIVATE KEY-',
        '-BEGIN RSA PUBLIC KEY-',
        '-BEGIN PUBLIC KEY-',
        '-END PUBLIC KEY-',
        '-END RSA PRIVATE KEY-',
        '-END RSA PUBLIC KEY-'
    ], result = lines.map(line => line.trim()).filter(line =>
        line.length &&
        !ignoreLines.some(ign => line.toUpperCase().indexOf(ign) > -1)
    ).join('');
    if(result.length) {
        return s2AB(result);
    } else {
        throw new Error(ILLEGAL_ARGUMENT);
    }
}
/*
export async function createSign(name: string, secret: string): Promise<any> {
    if (webCryptoSubtle) {
        const keyData = RS2AB(secret);
        return await webCryptoSubtle.importKey(
            'raw',
            keyData,
            { name: 'HMAC', hash: { name: name } },
            true,
            ['sign']
        ).then(key => {
            return {
                _key: key,
                update: async function (thing): Promise<ArrayBuffer> {
                    return await webCryptoSubtle.sign(
                        'HMAC',
                        key,
                        s2AB(thing)
                    )
                }
            }
        })
    } else {
        return !!crypto && crypto.createSign ? Promise.resolve(crypto.createSign(name)) : Promise.reject(webCrypto);
    }
}

export async function algRSsign(bits: number) {
    return function sign(thing: string, privateKey: string): string {
        const rsaSign = await createSign('RSA-SHA' + bits);
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
}
*/

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
        //case 'rs':
            //return await algRSverify(bits)(thing, signature, secret);
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
        //case 'rs':
            //return await algRSsign(bits)(thing, secret);
        case 'hs':
            return await algHSsign(bits)(thing, secret);
        default:
            throw new Error(UNSUPPORTED_ALGORITHM);
    }
}

export async function jwtVerify(jwtStr: string, secret: string): Promise<boolean> {
    const jwt = jwtSplit(jwtStr),
        header = s2J(bu2s(jwt.header)),
        thing = jwt.header + '.' + jwt.payload;
    return await algVerify(header.alg, thing, jwt.signature, secret);
}

export async function jwtSign(jwtStr: string, secret: string): Promise<string> {
    const jwt = jwtSplit(jwtStr),
        header = s2J(bu2s(jwt.header)),
        thing = jwt.header + '.' + jwt.payload;
    return await algSign(header.alg, thing, secret);
}

export async function resignJwt(jwtStr: string, secret: string, alg?: string): Promise<string> {
    const jwt = jwtDecode(jwtStr);
    if(!!alg) jwt.header.alg = alg;
    jwt.signature = await jwtSign(jwt.toString(), secret);
    return jwt.toString();
}

/**
 * Used for testing only
 *
 * @hidden
 */
export function cryptoType(): string {
    return crypto ? crypto['type'] || 'crypto-node' : 'undefined';
}

const jwsJsDecode = {
    JwtDecode,
    JwtSplit,
    b2bu,
    b2s,
    bu2b,
    bu2s,
    isGzip,
    jwtDecode,
    jwtSplit,
    s2b,
    s2bu,
    s2zbu,
    unzip,
    zbu2s,
    zip,
    algHSsign,
    algHSverify,
    //algRSsign,
    //algRSverify,
    algVerify,
    algSign,
    jwtVerify,
    jwtSign,
    resignJwt,
    cryptoType
};

export default jwsJsDecode;
