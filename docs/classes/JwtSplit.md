[Jwt-js-decode Documentation](../README.md) / JwtSplit

# Class: JwtSplit

Class for creating a JwtSplit object with three parts of JWT Token as strings

## Table of contents

### Constructors

- [constructor](JwtSplit.md#constructor)

### Properties

- [header](JwtSplit.md#header)
- [payload](JwtSplit.md#payload)
- [signature](JwtSplit.md#signature)

### Methods

- [toString](JwtSplit.md#tostring)

## Constructors

### constructor

• **new JwtSplit**(`str`, `callee?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `str` | `string` | `undefined` |
| `callee` | `string` | `'JwtSplit'` |

#### Defined in

[jwt-js-decode.ts:62](https://github.com/tomitribe/jwt-js-decode/blob/8208960/src/jwt-js-decode.ts#L62)

## Properties

### header

• **header**: `string`

Header (first) part of JWT Token

**`Name`**

header

#### Defined in

[jwt-js-decode.ts:44](https://github.com/tomitribe/jwt-js-decode/blob/8208960/src/jwt-js-decode.ts#L44)

___

### payload

• **payload**: `string`

Payload (second) part of JWT Token

**`Name`**

payload

#### Defined in

[jwt-js-decode.ts:52](https://github.com/tomitribe/jwt-js-decode/blob/8208960/src/jwt-js-decode.ts#L52)

___

### signature

• **signature**: `string`

Signature (third) part of JWT Token

**`Name`**

signature

#### Defined in

[jwt-js-decode.ts:60](https://github.com/tomitribe/jwt-js-decode/blob/8208960/src/jwt-js-decode.ts#L60)

## Methods

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[jwt-js-decode.ts:78](https://github.com/tomitribe/jwt-js-decode/blob/8208960/src/jwt-js-decode.ts#L78)
