import { replace } from 'esbuild-plugin-replace';
import { Options, defineConfig } from 'tsup';

const defaultOutExtension: Options['outExtension'] = ({ format }) => {
  return {
    js: `.${format}.js`,
  };
};

const defaultEsBuildPlugins: Options['esbuildPlugins'] = [
  replace({
    // FIXME - Should filter it by `include` instead of `exclude`. This doesn't seem to be working /^.*\.js$/,
    exclude: /\.woff2$/,
    __DEV__: '(process.env.NODE_ENV!=="production")',
  }),
];

const baseConfig: Options = {
  // Outputs `dist/index.js` and `dist/utils.js`
  entry: {
    index: 'src/index.ts',
    // Workaround to generate seperate chunks for DevTools so we could export a null component for production builds
    internal__devtools: 'src/DevTools/index.ts',
    utils: 'src/utils/index.ts',
  },
  loader: {
    '.woff2': 'dataurl',
  },
  sourcemap: false,
  // Clean output directory before each build
  clean: true,
  minify: false,
  splitting: true,
  tsconfig: './tsconfig.build.json',
  dts: true,
  external: ['jotai', 'react', 'react-dom'],
  noExternal: ['@tabler/icons-react'],
  platform: 'node',
  outExtension: defaultOutExtension,
  esbuildPlugins: defaultEsBuildPlugins,
  // // TSUP does not appear to be respecting tsconfig's jsx property
  // // See - https://github.com/egoist/tsup/issues/792
  inject: ['./react-shim.js'],
};

const cjsConfig: Options = {
  ...baseConfig,
  format: ['cjs'],
};

const mjsOutExtension: Options['outExtension'] = ({ format }) => {
  return {
    js: `.${format}.mjs`,
  };
};

const mjsConfig: Options = {
  ...baseConfig,
  format: ['esm'],
  outExtension: mjsOutExtension,
};

export default defineConfig([cjsConfig, mjsConfig]);
