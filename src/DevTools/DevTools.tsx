import * as React from 'react';
import { EmotionCache, Global } from '@emotion/react';
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
import { fontCss } from './fonts';
import { InternalDevToolsContext } from './internal-jotai-store';
import { createMemoizedEmotionCache } from './utils';

const theme: MantineThemeOverride = {
  primaryColor: 'dark',
  activeStyles: { transform: 'scale(1)' },
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe, sans-serif',
  fontFamilyMonospace:
    'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
  headings: {
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
  },
  defaultRadius: 'md',
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
  nonce?: string;
  options?: DevToolsOptions;
};

const DevToolsMain = ({
  store,
  isInitialOpen = false,
  theme: userColorScheme = 'light',
  nonce,
  options,
}: DevToolsProps): JSX.Element => {
  const [colorScheme, setColorScheme] =
    React.useState<ColorScheme>(userColorScheme);
  const setDevToolsOptions = useSetDevToolsOptions();

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const jotaiDevtoolsEmotionCache = React.useRef<EmotionCache>();

  if (!jotaiDevtoolsEmotionCache.current) {
    jotaiDevtoolsEmotionCache.current = createMemoizedEmotionCache(nonce)();
  }

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
        <MantineProvider
          theme={theme_}
          emotionCache={jotaiDevtoolsEmotionCache.current}
        >
          <Global styles={fontCss} />
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

export const InternalDevTools = (props: DevToolsProps): JSX.Element | null => {
  if (__DEV__) {
    return (
      <DevToolsProvider>
        <DevToolsMain {...props} />
      </DevToolsProvider>
    );
  }

  return <></>;
};
