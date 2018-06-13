jest.unmock('crypto');

/**
 * jwtSplit tests
 */
describe("jwtSplit tests", function(){
    const jwtJsDecode = require('../src/jwt-js-decode');
    it("it works when provided with String", async function(){
        expect(jwtJsDecode.jwtSplit('1.2.3')).toEqual(expect.objectContaining({
            header: '1',
            payload: '2',
            signature: '3',
        }));
    });

    it("error is thrown when provided with string without two dots", async function(){
        expect(function(){
            jwtJsDecode.jwtSplit('1.23')
        }).toThrowError(jwtJsDecode.ILLEGAL_ARGUMENT)
    });

    it("error is thrown when provided with Array", async function(){
        expect(function(){
            jwtJsDecode.jwtSplit(<any>[])
        }).toThrowError(jwtJsDecode.ILLEGAL_ARGUMENT)
    });
});

/**
 * jwtDecode tests
 *
 */
describe("jwtDecode tests", function(){
    const jwtJsDecode = require('../src/jwt-js-decode');
    it("it works when provided with a proper jwt String (normal)", async function(){
        const jwtObj = jwtJsDecode.jwtDecode(jwtStrNormal);
        expect(jwtObj).toEqual(expect.objectContaining({
            header: expect.any(Object),
            payload: expect.any(Object),
            signature: expect.any(String),
        }));
    });

    it("it works when provided with a proper jwt String (gzip)", async function(){
        const jwtObj = await jwtJsDecode.jwtDecode(jwtStrGzip);
        expect(jwtObj).toEqual(expect.objectContaining({
            header: expect.any(Object),
            payload: expect.any(Object),
            signature: expect.any(String),
        }));
    });

    it("error is thrown when provided with string without two dots", async function(){
        expect(function(){
            jwtJsDecode.jwtDecode('1.23')
        }).toThrowError(jwtJsDecode.ILLEGAL_ARGUMENT)
    });

    it("error is thrown when provided with Array", async function(){
        expect(function(){
            jwtJsDecode.jwtDecode(<any>[])
        }).toThrowError(jwtJsDecode.ILLEGAL_ARGUMENT)
    });

});

/**
 * isGzip tests
 *
 */
describe("isGzip tests", function(){
    const jwtJsDecode = require('../src/jwt-js-decode');
    it("isGzip returns true when header has property `zip` with value \"GZIP\" ", async function(){
        expect(jwtJsDecode.isGzip(jwtJsDecode.jwtDecode(jwtStrGzip).header)).toEqual(true);
    });

    it("isGzip returns true when header has property `zip` with case insensitive value \"GZip\"", async function(){
        expect(jwtJsDecode.isGzip({ zip: "GZip" })).toEqual(true);
    });

    it("isGzip returns false when header has no property `zip`", async function(){
        expect(jwtJsDecode.isGzip({})).toEqual(false);
    });

    it("isGzip returns false when header is not an object", async function(){
        expect(jwtJsDecode.isGzip(<any>"")).toEqual(false);
    });
});

describe("jwtSign tests (Node.js version)", function(){
    const jwtJsDecode = require('../src/jwt-js-decode');

    it("it works when cryptoType equals 'crypto-node'", async function(){
        expect(jwtJsDecode.cryptoType()).toEqual('crypto-node');
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
    //rewiremock.disable();
});

describe("jwtVerify tests (Node.js version)", function(){
    const jwtJsDecode = require('../src/jwt-js-decode');

    it("it works when cryptoType equals 'crypto-node'", async function(){
        expect(jwtJsDecode.cryptoType()).toEqual('crypto-node');
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
