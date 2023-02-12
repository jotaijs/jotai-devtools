import * as React from 'react';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MantineThemeOverride,
} from '@mantine/core';
import { createStore } from 'jotai/vanilla';
import { Store } from 'src/types';
import {
  DevToolsOptions,
  useSetDevToolsOptions,
} from './atoms/devtools-options';
import { Extension, ExtensionProps } from './Extension';
import './fonts';
import { InternalDevToolsContext } from './internal-jotai-store';

const theme: MantineThemeOverride = {
  primaryColor: 'dark',
  activeStyles: { transform: 'scale(1)' },
  fontFamily:
    'Inter, JetBrains Mono, -apple-system, BlinkMacSystemFont, Segoe, sans-serif',
  fontFamilyMonospace:
    'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
  headings: {
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
  },
  globalStyles: (theme) => ({
    '.jotai-devtools-shell': {
      '*, *::before, *::after': {
        boxSizing: 'border-box',
      },
      ...theme.fn.fontStyles(),
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      lineHeight: theme.lineHeight,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      fontSize: theme.fontSizes.md,
    },
  }),
};

export type DevToolsProps = ExtensionProps & {
  theme?: 'dark' | 'light';
  options?: DevToolsOptions;
};

const DevToolsMain = ({
  store,
  isInitialOpen,
  theme: userColorScheme = 'light',
  options,
}: DevToolsProps): JSX.Element => {
  const [colorScheme, setColorScheme] =
    React.useState<ColorScheme>(userColorScheme);
  const setDevToolsOptions = useSetDevToolsOptions();

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  React.useEffect(() => {
    setColorScheme(userColorScheme);
  }, [userColorScheme]);

  React.useEffect(() => {
    // Should we consider caching these options in the future instead of allowing users to change these?
    setDevToolsOptions(options);
  }, [setDevToolsOptions, options]);

  const theme_ = {
    ...theme,
    colorScheme,
  };

  return (
    <React.StrictMode>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider withNormalizeCSS theme={theme_}>
          <Extension store={store} isInitialOpen={isInitialOpen} />
        </MantineProvider>
      </ColorSchemeProvider>
    </React.StrictMode>
  );
};

const DevToolsProvider = ({ children }: React.PropsWithChildren) => {
  const internalStoreRef = React.useRef<Store>();

  if (!internalStoreRef.current) {
    internalStoreRef.current = createStore();
  }

  return (
    <InternalDevToolsContext.Provider value={internalStoreRef.current}>
      {children}
    </InternalDevToolsContext.Provider>
  );
};

export const DevTools = (props: DevToolsProps): JSX.Element => {
  if (__DEV__) {
    return (
      <DevToolsProvider>
        <DevToolsMain {...props} />
      </DevToolsProvider>
    );
  }

  return <></>;
};
