[jwt-js-decode](../README.md) > [JwtJsDecode](../classes/jwtjsdecode.md)

# Class: JwtJsDecode

## Hierarchy

**JwtJsDecode**

## Index

### Methods

* [b2bu](jwtjsdecode.md#b2bu)
* [b2s](jwtjsdecode.md#b2s)
* [bu2b](jwtjsdecode.md#bu2b)
* [bu2s](jwtjsdecode.md#bu2s)
* [isGzip](jwtjsdecode.md#isgzip)
* [jwtDecode](jwtjsdecode.md#jwtdecode)
* [jwtSplit](jwtjsdecode.md#jwtsplit)
* [s2b](jwtjsdecode.md#s2b)
* [s2bu](jwtjsdecode.md#s2bu)
* [s2zbu](jwtjsdecode.md#s2zbu)
* [unzip](jwtjsdecode.md#unzip)
* [zbu2s](jwtjsdecode.md#zbu2s)
* [zip](jwtjsdecode.md#zip)

---

## Methods

<a id="b2bu"></a>

### `<Static>` b2bu

▸ **b2bu**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:147*

Converts base64 string to base64url string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to convert |

**Returns:** `string`
base64url string

___
<a id="b2s"></a>

### `<Static>` b2s

▸ **b2s**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:201*

Converts string to base64 string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to convert |

**Returns:** `string`
decoded data string

___
<a id="bu2b"></a>

### `<Static>` bu2b

▸ **bu2b**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:124*

Converts base64url string to base64 string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to convert |

**Returns:** `string`
base64 string

___
<a id="bu2s"></a>

### `<Static>` bu2s

▸ **bu2s**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:168*

Converts base64url string to string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  base64url string to convert |

**Returns:** `string`
decoded data string

___
<a id="isgzip"></a>

### `<Static>` isGzip

▸ **isGzip**(header: *[JwtPart](../interfaces/jwtpart.md)*): `boolean`

*Defined in jwt-js-decode.ts:281*

Check if header has zip property (and it is equal to 'GZIP', ignorecase)

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| header | [JwtPart](../interfaces/jwtpart.md) |  object to check |

**Returns:** `boolean`
does it have gzip in zip property

___
<a id="jwtdecode"></a>

### `<Static>` jwtDecode

▸ **jwtDecode**(str: *`string`*): [JwtDecode](jwtdecode.md)

*Defined in jwt-js-decode.ts:292*

Decode jwtToken header and payload

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to decode |

**Returns:** [JwtDecode](jwtdecode.md)
object with decoded header and body, and signature untouched

___
<a id="jwtsplit"></a>

### `<Static>` jwtSplit

▸ **jwtSplit**(str: *`string`*): [JwtSplit](jwtsplit.md)

*Defined in jwt-js-decode.ts:270*

Split jwtToken into object {header, payload, signature}

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to split |

**Returns:** [JwtSplit](jwtsplit.md)
jwt split object of three strings

___
<a id="s2b"></a>

### `<Static>` s2b

▸ **s2b**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:190*

Converts base64 string to string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to convert |

**Returns:** `string`
base64 string

___
<a id="s2bu"></a>

### `<Static>` s2bu

▸ **s2bu**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:179*

Converts string to base64url string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to convert |

**Returns:** `string`
base64url string

___
<a id="s2zbu"></a>

### `<Static>` s2zbu

▸ **s2zbu**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:248*

Gzip and encode data string to base64url string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to encode |

**Returns:** `string`
base64url string

___
<a id="unzip"></a>

### `<Static>` unzip

▸ **unzip**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:230*

Converts from gzip data string to string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to convert |

**Returns:** `string`
decoded data string

___
<a id="zbu2s"></a>

### `<Static>` zbu2s

▸ **zbu2s**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:259*

Decode from base64url and unzip data string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to decode |

**Returns:** `string`
decoded data string

___
<a id="zip"></a>

### `<Static>` zip

▸ **zip**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:212*

Converts string to gzip data string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to convert |

**Returns:** `string`
gzip data string

___

