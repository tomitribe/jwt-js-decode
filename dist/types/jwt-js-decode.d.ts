export declare const webCrypto: boolean | Crypto;
export declare const webCryptoSubtle: boolean | SubtleCrypto;
export declare const UNSUPPORTED_ALGORITHM = "Unsupported algorithm name specified! Supported algorithms: \"HS256\", \"HS384\", \"HS512\", \"RS256\", \"RS384\", \"RS512\" and \"none\".";
export declare const ILLEGAL_ARGUMENT = "Illegal argument specified!";
/**
 * Class for creating a JwtSplit object with three parts of JWT Token as strings
 *
 * @class  JwtSplit
 */
export declare class JwtSplit {
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
    constructor(str: string);
    toString(): string;
}
/** JwtPart interface basically object type definition used as a placeholder */
interface JwtPart {
    [key: string]: any;
}
/**
 * Class for creating a JwtDecode object with three parts of JWT Token, header and payload decoded and parsed, signature in initial form
 *
 * @class  JwtDecode
 */
export declare class JwtDecode {
    /**
     * Header (first) part of JWT Token
     *
     * @name  header
     * @type {JwtPart}
     */
    header: JwtPart;
    /**
     * Payload (second) part of JWT Token
     *
     * @name  payload
     * @type {JwtPart}
     */
    payload: JwtPart;
    /**
     * Signature (third) part of JWT Token
     *
     * @name  signature
     * @type {string}
     */
    signature: string;
    constructor(str: string);
    toString(): string;
}
/**
 * Converts string to base64 string
 *
 * @param {string} str - data string to convert
 *
 * @returns {string} decoded data string
 */
export declare function s2J(str: string): any;
/**
 * Converts string to base64 string
 *
 * @param {string} str - data string to convert
 *
 * @returns {string} decoded data string
 */
export declare function b2s(str: string): string;
/**
 * Converts base64 string to base64url string
 *
 * @param {string} str - data string to convert
 *
 * @returns {string} base64url string
 */
export declare function b2bu(str: string): string;
/**
 *
 * Converts base64url string to base64 string
 *
 * @param {string} str - data string to convert
 *
 * @returns {string} base64 string
 */
export declare function bu2b(str: string): string;
/**
 * Converts base64url string to string
 *
 * @param {string} str - base64url string to convert
 *
 * @returns {string} decoded data string
 */
export declare function bu2s(str: string): string;
/**
 * Check if header has zip property (and it is equal to 'GZIP', ignorecase)
 *
 * @param {string} header - object to check
 *
 * @returns {boolean} does it have gzip in zip property
 */
export declare function isGzip(header: JwtPart): boolean;
/**
 * Decode jwtToken header and payload
 *
 * @param {string} str - data string to decode
 *
 * @returns {JwtDecode} object with decoded header and body, and signature untouched
 */
export declare function jwtDecode(str: string): JwtDecode;
/**
 * Split jwtToken into object {header, payload, signature}
 *
 * @param {string} str - data string to split
 *
 * @returns {JwtSplit} jwt split object of three strings
 */
export declare function jwtSplit(str: string): JwtSplit;
/**
 * Converts base64 string to string
 *
 * @param {string} str - data string to convert
 *
 * @returns {string} base64 string
 */
export declare function s2b(str: string): string;
/**
 * Converts string to base64url string
 *
 * @param {string} str - data string to convert
 *
 * @returns {string} base64url string
 */
export declare function s2bu(str: string): string;
/**
 * Gzip and encode data string to base64url string
 *
 * @param {string} str - data string to encode
 *
 * @returns {string} base64url string
 */
export declare function s2zbu(str: string): string;
/**
 * Converts from gzip data string to string
 *
 * @param {string} str - data string to convert
 *
 * @returns {string} decoded data string
 */
export declare function unzip(str: string): string;
/**
 * Decode from base64url and unzip data string
 *
 * @param {string} str - data string to decode
 *
 * @returns {string} decoded data string
 */
export declare function zbu2s(str: string): string;
/**
 * Converts string to gzip data string
 *
 * @param {string} str - data string to convert
 *
 * @returns {string} gzip data string
 */
export declare function zip(str: string): string;
/**
 * Async function inspired by createHmac in crypto (used WebCrypto Api supported by most browsers)
 *
 */
export declare function createHmac(name: string, secret: string): Promise<any>;
/**
 * Algorithm HMAC sign generator
 *
 */
export declare function algHSsign(bits: number): (thing: string, secret: string) => Promise<string>;
/**
 * Algorithm HMAC verify generator
 *
 */
export declare function algHSverify(bits: number): (thing: string, signature: string, secret: string) => Promise<boolean>;
/**
 * Universal algorithm verifier
 *
 */
export declare function algVerify(algorithm: string, thing: string, signature: string, secret: string): Promise<boolean>;
/**
 * Universal algorithm signer
 *
 */
export declare function algSign(algorithm: string, thing: string, secret: string): Promise<string>;
export declare function jwtVerify(jwtStr: string, secret: string): Promise<boolean>;
export declare function jwtSign(jwtStr: string, secret: string): Promise<string>;
export declare function resignJwt(jwtStr: string, secret: string): Promise<string>;
/**
 * Used for testing only
 *
 * @hidden
 */
export declare function cryptoType(): string;
declare const jwsJsDecode: {
    JwtDecode: typeof JwtDecode;
    JwtSplit: typeof JwtSplit;
    b2bu: typeof b2bu;
    b2s: typeof b2s;
    bu2b: typeof bu2b;
    bu2s: typeof bu2s;
    isGzip: typeof isGzip;
    jwtDecode: typeof jwtDecode;
    jwtSplit: typeof jwtSplit;
    s2b: typeof s2b;
    s2bu: typeof s2bu;
    s2zbu: typeof s2zbu;
    unzip: typeof unzip;
    zbu2s: typeof zbu2s;
    zip: typeof zip;
    algHSsign: typeof algHSsign;
    algHSverify: typeof algHSverify;
    algVerify: typeof algVerify;
    algSign: typeof algSign;
    jwtVerify: typeof jwtVerify;
    jwtSign: typeof jwtSign;
    resignJwt: typeof resignJwt;
    cryptoType: typeof cryptoType;
};
export default jwsJsDecode;
