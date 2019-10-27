[jwt-js-decode](README.md) › [Globals](globals.md)

# jwt-js-decode

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

* [CRYPTO_NOT_FOUND](globals.md#const-crypto_not_found)
* [ILLEGAL_ARGUMENT](globals.md#const-illegal_argument)
* [PAKO_NOT_FOUND](globals.md#const-pako_not_found)
* [UNSUPPORTED_ALGORITHM](globals.md#const-unsupported_algorithm)
* [ellipsis](globals.md#const-ellipsis)
* [max](globals.md#max)
* [reTimeL](globals.md#const-retimel)
* [reTimeS](globals.md#const-retimes)
* [resignJwt](globals.md#const-resignjwt)
* [signJwt](globals.md#const-signjwt)
* [splitJwt](globals.md#const-splitjwt)
* [verifyJwt](globals.md#const-verifyjwt)
* [webCrypto](globals.md#const-webcrypto)
* [webCryptoSubtle](globals.md#const-webcryptosubtle)

### Functions

* [AB2hex](globals.md#ab2hex)
* [AB2s](globals.md#ab2s)
* [J2s](globals.md#j2s)
* [algHSsign](globals.md#alghssign)
* [algHSverify](globals.md#alghsverify)
* [algRSsign](globals.md#algrssign)
* [algRSverify](globals.md#algrsverify)
* [algSign](globals.md#algsign)
* [algVerify](globals.md#algverify)
* [asn12jwk](globals.md#asn12jwk)
* [b2bu](globals.md#b2bu)
* [b2s](globals.md#b2s)
* [bu2b](globals.md#bu2b)
* [bu2s](globals.md#bu2s)
* [cleanZeros](globals.md#cleanzeros)
* [createHmac](globals.md#createhmac)
* [createSign](globals.md#createsign)
* [createVerify](globals.md#createverify)
* [generateErrorMessage](globals.md#generateerrormessage)
* [hex2AB](globals.md#hex2ab)
* [isGzip](globals.md#isgzip)
* [jwtDecode](globals.md#jwtdecode)
* [jwtResign](globals.md#jwtresign)
* [jwtSign](globals.md#jwtsign)
* [jwtSplit](globals.md#jwtsplit)
* [jwtVerify](globals.md#jwtverify)
* [num2hex](globals.md#num2hex)
* [pem2asn1](globals.md#pem2asn1)
* [pem2jwk](globals.md#pem2jwk)
* [s2AB](globals.md#s2ab)
* [s2J](globals.md#s2j)
* [s2b](globals.md#s2b)
* [s2bu](globals.md#s2bu)
* [s2pem](globals.md#s2pem)
* [s2zbu](globals.md#s2zbu)
* [stringCut](globals.md#stringcut)
* [tryPromise](globals.md#trypromise)
* [unzip](globals.md#unzip)
* [zbu2s](globals.md#zbu2s)
* [zip](globals.md#zip)

## Variables

### `Const` CRYPTO_NOT_FOUND

• **CRYPTO_NOT_FOUND**: *"Could not find 'crypto'."* = "Could not find 'crypto'."

Defined in util.ts:3

___

### `Const` ILLEGAL_ARGUMENT

• **ILLEGAL_ARGUMENT**: *"Illegal argument specified!"* = "Illegal argument specified!"

Defined in util.ts:2

___

### `Const` PAKO_NOT_FOUND

• **PAKO_NOT_FOUND**: *"Could not find 'pako'."* = "Could not find 'pako'."

Defined in util.ts:4

___

### `Const` UNSUPPORTED_ALGORITHM

• **UNSUPPORTED_ALGORITHM**: *"Unsupported algorithm name specified! Supported algorithms: "HS256", "HS384", "HS512", "RS256", "RS384", "RS512" and "none"."* = "Unsupported algorithm name specified! Supported algorithms: "HS256", "HS384", "HS512", "RS256", "RS384", "RS512" and "none"."

Defined in util.ts:1

___

### `Const` ellipsis

• **ellipsis**: *"…"* = "…"

Defined in asn1.ts:4

___

###  max

• **max**: *number* = 10000000000000

Defined in int10.ts:1

___

### `Const` reTimeL

• **reTimeL**: *RegExp* =  /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/

Defined in asn1.ts:6

___

### `Const` reTimeS

• **reTimeS**: *RegExp* =  /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/

Defined in asn1.ts:5

___

### `Const` resignJwt

• **resignJwt**: *[jwtResign](globals.md#jwtresign)* =  jwtResign

Defined in jwt-js-decode.ts:968

___

### `Const` signJwt

• **signJwt**: *[jwtSign](globals.md#jwtsign)* =  jwtSign

Defined in jwt-js-decode.ts:959

___

### `Const` splitJwt

• **splitJwt**: *[jwtSplit](globals.md#jwtsplit)* =  jwtSplit

Defined in jwt-js-decode.ts:301

___

### `Const` verifyJwt

• **verifyJwt**: *[jwtVerify](globals.md#jwtverify)* =  jwtVerify

Defined in jwt-js-decode.ts:950

___

### `Const` webCrypto

• **webCrypto**: *false | Crypto* =  typeof window === "object" && (window.crypto || window['msCrypto'])

Defined in jwt-js-decode.ts:29

___

### `Const` webCryptoSubtle

• **webCryptoSubtle**: *false | SubtleCrypto* =  webCrypto && (webCrypto.subtle || webCrypto['webkitSubtle'] || webCrypto['Subtle'])

Defined in jwt-js-decode.ts:30

## Functions

###  AB2hex

▸ **AB2hex**(`buff`: ArrayBuffer | Uint8Array): *string*

Defined in util.ts:34

**Parameters:**

Name | Type |
------ | ------ |
`buff` | ArrayBuffer &#124; Uint8Array |

**Returns:** *string*

___

###  AB2s

▸ **AB2s**(`buff`: ArrayBuffer | Uint8Array): *string*

Defined in jwt-js-decode.ts:421

Converts ArrayBuffer to string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`buff` | ArrayBuffer &#124; Uint8Array | charCode ArrayBuffer to convert  |

**Returns:** *string*

data string

___

###  J2s

▸ **J2s**(`obj`: any): *string*

Defined in jwt-js-decode.ts:191

Converts JSON object to string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`obj` | any | JSON object to convert  |

**Returns:** *string*

resulting string

___

###  algHSsign

▸ **algHSsign**(`bits`: number): *sign*

Defined in jwt-js-decode.ts:461

Algorithm HMAC sign generator

**Parameters:**

Name | Type |
------ | ------ |
`bits` | number |

**Returns:** *sign*

___

###  algHSverify

▸ **algHSverify**(`bits`: number): *verify*

Defined in jwt-js-decode.ts:476

Algorithm HMAC verify generator

**Parameters:**

Name | Type |
------ | ------ |
`bits` | number |

**Returns:** *verify*

___

###  algRSsign

▸ **algRSsign**(`bits`: number): *sign*

Defined in jwt-js-decode.ts:805

**Parameters:**

Name | Type |
------ | ------ |
`bits` | number |

**Returns:** *sign*

___

###  algRSverify

▸ **algRSverify**(`bits`: number): *verify*

Defined in jwt-js-decode.ts:873

**Parameters:**

Name | Type |
------ | ------ |
`bits` | number |

**Returns:** *verify*

___

###  algSign

▸ **algSign**(`algorithm`: string, `thing`: string, `secret`: string): *Promise‹string›*

Defined in jwt-js-decode.ts:918

Universal algorithm signer

**Parameters:**

Name | Type |
------ | ------ |
`algorithm` | string |
`thing` | string |
`secret` | string |

**Returns:** *Promise‹string›*

___

###  algVerify

▸ **algVerify**(`algorithm`: string, `thing`: string, `signature`: string, `secret`: string): *Promise‹boolean›*

Defined in jwt-js-decode.ts:889

Universal algorithm verifier

**Parameters:**

Name | Type |
------ | ------ |
`algorithm` | string |
`thing` | string |
`signature` | string |
`secret` | string |

**Returns:** *Promise‹boolean›*

___

###  asn12jwk

▸ **asn12jwk**(`asn1`: any, `type?`: undefined | string, `extra?`: any): *any*

Defined in jwt-js-decode.ts:695

**Parameters:**

Name | Type |
------ | ------ |
`asn1` | any |
`type?` | undefined &#124; string |
`extra?` | any |

**Returns:** *any*

___

###  b2bu

▸ **b2bu**(`str`: string): *string*

Defined in jwt-js-decode.ts:225

Converts base64 string to base64url string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`str` | string | data string to convert  |

**Returns:** *string*

base64url string

___

###  b2s

▸ **b2s**(`str`: string): *string*

Defined in jwt-js-decode.ts:206

Converts string to base64 string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`str` | string | data string to convert  |

**Returns:** *string*

decoded data string

___

###  bu2b

▸ **bu2b**(`str`: string): *string*

Defined in jwt-js-decode.ts:244

Converts base64url string to base64 string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`str` | string | data string to convert  |

**Returns:** *string*

base64 string

___

###  bu2s

▸ **bu2s**(`str`: string): *string*

Defined in jwt-js-decode.ts:264

Converts base64url string to string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`str` | string | base64url string to convert  |

**Returns:** *string*

decoded data string

___

###  cleanZeros

▸ **cleanZeros**(`b`: any): *any*

Defined in util.ts:23

**Parameters:**

Name | Type |
------ | ------ |
`b` | any |

**Returns:** *any*

___

###  createHmac

▸ **createHmac**(`name`: string, `secret`: string): *Promise‹any›*

Defined in jwt-js-decode.ts:431

Async function inspired by createHmac in crypto (used WebCrypto Api supported by most browsers)

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`secret` | string |

**Returns:** *Promise‹any›*

___

###  createSign

▸ **createSign**(`name`: string): *Promise‹any›*

Defined in jwt-js-decode.ts:749

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *Promise‹any›*

___

###  createVerify

▸ **createVerify**(`name`: string): *Promise‹any›*

Defined in jwt-js-decode.ts:816

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *Promise‹any›*

___

###  generateErrorMessage

▸ **generateErrorMessage**(`value`: any, `callee`: any, `argumentName`: string, `defaultType`: string): *string*

Defined in util.ts:6

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`value` | any | - |
`callee` | any | - |
`argumentName` | string | "argument" |
`defaultType` | string | "string" |

**Returns:** *string*

___

###  hex2AB

▸ **hex2AB**(`hex`: string): *ArrayBuffer | Uint8Array*

Defined in util.ts:27

**Parameters:**

Name | Type |
------ | ------ |
`hex` | string |

**Returns:** *ArrayBuffer | Uint8Array*

___

###  isGzip

▸ **isGzip**(`header`: [JwtPart](interfaces/jwtpart.md)): *boolean*

Defined in jwt-js-decode.ts:275

Check if header has zip property (and it is equal to 'GZIP', ignorecase)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`header` | [JwtPart](interfaces/jwtpart.md) | object to check  |

**Returns:** *boolean*

does it have gzip in zip property

___

###  jwtDecode

▸ **jwtDecode**(`str`: string, `callee`: string): *[JwtDecode](classes/jwtdecode.md)*

Defined in jwt-js-decode.ts:286

Decode jwtToken header and payload

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`str` | string | - | data string to decode  |
`callee` | string | "jwtDecode" | - |

**Returns:** *[JwtDecode](classes/jwtdecode.md)*

object with decoded header and body, and signature untouched

___

###  jwtResign

▸ **jwtResign**(`jwtStr`: string, `secret`: string, `alg?`: undefined | string): *Promise‹string›*

Defined in jwt-js-decode.ts:961

**Parameters:**

Name | Type |
------ | ------ |
`jwtStr` | string |
`secret` | string |
`alg?` | undefined &#124; string |

**Returns:** *Promise‹string›*

___

###  jwtSign

▸ **jwtSign**(`jwtStr`: string, `secret`: string): *Promise‹string›*

Defined in jwt-js-decode.ts:952

**Parameters:**

Name | Type |
------ | ------ |
`jwtStr` | string |
`secret` | string |

**Returns:** *Promise‹string›*

___

###  jwtSplit

▸ **jwtSplit**(`str`: string, `callee`: string): *[JwtSplit](classes/jwtsplit.md)*

Defined in jwt-js-decode.ts:297

Split jwtToken into object {header, payload, signature}

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`str` | string | - | data string to split  |
`callee` | string | "jwtSplit" | - |

**Returns:** *[JwtSplit](classes/jwtsplit.md)*

jwt split object of three strings

___

###  jwtVerify

▸ **jwtVerify**(`jwtStr`: string, `secret`: string): *Promise‹boolean›*

Defined in jwt-js-decode.ts:943

**Parameters:**

Name | Type |
------ | ------ |
`jwtStr` | string |
`secret` | string |

**Returns:** *Promise‹boolean›*

___

###  num2hex

▸ **num2hex**(`memo`: string, `i`: number): *string*

Defined in util.ts:18

**Parameters:**

Name | Type |
------ | ------ |
`memo` | string |
`i` | number |

**Returns:** *string*

___

###  pem2asn1

▸ **pem2asn1**(`buff`: ArrayBuffer | Uint8Array): *any*

Defined in jwt-js-decode.ts:657

**Parameters:**

Name | Type |
------ | ------ |
`buff` | ArrayBuffer &#124; Uint8Array |

**Returns:** *any*

___

###  pem2jwk

▸ **pem2jwk**(`secret`: string, `type?`: "public" | "private", `extra?`: any): *Promise‹any›*

Defined in jwt-js-decode.ts:731

**Parameters:**

Name | Type |
------ | ------ |
`secret` | string |
`type?` | "public" &#124; "private" |
`extra?` | any |

**Returns:** *Promise‹any›*

___

###  s2AB

▸ **s2AB**(`str`: string): *ArrayBuffer | Uint8Array*

Defined in jwt-js-decode.ts:408

Converts string to ArrayBuffer

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`str` | string | data string to convert  |

**Returns:** *ArrayBuffer | Uint8Array*

charCode ArrayBuffer

___

###  s2J

▸ **s2J**(`str`: string): *any*

Defined in jwt-js-decode.ts:176

Converts string to JSON object

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`str` | string | data string to convert  |

**Returns:** *any*

resulting object

___

###  s2b

▸ **s2b**(`str`: string): *string*

Defined in jwt-js-decode.ts:310

Converts base64 string to string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`str` | string | data string to convert  |

**Returns:** *string*

base64 string

___

###  s2bu

▸ **s2bu**(`str`: string): *string*

Defined in jwt-js-decode.ts:329

Converts string to base64url string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`str` | string | data string to convert  |

**Returns:** *string*

base64url string

___

###  s2pem

▸ **s2pem**(`secret`: string): *[PEM](interfaces/pem.md)*

Defined in jwt-js-decode.ts:491

**Parameters:**

Name | Type |
------ | ------ |
`secret` | string |

**Returns:** *[PEM](interfaces/pem.md)*

___

###  s2zbu

▸ **s2zbu**(`str`: string): *string*

Defined in jwt-js-decode.ts:340

Gzip and encode data string to base64url string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`str` | string | data string to encode  |

**Returns:** *string*

base64url string

___

###  stringCut

▸ **stringCut**(`str`: any, `len`: any): *any*

Defined in asn1.ts:8

**Parameters:**

Name | Type |
------ | ------ |
`str` | any |
`len` | any |

**Returns:** *any*

___

###  tryPromise

▸ **tryPromise**(`fn`: any): *Promise‹any›*

Defined in jwt-js-decode.ts:161

Try running function and replace it's response as Promise.resolve/reject

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`fn` | any | fn to call in for response  |

**Returns:** *Promise‹any›*

resulting Promise

___

###  unzip

▸ **unzip**(`str`: string): *string*

Defined in jwt-js-decode.ts:351

Converts from gzip data string to string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`str` | string | data string to convert  |

**Returns:** *string*

decoded data string

___

###  zbu2s

▸ **zbu2s**(`str`: string): *string*

Defined in jwt-js-decode.ts:374

Decode from base64url and unzip data string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`str` | string | data string to decode  |

**Returns:** *string*

decoded data string

___

###  zip

▸ **zip**(`str`: string): *string*

Defined in jwt-js-decode.ts:385

Converts string to gzip data string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`str` | string | data string to convert  |

**Returns:** *string*

gzip data string
