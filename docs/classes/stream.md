[jwt-js-decode](../README.md) > [Stream](../classes/stream.md)

# Class: Stream

## Hierarchy

**Stream**

## Index

### Constructors

* [constructor](stream.md#constructor)

### Properties

* [enc](stream.md#enc)
* [hexDigits](stream.md#hexdigits)
* [pos](stream.md#pos)

### Methods

* [get](stream.md#get)
* [hexByte](stream.md#hexbyte)
* [hexDump](stream.md#hexdump)
* [isASCII](stream.md#isascii)
* [parseBitString](stream.md#parsebitstring)
* [parseInteger](stream.md#parseinteger)
* [parseOID](stream.md#parseoid)
* [parseOctetString](stream.md#parseoctetstring)
* [parseStringBMP](stream.md#parsestringbmp)
* [parseStringISO](stream.md#parsestringiso)
* [parseStringUTF](stream.md#parsestringutf)
* [parseTime](stream.md#parsetime)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Stream**(enc: *`any`*, pos?: *`number`*): [Stream](stream.md)

*Defined in asn1.ts:16*

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| enc | `any` | - |
| `Default value` pos | `number` | 0 |

**Returns:** [Stream](stream.md)

___

## Properties

<a id="enc"></a>

###  enc

**● enc**: *`any`*

*Defined in asn1.ts:15*

___
<a id="hexdigits"></a>

###  hexDigits

**● hexDigits**: *`string`* = "0123456789ABCDEF"

*Defined in asn1.ts:36*

___
<a id="pos"></a>

###  pos

**● pos**: *`any`*

*Defined in asn1.ts:16*

___

## Methods

<a id="get"></a>

###  get

▸ **get**(pos: *`any`*): `any`

*Defined in asn1.ts:28*

**Parameters:**

| Param | Type |
| ------ | ------ |
| pos | `any` |

**Returns:** `any`

___
<a id="hexbyte"></a>

###  hexByte

▸ **hexByte**(b: *`any`*): `string`

*Defined in asn1.ts:38*

**Parameters:**

| Param | Type |
| ------ | ------ |
| b | `any` |

**Returns:** `string`

___
<a id="hexdump"></a>

###  hexDump

▸ **hexDump**(start: *`any`*, end: *`any`*, raw: *`any`*): `string`

*Defined in asn1.ts:42*

**Parameters:**

| Param | Type |
| ------ | ------ |
| start | `any` |
| end | `any` |
| raw | `any` |

**Returns:** `string`

___
<a id="isascii"></a>

###  isASCII

▸ **isASCII**(start: *`any`*, end: *`any`*): `boolean`

*Defined in asn1.ts:61*

**Parameters:**

| Param | Type |
| ------ | ------ |
| start | `any` |
| end | `any` |

**Returns:** `boolean`

___
<a id="parsebitstring"></a>

###  parseBitString

▸ **parseBitString**(start: *`any`*, end: *`any`*, maxLength: *`any`*): `string`

*Defined in asn1.ts:157*

**Parameters:**

| Param | Type |
| ------ | ------ |
| start | `any` |
| end | `any` |
| maxLength | `any` |

**Returns:** `string`

___
<a id="parseinteger"></a>

###  parseInteger

▸ **parseInteger**(start: *`any`*, end: *`any`*):  `string` &#124; `0` &#124; `-1`

*Defined in asn1.ts:130*

**Parameters:**

| Param | Type |
| ------ | ------ |
| start | `any` |
| end | `any` |

**Returns:**  `string` &#124; `0` &#124; `-1`

___
<a id="parseoid"></a>

###  parseOID

▸ **parseOID**(start: *`any`*, end: *`any`*, maxLength: *`any`*): `any`

*Defined in asn1.ts:188*

**Parameters:**

| Param | Type |
| ------ | ------ |
| start | `any` |
| end | `any` |
| maxLength | `any` |

**Returns:** `any`

___
<a id="parseoctetstring"></a>

###  parseOctetString

▸ **parseOctetString**(start: *`any`*, end: *`any`*, maxLength: *`any`*): `any`

*Defined in asn1.ts:173*

**Parameters:**

| Param | Type |
| ------ | ------ |
| start | `any` |
| end | `any` |
| maxLength | `any` |

**Returns:** `any`

___
<a id="parsestringbmp"></a>

###  parseStringBMP

▸ **parseStringBMP**(start: *`any`*, end: *`any`*): `string`

*Defined in asn1.ts:91*

**Parameters:**

| Param | Type |
| ------ | ------ |
| start | `any` |
| end | `any` |

**Returns:** `string`

___
<a id="parsestringiso"></a>

###  parseStringISO

▸ **parseStringISO**(start: *`any`*, end: *`any`*): `string`

*Defined in asn1.ts:70*

**Parameters:**

| Param | Type |
| ------ | ------ |
| start | `any` |
| end | `any` |

**Returns:** `string`

___
<a id="parsestringutf"></a>

###  parseStringUTF

▸ **parseStringUTF**(start: *`any`*, end: *`any`*): `string`

*Defined in asn1.ts:77*

**Parameters:**

| Param | Type |
| ------ | ------ |
| start | `any` |
| end | `any` |

**Returns:** `string`

___
<a id="parsetime"></a>

###  parseTime

▸ **parseTime**(start: *`any`*, end: *`any`*, shortYear: *`any`*): `string`

*Defined in asn1.ts:101*

**Parameters:**

| Param | Type |
| ------ | ------ |
| start | `any` |
| end | `any` |
| shortYear | `any` |

**Returns:** `string`

___

