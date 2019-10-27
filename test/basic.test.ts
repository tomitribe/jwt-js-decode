beforeAll(() => {
    jest.mock('crypto', function () {
        return { ...jest.requireActual('crypto') };
    });
});

afterAll(() => {
    jest.unmock('crypto');
});

import { cryptoType, isGzip, jwtDecode, jwtSign, jwtSplit, jwtVerify, resignJwt } from "../src";
import { generateErrorMessage, ILLEGAL_ARGUMENT } from "../src/util";
import {
    jwtPrivKey_RS,
    jwtPubKey_RS,
    jwtSecondPrivKey_RS,
    jwtSecondPubKey_RS,
    jwtSecret_HS,
    jwtStrGzip_HS256,
    jwtStrGzip_HS512,
    jwtStrGzip_RS256,
    jwtStrGzip_RS512,
    jwtStrNormal_HS256,
    jwtStrNormal_HS512,
    jwtStrNormal_RS256,
    jwtStrNormal_RS512
} from "./test.keys";

/**
 * jwtSplit tests
 */
describe("jwtSplit tests", function () {
    it("it works when provided with String", async function () {
        expect(jwtSplit('1.2.3')).toEqual(expect.objectContaining({
            header: '1',
            payload: '2',
            signature: '3',
        }));
    });

    it("error is thrown when provided with string without two dots", async function () {
        const str = '1.23';
        expect(function () {
            jwtSplit(str)
        }).toThrowError(generateErrorMessage(str, 'jwtSplit', 'JWT string'))
    });

    it("error is thrown when provided with Array", async function () {
        const str = <any>[];
        expect(function () {
            jwtSplit(<any>[])
        }).toThrowError(generateErrorMessage(str, 'jwtSplit', 'JWT string'))
    });
});

/**
 * jwtDecode tests
 *
 */
describe("jwtDecode tests", function () {
    it("it works when provided with a proper jwt String (normal)", async function () {
        const jwtObj = jwtDecode(jwtStrNormal_HS256);
        expect(jwtObj).toEqual(expect.objectContaining({
            header: expect.any(Object),
            payload: expect.any(Object),
            signature: expect.any(String),
        }));
    });

    it("it works when provided with a proper jwt String (gzip)", async function () {
        const jwtObj = await jwtDecode(jwtStrGzip_HS256);
        expect(jwtObj).toEqual(expect.objectContaining({
            header: expect.any(Object),
            payload: expect.any(Object),
            signature: expect.any(String),
        }));
    });

    it("error is thrown when provided with string without two dots", async function () {
        const str = '1.23';
        expect(function () {
            jwtDecode(str)
        }).toThrowError(generateErrorMessage(str, 'jwtDecode', 'JWT string'))
    });

    it("error is thrown when provided with Array", async function () {
        const str = <any>[];
        expect(function () {
            jwtDecode(<any>[])
        }).toThrowError(generateErrorMessage(str, 'jwtDecode', 'JWT string'))
    });

});

/**
 * isGzip tests
 *
 */
describe("isGzip tests", function () {
    it("isGzip returns true when header has property `zip` with value \"GZIP\" ", async function () {
        expect(isGzip(jwtDecode(jwtStrGzip_HS256).header)).toEqual(true);
    });

    it("isGzip returns true when header has property `zip` with case insensitive value \"GZip\"", async function () {
        expect(isGzip({ zip: "GZip" })).toEqual(true);
    });

    it("isGzip returns false when header has no property `zip`", async function () {
        expect(isGzip({})).toEqual(false);
    });

    it("isGzip returns false when header is not an object", async function () {
        expect(isGzip(<any>"")).toEqual(false);
    });
});

/**
 * Node.js general tests
 *
 */

