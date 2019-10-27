[jwt-js-decode](../README.md) › [Globals](../globals.md) › [JwtSplit](jwtsplit.md)

# Class: JwtSplit

Class for creating a JwtSplit object with three parts of JWT Token as strings

**`class`** JwtSplit

## Hierarchy

* **JwtSplit**

## Index

### Constructors

* [constructor](jwtsplit.md#constructor)

### Properties

* [header](jwtsplit.md#header)
* [payload](jwtsplit.md#payload)
* [signature](jwtsplit.md#signature)

### Methods

* [toString](jwtsplit.md#tostring)

## Constructors

###  constructor

\+ **new JwtSplit**(`str`: string, `callee`: string): *[JwtSplit](jwtsplit.md)*

Defined in jwt-js-decode.ts:79

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`str` | string | - |
`callee` | string | "JwtSplit" |

**Returns:** *[JwtSplit](jwtsplit.md)*

## Properties

###  header

• **header**: *string*

Defined in jwt-js-decode.ts:63

Header (first) part of JWT Token

**`name`** header

**`type`** {string}

___

###  payload

• **payload**: *string*

Defined in jwt-js-decode.ts:71

Payload (second) part of JWT Token

**`name`** payload

**`type`** {string}

___

###  signature

• **signature**: *string*

Defined in jwt-js-decode.ts:79

Signature (third) part of JWT Token

**`name`** signature

**`type`** {string}

## Methods

###  toString

▸ **toString**(): *string*

Defined in jwt-js-decode.ts:97

**Returns:** *string*
