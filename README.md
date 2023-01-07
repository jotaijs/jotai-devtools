# jotai-devtools

## Prerequisites

- Jotai version between `>=1.5.0` and `<2`;

_Please note that this version only supports V1 API of Jotai. Support for V2 +
UI based devtools is
[coming soon](https://twitter.com/dai_shi/status/1611717249471246338])!_

## Setup

```sh
# npm
npm install jotai-devtools --save-dev

# yarn
yarn add --dev jotai-devtools
```

### APIs

Detailed documentation -
[https://jotai.org/docs/api/devtools](https://jotai.org/docs/api/devtools)

```tsx
import {
  useAtomsSnapshot,
  useGotoAtomsSnapshot,
  useAtomsDebugValue,
  // Redux devtool hooks
  useAtomDevtools,
  useAtomsDevtools,
} from 'jotai-devtools';
```

### Migration guide from `jotai/devtools` to `jotai-devtools`

1. Install this package
   - `yarn add --dev jotai-devtools`
2. Update imports from `jotai/devtools` to `jotai-devtools`
   ```diff
   import {
    useAtomsSnapshot,
    useGotoAtomsSnapshot,
    useAtomsDebugValue,
    // Redux devtool integration hooks
    useAtomDevtools,
    useAtomsDevtools,
   - } from 'jotai/devtools';
   + } from 'jotai-devtools';
   ```