describe("jwtSign tests (Node.js version) HS", function () {
    it("it works when cryptoType equals 'crypto-node'", async function () {
        expect(await cryptoType()).toEqual('crypto-node');
    });

    it("it works when jwtSign equals original signature (jwtStrNormal_HS256)", async function () {
        await jwtSign(jwtStrNormal_HS256, jwtSecret_HS).then(res => expect(res).toEqual(jwtSplit(jwtStrNormal_HS256).signature));
    });

    it("it works when jwtSign equals original signature (jwtStrGzip_HS256)", async function () {
        await jwtSign(jwtStrGzip_HS256, jwtSecret_HS).then(res => expect(res).toEqual(jwtSplit(jwtStrGzip_HS256).signature));
    });

    it("it works when resignJwt with same key equals initial jwt string (jwtStrNormal_HS256)", async function () {
        await resignJwt(jwtStrNormal_HS256, jwtSecret_HS).then(res => expect(res).toEqual(jwtStrNormal_HS256));
    });

    it("it works when resignJwt with same key equals initial jwt string (jwtStrGzip_HS256)", async function () {
        await resignJwt(jwtStrGzip_HS256, jwtSecret_HS).then(res => expect(res).toEqual(jwtStrGzip_HS256));
    });

    it("it works when resignJwt with wrong key is not equal to initial jwt string (jwtStrNormal_HS256)", async function () {
        await resignJwt(jwtStrNormal_HS256, "wrong" + jwtSecret_HS).then(res => expect(res).not.toEqual(jwtStrNormal_HS256));
    });

    it("it works when resignJwt with wrong key is not equal to initial jwt string (jwtStrGzip_HS256)", async function () {
        await resignJwt(jwtStrGzip_HS256, "wrong" + jwtSecret_HS).then(res => expect(res).not.toEqual(jwtStrGzip_HS256));
    });

    it("it works when resignJwt jwtStrNormal_HS256 string with alg `HS512` equal to jwtStrNormal_HS512", async function () {
        await resignJwt(jwtStrNormal_HS256, jwtSecret_HS, 'HS512').then(res => expect(res).toEqual(jwtStrNormal_HS512));
    });

    it("it works when resignJwt jwtStrGzip_HS256 string with alg `HS512` equal to jwtStrGzip_HS512", async function () {
        await resignJwt(jwtStrGzip_HS256, jwtSecret_HS, 'HS512').then(res => expect(res).toEqual(jwtStrGzip_HS512));
    });
});

describe("jwtVerify tests (Node.js version) HS", function () {
    it("it works when cryptoType equals 'crypto-node'", async function () {
        expect(await cryptoType()).toEqual('crypto-node');
    });

    it("it works when provided with a proper jwt String and jwt Secret key (jwtStrNormal_HS256)", async function () {
        await jwtVerify(jwtStrNormal_HS256, jwtSecret_HS).then(res => expect(res).toEqual(true))
    });

    it("it works when provided with a proper jwt String and jwt Secret key (jwtStrGzip_HS256)", async function () {
        await jwtVerify(jwtStrGzip_HS256, jwtSecret_HS).then(res => expect(res).toEqual(true));
    });

    it("it fails when provided with a proper jwt String and wrong jwt Secret key (jwtStrNormal_HS256)", async function () {
        await jwtVerify(jwtStrNormal_HS256, "wrong" + jwtSecret_HS).then(res => expect(res).toEqual(false));
    });

    it("it fails when provided with a proper jwt String and wrong jwt Secret key (jwtStrGzip_HS256)", async function () {
        await jwtVerify(jwtStrGzip_HS256, "wrong" + jwtSecret_HS).then(res => expect(res).toEqual(false));
    });
});

