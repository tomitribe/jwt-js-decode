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

[jwt-js-decode.ts:118](https://github.com/tomitribe/jwt-js-decode/blob/8208960/src/jwt-js-decode.ts#L118)

## Properties

### header

• **header**: `JwtPart` = `{}`

Header (first) part of JWT Token

**`Name`**

header

#### Defined in

[jwt-js-decode.ts:100](https://github.com/tomitribe/jwt-js-decode/blob/8208960/src/jwt-js-decode.ts#L100)

___

### payload

• **payload**: `JwtPart` = `{}`

Payload (second) part of JWT Token

**`Name`**

payload

#### Defined in

[jwt-js-decode.ts:108](https://github.com/tomitribe/jwt-js-decode/blob/8208960/src/jwt-js-decode.ts#L108)

___

### signature

• **signature**: `string` = `''`

Signature (third) part of JWT Token

**`Name`**

signature

#### Defined in

[jwt-js-decode.ts:116](https://github.com/tomitribe/jwt-js-decode/blob/8208960/src/jwt-js-decode.ts#L116)

## Methods

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[jwt-js-decode.ts:130](https://github.com/tomitribe/jwt-js-decode/blob/8208960/src/jwt-js-decode.ts#L130)
