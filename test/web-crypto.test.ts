const cr = require('crypto');
jest.doMock('crypto', function () {
    return {...cr, type: 'web-crypto'};
});
Object.defineProperty(window, 'crypto', { value: { subtle: require('subtle') }, writable: true });

describe("jwtSign tests (WebCrypto API version)", function () {
    const jwtJsDecode = require('../src/jwt-js-decode');

    it("it works when cryptoType equals 'web-crypto'", async function () {
        expect(jwtJsDecode.cryptoType()).toEqual('web-crypto');
    });

    it("it works when jwtSign equals original signature", async function () {
        await jwtJsDecode.jwtSign(jwtStrNormal, jwtSecret).then(res => expect(res).toEqual(jwtJsDecode.jwtSplit(jwtStrNormal).signature));
    });

    it("it works when resignJwt with same key equals initial jwt string", async function () {
        await jwtJsDecode.resignJwt(jwtStrNormal, jwtSecret).then(res => expect(res).toEqual(jwtStrNormal));
    });

    it("it works when resignJwt with wrong key is not equal to initial jwt string", async function () {
        await jwtJsDecode.resignJwt(jwtStrNormal, "wrong" + jwtSecret).then(res => expect(res).not.toEqual(jwtStrNormal));
    });
});

describe("jwtVerify tests (WebCrypto API version)", function () {
    const jwtJsDecode = require('../src/jwt-js-decode');

    it("it works when cryptoType equals 'web-crypto'", async function () {
        expect(jwtJsDecode.cryptoType()).toEqual('web-crypto');
    });

    it("it works when provided with a proper jwt String and jwt Secret key", async function () {
        await jwtJsDecode.jwtVerify(jwtStrNormal, jwtSecret).then(res => expect(res).toEqual(true))
    });

    it("it fails when provided with a proper jwt String and wrong jwt Secret key", async function () {
        await jwtJsDecode.jwtVerify(jwtStrNormal, "wrong" + jwtSecret).then(res => expect(res).toEqual(false));
    });
});
