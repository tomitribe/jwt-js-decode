'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var pako = _interopDefault(require('pako'));

var JwtSplit = /** @class */ (function () {
    function JwtSplit(str) {
        if (typeof str !== "string") {
            throw new Error("Illegal parameter specified!");
        }
        var jwtArr = str.split('.');
        if (jwtArr.length !== 3) {
            throw new Error("Illegal jwt string!");
        }
        var header = jwtArr[0], payload = jwtArr[1], signature = jwtArr[2];
        this.header = header;
        this.payload = payload;
        this.signature = signature;
    }
    return JwtSplit;
}());
var JwtDecode = /** @class */ (function () {
    function JwtDecode(str) {
        if (typeof str !== "string") {
            throw new Error("Illegal parameter specified!");
        }
        var jwtSplit = JwtJsDecode.jwtSplit(str);
        this.header = JSON.parse(JwtJsDecode.bu2s(jwtSplit.header));
        this.payload = JwtJsDecode.isGzip(this.header) ? JSON.parse(JwtJsDecode.zbu2s(jwtSplit.payload)) : JSON.parse(JwtJsDecode.bu2s(jwtSplit.payload));
        this.signature = jwtSplit.signature;
    }
    return JwtDecode;
}());
var JwtJsDecode = /** @class */ (function () {
    function JwtJsDecode() {
    }
    /**
     * Converts base64url string to base64 string
     *
     * @param {string} str - data string to convert
     *
     * @returns {string} base64 string
     */
    JwtJsDecode.bu2b = function (str) {
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
    };
    /**
     * Converts base64 string to base64url string
     *
     * @param {string} str - data string to convert
     *
     * @returns {string} base64url string
     */
    JwtJsDecode.b2bu = function (str) {
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
    };
    /**
     * Converts base64url string to string
     *
     * @param {string} str - base64url string to convert
     *
     * @returns {string} decoded data string
     */
    JwtJsDecode.bu2s = function (str) {
        return this.b2s(this.bu2b(str));
    };
    /**
     * Converts string to base64url string
     *
     * @param {string} str - data string to convert
     *
     * @returns {string} base64url string
     */
    JwtJsDecode.s2bu = function (str) {
        return this.b2bu(this.s2b(str));
    };
    /**
     * Converts base64 string to string
     *
     * @param {string} str - data string to convert
     */
    JwtJsDecode.s2b = function (str) {
        return btoa(str);
    };
    /**
     * Converts string to base64 string
     *
     * @param {string} str - data string to convert
     *
     * @returns {string} decoded data string
     */
    JwtJsDecode.b2s = function (str) {
        return atob(str);
    };
    /**
     * Converts string to gzip data string
     *
     * @param {string} str - data string to convert
     *
     * @returns {string} gzip data string
     */
    JwtJsDecode.zip = function (str) {
        if (typeof str !== "string") {
            throw new Error("Illegal parameter specified!");
        }
        return pako.deflate(str, {
            raw: false,
            from: "string",
            to: "string"
        });
    };
    /**
     * Converts from gzip data string to string
     *
     * @param {string} str - data string to convert
     *
     * @returns {string} decoded data string
     */
    JwtJsDecode.unzip = function (str) {
        if (typeof str !== "string") {
            throw new Error("Illegal parameter specified!");
        }
        return pako.inflate(str, {
            raw: false,
            from: 'string',
            to: 'string'
        });
    };
    /**
     * Gzip and encode data string to base64url string
     *
     * @param {string} str - data string to encode
     *
     * @returns {string} base64url string
     */
    JwtJsDecode.s2zbu = function (str) {
        return this.s2bu(this.zip(str));
    };
    /**
     * Decode from base64url and unzip data string
     *
     * @param {string} str - data string to decode
     *
     * @returns {string} decoded data string
     */
    JwtJsDecode.zbu2s = function (str) {
        return this.unzip(this.bu2s(str));
    };
    /**
     * Split jwtToken into object {header, payload, signature}
     *
     * @param {string} str - data string to split
     *
     * @returns {JwtSplit} jwt split object of three strings
     */
    JwtJsDecode.jwtSplit = function (str) {
        return new JwtSplit(str);
    };
    /**
     * Check if header has zip property (and it is equal to 'GZIP', ignorecase)
     *
     * @param {string} header - object to check
     *
     * @returns {boolean} does it have gzip in zip property
     */
    JwtJsDecode.isGzip = function (header) {
        return typeof header === 'object' && typeof header.zip === 'string' && header.zip.toUpperCase() === 'GZIP';
    };
    /**
     * Decode jwtToken header and payload
     *
     * @param {string} str - data string to decode
     *
     * @returns {JwtDecode} object with decoded header and body, and signature untouched
     */
    JwtJsDecode.jwtDecode = function (str) {
        return new JwtDecode(str);
    };
    return JwtJsDecode;
}());

exports.JwtJsDecode = JwtJsDecode;
exports.JwtDecode = JwtDecode;
exports.JwtSplit = JwtSplit;
exports.default = JwtJsDecode;
//# sourceMappingURL=jwt-js-decode.cjs.js.map
