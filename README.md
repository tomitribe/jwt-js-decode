# jwt-js-decode

JavaScript library that decodes JSON Web Tokens (JWT)
jwt-js-decode the easy way

## Use cases

Works in:

- all modern browsers that support WebCrypto API
- Node.js using 'crypto' (default node-js lib)
- any other js env using 'crypto-browserify' (with require replacement to 'crypto'')

## Getting Started

Install Jest using [`yarn`](https://yarnpkg.com/en/package/jwt-js-decode):

```bash
yarn add jwt-js-decode
```

Or via [`npm`](https://www.npmjs.com/package/jwt-js-decode):

```bash
npm i -S jwt-js-decode
```

### Require lib

```javascript
import * as jwtJsDecode from 'jwt-js-decode';
```

or

```javascript
const jwtJsDecode = require('jwt-js-decode');
```

or

```html
<script src="//unpkg.com/jwt-js-decode@1.8.2/dist/jwt-js-decode.pkg.min.js"></script>
```

Other links you can find on [`yarn`](https://yarnpkg.com/en/package/jwt-js-decode)

P.S. For Webpack 5 browser bundling, there is need to add crypto fallback config ([example stackblitz](https://stackblitz.com/edit/github-m1gvkd?file=webpack.config.js)):

```javascript
resolve: {
  fallback: {
    crypto: false,
  },
},
```

### Usage

Decode JWT token into `{header: Object, payload: Object, signature: String}`

```javascript
    import { decode } from 'jwt-js-decode';

    let jwt = decode('token');
    console.log(jwt.payload);
```

Verify JWT token with provided secret and decode it after

```javascript
    import { decode, verify } from 'jwt-js-decode';
    
    verify('token', 'secret').then(res => {
        if (res === true) {
            const jwt = decode('token');
            console.log(jwt.payload);
        }
    });
```

Resign JWT token with newSecret secret should be same type as `jwt.header.alg`

```javascript
    import { resign } from 'jwt-js-decode';

    resign('token', 'newSecret').then(newToken =>  {
        console.log(newToken);
    });
```

## Sandboxes

Runkit (node.js sandbox 1.8.2)
[https://npm.runkit.com/jwt-js-decode](https://npm.runkit.com/jwt-js-decode)

Plunkr (browser sandbox 1.8.2 + CodeMirror)
[https://plnkr.co/edit/WaawWXswkexfXaFfRDjQ](https://plnkr.co/edit/WaawWXswkexfXaFfRDjQ)

Plunkr (browser sandbox 1.8.2)
[https://plnkr.co/edit/zCNpiTXBbPKNxNVnHhkU](https://plnkr.co/edit/zCNpiTXBbPKNxNVnHhkU)

## Development

First you'll need to clone this repository to folder you will test it in.

Then insall all dependencies.

```bash
npm i
```

For testing functionality jest testing is used, npm `test` script will rebuild dist and docs folder.

After changes in jwt-js-decode source and just for the first run use:

```bash
npm test
```

For sequential runs and just new test you can run:

```bash
npm run jest
```

TOC:

* [Home](https://github.com/tomitribe/jwt-js-decode)
* [Docs](/docs/)
