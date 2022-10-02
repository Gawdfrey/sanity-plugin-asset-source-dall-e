# sanity-plugin-gpt3

## Installation

```
npm install --save sanity-plugin-gpt3
```

or

```
yarn add sanity-plugin-gpt3
```

## Usage
Add it as a plugin in sanity.config.ts (or .js):

```
 import {createConfig} from 'sanity'
 import {myPlugin} from 'sanity-plugin-gpt3'

 export const createConfig({
     /...
     plugins: [
         myPlugin({})
     ]
 })
```
## License

MIT © Rein Undheim
See LICENSE