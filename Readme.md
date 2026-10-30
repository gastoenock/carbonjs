# jscarbon

Carbon-style date utilities for Node.js and modern ES2022 browsers.

## Node.js and frontend bundlers

```js
import Carbon, { Carbon as NamedCarbon } from 'jscarbon';
console.log(Carbon.now().format('Y-m-d H:i:s'));
```

CommonJS:

```js
const { Carbon } = require('jscarbon');
console.log(Carbon.now().toISOString());
```

## Browsers

Serve the repository over HTTP and open index.html to try the source entry point without building:

```html
<script type="module">
 import Carbon from './index.js';
 console.log(Carbon.now().toISOString());
</script>
```

After `npm ci && npm run build`, copy dist/index.js for a self-contained browser ES module, or use the classic script:

```html
<script src="./dist/carbon.global.js"></script>
<script>
 console.log(Carbon.now().format('Y-m-d H:i:s'));
</script>
```

The classic script exposes globalThis.Carbon. Module imports do not modify globals or execute examples. Dates use the runtime's local timezone unless a UTC method is used.

## Development

Run `npm ci`, then `npm test` to build and check Node ESM, CommonJS, browser ESM and classic scripts. Browser checks use isolated JavaScript VM contexts without Node globals.

`npm run dev` rebuilds on changes. `npm pack` builds automatically and includes distribution files and source entry points. CommonJS returns { Carbon, default: Carbon }. TypeScript declarations are not currently provided.