describe("jwtSign tests (Node.js version) RS", function () {
    it("it works when cryptoType equals 'crypto-node'", async function () {
        expect(await cryptoType()).toEqual('crypto-node');
    });

    it("it works when jwtStrNormal_HS256 equals jwtStrNormal_RS256 after resigning with RS256", async function () {
        const obj = jwtDecode(jwtStrNormal_HS256);
        obj.header.alg = 'RS256';
        await resignJwt(obj.toString(), jwtPrivKey_RS).then(res => expect(res).toEqual(jwtStrNormal_RS256));
    });

    it("it works when jwtStrNormal_HS256 equals jwtStrNormal_RS512 after resigning with RS512", async function () {
        const obj = jwtDecode(jwtStrNormal_HS256);
        obj.header.alg = 'RS512';
        await resignJwt(obj.toString(), jwtPrivKey_RS).then(res => expect(res).toEqual(jwtStrNormal_RS512));
    });


    it("it works when jwtStrNormal_RS256 equals jwtStrNormal_HS256 after resigning with HS256", async function () {
        const obj = jwtDecode(jwtStrNormal_RS256);
        obj.header.alg = 'HS256';
        await resignJwt(obj.toString(), jwtSecret_HS).then(res => expect(res).toEqual(jwtStrNormal_HS256));
    });


    it("it works when jwtStrNormal_RS512 equals jwtStrNormal_HS256 after resigning with HS256", async function () {
        const obj = jwtDecode(jwtStrNormal_RS512);
        obj.header.alg = 'HS256';
        await resignJwt(obj.toString(), jwtSecret_HS).then(res => expect(res).toEqual(jwtStrNormal_HS256));
    });


    it("it works when jwtStrNormal_HS256 equals jwtStrGzip_RS256 after resigning with {alg: 'RS256', zip: 'GZIP'}", async function () {
        const obj = jwtDecode(jwtStrNormal_HS256);
        obj.header.zip = "GZIP";
        obj.header.alg = 'RS256';
        await resignJwt(obj.toString(), jwtPrivKey_RS).then(res => expect(res).toEqual(jwtStrGzip_RS256));
    });


    it("it works when jwtStrGzip_HS256 equals jwtStrGzip_RS512 after resigning with {alg: 'RS512'}", async function () {
        const obj = jwtDecode(jwtStrGzip_HS256);
        obj.header.alg = 'RS512';
        await resignJwt(obj.toString(), jwtPrivKey_RS).then(res => expect(res).toEqual(jwtStrGzip_RS512));
    });


    it("it works when jwtStrGzip_RS256 equals jwtStrNormal_HS256 after resigning with {alg: 'HS256'} delete zip", async function () {
        const obj = jwtDecode(jwtStrGzip_RS256);
        obj.header.alg = 'HS256';
        delete obj.header.zip;
        await resignJwt(obj.toString(), jwtSecret_HS).then(res => expect(res).toEqual(jwtStrNormal_HS256));
    });


    it("it works when jwtStrGzip_RS512 equals jwtStrGzip_HS256 after resigning with {alg: 'HS256'}", async function () {
        const obj = jwtDecode(jwtStrGzip_RS512);
        obj.header.alg = 'HS256';
        await resignJwt(obj.toString(), jwtSecret_HS).then(res => expect(res).toEqual(jwtStrGzip_HS256));
    });


    it("it fails when provided with a proper jwt String and wrong private key jwtSecondPrivKey_RS (jwtStrNormal_RS512)", async function () {
        await resignJwt(jwtStrNormal_RS512, jwtSecondPrivKey_RS).then(res => expect(res).not.toEqual(jwtStrNormal_RS512));
    });


    it("it fails when provided with a proper jwt String and not a private key (jwtStrGzip_RS256)", async function () {
        await expect(jwtSign(jwtStrGzip_RS256, jwtPubKey_RS)).rejects.toThrowError();
    });

});


describe("jwtVerify tests (Node.js version) RS", function () {
    it("it works when cryptoType equals 'crypto-node'", async function () {
        expect(await cryptoType()).toEqual('crypto-node');
    });

    it("it works when provided with a proper jwt String and jwtPubKey_RS (jwtStrNormal_RS256)", async function () {
        await jwtVerify(jwtStrNormal_RS256, jwtPubKey_RS).then(res => expect(res).toEqual(true));
    });

    it("it works when provided with a proper jwt String and jwtPrivKey_RS (jwtStrGzip_RS512)", async function () {
        await jwtVerify(jwtStrGzip_RS512, jwtPubKey_RS).then(res => expect(res).toEqual(true));
    });

    it("it fails when provided with a proper jwt String and wrong public key jwtSecondPubKey_RS (jwtStrNormal_RS512)", async function () {
        await expect(jwtVerify(jwtStrNormal_RS512, jwtSecondPubKey_RS)).resolves.toBeFalsy();
    });

    it("it fails when provided with a proper jwt String and not public key jwtSecondPrivKey_RS (jwtStrGzip_RS256)", async function () {
        await expect(jwtVerify(jwtStrNormal_RS512, jwtSecondPrivKey_RS)).rejects.toThrowError();
    });
});
