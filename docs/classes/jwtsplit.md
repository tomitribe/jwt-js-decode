**[jwt-js-decode](../README.md)**

[Globals](../globals.md) › [JwtSplit](jwtsplit.md)

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

\+ **new JwtSplit**(`str`: string): *[JwtSplit](jwtsplit.md)*

Defined in jwt-js-decode.ts:70

**Parameters:**

Name | Type |
------ | ------ |
`str` | string |

**Returns:** *[JwtSplit](jwtsplit.md)*

## Properties

###  header

• **header**: *string*

Defined in jwt-js-decode.ts:54

Header (first) part of JWT Token

**`name`** header

**`type`** {string}

___

###  payload

• **payload**: *string*

Defined in jwt-js-decode.ts:62

Payload (second) part of JWT Token

**`name`** payload

**`type`** {string}

___

###  signature

• **signature**: *string*

Defined in jwt-js-decode.ts:70

Signature (third) part of JWT Token

**`name`** signature

**`type`** {string}

## Methods

###  toString

▸ **toString**(): *string*

Defined in jwt-js-decode.ts:88

**Returns:** *string*