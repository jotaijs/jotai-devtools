// import dts from 'rollup-plugin-dts'
import path, { resolve } from 'path';
import babelPlugin, {
  RollupBabelInputPluginOptions,
} from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import { RollupOptions } from 'rollup';
import filesize from 'rollup-plugin-filesize';
import { terser } from 'rollup-plugin-terser';
import { createBabelConfig } from './babel.config';
const extensions = ['.js', '.ts', '.tsx'];
const __dirname = path.resolve();

const bundle = (config: RollupOptions) => ({
  ...config,
  input: {
    index: resolve(__dirname, 'src/index.ts'),
    utils: resolve(__dirname, 'src/utils/index.ts'),
  },
  external: (id: string) => !/^[./]/.test(id),
});

// These warnings are appear to be false positive, triggered by replace plugin because we're calling it in rollup.outpput.
const warnFilter =
  /The "buildStart" hook used by the output plugin replace is a build time hook and will not be run for that plugin. Either this plugin cannot be used as an output plugin, or it should have an option to configure it as an output plugin./;

const transformFilter =
  /The "transform" hook used by the output plugin replace is a build time hook and will not be run for that plugin. Either this plugin cannot be used as an output plugin, or it should have an option to configure it as an output plugin./;

function getBabelOptions(): RollupBabelInputPluginOptions {
  return {
    ...createBabelConfig({ env: (env: any) => env === 'build' }, { ie: 11 }),
    extensions,
    comments: false,
    babelHelpers: 'bundled',
  };
}
const babelOptions: RollupBabelInputPluginOptions = getBabelOptions();

/** @type {import('rollup').RollupOptions[]} */
export default [
  bundle({
    onwarn: (warning) => {
      // overwite the default warning function
      const str = warning.toString();
      if (warnFilter.test(str) || transformFilter.test(str)) return;
      console.warn(str);
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.build.json',
        compilerOptions: {
          outDir: 'dist/',
          emitDeclarationOnly: true,
          declaration: true,
        },
      }),
      nodeResolve({ extensions }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          keep_infinity: true,
        },
      }),
      babelPlugin(babelOptions),
      filesize(),
    ],
    output: [
      {
        dir: 'dist',
        entryFileNames: `[name].cjs.js`,
        format: 'cjs',
        plugins: [
          replace({
            preventAssignment: true,
            __DEV__: '(process.env.NODE_ENV!=="production")',
          }),
        ],
      },
      {
        dir: 'dist',
        entryFileNames: `[name].esm.mjs`,
        chunkFileNames: '[name]-[hash].esm.mjs',
        format: 'es',
        plugins: [
          replace({
            preventAssignment: true,
            __DEV__: '((import.meta.env&&import.meta.env.MODE)!=="production")',
          }),
        ],
      },
      {
        dir: 'dist',
        entryFileNames: `[name].esm.js`,
        format: 'es',
        plugins: [
          replace({
            preventAssignment: true,
            __DEV__: '(process.env.NODE_ENV!=="production")',
          }),
        ],
      },
    ],
  }),
];
