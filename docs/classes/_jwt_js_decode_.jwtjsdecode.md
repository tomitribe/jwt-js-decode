[jwt-js-decode](../README.md) > ["jwt-js-decode"](../modules/_jwt_js_decode_.md) > [JwtJsDecode](../classes/_jwt_js_decode_.jwtjsdecode.md)

# Class: JwtJsDecode

## Hierarchy

**JwtJsDecode**

## Index

### Methods

* [b2bu](_jwt_js_decode_.jwtjsdecode.md#b2bu)
* [b2s](_jwt_js_decode_.jwtjsdecode.md#b2s)
* [bu2b](_jwt_js_decode_.jwtjsdecode.md#bu2b)
* [bu2s](_jwt_js_decode_.jwtjsdecode.md#bu2s)
* [isGzip](_jwt_js_decode_.jwtjsdecode.md#isgzip)
* [jwtDecode](_jwt_js_decode_.jwtjsdecode.md#jwtdecode)
* [jwtSplit](_jwt_js_decode_.jwtjsdecode.md#jwtsplit)
* [s2b](_jwt_js_decode_.jwtjsdecode.md#s2b)
* [s2bu](_jwt_js_decode_.jwtjsdecode.md#s2bu)
* [s2zbu](_jwt_js_decode_.jwtjsdecode.md#s2zbu)
* [unzip](_jwt_js_decode_.jwtjsdecode.md#unzip)
* [zbu2s](_jwt_js_decode_.jwtjsdecode.md#zbu2s)
* [zip](_jwt_js_decode_.jwtjsdecode.md#zip)

---

## Methods

<a id="b2bu"></a>

### `<Static>` b2bu

▸ **b2bu**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:91*

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

*Defined in jwt-js-decode.ts:143*

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

*Defined in jwt-js-decode.ts:68*

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

*Defined in jwt-js-decode.ts:112*

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

▸ **isGzip**(header: *[JwtPart](../interfaces/_jwt_js_decode_.jwtpart.md)*): `boolean`

*Defined in jwt-js-decode.ts:223*

Check if header has zip property (and it is equal to 'GZIP', ignorecase)

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| header | [JwtPart](../interfaces/_jwt_js_decode_.jwtpart.md) |  object to check |

**Returns:** `boolean`
does it have gzip in zip property

___
<a id="jwtdecode"></a>

### `<Static>` jwtDecode

▸ **jwtDecode**(str: *`string`*): [JwtDecode](_jwt_js_decode_.jwtdecode.md)

*Defined in jwt-js-decode.ts:234*

Decode jwtToken header and payload

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to decode |

**Returns:** [JwtDecode](_jwt_js_decode_.jwtdecode.md)
object with decoded header and body, and signature untouched

___
<a id="jwtsplit"></a>

### `<Static>` jwtSplit

▸ **jwtSplit**(str: *`string`*): [JwtSplit](_jwt_js_decode_.jwtsplit.md)

*Defined in jwt-js-decode.ts:212*

Split jwtToken into object {header, payload, signature}

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to split |

**Returns:** [JwtSplit](_jwt_js_decode_.jwtsplit.md)
jwt split object of three strings

___
<a id="s2b"></a>

### `<Static>` s2b

▸ **s2b**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:132*

Converts base64 string to string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to convert |

**Returns:** `string`

___
<a id="s2bu"></a>

### `<Static>` s2bu

▸ **s2bu**(str: *`string`*): `string`

*Defined in jwt-js-decode.ts:123*

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

*Defined in jwt-js-decode.ts:190*

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

*Defined in jwt-js-decode.ts:172*

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

*Defined in jwt-js-decode.ts:201*

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

*Defined in jwt-js-decode.ts:154*

Converts string to gzip data string

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| str | `string` |  data string to convert |

**Returns:** `string`
gzip data string

___

