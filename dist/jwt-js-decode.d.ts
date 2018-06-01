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
}
/** JwtPart interface basically object type definition used as a placeholder */
export interface JwtPart {
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
}
export declare class JwtJsDecode {
    /**
     * Converts base64url string to base64 string
     *
     * @param {string} str - data string to convert
     *
     * @returns {string} base64 string
     */
    static bu2b(str: string): string;
    /**
     * Converts base64 string to base64url string
     *
     * @param {string} str - data string to convert
     *
     * @returns {string} base64url string
     */
    static b2bu(str: string): string;
    /**
     * Converts base64url string to string
     *
     * @param {string} str - base64url string to convert
     *
     * @returns {string} decoded data string
     */
    static bu2s(str: string): string;
    /**
     * Converts string to base64url string
     *
     * @param {string} str - data string to convert
     *
     * @returns {string} base64url string
     */
    static s2bu(str: string): string;
    /**
     * Converts base64 string to string
     *
     * @param {string} str - data string to convert
     *
     * @returns {string} base64 string
     */
    static s2b(str: string): string;
    /**
     * Converts string to base64 string
     *
     * @param {string} str - data string to convert
     *
     * @returns {string} decoded data string
     */
    static b2s(str: string): string;
    /**
     * Converts string to gzip data string
     *
     * @param {string} str - data string to convert
     *
     * @returns {string} gzip data string
     */
    static zip(str: string): string;
    /**
     * Converts from gzip data string to string
     *
     * @param {string} str - data string to convert
     *
     * @returns {string} decoded data string
     */
    static unzip(str: string): string;
    /**
     * Gzip and encode data string to base64url string
     *
     * @param {string} str - data string to encode
     *
     * @returns {string} base64url string
     */
    static s2zbu(str: string): string;
    /**
     * Decode from base64url and unzip data string
     *
     * @param {string} str - data string to decode
     *
     * @returns {string} decoded data string
     */
    static zbu2s(str: string): string;
    /**
     * Split jwtToken into object {header, payload, signature}
     *
     * @param {string} str - data string to split
     *
     * @returns {JwtSplit} jwt split object of three strings
     */
    static jwtSplit(str: string): JwtSplit;
    /**
     * Check if header has zip property (and it is equal to 'GZIP', ignorecase)
     *
     * @param {string} header - object to check
     *
     * @returns {boolean} does it have gzip in zip property
     */
    static isGzip(header: JwtPart): boolean;
    /**
     * Decode jwtToken header and payload
     *
     * @param {string} str - data string to decode
     *
     * @returns {JwtDecode} object with decoded header and body, and signature untouched
     */
    static jwtDecode(str: string): JwtDecode;
}
export default JwtJsDecode;
