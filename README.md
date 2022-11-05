# sanity-plugin-asset-source-dall-e

## Installation

```
npm install --save sanity-plugin-asset-source-dall-e
```

or

```
yarn add sanity-plugin-asset-source-dall-e
```

## Usage
Add it as a plugin in sanity.config.ts (or .js):

```
 import {defineConfig} from 'sanity'
 import {dallEAssetSourcePlugin} from 'sanity-plugin-asset-source-dall-e'

 export const defineConfig({
     /...
     plugins: [
         dallEAssetSourcePlugin({})
     ]
 })
```
## License

MIT © Rein Undheim
See LICENSE