beforeAll(() => {
    jest.mock('crypto', function () {
        return {...jest.requireActual('crypto'), type: 'web-crypto'};
    });
    Object.defineProperty(window, 'crypto', { value: { subtle: require('subtle') }, writable: true });
    Window['crypto'] = { subtle: require('subtle') };
});

afterAll(() => {
    jest.unmock('crypto');
    delete Window['crypto'];
});

import { cryptoType, jwtDecode, jwtSign, jwtSplit, jwtVerify, resignJwt } from "../src";
import {
    jwtSecret_HS,
    jwtStrGzip_HS256,
    jwtStrGzip_HS512,
    jwtStrGzip_RS512,
    jwtStrNormal_HS256,
    jwtStrNormal_HS512,
    jwtStrNormal_RS512
} from "./test.keys";


/**
 * WebCrypto API general tests
 *
 */

describe("jwtSign tests (WebCrypto API version) HS", function () {
    it("it works when cryptoType equals 'web-crypto'", async function () {
        expect(await cryptoType()).toEqual('web-crypto');
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

describe("jwtVerify tests (WebCrypto API version) HS", function () {
    it("it works when cryptoType equals 'web-crypto'", async function () {
        expect(await cryptoType()).toEqual('web-crypto');
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

/**
 * TODO: add headless browser for this test as it's "NOT IMPLEMENTED" in `subtle` package
 *
 **/
describe("jwtSign tests (WebCrypto API version) RS", function () {
    it("it works when cryptoType equals 'web-crypto'", async function () {
        expect(await cryptoType()).toEqual('web-crypto');
    });

    /*
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

    */
    it("it works when jwtStrNormal_RS512 equals jwtStrNormal_HS256 after resigning with HS256", async function () {
        const obj = jwtDecode(jwtStrNormal_RS512);
        obj.header.alg = 'HS256';
        await resignJwt(obj.toString(), jwtSecret_HS).then(res => expect(res).toEqual(jwtStrNormal_HS256));
    });

    /*
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
    */

    it("it works when jwtStrGzip_RS512 equals jwtStrGzip_HS256 after resigning with {alg: 'HS256'}", async function () {
        const obj = jwtDecode(jwtStrGzip_RS512);
        obj.header.alg = 'HS256';
        await resignJwt(obj.toString(), jwtSecret_HS).then(res => expect(res).toEqual(jwtStrGzip_HS256));
    });

    /*
        it("it fails when provided with a proper jwt String and wrong private key jwtSecondPrivKey_RS (jwtStrNormal_RS512)", async function () {
            await resignJwt(jwtStrNormal_RS512, jwtSecondPrivKey_RS).then(res => expect(res).not.toEqual(jwtStrNormal_RS512));
        });


        it("it fails when provided with a proper jwt String and not a private key (jwtStrGzip_RS256)", async function () {
            await jwtSign(jwtStrGzip_RS256, jwtPubKey_RS)
                .catch(res => expect(res).toEqual(expect.any(Error)));
        });
    */
});
/*
describe("jwtVerify tests (WebCrypto API version) RS", function () {
    it("it works when cryptoType equals 'web-crypto'", async function () {
        expect(cryptoType()).toEqual('web-crypto');
    });

    it("it works when provided with a proper jwt String and jwtPubKey_RS (jwtStrNormal_RS256)", async function () {
        await jwtVerify(jwtStrNormal_RS256, jwtPubKey_RS).then(res => expect(res).toEqual(true));
    });

    it("it works when provided with a proper jwt String and jwtPrivKey_RS (jwtStrGzip_RS512)", async function () {
        await jwtVerify(jwtStrGzip_RS512, jwtPubKey_RS).then(res => expect(res).toEqual(true));
    });

    it("it fails when provided with a proper jwt String and wrong public key jwtSecondPubKey_RS (jwtStrNormal_RS512)", async function () {
        await jwtVerify(jwtStrNormal_RS512, jwtSecondPubKey_RS)
            .catch(e => expect(e).toEqual(expect.any(Error)));
    });

    it("it fails when provided with a proper jwt String and not public key jwtSecondPrivKey_RS (jwtStrGzip_RS256)", async function () {
        await jwtVerify(jwtStrNormal_RS512, jwtSecondPrivKey_RS)
            .catch(e => expect(e).toEqual(expect.any(Error)));
    });
});
/**/
