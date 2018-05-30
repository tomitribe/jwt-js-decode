import pako from "pako";

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

export class JwtSplit {
    header: string;
    payload: string;
    signature: string;

    constructor(str: string) {
        if (typeof str !== "string") {
            throw new Error("Illegal parameter specified!");
        }

        const jwtArr = str.split('.');
        if (jwtArr.length !== 3) {
            throw new Error("Illegal jwt string!");
        }

        const [header, payload, signature] = jwtArr;
        this.header = header;
        this.payload = payload;
        this.signature = signature;
    }
}

export interface JwtPart {
    [key: string]: any
}

export class JwtDecode {
    header: JwtPart;
    payload: JwtPart;
    signature: string;

    constructor(str: string) {
        if (typeof str !== "string") {
            throw new Error("Illegal parameter specified!");
        }
        const jwtSplit: JwtSplit = JwtJsDecode.jwtSplit(str);

        this.header = JSON.parse(JwtJsDecode.bu2s(jwtSplit.header));
        this.payload = JwtJsDecode.isGzip(this.header) ? JSON.parse(JwtJsDecode.zbu2s(jwtSplit.payload)) : JSON.parse(JwtJsDecode.bu2s(jwtSplit.payload));
        this.signature = jwtSplit.signature;
    }
}

export class JwtJsDecode {
    /**
     * Converts base64url string to base64 string
     *
     * @param {string} str - data string to convert
     *
     * @returns {string} base64 string
     */
    static bu2b(str: string): string {
        if (typeof str !== "string") {
            throw new Error("Illegal parameter specified!");
        }
        if (str.length % 4 === 1) {
            throw new Error("Illegal base64url string!");
        }

        for (; (str.length % 4 !== 0);) {
            str += "=";
        }
        return str
            .replace(/\-/g, "+")
            .replace(/_/g, "/");
    }

    /**
     * Converts base64 string to base64url string
     *
     * @param {string} str - data string to convert
     *
     * @returns {string} base64url string
     */
    static b2bu(str: string): string {
        if (typeof str !== "string") {
            throw new Error("Illegal parameter specified!");
        }
        if (str.length % 4 !== 0) {
            throw new Error("Illegal base64 string!");
        }

        return str
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=/g, "");
    }

    /**
     * Converts base64url string to string
     *
     * @param {string} str - base64url string to convert
     *
     * @returns {string} decoded data string
     */
    static bu2s(str: string): string {
        return this.b2s(this.bu2b(str));
    }

    /**
     * Converts string to base64url string
     *
     * @param {string} str - data string to convert
     *
     * @returns {string} base64url string
     */
    static s2bu(str: string): string {
        return this.b2bu(this.s2b(str));
    }

    /**
     * Converts base64 string to string
     *
     * @param {string} str - data string to convert
     */
    static s2b(str: string): string {
        return btoa(str);
    }

    /**
     * Converts string to base64 string
     *
     * @param {string} str - data string to convert
     *
     * @returns {string} decoded data string
     */
    static b2s(str: string): string {
        return atob(str);
    }

    /**
     * Converts string to gzip data string
     *
     * @param {string} str - data string to convert
     *
     * @returns {string} gzip data string
     */
    static zip(str: string) {
        if (typeof str !== "string") {
            throw new Error("Illegal parameter specified!");
        }
        return pako.deflate(str, {
            raw: false,
            from: "string",
            to: "string"
        } as Pako.DeflateOptions & { to: "string" });
    }

    /**
     * Converts from gzip data string to string
     *
     * @param {string} str - data string to convert
     *
     * @returns {string} decoded data string
     */
    static unzip(str: string) {
        if (typeof str !== "string") {
            throw new Error("Illegal parameter specified!");
        }
        return pako.inflate(str, {
            raw: false,
            from: 'string',
            to: 'string'
        } as Pako.InflateOptions & { to: "string" });
    }

    /**
     * Gzip and encode data string to base64url string
     *
     * @param {string} str - data string to encode
     *
     * @returns {string} base64url string
     */
    static s2zbu(str: string) {
        return this.s2bu(this.zip(str));
    }

    /**
     * Decode from base64url and unzip data string
     *
     * @param {string} str - data string to decode
     *
     * @returns {string} decoded data string
     */
    static zbu2s(str: string) {
        return this.unzip(this.bu2s(str));
    }

    /**
     * Split jwtToken into object {header, payload, signature}
     *
     * @param {string} str - data string to split
     *
     * @returns {JwtSplit} jwt split object of three strings
     */
    static jwtSplit(str: string): JwtSplit {
        return new JwtSplit(str);
    }

    /**
     * Check if header has zip property (and it is equal to 'GZIP', ignorecase)
     *
     * @param {string} header - object to check
     *
     * @returns {boolean} does it have gzip in zip property
     */
    static isGzip(header: JwtPart): boolean {
        return typeof header === 'object' && typeof header.zip === 'string' && header.zip.toUpperCase() === 'GZIP'
    }

    /**
     * Decode jwtToken header and payload
     *
     * @param {string} str - data string to decode
     *
     * @returns {JwtDecode} object with decoded header and body, and signature untouched
     */
    static jwtDecode(str: string): JwtDecode {
        return new JwtDecode(str);
    }
}

export default JwtJsDecode;
