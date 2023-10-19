[Jwt-js-decode Documentation](../README.md) / JwtDecode

# Class: JwtDecode

Class for creating a JwtDecode object with three parts of JWT Token, header and payload decoded and parsed, signature in initial form

## Table of contents

### Constructors

- [constructor](JwtDecode.md#constructor)

### Properties

- [header](JwtDecode.md#header)
- [payload](JwtDecode.md#payload)
- [signature](JwtDecode.md#signature)

### Methods

- [fromString](JwtDecode.md#fromstring)
- [isGzip](JwtDecode.md#isgzip)
- [toString](JwtDecode.md#tostring)

## Constructors

### constructor

• **new JwtDecode**(`str`, `callee?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `str` | `string` | `undefined` |
| `callee` | `string` | `'JwtDecode'` |

#### Defined in

[jwt-js-decode.ts:122](https://github.com/tomitribe/jwt-js-decode/blob/77a7932/src/jwt-js-decode.ts#L122)

## Properties

### header

• **header**: `JwtPart` = `{}`

Header (first) part of JWT Token

**`Name`**

header

#### Defined in

[jwt-js-decode.ts:104](https://github.com/tomitribe/jwt-js-decode/blob/77a7932/src/jwt-js-decode.ts#L104)

___

### payload

• **payload**: `JwtPart` = `{}`

Payload (second) part of JWT Token

**`Name`**

payload

#### Defined in

[jwt-js-decode.ts:112](https://github.com/tomitribe/jwt-js-decode/blob/77a7932/src/jwt-js-decode.ts#L112)

___

### signature

• **signature**: `string` = `''`

Signature (third) part of JWT Token

**`Name`**

signature

#### Defined in

[jwt-js-decode.ts:120](https://github.com/tomitribe/jwt-js-decode/blob/77a7932/src/jwt-js-decode.ts#L120)

## Methods

### fromString

▸ **fromString**(`str`, `callee?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `str` | `any` | `undefined` |
| `callee` | `string` | `'JwtDecode.fromString'` |

#### Returns

`void`

#### Defined in

[jwt-js-decode.ts:133](https://github.com/tomitribe/jwt-js-decode/blob/77a7932/src/jwt-js-decode.ts#L133)

___

### isGzip

▸ **isGzip**(): `boolean`

#### Returns

`boolean`

#### Defined in

[jwt-js-decode.ts:129](https://github.com/tomitribe/jwt-js-decode/blob/77a7932/src/jwt-js-decode.ts#L129)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[jwt-js-decode.ts:146](https://github.com/tomitribe/jwt-js-decode/blob/77a7932/src/jwt-js-decode.ts#L146)
