[jwt-js-decode](../README.md) > [ASN1](../classes/asn1.md)

# Class: ASN1

## Hierarchy

**ASN1**

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
* [decode](asn1.md#decode)
* [decodeLength](asn1.md#decodelength)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ASN1**(stream: *`any`*, header: *`any`*, length: *`any`*, tag: *`any`*, sub: *`any`*): [ASN1](asn1.md)

*Defined in asn1.ts:225*

**Parameters:**

| Param | Type |
| ------ | ------ |
| stream | `any` |
| header | `any` |
| length | `any` |
| tag | `any` |
| sub | `any` |

**Returns:** [ASN1](asn1.md)

___

## Properties

<a id="header"></a>

###  header

**● header**: *`any`*

*Defined in asn1.ts:222*

___
<a id="length"></a>

###  length

**● length**: *`any`*

*Defined in asn1.ts:223*

___
<a id="stream"></a>

###  stream

**● stream**: *`any`*

*Defined in asn1.ts:221*

___
<a id="sub"></a>

###  sub

**● sub**: *`any`*

*Defined in asn1.ts:225*

___
<a id="tag"></a>

###  tag

**● tag**: *`any`*

*Defined in asn1.ts:224*

___

## Methods

<a id="content"></a>

###  content

▸ **content**(maxLength?: *`any`*): `any`

*Defined in asn1.ts:305*

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` maxLength | `any` |

**Returns:** `any`

___
<a id="getab"></a>

###  getAB

▸ **getAB**(clean?: *`boolean`*): `any`

*Defined in asn1.ts:387*

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| `Default value` clean | `boolean` | true |

**Returns:** `any`

___
<a id="gethex"></a>

###  getHex

▸ **getHex**(): `any`

*Defined in asn1.ts:383*

**Returns:** `any`

___
<a id="poscontent"></a>

###  posContent

▸ **posContent**(): `any`

*Defined in asn1.ts:371*

**Returns:** `any`

___
<a id="posend"></a>

###  posEnd

▸ **posEnd**(): `any`

*Defined in asn1.ts:375*

**Returns:** `any`

___
<a id="posstart"></a>

###  posStart

▸ **posStart**(): `any`

*Defined in asn1.ts:367*

**Returns:** `any`

___
<a id="tohexstring"></a>

###  toHexString

▸ **toHexString**(root?: *`any`*): `any`

*Defined in asn1.ts:379*

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` root | `any` |

**Returns:** `any`

___
<a id="tostring"></a>

###  toString

▸ **toString**(): `string`

*Defined in asn1.ts:363*

**Returns:** `string`

___
<a id="typename"></a>

###  typeName

▸ **typeName**():  `undefined` &#124; `string`

*Defined in asn1.ts:236*

**Returns:**  `undefined` &#124; `string`

___
<a id="decode"></a>

### `<Static>` decode

▸ **decode**(stream: *`any`*): [ASN1](asn1.md)

*Defined in asn1.ts:406*

**Parameters:**

| Param | Type |
| ------ | ------ |
| stream | `any` |

**Returns:** [ASN1](asn1.md)

___
<a id="decodelength"></a>

### `<Static>` decodeLength

▸ **decodeLength**(stream: *`any`*): `any`

*Defined in asn1.ts:391*

**Parameters:**

| Param | Type |
| ------ | ------ |
| stream | `any` |

**Returns:** `any`

___

