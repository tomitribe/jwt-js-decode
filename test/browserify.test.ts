jest.doMock('crypto', function () {
    return {createHmac: require('create-hmac/browser.js'), type: 'crypto-browserify'};
});

describe("jwtSign tests (crypto-browserify version)", function(){
    const jwtJsDecode = require('../src/jwt-js-decode');
    it("it works when cryptoType equals 'crypto-browserify'", async function(){
        expect(jwtJsDecode.cryptoType()).toEqual('crypto-browserify');
    });

    it("it works when jwtSign equals original signature", async function(){
        await jwtJsDecode.jwtSign(jwtStrNormal, jwtSecret).then(res => expect(res).toEqual(jwtJsDecode.jwtSplit(jwtStrNormal).signature));
    });

    it("it works when resignJwt with same key equals initial jwt string", async function(){
        await jwtJsDecode.resignJwt(jwtStrNormal, jwtSecret).then(res => expect(res).toEqual(jwtStrNormal));
    });

    it("it works when resignJwt with wrong key is not equal to initial jwt string", async function(){
        await jwtJsDecode.resignJwt(jwtStrNormal, "wrong" + jwtSecret).then(res => expect(res).not.toEqual(jwtStrNormal));
    });
});

describe("jwtVerify tests (crypto-browserify version)", function(){
    const jwtJsDecode = require('../src/jwt-js-decode');

    it("it works when cryptoType equals 'crypto-browserify'", async function(){
        expect(jwtJsDecode.cryptoType()).toEqual('crypto-browserify');
    });

    it("it works when provided with a proper jwt String and jwt Secret key", async function(){
        await jwtJsDecode.jwtVerify(jwtStrNormal, jwtSecret).then(res => expect(res).toEqual(true))
    });

    it("it fails when provided with a proper jwt String and wrong jwt Secret key", async function(){
        await jwtJsDecode.jwtVerify(jwtStrNormal, "wrong" + jwtSecret).then(res => expect(res).toEqual(false));
    });

    //rewiremock.disable();
});
