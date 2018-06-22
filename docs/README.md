
jwt-js-decode
=============

JavaScript library that decodes JSON Web Tokens (JWT) jwt-js-decode the easy way

Use cases
---------

Works in:

*   all modern browsers that support WebCrypto API
*   Node.js using 'crypto' (default node-js lib)
*   any other js env using 'crypto-browserify' (with require replacement to 'crypto'')

Getting Started
---------------

Install Jest using [`yarn`](https://yarnpkg.com/en/package/jwt-js-decode):

```bash
yarn add jwt-js-decode
```

Or via [`npm`](https://www.npmjs.com/package/jwt-js-decode):

```bash
npm i -S jwt-js-decode
```

### Require lib

```javascript
import jwtJsDecode from 'jwt-js-decode';
```

or

```javascript
const jwtJsDecode = require('jwt-js-decode');
```

or

```html
<script src="https://unpkg.com/jwt-js-decode@1.2.0"></script>
```

Other links you can find on [`yarn`](https://yarnpkg.com/en/package/jwt-js-decode)

### Usage

```javascript
// just decode 'token' into {header: Object, payload: Object, signature: String}
    let jwt = jwtJsDecode.jwtDecode('token');
    console.log(jwt.payload);

    // or verify 'token' with provided secret and decode it
    jwtJsDecode.jwtVerify('token', 'secret').then(res => {
        if (res === true) {
            const jwt = jwtJsDecode.jwtDecode('token');
            console.log(jwt.payload);
        }
    });

    // advanced resignJwt token with newSecret secret should be same type as jwt.header.alg
    jwtJsDecode.resignJwt('token', 'newSecret').then(newToken =>  {
        console.log(newToken);
    });
```

Sandboxes
---------

Runkit (node.js sandbox 1.3.7) [https://npm.runkit.com/jwt-js-decode](https://npm.runkit.com/jwt-js-decode)

Plunkr (browser sandbox 1.3.7 + CodeMirror) [https://plnkr.co/edit/WaawWXswkexfXaFfRDjQ](https://plnkr.co/edit/WaawWXswkexfXaFfRDjQ)

Plunkr (browser sandbox 1.1.7) [https://plnkr.co/edit/zCNpiTXBbPKNxNVnHhkU](https://plnkr.co/edit/zCNpiTXBbPKNxNVnHhkU)

Development
-----------

First you'll need to clone this repository to folder you will test it in.

Then insall all dependencies.

```bash
npm i
```

For testing functionality jest testing is used, npm `test` script will rebuild dist and docs folder.

After changes in jwt-js-decode source and just for the first run use:

```bash
npm test
```

For sequential runs and just new test you can run:

```bash
npm run jest
```

TOC:

*   [Home](https://github.com/tomitribe/jwt-js-decode)
*   [Docs](/docs/)

## Index

### Classes

* [ASN1](classes/asn1.md)
* [ASN1Tag](classes/asn1tag.md)
* [Asn1Tag](classes/asn1tag.md)
* [Int10](classes/int10.md)
* [JwtDecode](classes/jwtdecode.md)
* [JwtSplit](classes/jwtsplit.md)
* [Stream](classes/stream.md)

### Interfaces

* [JwtPart](interfaces/jwtpart.md)
* [PEM](interfaces/pem.md)

### Variables

* [ILLEGAL_ARGUMENT](#illegal_argument)
* [UNSUPPORTED_ALGORITHM](#unsupported_algorithm)
* [ellipsis](#ellipsis)
* [max](#max)
* [reTimeL](#retimel)
* [reTimeS](#retimes)
* [resignJwt](#resignjwt)
* [signJwt](#signjwt)
* [splitJwt](#splitjwt)
* [verifyJwt](#verifyjwt)
* [webCrypto](#webcrypto)
* [webCryptoSubtle](#webcryptosubtle)

### Functions

* [AB2hex](#ab2hex)
* [AB2s](#ab2s)
* [J2s](#j2s)
* [algHSsign](#alghssign)
* [algHSverify](#alghsverify)
* [algRSsign](#algrssign)
* [algRSverify](#algrsverify)
* [algSign](#algsign)
* [algVerify](#algverify)
* [asn12jwk](#asn12jwk)
* [b2bu](#b2bu)
* [b2s](#b2s)
* [bu2b](#bu2b)
* [bu2s](#bu2s)
* [cleanZeros](#cleanzeros)
* [createHmac](#createhmac)
* [createSign](#createsign)
* [createVerify](#createverify)
* [hex2AB](#hex2ab)
* [isGzip](#isgzip)
* [jwtDecode](#jwtdecode)
* [jwtResign](#jwtresign)
* [jwtSign](#jwtsign)
* [jwtSplit](#jwtsplit)
* [jwtVerify](#jwtverify)
* [num2hex](#num2hex)
* [pem2asn1](#pem2asn1)
* [pem2jwk](#pem2jwk)
* [s2AB](#s2ab)
* [s2J](#s2j)
* [s2b](#s2b)
* [s2bu](#s2bu)
* [s2pem](#s2pem)
* [s2zbu](#s2zbu)
* [stringCut](#stringcut)
* [tryPromise](#trypromise)
* [unzip](#unzip)
* [zbu2s](#zbu2s)
* [zip](#zip)

### Object literals

* [jwsJsDecode](#jwsjsdecode)

---

## Variables

<a id="illegal_argument"></a>

### `<Const>` ILLEGAL_ARGUMENT

**● ILLEGAL_ARGUMENT**: *"Illegal argument specified!"* = "Illegal argument specified!"

*Defined in util.ts:2*

___
<a id="unsupported_algorithm"></a>

### `<Const>` UNSUPPORTED_ALGORITHM

**● UNSUPPORTED_ALGORITHM**: *"Unsupported algorithm name specified! Supported algorithms: &quot;HS256&quot;, &quot;HS384&quot;, &quot;HS512&quot;, &quot;RS256&quot;, &quot;RS384&quot;, &quot;RS512&quot; and &quot;none&quot;."* = "Unsupported algorithm name specified! Supported algorithms: "HS256", "HS384", "HS512", "RS256", "RS384", "RS512" and "none"."

*Defined in util.ts:1*

___
<a id="ellipsis"></a>

### `<Const>` ellipsis

**● ellipsis**: *"…"* = "…"

*Defined in asn1.ts:4*

___
<a id="max"></a>

###  max

**● max**: *`number`* = 10000000000000

*Defined in int10.ts:1*

___
<a id="retimel"></a>

### `<Const>` reTimeL

**● reTimeL**: *`RegExp`* =  /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/

*Defined in asn1.ts:6*

___
<a id="retimes"></a>

### `<Const>` reTimeS

**● reTimeS**: *`RegExp`* =  /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/

*Defined in asn1.ts:5*

___
<a id="resignjwt"></a>

### `<Const>` resignJwt

**● resignJwt**: *[jwtResign](#jwtresign)* =  jwtResign

*Defined in jwt-js-decode.ts:948*

___
<a id="signjwt"></a>

### `<Const>` signJwt

**● signJwt**: *[jwtSign](#jwtsign)* =  jwtSign

*Defined in jwt-js-decode.ts:939*

___
<a id="splitjwt"></a>

### `<Const>` splitJwt

**● splitJwt**: *[jwtSplit](#jwtsplit)* =  jwtSplit

*Defined in jwt-js-decode.ts:292*

___
<a id="verifyjwt"></a>

### `<Const>` verifyJwt

**● verifyJwt**: *[jwtVerify](#jwtverify)* =  jwtVerify

*Defined in jwt-js-decode.ts:930*

___
<a id="webcrypto"></a>

### `<Const>` webCrypto

**● webCrypto**: * `false` &#124; `Crypto`
* =  typeof window === "object" && (window.crypto || window['msCrypto'])

*Defined in jwt-js-decode.ts:20*

___
<a id="webcryptosubtle"></a>

### `<Const>` webCryptoSubtle

**● webCryptoSubtle**: * `false` &#124; `SubtleCrypto`
* =  webCrypto && (webCrypto.subtle || webCrypto['webkitSubtle'] || webCrypto['Subtle'])

*Defined in jwt-js-decode.ts:21*

___

## Functions

<a id="ab2hex"></a>

###  AB2hex

▸ **AB2hex**(buff: * `ArrayBuffer` &#124; `Uint8Array`*): `string`

*Defined in util.ts:20*

**Parameters:**

| Param | Type |
| ------ | ------ |
| buff |  `ArrayBuffer` &#124; `Uint8Array`|

**Returns:** `string`

___
<a id="ab2s"></a>

###  AB2s

▸ **AB2s**(buff: * `ArrayBuffer` &#124; `Uint8Array`*): `string`

*Defined in jwt-js-decode.ts:404*

Converts ArrayBuffer to string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| buff |  `ArrayBuffer` &#124; `Uint8Array`|  charCode ArrayBuffer to convert |

**Returns:** `string`
data string

___
<a id="j2s"></a>

###  J2s

▸ **J2s**(obj: *`any`*): `string`

*Defined in jwt-js-decode.ts:182*

Converts JSON object to string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| obj | `any` |  JSON object to convert |

**Returns:** `string`
resulting string

___
<a id="alghssign"></a>

###  algHSsign

▸ **algHSsign**(bits: *`number`*): `sign`

*Defined in jwt-js-decode.ts:443*

Algorithm HMAC sign generator

**Parameters:**

| Param | Type |
| ------ | ------ |
| bits | `number` |

**Returns:** `sign`

___
<a id="alghsverify"></a>

###  algHSverify

▸ **algHSverify**(bits: *`number`*): `verify`

*Defined in jwt-js-decode.ts:458*

Algorithm HMAC verify generator

**Parameters:**

| Param | Type |
| ------ | ------ |
| bits | `number` |

**Returns:** `verify`

___
<a id="algrssign"></a>

###  algRSsign

▸ **algRSsign**(bits: *`number`*): `sign`

*Defined in jwt-js-decode.ts:786*

**Parameters:**

| Param | Type |
| ------ | ------ |
| bits | `number` |

**Returns:** `sign`

___
<a id="algrsverify"></a>

###  algRSverify

▸ **algRSverify**(bits: *`number`*): `verify`

*Defined in jwt-js-decode.ts:853*

**Parameters:**

| Param | Type |
| ------ | ------ |
| bits | `number` |

**Returns:** `verify`

___
<a id="algsign"></a>

###  algSign

▸ **algSign**(algorithm: *`string`*, thing: *`string`*, secret: *`string`*): `Promise`<`string`>

*Defined in jwt-js-decode.ts:898*

Universal algorithm signer

**Parameters:**

| Param | Type |
| ------ | ------ |
| algorithm | `string` |
| thing | `string` |
| secret | `string` |

**Returns:** `Promise`<`string`>

___
<a id="algverify"></a>

###  algVerify

▸ **algVerify**(algorithm: *`string`*, thing: *`string`*, signature: *`string`*, secret: *`string`*): `Promise`<`boolean`>

*Defined in jwt-js-decode.ts:869*

Universal algorithm verifier

**Parameters:**

| Param | Type |
| ------ | ------ |
| algorithm | `string` |
| thing | `string` |
| signature | `string` |
| secret | `string` |

**Returns:** `Promise`<`boolean`>

___
<a id="asn12jwk"></a>

###  asn12jwk

▸ **asn12jwk**(asn1: *`any`*, type?: * `undefined` &#124; `string`*, extra?: *`any`*): `any`

*Defined in jwt-js-decode.ts:677*

**Parameters:**

| Param | Type |
| ------ | ------ |
| asn1 | `any` |
| `Optional` type |  `undefined` &#124; `string`|
| `Optional` extra | `any` |

**Returns:** `any`

___
<a id="b2bu"></a>

###  b2bu

▸ **b2bu**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:216*

Converts base64 string to base64url string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to convert |

**Returns:** `string`
base64url string

___
<a id="b2s"></a>

###  b2s

▸ **b2s**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:197*

Converts string to base64 string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to convert |

**Returns:** `string`
decoded data string

___
<a id="bu2b"></a>

###  bu2b

▸ **bu2b**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:235*

Converts base64url string to base64 string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to convert |

**Returns:** `string`
base64 string

___
<a id="bu2s"></a>

###  bu2s

▸ **bu2s**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:255*

Converts base64url string to string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  base64url string to convert |

**Returns:** `string`
decoded data string

___
<a id="cleanzeros"></a>

###  cleanZeros

▸ **cleanZeros**(b: *`any`*): `any`

*Defined in util.ts:9*

**Parameters:**

| Param | Type |
| ------ | ------ |
| b | `any` |

**Returns:** `any`

___
<a id="createhmac"></a>

###  createHmac

▸ **createHmac**(name: *`string`*, secret: *`string`*): `Promise`<`any`>

*Defined in jwt-js-decode.ts:414*

Async function inspired by createHmac in crypto (used WebCrypto Api supported by most browsers)

**Parameters:**

| Param | Type |
| ------ | ------ |
| name | `string` |
| secret | `string` |

**Returns:** `Promise`<`any`>

___
<a id="createsign"></a>

###  createSign

▸ **createSign**(name: *`string`*): `any`

*Defined in jwt-js-decode.ts:731*

**Parameters:**

| Param | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `any`

___
<a id="createverify"></a>

###  createVerify

▸ **createVerify**(name: *`string`*): `any`

*Defined in jwt-js-decode.ts:797*

**Parameters:**

| Param | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `any`

___
<a id="hex2ab"></a>

###  hex2AB

▸ **hex2AB**(hex: *`string`*):  `ArrayBuffer` &#124; `Uint8Array`

*Defined in util.ts:13*

**Parameters:**

| Param | Type |
| ------ | ------ |
| hex | `string` |

**Returns:**  `ArrayBuffer` &#124; `Uint8Array`

___
<a id="isgzip"></a>

###  isGzip

▸ **isGzip**(header: *[JwtPart](interfaces/jwtpart.md)*): `boolean`

*Defined in jwt-js-decode.ts:266*

Check if header has zip property (and it is equal to 'GZIP', ignorecase)

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| header | [JwtPart](interfaces/jwtpart.md) |  object to check |

**Returns:** `boolean`
does it have gzip in zip property

___
<a id="jwtdecode"></a>

###  jwtDecode

▸ **jwtDecode**(str: *`string`*): [JwtDecode](classes/jwtdecode.md)

*Defined in jwt-js-decode.ts:277*

Decode jwtToken header and payload

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to decode |

**Returns:** [JwtDecode](classes/jwtdecode.md)
object with decoded header and body, and signature untouched

___
<a id="jwtresign"></a>

###  jwtResign

▸ **jwtResign**(jwtStr: *`string`*, secret: *`string`*, alg?: * `undefined` &#124; `string`*): `Promise`<`string`>

*Defined in jwt-js-decode.ts:941*

**Parameters:**

| Param | Type |
| ------ | ------ |
| jwtStr | `string` |
| secret | `string` |
| `Optional` alg |  `undefined` &#124; `string`|

**Returns:** `Promise`<`string`>

___
<a id="jwtsign"></a>

###  jwtSign

▸ **jwtSign**(jwtStr: *`string`*, secret: *`string`*): `Promise`<`string`>

*Defined in jwt-js-decode.ts:932*

**Parameters:**

| Param | Type |
| ------ | ------ |
| jwtStr | `string` |
| secret | `string` |

**Returns:** `Promise`<`string`>

___
<a id="jwtsplit"></a>

###  jwtSplit

▸ **jwtSplit**(str: *`string`*): [JwtSplit](classes/jwtsplit.md)

*Defined in jwt-js-decode.ts:288*

Split jwtToken into object {header, payload, signature}

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to split |

**Returns:** [JwtSplit](classes/jwtsplit.md)
jwt split object of three strings

___
<a id="jwtverify"></a>

###  jwtVerify

▸ **jwtVerify**(jwtStr: *`string`*, secret: *`string`*): `Promise`<`boolean`>

*Defined in jwt-js-decode.ts:923*

**Parameters:**

| Param | Type |
| ------ | ------ |
| jwtStr | `string` |
| secret | `string` |

**Returns:** `Promise`<`boolean`>

___
<a id="num2hex"></a>

###  num2hex

▸ **num2hex**(memo: *`string`*, i: *`number`*): `string`

*Defined in util.ts:4*

**Parameters:**

| Param | Type |
| ------ | ------ |
| memo | `string` |
| i | `number` |

**Returns:** `string`

___
<a id="pem2asn1"></a>

###  pem2asn1

▸ **pem2asn1**(buff: * `ArrayBuffer` &#124; `Uint8Array`*): `any`

*Defined in jwt-js-decode.ts:639*

**Parameters:**

| Param | Type |
| ------ | ------ |
| buff |  `ArrayBuffer` &#124; `Uint8Array`|

**Returns:** `any`

___
<a id="pem2jwk"></a>

###  pem2jwk

▸ **pem2jwk**(secret: *`string`*, type?: * "public" &#124; "private"*, extra?: *`any`*): `Promise`<`any`>

*Defined in jwt-js-decode.ts:713*

**Parameters:**

| Param | Type |
| ------ | ------ |
| secret | `string` |
| `Optional` type |  "public" &#124; "private"|
| `Optional` extra | `any` |

**Returns:** `Promise`<`any`>

___
<a id="s2ab"></a>

###  s2AB

▸ **s2AB**(str: *`string`*):  `ArrayBuffer` &#124; `Uint8Array`

*Defined in jwt-js-decode.ts:391*

Converts string to ArrayBuffer

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to convert |

**Returns:**  `ArrayBuffer` &#124; `Uint8Array`

charCode ArrayBuffer

___
<a id="s2j"></a>

###  s2J

▸ **s2J**(str: *`string`*): `any`

*Defined in jwt-js-decode.ts:167*

Converts string to JSON object

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to convert |

**Returns:** `any`
resulting object

___
<a id="s2b"></a>

###  s2b

▸ **s2b**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:301*

Converts base64 string to string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to convert |

**Returns:** `string`
base64 string

___
<a id="s2bu"></a>

###  s2bu

▸ **s2bu**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:320*

Converts string to base64url string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to convert |

**Returns:** `string`
base64url string

___
<a id="s2pem"></a>

###  s2pem

▸ **s2pem**(secret: *`string`*): [PEM](interfaces/pem.md)

*Defined in jwt-js-decode.ts:473*

**Parameters:**

| Param | Type |
| ------ | ------ |
| secret | `string` |

**Returns:** [PEM](interfaces/pem.md)

___
<a id="s2zbu"></a>

###  s2zbu

▸ **s2zbu**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:331*

Gzip and encode data string to base64url string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to encode |

**Returns:** `string`
base64url string

___
<a id="stringcut"></a>

###  stringCut

▸ **stringCut**(str: *`any`*, len: *`any`*): `any`

*Defined in asn1.ts:8*

**Parameters:**

| Param | Type |
| ------ | ------ |
| str | `any` |
| len | `any` |

**Returns:** `any`

___
<a id="trypromise"></a>

###  tryPromise

▸ **tryPromise**(fn: *`any`*): `Promise`<`any`>

*Defined in jwt-js-decode.ts:152*

Try running function and replace it's response as Promise.resolve/reject

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| fn | `any` |  fn to call in for response |

**Returns:** `Promise`<`any`>
resulting Promise

___
<a id="unzip"></a>

###  unzip

▸ **unzip**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:342*

Converts from gzip data string to string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to convert |

**Returns:** `string`
decoded data string

___
<a id="zbu2s"></a>

###  zbu2s

▸ **zbu2s**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:361*

Decode from base64url and unzip data string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to decode |

**Returns:** `string`
decoded data string

___
<a id="zip"></a>

###  zip

▸ **zip**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:372*

Converts string to gzip data string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to convert |

**Returns:** `string`
gzip data string

___

## Object literals

<a id="jwsjsdecode"></a>

### `<Const>` jwsJsDecode

**jwsJsDecode**: *`object`*

*Defined in jwt-js-decode.ts:959*

<a id="jwsjsdecode.ab2hex"></a>

####  AB2hex

**● AB2hex**: *[AB2hex](#ab2hex)*

*Defined in jwt-js-decode.ts:966*

___
<a id="jwsjsdecode.ab2s"></a>

####  AB2s

**● AB2s**: *[AB2s](#ab2s)*

*Defined in jwt-js-decode.ts:967*

___
<a id="jwsjsdecode.illegal_argument"></a>

####  ILLEGAL_ARGUMENT

**● ILLEGAL_ARGUMENT**: *`string`*

*Defined in jwt-js-decode.ts:960*

___
<a id="jwsjsdecode.j2s"></a>

####  J2s

**● J2s**: *[J2s](#j2s)*

*Defined in jwt-js-decode.ts:968*

___
<a id="jwsjsdecode.unsupported_algorithm"></a>

####  UNSUPPORTED_ALGORITHM

**● UNSUPPORTED_ALGORITHM**: *`string`*

*Defined in jwt-js-decode.ts:961*

___
<a id="jwsjsdecode.alghssign"></a>

####  algHSsign

**● algHSsign**: *[algHSsign](#alghssign)*

*Defined in jwt-js-decode.ts:969*

___
<a id="jwsjsdecode.alghsverify"></a>

####  algHSverify

**● algHSverify**: *[algHSverify](#alghsverify)*

*Defined in jwt-js-decode.ts:970*

___
<a id="jwsjsdecode.algrssign"></a>

####  algRSsign

**● algRSsign**: *[algRSsign](#algrssign)*

*Defined in jwt-js-decode.ts:971*

___
<a id="jwsjsdecode.algrsverify"></a>

####  algRSverify

**● algRSverify**: *[algRSverify](#algrsverify)*

*Defined in jwt-js-decode.ts:972*

___
<a id="jwsjsdecode.algsign"></a>

####  algSign

**● algSign**: *[algSign](#algsign)*

*Defined in jwt-js-decode.ts:973*

___
<a id="jwsjsdecode.algverify"></a>

####  algVerify

**● algVerify**: *[algVerify](#algverify)*

*Defined in jwt-js-decode.ts:974*

___
<a id="jwsjsdecode.asn12jwk"></a>

####  asn12jwk

**● asn12jwk**: *[asn12jwk](#asn12jwk)*

*Defined in jwt-js-decode.ts:975*

___
<a id="jwsjsdecode.b2bu"></a>

####  b2bu

**● b2bu**: *[b2bu](#b2bu)*

*Defined in jwt-js-decode.ts:976*

___
<a id="jwsjsdecode.b2s"></a>

####  b2s

**● b2s**: *[b2s](#b2s)*

*Defined in jwt-js-decode.ts:977*

___
<a id="jwsjsdecode.bu2b"></a>

####  bu2b

**● bu2b**: *[bu2b](#bu2b)*

*Defined in jwt-js-decode.ts:978*

___
<a id="jwsjsdecode.bu2s"></a>

####  bu2s

**● bu2s**: *[bu2s](#bu2s)*

*Defined in jwt-js-decode.ts:979*

___
<a id="jwsjsdecode.cleanzeros"></a>

####  cleanZeros

**● cleanZeros**: *[cleanZeros](#cleanzeros)*

*Defined in jwt-js-decode.ts:980*

___
<a id="jwsjsdecode.createhmac"></a>

####  createHmac

**● createHmac**: *[createHmac](#createhmac)*

*Defined in jwt-js-decode.ts:981*

___
<a id="jwsjsdecode.createsign"></a>

####  createSign

**● createSign**: *[createSign](#createsign)*

*Defined in jwt-js-decode.ts:982*

___
<a id="jwsjsdecode.createverify"></a>

####  createVerify

**● createVerify**: *[createVerify](#createverify)*

*Defined in jwt-js-decode.ts:983*

___
<a id="jwsjsdecode.hex2ab"></a>

####  hex2AB

**● hex2AB**: *[hex2AB](#hex2ab)*

*Defined in jwt-js-decode.ts:984*

___
<a id="jwsjsdecode.isgzip"></a>

####  isGzip

**● isGzip**: *[isGzip](#isgzip)*

*Defined in jwt-js-decode.ts:985*

___
<a id="jwsjsdecode.jwtdecode"></a>

####  jwtDecode

**● jwtDecode**: *[jwtDecode](#jwtdecode)*

*Defined in jwt-js-decode.ts:986*

___
<a id="jwsjsdecode.jwtresign"></a>

####  jwtResign

**● jwtResign**: *[jwtResign](#jwtresign)*

*Defined in jwt-js-decode.ts:987*

___
<a id="jwsjsdecode.jwtsign"></a>

####  jwtSign

**● jwtSign**: *[jwtSign](#jwtsign)*

*Defined in jwt-js-decode.ts:988*

___
<a id="jwsjsdecode.jwtsplit"></a>

####  jwtSplit

**● jwtSplit**: *[jwtSplit](#jwtsplit)*

*Defined in jwt-js-decode.ts:989*

___
<a id="jwsjsdecode.jwtverify"></a>

####  jwtVerify

**● jwtVerify**: *[jwtVerify](#jwtverify)*

*Defined in jwt-js-decode.ts:990*

___
<a id="jwsjsdecode.num2hex"></a>

####  num2hex

**● num2hex**: *[num2hex](#num2hex)*

*Defined in jwt-js-decode.ts:991*

___
<a id="jwsjsdecode.pem2asn1"></a>

####  pem2asn1

**● pem2asn1**: *[pem2asn1](#pem2asn1)*

*Defined in jwt-js-decode.ts:992*

___
<a id="jwsjsdecode.pem2jwk"></a>

####  pem2jwk

**● pem2jwk**: *[pem2jwk](#pem2jwk)*

*Defined in jwt-js-decode.ts:993*

___
<a id="jwsjsdecode.resignjwt"></a>

####  resignJwt

**● resignJwt**: *[jwtResign](#jwtresign)*

*Defined in jwt-js-decode.ts:962*

___
<a id="jwsjsdecode.s2ab"></a>

####  s2AB

**● s2AB**: *[s2AB](#s2ab)*

*Defined in jwt-js-decode.ts:994*

___
<a id="jwsjsdecode.s2j"></a>

####  s2J

**● s2J**: *[s2J](#s2j)*

*Defined in jwt-js-decode.ts:995*

___
<a id="jwsjsdecode.s2b"></a>

####  s2b

**● s2b**: *[s2b](#s2b)*

*Defined in jwt-js-decode.ts:996*

___
<a id="jwsjsdecode.s2bu"></a>

####  s2bu

**● s2bu**: *[s2bu](#s2bu)*

*Defined in jwt-js-decode.ts:997*

___
<a id="jwsjsdecode.s2pem"></a>

####  s2pem

**● s2pem**: *[s2pem](#s2pem)*

*Defined in jwt-js-decode.ts:998*

___
<a id="jwsjsdecode.s2zbu"></a>

####  s2zbu

**● s2zbu**: *[s2zbu](#s2zbu)*

*Defined in jwt-js-decode.ts:999*

___
<a id="jwsjsdecode.signjwt"></a>

####  signJwt

**● signJwt**: *[jwtSign](#jwtsign)*

*Defined in jwt-js-decode.ts:963*

___
<a id="jwsjsdecode.splitjwt"></a>

####  splitJwt

**● splitJwt**: *[jwtSplit](#jwtsplit)*

*Defined in jwt-js-decode.ts:964*

___
<a id="jwsjsdecode.trypromise"></a>

####  tryPromise

**● tryPromise**: *[tryPromise](#trypromise)*

*Defined in jwt-js-decode.ts:1000*

___
<a id="jwsjsdecode.unzip"></a>

####  unzip

**● unzip**: *[unzip](#unzip)*

*Defined in jwt-js-decode.ts:1001*

___
<a id="jwsjsdecode.verifyjwt"></a>

####  verifyJwt

**● verifyJwt**: *[jwtVerify](#jwtverify)*

*Defined in jwt-js-decode.ts:965*

___
<a id="jwsjsdecode.zbu2s"></a>

####  zbu2s

**● zbu2s**: *[zbu2s](#zbu2s)*

*Defined in jwt-js-decode.ts:1002*

___
<a id="jwsjsdecode.zip"></a>

####  zip

**● zip**: *[zip](#zip)*

*Defined in jwt-js-decode.ts:1003*

___

___

