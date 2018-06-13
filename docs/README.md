
jwt-js-decode
=============

JavaScript library that decodes JSON Web Tokens (JWT) jwt-js-decode the easy way

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

TOC:

*   [Home](https://github.com/tomitribe/jwt-js-decode)
*   [Docs](/docs/)

## Index

### Classes

* [JwtDecode](classes/jwtdecode.md)
* [JwtSplit](classes/jwtsplit.md)

### Interfaces

* [JwtPart](interfaces/jwtpart.md)

### Variables

* [ILLEGAL_ARGUMENT](#illegal_argument)
* [UNSUPPORTED_ALGORITHM](#unsupported_algorithm)
* [crypto](#crypto)
* [webCrypto](#webcrypto)
* [webCryptoSubtle](#webcryptosubtle)

### Functions

* [AB2s](#ab2s)
* [algHSsign](#alghssign)
* [algHSverify](#alghsverify)
* [algSign](#algsign)
* [algVerify](#algverify)
* [b2bu](#b2bu)
* [b2s](#b2s)
* [bu2b](#bu2b)
* [bu2s](#bu2s)
* [createHmac](#createhmac)
* [isGzip](#isgzip)
* [jwtDecode](#jwtdecode)
* [jwtSign](#jwtsign)
* [jwtSplit](#jwtsplit)
* [jwtVerify](#jwtverify)
* [resignJwt](#resignjwt)
* [s2AB](#s2ab)
* [s2J](#s2j)
* [s2b](#s2b)
* [s2bu](#s2bu)
* [s2zbu](#s2zbu)
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

*Defined in jwt-js-decode.ts:14*

___
<a id="unsupported_algorithm"></a>

### `<Const>` UNSUPPORTED_ALGORITHM

**● UNSUPPORTED_ALGORITHM**: *"Unsupported algorithm name specified! Supported algorithms: &quot;HS256&quot;, &quot;HS384&quot;, &quot;HS512&quot;, &quot;RS256&quot;, &quot;RS384&quot;, &quot;RS512&quot; and &quot;none&quot;."* = "Unsupported algorithm name specified! Supported algorithms: "HS256", "HS384", "HS512", "RS256", "RS384", "RS512" and "none"."

*Defined in jwt-js-decode.ts:13*

___
<a id="crypto"></a>

### `<Const>` crypto

**● crypto**: *`any`* =  require("crypto")

*Defined in jwt-js-decode.ts:2*

___
<a id="webcrypto"></a>

### `<Const>` webCrypto

**● webCrypto**: * `false` &#124; `Crypto`
* =  typeof window === "object" && (window.crypto || window['msCrypto'])

*Defined in jwt-js-decode.ts:10*

___
<a id="webcryptosubtle"></a>

### `<Const>` webCryptoSubtle

**● webCryptoSubtle**: * `false` &#124; `SubtleCrypto`
* =  webCrypto && (webCrypto.subtle ||  webCrypto['webkitSubtle'] || webCrypto['Subtle'])

*Defined in jwt-js-decode.ts:11*

___

## Functions

<a id="ab2s"></a>

###  AB2s

▸ **AB2s**(buff: * `ArrayBuffer` &#124; `Uint8Array`*): `string`

*Defined in jwt-js-decode.ts:366*

Converts ArrayBuffer to string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| buff |  `ArrayBuffer` &#124; `Uint8Array`|  charCode ArrayBuffer to convert |

**Returns:** `string`
data string

___
<a id="alghssign"></a>

###  algHSsign

▸ **algHSsign**(bits: *`number`*): `sign`

*Defined in jwt-js-decode.ts:436*

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

*Defined in jwt-js-decode.ts:451*

Algorithm HMAC verify generator

**Parameters:**

| Param | Type |
| ------ | ------ |
| bits | `number` |

**Returns:** `verify`

___
<a id="algsign"></a>

###  algSign

▸ **algSign**(algorithm: *`string`*, thing: *`string`*, secret: *`string`*): `Promise`<`string`>

*Defined in jwt-js-decode.ts:510*

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

*Defined in jwt-js-decode.ts:481*

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
<a id="b2bu"></a>

###  b2bu

▸ **b2bu**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:180*

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

*Defined in jwt-js-decode.ts:161*

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

*Defined in jwt-js-decode.ts:199*

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

*Defined in jwt-js-decode.ts:219*

Converts base64url string to string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  base64url string to convert |

**Returns:** `string`
decoded data string

___
<a id="createhmac"></a>

###  createHmac

▸ **createHmac**(name: *`string`*, secret: *`string`*): `Promise`<`any`>

*Defined in jwt-js-decode.ts:406*

Async function inspired by createHmac in crypto (used WebCrypto Api supported by most browsers)

**Parameters:**

| Param | Type |
| ------ | ------ |
| name | `string` |
| secret | `string` |

**Returns:** `Promise`<`any`>

___
<a id="isgzip"></a>

###  isGzip

▸ **isGzip**(header: *[JwtPart](interfaces/jwtpart.md)*): `boolean`

*Defined in jwt-js-decode.ts:230*

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

*Defined in jwt-js-decode.ts:241*

Decode jwtToken header and payload

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to decode |

**Returns:** [JwtDecode](classes/jwtdecode.md)
object with decoded header and body, and signature untouched

___
<a id="jwtsign"></a>

###  jwtSign

▸ **jwtSign**(jwtStr: *`string`*, secret: *`string`*): `Promise`<`string`>

*Defined in jwt-js-decode.ts:542*

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

*Defined in jwt-js-decode.ts:252*

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

*Defined in jwt-js-decode.ts:535*

**Parameters:**

| Param | Type |
| ------ | ------ |
| jwtStr | `string` |
| secret | `string` |

**Returns:** `Promise`<`boolean`>

___
<a id="resignjwt"></a>

###  resignJwt

▸ **resignJwt**(jwtStr: *`string`*, secret: *`string`*): `Promise`<`string`>

*Defined in jwt-js-decode.ts:549*

**Parameters:**

| Param | Type |
| ------ | ------ |
| jwtStr | `string` |
| secret | `string` |

**Returns:** `Promise`<`string`>

___
<a id="s2ab"></a>

###  s2AB

▸ **s2AB**(str: *`string`*):  `ArrayBuffer` &#124; `Uint8Array`

*Defined in jwt-js-decode.ts:353*

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

*Defined in jwt-js-decode.ts:145*

Converts string to base64 string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to convert |

**Returns:** `any`
decoded data string

___
<a id="s2b"></a>

###  s2b

▸ **s2b**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:263*

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

*Defined in jwt-js-decode.ts:282*

Converts string to base64url string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to convert |

**Returns:** `string`
base64url string

___
<a id="s2zbu"></a>

###  s2zbu

▸ **s2zbu**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:293*

Gzip and encode data string to base64url string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to encode |

**Returns:** `string`
base64url string

___
<a id="unzip"></a>

###  unzip

▸ **unzip**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:304*

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

*Defined in jwt-js-decode.ts:323*

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

*Defined in jwt-js-decode.ts:334*

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

*Defined in jwt-js-decode.ts:565*

<a id="jwsjsdecode.jwtdecode"></a>

####  JwtDecode

**● JwtDecode**: *[JwtDecode](classes/jwtdecode.md)*

*Defined in jwt-js-decode.ts:566*

___
<a id="jwsjsdecode.jwtsplit"></a>

####  JwtSplit

**● JwtSplit**: *[JwtSplit](classes/jwtsplit.md)*

*Defined in jwt-js-decode.ts:567*

___
<a id="jwsjsdecode.alghssign"></a>

####  algHSsign

**● algHSsign**: *[algHSsign](#alghssign)*

*Defined in jwt-js-decode.ts:581*

___
<a id="jwsjsdecode.alghsverify"></a>

####  algHSverify

**● algHSverify**: *[algHSverify](#alghsverify)*

*Defined in jwt-js-decode.ts:582*

___
<a id="jwsjsdecode.algsign"></a>

####  algSign

**● algSign**: *[algSign](#algsign)*

*Defined in jwt-js-decode.ts:586*

___
<a id="jwsjsdecode.algverify"></a>

####  algVerify

**● algVerify**: *[algVerify](#algverify)*

*Defined in jwt-js-decode.ts:585*

___
<a id="jwsjsdecode.b2bu"></a>

####  b2bu

**● b2bu**: *[b2bu](#b2bu)*

*Defined in jwt-js-decode.ts:568*

___
<a id="jwsjsdecode.b2s"></a>

####  b2s

**● b2s**: *[b2s](#b2s)*

*Defined in jwt-js-decode.ts:569*

___
<a id="jwsjsdecode.bu2b"></a>

####  bu2b

**● bu2b**: *[bu2b](#bu2b)*

*Defined in jwt-js-decode.ts:570*

___
<a id="jwsjsdecode.bu2s"></a>

####  bu2s

**● bu2s**: *[bu2s](#bu2s)*

*Defined in jwt-js-decode.ts:571*

___
<a id="jwsjsdecode.cryptotype"></a>

####  cryptoType

**● cryptoType**: *`cryptoType`*

*Defined in jwt-js-decode.ts:590*

___
<a id="jwsjsdecode.isgzip"></a>

####  isGzip

**● isGzip**: *[isGzip](#isgzip)*

*Defined in jwt-js-decode.ts:572*

___
<a id="jwsjsdecode.jwtdecode-1"></a>

####  jwtDecode

**● jwtDecode**: *[jwtDecode](#jwtdecode)*

*Defined in jwt-js-decode.ts:573*

___
<a id="jwsjsdecode.jwtsign"></a>

####  jwtSign

**● jwtSign**: *[jwtSign](#jwtsign)*

*Defined in jwt-js-decode.ts:588*

___
<a id="jwsjsdecode.jwtsplit-1"></a>

####  jwtSplit

**● jwtSplit**: *[jwtSplit](#jwtsplit)*

*Defined in jwt-js-decode.ts:574*

___
<a id="jwsjsdecode.jwtverify"></a>

####  jwtVerify

**● jwtVerify**: *[jwtVerify](#jwtverify)*

*Defined in jwt-js-decode.ts:587*

___
<a id="jwsjsdecode.resignjwt"></a>

####  resignJwt

**● resignJwt**: *[resignJwt](#resignjwt)*

*Defined in jwt-js-decode.ts:589*

___
<a id="jwsjsdecode.s2b"></a>

####  s2b

**● s2b**: *[s2b](#s2b)*

*Defined in jwt-js-decode.ts:575*

___
<a id="jwsjsdecode.s2bu"></a>

####  s2bu

**● s2bu**: *[s2bu](#s2bu)*

*Defined in jwt-js-decode.ts:576*

___
<a id="jwsjsdecode.s2zbu"></a>

####  s2zbu

**● s2zbu**: *[s2zbu](#s2zbu)*

*Defined in jwt-js-decode.ts:577*

___
<a id="jwsjsdecode.unzip"></a>

####  unzip

**● unzip**: *[unzip](#unzip)*

*Defined in jwt-js-decode.ts:578*

___
<a id="jwsjsdecode.zbu2s"></a>

####  zbu2s

**● zbu2s**: *[zbu2s](#zbu2s)*

*Defined in jwt-js-decode.ts:579*

___
<a id="jwsjsdecode.zip"></a>

####  zip

**● zip**: *[zip](#zip)*

*Defined in jwt-js-decode.ts:580*

___

___

