[jwt-js-decode](../README.md) > [JwtSplit](../classes/jwtsplit.md)

# Class: JwtSplit

Class for creating a JwtSplit object with three parts of JWT Token as strings
*__class__*: JwtSplit

## Hierarchy

**JwtSplit**

## Index

### Constructors

* [constructor](jwtsplit.md#constructor)

### Properties

* [header](jwtsplit.md#header)
* [payload](jwtsplit.md#payload)
* [signature](jwtsplit.md#signature)

### Methods

* [toString](jwtsplit.md#tostring)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new JwtSplit**(str: *`string`*): [JwtSplit](jwtsplit.md)

*Defined in jwt-js-decode.ts:70*

**Parameters:**

| Param | Type |
| ------ | ------ |
| str | `string` |

**Returns:** [JwtSplit](jwtsplit.md)

___

## Properties

<a id="header"></a>

###  header

**● header**: *`string`*

*Defined in jwt-js-decode.ts:54*

Header (first) part of JWT Token
*__name__*: header

*__type__*: {string}

___
<a id="payload"></a>

###  payload

**● payload**: *`string`*

*Defined in jwt-js-decode.ts:62*

Payload (second) part of JWT Token
*__name__*: payload

*__type__*: {string}

___
<a id="signature"></a>

###  signature

**● signature**: *`string`*

*Defined in jwt-js-decode.ts:70*

Signature (third) part of JWT Token
*__name__*: signature

*__type__*: {string}

___

## Methods

<a id="tostring"></a>

###  toString

▸ **toString**(): `string`

*Defined in jwt-js-decode.ts:88*

**Returns:** `string`

___

