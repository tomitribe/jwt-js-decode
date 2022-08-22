Jwt-js-decode Documentation

# Jwt-js-decode Documentation

## Table of contents

### Classes

- [Asn1Tag](classes/Asn1Tag.md)
- [JwtDecode](classes/JwtDecode.md)
- [JwtSplit](classes/JwtSplit.md)

### Interfaces

- [PEM](interfaces/PEM.md)

### Variables

- [default](README.md#default)
- [webCrypto](README.md#webcrypto)
- [webCryptoSubtle](README.md#webcryptosubtle)

### Functions

- [AB2s](README.md#ab2s)
- [J2s](README.md#j2s)
- [algHSsign](README.md#alghssign)
- [algHSverify](README.md#alghsverify)
- [algRSsign](README.md#algrssign)
- [algRSverify](README.md#algrsverify)
- [algSign](README.md#algsign)
- [algVerify](README.md#algverify)
- [asn12jwk](README.md#asn12jwk)
- [b2bu](README.md#b2bu)
- [b2s](README.md#b2s)
- [bu2b](README.md#bu2b)
- [bu2s](README.md#bu2s)
- [createHmac](README.md#createhmac)
- [createSign](README.md#createsign)
- [createVerify](README.md#createverify)
- [isGzip](README.md#isgzip)
- [jwtDecode](README.md#jwtdecode)
- [jwtResign](README.md#jwtresign)
- [jwtSign](README.md#jwtsign)
- [jwtSplit](README.md#jwtsplit)
- [jwtVerify](README.md#jwtverify)
- [pem2asn1](README.md#pem2asn1)
- [pem2jwk](README.md#pem2jwk)
- [resignJwt](README.md#resignjwt)
- [s2AB](README.md#s2ab)
- [s2J](README.md#s2j)
- [s2b](README.md#s2b)
- [s2bu](README.md#s2bu)
- [s2pem](README.md#s2pem)
- [s2zbu](README.md#s2zbu)
- [signJwt](README.md#signjwt)
- [splitJwt](README.md#splitjwt)
- [tryPromise](README.md#trypromise)
- [unzip](README.md#unzip)
- [verifyJwt](README.md#verifyjwt)
- [zbu2s](README.md#zbu2s)
- [zip](README.md#zip)

## Variables

### default

• **default**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `AB2hex` | (`buff`: `ArrayBuffer` \| `Uint8Array`) => `string` |
| `AB2s` | (`buff`: `ArrayBuffer` \| `Uint8Array`) => `string` |
| `ILLEGAL_ARGUMENT` | `string` |
| `J2s` | (`obj`: `any`) => `string` |
| `UNSUPPORTED_ALGORITHM` | `string` |
| `algHSsign` | (`bits`: `number`) => (`thing`: `string`, `secret`: `string`) => `Promise`<`string`\> |
| `algHSverify` | (`bits`: `number`) => (`thing`: `string`, `signature`: `string`, `secret`: `string`) => `Promise`<`boolean`\> |
| `algRSsign` | (`bits`: `number`) => (`thing`: `string`, `privateKey`: `string`) => `Promise`<`string`\> |
| `algRSverify` | (`bits`: `number`) => (`thing`: `string`, `signature`: `string`, `publicKey`: `string`) => `Promise`<`boolean`\> |
| `algSign` | (`algorithm`: `string`, `thing`: `string`, `secret`: `string`) => `Promise`<`string`\> |
| `algVerify` | (`algorithm`: `string`, `thing`: `string`, `signature`: `string`, `secret`: `string`) => `Promise`<`boolean`\> |
| `asn12jwk` | (`asn1`: `any`, `type?`: `string`, `extra?`: `any`) => `any` |
| `b2bu` | (`str`: `string`) => `string` |
| `b2s` | (`str`: `string`) => `string` |
| `bu2b` | (`str`: `string`) => `string` |
| `bu2s` | (`str`: `string`) => `string` |
| `cleanZeros` | (`b`: `any`) => `any` |
| `createHmac` | (`name`: `string`, `secret`: `string`) => `Promise`<`any`\> |
| `createSign` | (`name`: `string`) => `Promise`<`any`\> |
| `createVerify` | (`name`: `string`) => `Promise`<`any`\> |
| `hex2AB` | (`hex`: `string`) => `ArrayBuffer` \| `Uint8Array` |
| `isGzip` | (`header`: `JwtPart`) => `boolean` |
| `jwtDecode` | (`str`: `string`, `callee`: `string`) => [`JwtDecode`](classes/JwtDecode.md) |
| `jwtResign` | (`jwtStr`: `string`, `secret`: `string`, `alg?`: `string`) => `Promise`<`string`\> |
| `jwtSign` | (`jwtStr`: `string`, `secret`: `string`) => `Promise`<`string`\> |
| `jwtSplit` | (`str`: `string`, `callee`: `string`) => [`JwtSplit`](classes/JwtSplit.md) |
| `jwtVerify` | (`jwtStr`: `string`, `secret`: `string`) => `Promise`<`boolean`\> |
| `num2hex` | (`memo`: `string`, `i`: `number`) => `string` |
| `pem2asn1` | (`buff`: `ArrayBuffer` \| `Uint8Array`) => `any` |
| `pem2jwk` | (`secret`: `string`, `type?`: ``"private"`` \| ``"public"``, `extra?`: `any`) => `Promise`<`any`\> |
| `resignJwt` | (`jwtStr`: `string`, `secret`: `string`, `alg?`: `string`) => `Promise`<`string`\> |
| `s2AB` | (`str`: `string`) => `ArrayBuffer` |
| `s2J` | (`str`: `string`) => `any` |
| `s2b` | (`str`: `string`) => `string` |
| `s2bu` | (`str`: `string`) => `string` |
| `s2pem` | (`secret`: `string`) => [`PEM`](interfaces/PEM.md) |
| `s2zbu` | (`str`: `string`) => `string` |
| `signJwt` | (`jwtStr`: `string`, `secret`: `string`) => `Promise`<`string`\> |
| `splitJwt` | (`str`: `string`, `callee`: `string`) => [`JwtSplit`](classes/JwtSplit.md) |
| `tryPromise` | (`fn`: `any`) => `Promise`<`any`\> |
| `unzip` | (`str`: `string`) => `string` |
| `verifyJwt` | (`jwtStr`: `string`, `secret`: `string`) => `Promise`<`boolean`\> |
| `zbu2s` | (`str`: `string`) => `string` |
| `zip` | (`str`: `string`) => `string` |

#### Defined in

[jwt-js-decode.ts:962](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L962)

___

### webCrypto

• `Const` **webCrypto**: ``false`` \| `Crypto`

#### Defined in

[jwt-js-decode.ts:29](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L29)

___

### webCryptoSubtle

• `Const` **webCryptoSubtle**: ``false`` \| `SubtleCrypto`

#### Defined in

[jwt-js-decode.ts:30](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L30)

## Functions

### AB2s

▸ **AB2s**(`buff`): `string`

Converts ArrayBuffer to string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `buff` | `ArrayBuffer` \| `Uint8Array` | charCode ArrayBuffer to convert |

#### Returns

`string`

data string

#### Defined in

[jwt-js-decode.ts:399](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L399)

___

### J2s

▸ **J2s**(`obj`): `string`

Converts JSON object to string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `any` | JSON object to convert |

#### Returns

`string`

resulting string

#### Defined in

[jwt-js-decode.ts:172](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L172)

___

### algHSsign

▸ **algHSsign**(`bits`): (`thing`: `string`, `secret`: `string`) => `Promise`<`string`\>

Algorithm HMAC sign generator

#### Parameters

| Name | Type |
| :------ | :------ |
| `bits` | `number` |

#### Returns

`fn`

▸ (`thing`, `secret`): `Promise`<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `thing` | `string` |
| `secret` | `string` |

##### Returns

`Promise`<`string`\>

#### Defined in

[jwt-js-decode.ts:439](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L439)

___

### algHSverify

▸ **algHSverify**(`bits`): (`thing`: `string`, `signature`: `string`, `secret`: `string`) => `Promise`<`boolean`\>

Algorithm HMAC verify generator

#### Parameters

| Name | Type |
| :------ | :------ |
| `bits` | `number` |

#### Returns

`fn`

▸ (`thing`, `signature`, `secret`): `Promise`<`boolean`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `thing` | `string` |
| `signature` | `string` |
| `secret` | `string` |

##### Returns

`Promise`<`boolean`\>

#### Defined in

[jwt-js-decode.ts:458](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L458)

___

### algRSsign

▸ **algRSsign**(`bits`): (`thing`: `string`, `privateKey`: `string`) => `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bits` | `number` |

#### Returns

`fn`

▸ (`thing`, `privateKey`): `Promise`<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `thing` | `string` |
| `privateKey` | `string` |

##### Returns

`Promise`<`string`\>

#### Defined in

[jwt-js-decode.ts:787](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L787)

___

### algRSverify

▸ **algRSverify**(`bits`): (`thing`: `string`, `signature`: `string`, `publicKey`: `string`) => `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `bits` | `number` |

#### Returns

`fn`

▸ (`thing`, `signature`, `publicKey`): `Promise`<`boolean`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `thing` | `string` |
| `signature` | `string` |
| `publicKey` | `string` |

##### Returns

`Promise`<`boolean`\>

#### Defined in

[jwt-js-decode.ts:855](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L855)

___

### algSign

▸ **algSign**(`algorithm`, `thing`, `secret`): `Promise`<`string`\>

Universal algorithm signer

#### Parameters

| Name | Type |
| :------ | :------ |
| `algorithm` | `string` |
| `thing` | `string` |
| `secret` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[jwt-js-decode.ts:900](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L900)

___

### algVerify

▸ **algVerify**(`algorithm`, `thing`, `signature`, `secret`): `Promise`<`boolean`\>

Universal algorithm verifier

#### Parameters

| Name | Type |
| :------ | :------ |
| `algorithm` | `string` |
| `thing` | `string` |
| `signature` | `string` |
| `secret` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[jwt-js-decode.ts:871](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L871)

___

### asn12jwk

▸ **asn12jwk**(`asn1`, `type?`, `extra?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `asn1` | `any` |
| `type?` | `string` |
| `extra?` | `any` |

#### Returns

`any`

#### Defined in

[jwt-js-decode.ts:677](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L677)

___

### b2bu

▸ **b2bu**(`str`): `string`

Converts base64 string to base64url string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | data string to convert |

#### Returns

`string`

base64url string

#### Defined in

[jwt-js-decode.ts:206](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L206)

___

### b2s

▸ **b2s**(`str`): `string`

Converts string to base64 string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | data string to convert |

#### Returns

`string`

decoded data string

#### Defined in

[jwt-js-decode.ts:187](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L187)

___

### bu2b

▸ **bu2b**(`str`): `string`

Converts base64url string to base64 string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | data string to convert |

#### Returns

`string`

base64 string

#### Defined in

[jwt-js-decode.ts:225](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L225)

___

### bu2s

▸ **bu2s**(`str`): `string`

Converts base64url string to string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | base64url string to convert |

#### Returns

`string`

decoded data string

#### Defined in

[jwt-js-decode.ts:245](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L245)

___

### createHmac

▸ **createHmac**(`name`, `secret`): `Promise`<`any`\>

Async function inspired by createHmac in crypto (used WebCrypto Api supported by most browsers)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `secret` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[jwt-js-decode.ts:409](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L409)

___

### createSign

▸ **createSign**(`name`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[jwt-js-decode.ts:731](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L731)

___

### createVerify

▸ **createVerify**(`name`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<`any`\>

#### Defined in

[jwt-js-decode.ts:798](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L798)

___

### isGzip

▸ **isGzip**(`header`): `boolean`

Check if header has zip property (and it is equal to 'GZIP', ignorecase)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `header` | `JwtPart` | object to check |

#### Returns

`boolean`

does it have gzip in zip property

#### Defined in

[jwt-js-decode.ts:256](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L256)

___

### jwtDecode

▸ **jwtDecode**(`str`, `callee?`): [`JwtDecode`](classes/JwtDecode.md)

Decode jwtToken header and payload

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `str` | `string` | `undefined` | data string to decode |
| `callee` | `string` | `'jwtDecode'` | - |

#### Returns

[`JwtDecode`](classes/JwtDecode.md)

object with decoded header and body, and signature untouched

#### Defined in

[jwt-js-decode.ts:267](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L267)

___

### jwtResign

▸ **jwtResign**(`jwtStr`, `secret`, `alg?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jwtStr` | `string` |
| `secret` | `string` |
| `alg?` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[jwt-js-decode.ts:943](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L943)

___

### jwtSign

▸ **jwtSign**(`jwtStr`, `secret`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jwtStr` | `string` |
| `secret` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[jwt-js-decode.ts:934](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L934)

___

### jwtSplit

▸ **jwtSplit**(`str`, `callee?`): [`JwtSplit`](classes/JwtSplit.md)

Split jwtToken into object {header, payload, signature}

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `str` | `string` | `undefined` | data string to split |
| `callee` | `string` | `'jwtSplit'` | - |

#### Returns

[`JwtSplit`](classes/JwtSplit.md)

jwt split object of three strings

#### Defined in

[jwt-js-decode.ts:278](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L278)

___

### jwtVerify

▸ **jwtVerify**(`jwtStr`, `secret`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jwtStr` | `string` |
| `secret` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[jwt-js-decode.ts:925](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L925)

___

### pem2asn1

▸ **pem2asn1**(`buff`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `buff` | `ArrayBuffer` \| `Uint8Array` |

#### Returns

`any`

#### Defined in

[jwt-js-decode.ts:639](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L639)

___

### pem2jwk

▸ **pem2jwk**(`secret`, `type?`, `extra?`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `secret` | `string` |
| `type?` | ``"private"`` \| ``"public"`` |
| `extra?` | `any` |

#### Returns

`Promise`<`any`\>

#### Defined in

[jwt-js-decode.ts:713](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L713)

___

### resignJwt

▸ **resignJwt**(`jwtStr`, `secret`, `alg?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jwtStr` | `string` |
| `secret` | `string` |
| `alg?` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[jwt-js-decode.ts:943](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L943)

___

### s2AB

▸ **s2AB**(`str`): `ArrayBuffer`

Converts string to ArrayBuffer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | data string to convert |

#### Returns

`ArrayBuffer`

charCode ArrayBuffer

#### Defined in

[jwt-js-decode.ts:385](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L385)

___

### s2J

▸ **s2J**(`str`): `any`

Converts string to JSON object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | data string to convert |

#### Returns

`any`

resulting object

#### Defined in

[jwt-js-decode.ts:157](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L157)

___

### s2b

▸ **s2b**(`str`): `string`

Converts base64 string to string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | data string to convert |

#### Returns

`string`

base64 string

#### Defined in

[jwt-js-decode.ts:291](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L291)

___

### s2bu

▸ **s2bu**(`str`): `string`

Converts string to base64url string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | data string to convert |

#### Returns

`string`

base64url string

#### Defined in

[jwt-js-decode.ts:310](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L310)

___

### s2pem

▸ **s2pem**(`secret`): [`PEM`](interfaces/PEM.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `secret` | `string` |

#### Returns

[`PEM`](interfaces/PEM.md)

#### Defined in

[jwt-js-decode.ts:473](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L473)

___

### s2zbu

▸ **s2zbu**(`str`): `string`

Gzip and encode data string to base64url string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | data string to encode |

#### Returns

`string`

base64url string

#### Defined in

[jwt-js-decode.ts:321](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L321)

___

### signJwt

▸ **signJwt**(`jwtStr`, `secret`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jwtStr` | `string` |
| `secret` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[jwt-js-decode.ts:934](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L934)

___

### splitJwt

▸ **splitJwt**(`str`, `callee?`): [`JwtSplit`](classes/JwtSplit.md)

Split jwtToken into object {header, payload, signature}

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `str` | `string` | `undefined` | data string to split |
| `callee` | `string` | `'jwtSplit'` | - |

#### Returns

[`JwtSplit`](classes/JwtSplit.md)

jwt split object of three strings

#### Defined in

[jwt-js-decode.ts:278](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L278)

___

### tryPromise

▸ **tryPromise**(`fn`): `Promise`<`any`\>

Try running function and replace it's response as Promise.resolve/reject

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | `any` | fn to call in for response |

#### Returns

`Promise`<`any`\>

resulting Promise

#### Defined in

[jwt-js-decode.ts:142](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L142)

___

### unzip

▸ **unzip**(`str`): `string`

Converts from gzip data string to string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | data string to convert |

#### Returns

`string`

decoded data string

#### Defined in

[jwt-js-decode.ts:332](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L332)

___

### verifyJwt

▸ **verifyJwt**(`jwtStr`, `secret`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `jwtStr` | `string` |
| `secret` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[jwt-js-decode.ts:925](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L925)

___

### zbu2s

▸ **zbu2s**(`str`): `string`

Decode from base64url and unzip data string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | data string to decode |

#### Returns

`string`

decoded data string

#### Defined in

[jwt-js-decode.ts:353](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L353)

___

### zip

▸ **zip**(`str`): `string`

Converts string to gzip data string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | data string to convert |

#### Returns

`string`

gzip data string

#### Defined in

[jwt-js-decode.ts:364](https://github.com/tomitribe/jwt-js-decode/blob/91ca043/src/jwt-js-decode.ts#L364)
