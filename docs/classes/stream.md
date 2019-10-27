[jwt-js-decode](../README.md) › [Globals](../globals.md) › [Stream](stream.md)

# Class: Stream

## Hierarchy

* **Stream**

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

## Constructors

###  constructor

\+ **new Stream**(`enc`: any, `pos`: number): *[Stream](stream.md)*

Defined in asn1.ts:16

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`enc` | any | - |
`pos` | number | 0 |

**Returns:** *[Stream](stream.md)*

## Properties

###  enc

• **enc**: *any*

Defined in asn1.ts:15

___

###  hexDigits

• **hexDigits**: *string* = "0123456789ABCDEF"

Defined in asn1.ts:36

___

###  pos

• **pos**: *any*

Defined in asn1.ts:16

## Methods

###  get

▸ **get**(`pos`: any): *any*

Defined in asn1.ts:28

**Parameters:**

Name | Type |
------ | ------ |
`pos` | any |

**Returns:** *any*

___

###  hexByte

▸ **hexByte**(`b`: any): *string*

Defined in asn1.ts:38

**Parameters:**

Name | Type |
------ | ------ |
`b` | any |

**Returns:** *string*

___

###  hexDump

▸ **hexDump**(`start`: any, `end`: any, `raw`: any): *string*

Defined in asn1.ts:42

**Parameters:**

Name | Type |
------ | ------ |
`start` | any |
`end` | any |
`raw` | any |

**Returns:** *string*

___

###  isASCII

▸ **isASCII**(`start`: any, `end`: any): *boolean*

Defined in asn1.ts:61

**Parameters:**

Name | Type |
------ | ------ |
`start` | any |
`end` | any |

**Returns:** *boolean*

___

###  parseBitString

▸ **parseBitString**(`start`: any, `end`: any, `maxLength`: any): *string*

Defined in asn1.ts:157

**Parameters:**

Name | Type |
------ | ------ |
`start` | any |
`end` | any |
`maxLength` | any |

**Returns:** *string*

___

###  parseInteger

▸ **parseInteger**(`start`: any, `end`: any): *string | 0 | -1*

Defined in asn1.ts:130

**Parameters:**

Name | Type |
------ | ------ |
`start` | any |
`end` | any |

**Returns:** *string | 0 | -1*

___

###  parseOID

▸ **parseOID**(`start`: any, `end`: any, `maxLength`: any): *any*

Defined in asn1.ts:188

**Parameters:**

Name | Type |
------ | ------ |
`start` | any |
`end` | any |
`maxLength` | any |

**Returns:** *any*

___

###  parseOctetString

▸ **parseOctetString**(`start`: any, `end`: any, `maxLength`: any): *any*

Defined in asn1.ts:173

**Parameters:**

Name | Type |
------ | ------ |
`start` | any |
`end` | any |
`maxLength` | any |

**Returns:** *any*

___

###  parseStringBMP

▸ **parseStringBMP**(`start`: any, `end`: any): *string*

Defined in asn1.ts:91

**Parameters:**

Name | Type |
------ | ------ |
`start` | any |
`end` | any |

**Returns:** *string*

___

###  parseStringISO

▸ **parseStringISO**(`start`: any, `end`: any): *string*

Defined in asn1.ts:70

**Parameters:**

Name | Type |
------ | ------ |
`start` | any |
`end` | any |

**Returns:** *string*

___

###  parseStringUTF

▸ **parseStringUTF**(`start`: any, `end`: any): *string*

Defined in asn1.ts:77

**Parameters:**

Name | Type |
------ | ------ |
`start` | any |
`end` | any |

**Returns:** *string*

___

###  parseTime

▸ **parseTime**(`start`: any, `end`: any, `shortYear`: any): *string*

Defined in asn1.ts:101

**Parameters:**

Name | Type |
------ | ------ |
`start` | any |
`end` | any |
`shortYear` | any |

**Returns:** *string*
