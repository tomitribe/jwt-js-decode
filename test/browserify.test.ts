jest.doMock('crypto', function () {
    return {createHmac: require('create-hmac/browser.js'), type: 'crypto-browserify'};
});

describe("jwtSign tests (crypto-browserify version)", function(){
    const jwtJsDecode = require('../src/jwt-js-decode');
    it("it works when cryptoType equals 'crypto-browserify'", async function(){
        expect(jwtJsDecode.cryptoType()).toEqual('crypto-browserify');
    });

    it("it works when jwtSign equals original signature (jwtStrNormal)", async function(){
        await jwtJsDecode.jwtSign(jwtStrNormal, jwtSecret).then(res => expect(res).toEqual(jwtJsDecode.jwtSplit(jwtStrNormal).signature));
    });

    it("it works when jwtSign equals original signature (jwtStrGzip)", async function(){
        await jwtJsDecode.jwtSign(jwtStrGzip, jwtSecret).then(res => expect(res).toEqual(jwtJsDecode.jwtSplit(jwtStrGzip).signature));
    });

    it("it works when resignJwt with same key equals initial jwt string (jwtStrNormal)", async function(){
        await jwtJsDecode.resignJwt(jwtStrNormal, jwtSecret).then(res => expect(res).toEqual(jwtStrNormal));
    });

    it("it works when resignJwt with same key equals initial jwt string (jwtStrGzip)", async function(){
        await jwtJsDecode.resignJwt(jwtStrGzip, jwtSecret).then(res => expect(res).toEqual(jwtStrGzip));
    });

    it("it works when resignJwt with wrong key is not equal to initial jwt string (jwtStrNormal)", async function(){
        await jwtJsDecode.resignJwt(jwtStrNormal, "wrong" + jwtSecret).then(res => expect(res).not.toEqual(jwtStrNormal));
    });

    it("it works when resignJwt with wrong key is not equal to initial jwt string (jwtStrGzip)", async function(){
        await jwtJsDecode.resignJwt(jwtStrGzip, "wrong" + jwtSecret).then(res => expect(res).not.toEqual(jwtStrGzip));
    });
});

describe("jwtVerify tests (crypto-browserify version)", function(){
    const jwtJsDecode = require('../src/jwt-js-decode');

    it("it works when cryptoType equals 'crypto-browserify'", async function(){
        expect(jwtJsDecode.cryptoType()).toEqual('crypto-browserify');
    });

    it("it works when provided with a proper jwt String and jwt Secret key (jwtStrNormal)", async function(){
        await jwtJsDecode.jwtVerify(jwtStrNormal, jwtSecret).then(res => expect(res).toEqual(true))
    });

    it("it works when provided with a proper jwt String and jwt Secret key (jwtStrGzip)", async function(){
        await jwtJsDecode.jwtVerify(jwtStrGzip, jwtSecret).then(res => expect(res).toEqual(true))
    });

    it("it fails when provided with a proper jwt String and wrong jwt Secret key (jwtStrNormal)", async function(){
        await jwtJsDecode.jwtVerify(jwtStrNormal, "wrong" + jwtSecret).then(res => expect(res).toEqual(false));
    });

    it("it fails when provided with a proper jwt String and wrong jwt Secret key (jwtStrGzip)", async function(){
        await jwtJsDecode.jwtVerify(jwtStrGzip, "wrong" + jwtSecret).then(res => expect(res).toEqual(false));
    });

    //rewiremock.disable();
});
