import { replace } from 'esbuild-plugin-replace';
import { defineConfig } from 'tsup';

export default defineConfig([
  {
    // Outputs `dist/index.js` and `dist/utils.js`
    entry: {
      index: 'src/index.ts',
      utils: 'src/utils/index.ts',
    },
    sourcemap: true,
    // Clean output directory before each build
    clean: true,
    minify: true,
    format: ['esm', 'cjs'],
    splitting: false,
    tsconfig: './tsconfig.build.json',
    dts: true,
    external: ['jotai', 'React'],
    outExtension({ format }) {
      return {
        js: `.${format}.js`,
      };
    },
    esbuildPlugins: [
      replace({
        __DEV__: '(process.env.NODE_ENV!=="production")',
      }),
    ],
  },
]);
