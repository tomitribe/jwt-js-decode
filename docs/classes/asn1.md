[jwt-js-decode](../README.md) › [Globals](../globals.md) › [ASN1](asn1.md)

# Class: ASN1

## Hierarchy

* **ASN1**

## Index

### Constructors

* [constructor](asn1.md#constructor)

### Properties

* [header](asn1.md#header)
* [length](asn1.md#length)
* [stream](asn1.md#stream)
* [sub](asn1.md#sub)
* [tag](asn1.md#tag)

### Methods

* [content](asn1.md#content)
* [getAB](asn1.md#getab)
* [getHex](asn1.md#gethex)
* [posContent](asn1.md#poscontent)
* [posEnd](asn1.md#posend)
* [posStart](asn1.md#posstart)
* [toHexString](asn1.md#tohexstring)
* [toString](asn1.md#tostring)
* [typeName](asn1.md#typename)
* [decode](asn1.md#static-decode)
* [decodeLength](asn1.md#static-decodelength)

## Constructors

###  constructor

\+ **new ASN1**(`stream`: any, `header`: any, `length`: any, `tag`: any, `sub`: any): *[ASN1](asn1.md)*

Defined in asn1.ts:225

**Parameters:**

Name | Type |
------ | ------ |
`stream` | any |
`header` | any |
`length` | any |
`tag` | any |
`sub` | any |

**Returns:** *[ASN1](asn1.md)*

## Properties

###  header

• **header**: *any*

Defined in asn1.ts:222

___

###  length

• **length**: *any*

Defined in asn1.ts:223

___

###  stream

• **stream**: *any*

Defined in asn1.ts:221

___

###  sub

• **sub**: *any*

Defined in asn1.ts:225

___

###  tag

• **tag**: *any*

Defined in asn1.ts:224

## Methods

###  content

▸ **content**(`maxLength?`: any): *any*

Defined in asn1.ts:305

**Parameters:**

Name | Type |
------ | ------ |
`maxLength?` | any |

**Returns:** *any*

___

###  getAB

▸ **getAB**(`clean`: boolean): *any*

Defined in asn1.ts:387

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`clean` | boolean | true |

**Returns:** *any*

___

###  getHex

▸ **getHex**(): *any*

Defined in asn1.ts:383

**Returns:** *any*

___

###  posContent

▸ **posContent**(): *any*

Defined in asn1.ts:371

**Returns:** *any*

___

###  posEnd

▸ **posEnd**(): *any*

Defined in asn1.ts:375

**Returns:** *any*

___

###  posStart

▸ **posStart**(): *any*

Defined in asn1.ts:367

**Returns:** *any*

___

###  toHexString

▸ **toHexString**(`root?`: any): *any*

Defined in asn1.ts:379

**Parameters:**

Name | Type |
------ | ------ |
`root?` | any |

**Returns:** *any*

___

###  toString

▸ **toString**(): *string*

Defined in asn1.ts:363

**Returns:** *string*

___

###  typeName

▸ **typeName**(): *undefined | string*

Defined in asn1.ts:236

**Returns:** *undefined | string*

___

### `Static` decode

▸ **decode**(`stream`: any): *[ASN1](asn1.md)*

Defined in asn1.ts:406

**Parameters:**

Name | Type |
------ | ------ |
`stream` | any |

**Returns:** *[ASN1](asn1.md)*

___

### `Static` decodeLength

▸ **decodeLength**(`stream`: any): *any*

Defined in asn1.ts:391

**Parameters:**

Name | Type |
------ | ------ |
`stream` | any |

**Returns:** *any*
