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

    it("it works when jwtSign equals original signature (jwtStrNormal_HS256)", async function(){
        await jwtJsDecode.jwtSign(jwtStrNormal_HS256, jwtSecret_HS).then(res => expect(res).toEqual(jwtJsDecode.jwtSplit(jwtStrNormal_HS256).signature));
    });

    it("it works when jwtSign equals original signature (jwtStrGzip_HS256)", async function(){
        await jwtJsDecode.jwtSign(jwtStrGzip_HS256, jwtSecret_HS).then(res => expect(res).toEqual(jwtJsDecode.jwtSplit(jwtStrGzip_HS256).signature));
    });

    it("it works when resignJwt with same key equals initial jwt string (jwtStrNormal_HS256)", async function(){
        await jwtJsDecode.resignJwt(jwtStrNormal_HS256, jwtSecret_HS).then(res => expect(res).toEqual(jwtStrNormal_HS256));
    });

    it("it works when resignJwt with same key equals initial jwt string (jwtStrGzip_HS256)", async function(){
        await jwtJsDecode.resignJwt(jwtStrGzip_HS256, jwtSecret_HS).then(res => expect(res).toEqual(jwtStrGzip_HS256));
    });

    it("it works when resignJwt with wrong key is not equal to initial jwt string (jwtStrNormal_HS256)", async function(){
        await jwtJsDecode.resignJwt(jwtStrNormal_HS256, "wrong" + jwtSecret_HS).then(res => expect(res).not.toEqual(jwtStrNormal_HS256));
    });

    it("it works when resignJwt with wrong key is not equal to initial jwt string (jwtStrGzip_HS256)", async function(){
        await jwtJsDecode.resignJwt(jwtStrGzip_HS256, "wrong" + jwtSecret_HS).then(res => expect(res).not.toEqual(jwtStrGzip_HS256));
    });
});

describe("jwtVerify tests (WebCrypto API version)", function () {
    const jwtJsDecode = require('../src/jwt-js-decode');

    it("it works when cryptoType equals 'web-crypto'", async function () {
        expect(jwtJsDecode.cryptoType()).toEqual('web-crypto');
    });

    it("it works when provided with a proper jwt String and jwt Secret key (jwtStrNormal_HS256)", async function(){
        await jwtJsDecode.jwtVerify(jwtStrNormal_HS256, jwtSecret_HS).then(res => expect(res).toEqual(true))
    });

    it("it works when provided with a proper jwt String and jwt Secret key (jwtStrGzip_HS256)", async function(){
        await jwtJsDecode.jwtVerify(jwtStrGzip_HS256, jwtSecret_HS).then(res => expect(res).toEqual(true))
    });

    it("it fails when provided with a proper jwt String and wrong jwt Secret key (jwtStrNormal_HS256)", async function(){
        await jwtJsDecode.jwtVerify(jwtStrNormal_HS256, "wrong" + jwtSecret_HS).then(res => expect(res).toEqual(false));
    });

    it("it fails when provided with a proper jwt String and wrong jwt Secret key (jwtStrGzip_HS256)", async function(){
        await jwtJsDecode.jwtVerify(jwtStrGzip_HS256, "wrong" + jwtSecret_HS).then(res => expect(res).toEqual(false));
    });

    it("it works when resignJwt jwtStrNormal_HS256 string with alg `HS512` equal to jwtStrNormal_HS512", async function(){
        await jwtJsDecode.resignJwt(jwtStrNormal_HS256, jwtSecret_HS, 'HS512').then(res => expect(res).toEqual(jwtStrNormal_HS512));
    });

    it("it works when resignJwt jwtStrGzip_HS256 string with alg `HS512` equal to jwtStrGzip_HS512", async function(){
        await jwtJsDecode.resignJwt(jwtStrGzip_HS256, jwtSecret_HS, 'HS512').then(res => expect(res).toEqual(jwtStrGzip_HS512));
    });
});
