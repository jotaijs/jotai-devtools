import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  rootDir: '.',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        sourceMaps: true,
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
          baseUrl: '.',
          paths: {
            'jotai-devtools': ['./src/index.ts'],
            'jotai-devtools/utils': ['./src/utils'],
          },
        },
      },
    ],
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: ['<rootDir>/__tests__/**/*.(test).{ts,tsx}'],
  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname'),
  ],
  moduleNameMapper: {
    '^jotai-devtools$': '<rootDir>/src/index.ts',
    '^jotai-devtools/(.*)$': '<rootDir>/src/$1.ts',
    '\\.(css|less|sass|scss|woff2)$': '<rootDir>/__mocks__/styleMock.js',
  },
  modulePathIgnorePatterns: ['dist'],
  globals: {
    __DEV__: true,
  },
  coverageReporters: ['json', 'html', 'text', 'text-summary'],
  collectCoverageFrom: [
    'src/**/*.{js,ts,tsx}',
    '!src/**/*.stories.{js,ts,tsx}',
    '!src/stories/**',
    // Copied as is from Jotai core and we're not changing it
    '!src/DevTools/Extension/components/Shell/components/AtomViewer/hooks/use.ts',
    '__tests__/**/*.{js,ts,tsx}',
  ],
  coverageDirectory: './coverage/',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    '<rootDir>/__tests__/setup.ts',
  ],
  snapshotSerializers: ['@emotion/jest/serializer'],
};

export default config;
