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
| `s2zbu` | (`str`: `string`, `type`: `string`) => `string` |
| `signJwt` | (`jwtStr`: `string`, `secret`: `string`) => `Promise`<`string`\> |
| `splitJwt` | (`str`: `string`, `callee`: `string`) => [`JwtSplit`](classes/JwtSplit.md) |
| `tryPromise` | (`fn`: `any`) => `Promise`<`any`\> |
| `unzip` | (`str`: `string`) => `string` |
| `verifyJwt` | (`jwtStr`: `string`, `secret`: `string`) => `Promise`<`boolean`\> |
| `zbu2s` | (`str`: `string`) => `string` |
| `zip` | (`str`: `string`, `type`: `string`) => `string` |

#### Defined in

[jwt-js-decode.ts:995](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L995)

___

### webCrypto

• `Const` **webCrypto**: ``false`` \| `Crypto`

#### Defined in

[jwt-js-decode.ts:30](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L30)

___

### webCryptoSubtle

• `Const` **webCryptoSubtle**: ``false`` \| `SubtleCrypto`

#### Defined in

[jwt-js-decode.ts:31](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L31)

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

[jwt-js-decode.ts:432](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L432)

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

[jwt-js-decode.ts:185](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L185)

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

[jwt-js-decode.ts:472](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L472)

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

[jwt-js-decode.ts:491](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L491)

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

[jwt-js-decode.ts:820](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L820)

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

[jwt-js-decode.ts:888](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L888)

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

[jwt-js-decode.ts:933](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L933)

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

[jwt-js-decode.ts:904](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L904)

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

[jwt-js-decode.ts:710](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L710)

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

[jwt-js-decode.ts:219](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L219)

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

[jwt-js-decode.ts:200](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L200)

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

[jwt-js-decode.ts:238](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L238)

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

[jwt-js-decode.ts:258](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L258)

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

[jwt-js-decode.ts:442](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L442)

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

[jwt-js-decode.ts:764](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L764)

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

[jwt-js-decode.ts:831](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L831)

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

[jwt-js-decode.ts:269](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L269)

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

[jwt-js-decode.ts:280](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L280)

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

[jwt-js-decode.ts:976](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L976)

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

[jwt-js-decode.ts:967](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L967)

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

[jwt-js-decode.ts:291](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L291)

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

[jwt-js-decode.ts:958](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L958)

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

[jwt-js-decode.ts:672](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L672)

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

[jwt-js-decode.ts:746](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L746)

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

[jwt-js-decode.ts:976](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L976)

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

[jwt-js-decode.ts:418](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L418)

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

[jwt-js-decode.ts:170](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L170)

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

[jwt-js-decode.ts:304](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L304)

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

[jwt-js-decode.ts:323](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L323)

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

[jwt-js-decode.ts:506](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L506)

___

### s2zbu

▸ **s2zbu**(`str`, `type?`): `string`

Zip and encode data string to base64url string

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `str` | `string` | `undefined` | data string to encode |
| `type` | `string` | `'zlib'` | type of zip type: "zlib", "gzip". default: "zlib" |

#### Returns

`string`

base64url string

#### Defined in

[jwt-js-decode.ts:335](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L335)

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

[jwt-js-decode.ts:967](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L967)

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

[jwt-js-decode.ts:291](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L291)

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

[jwt-js-decode.ts:155](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L155)

___

### unzip

▸ **unzip**(`str`): `string`

Converts from zip data string to string

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | data string to convert |

#### Returns

`string`

decoded data string

#### Defined in

[jwt-js-decode.ts:346](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L346)

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

[jwt-js-decode.ts:958](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L958)

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

[jwt-js-decode.ts:377](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L377)

___

### zip

▸ **zip**(`str`, `type?`): `string`

Converts string to zip data string

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `str` | `string` | `undefined` | data string to convert |
| `type` | `string` | `'zlib'` | type of zip type: "zlib", "gzip". default: "zlib" |

#### Returns

`string`

zip data string

#### Defined in

[jwt-js-decode.ts:389](https://github.com/tomitribe/jwt-js-decode/blob/000f334/src/jwt-js-decode.ts#L389)
