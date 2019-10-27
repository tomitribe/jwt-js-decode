[jwt-js-decode](../README.md) › [Globals](../globals.md) › [JwtDecode](jwtdecode.md)

# Class: JwtDecode

Class for creating a JwtDecode object with three parts of JWT Token, header and payload decoded and parsed, signature in initial form

**`class`** JwtDecode

## Hierarchy

* **JwtDecode**

## Index

### Constructors

* [constructor](jwtdecode.md#constructor)

### Properties

* [header](jwtdecode.md#header)
* [payload](jwtdecode.md#payload)
* [signature](jwtdecode.md#signature)

### Methods

* [toString](jwtdecode.md#tostring)

## Constructors

###  constructor

\+ **new JwtDecode**(`str`: string, `callee`: string): *[JwtDecode](jwtdecode.md)*

Defined in jwt-js-decode.ts:135

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`str` | string | - |
`callee` | string | "JwtDecode" |

**Returns:** *[JwtDecode](jwtdecode.md)*

## Properties

###  header

• **header**: *[JwtPart](../interfaces/jwtpart.md)*

Defined in jwt-js-decode.ts:119

Header (first) part of JWT Token

**`name`** header

**`type`** {JwtPart}

___

###  payload

• **payload**: *[JwtPart](../interfaces/jwtpart.md)*

Defined in jwt-js-decode.ts:127

Payload (second) part of JWT Token

**`name`** payload

**`type`** {JwtPart}

___

###  signature

• **signature**: *string* = ""

Defined in jwt-js-decode.ts:135

Signature (third) part of JWT Token

**`name`** signature

**`type`** {string}

## Methods

###  toString

▸ **toString**(): *string*

Defined in jwt-js-decode.ts:149

**Returns:** *string*
