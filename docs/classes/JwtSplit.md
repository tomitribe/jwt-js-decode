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

- [fromString](JwtSplit.md#fromstring)
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

[jwt-js-decode.ts:63](https://github.com/tomitribe/jwt-js-decode/blob/07584e8/src/jwt-js-decode.ts#L63)

## Properties

### header

• **header**: `string` = `''`

Header (first) part of JWT Token

**`Name`**

header

#### Defined in

[jwt-js-decode.ts:45](https://github.com/tomitribe/jwt-js-decode/blob/07584e8/src/jwt-js-decode.ts#L45)

___

### payload

• **payload**: `string` = `''`

Payload (second) part of JWT Token

**`Name`**

payload

#### Defined in

[jwt-js-decode.ts:53](https://github.com/tomitribe/jwt-js-decode/blob/07584e8/src/jwt-js-decode.ts#L53)

___

### signature

• **signature**: `string` = `''`

Signature (third) part of JWT Token

**`Name`**

signature

#### Defined in

[jwt-js-decode.ts:61](https://github.com/tomitribe/jwt-js-decode/blob/07584e8/src/jwt-js-decode.ts#L61)

## Methods

### fromString

▸ **fromString**(`str`, `callee?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `str` | `string` | `undefined` |
| `callee` | `string` | `'JwtSplit.fromString'` |

#### Returns

`void`

#### Defined in

[jwt-js-decode.ts:70](https://github.com/tomitribe/jwt-js-decode/blob/07584e8/src/jwt-js-decode.ts#L70)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[jwt-js-decode.ts:83](https://github.com/tomitribe/jwt-js-decode/blob/07584e8/src/jwt-js-decode.ts#L83)
