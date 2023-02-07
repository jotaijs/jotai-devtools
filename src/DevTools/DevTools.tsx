import { StrictMode, useEffect, useState } from 'react';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  MantineThemeOverride,
} from '@mantine/core';
import {
  DevToolsOptions,
  useSetDevToolsOptions,
} from './atoms/devtools-options';
import { Extension, ExtensionProps } from './Extension';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import '@fontsource/jetbrains-mono/latin-400.css';
import '@fontsource/jetbrains-mono/latin-600.css';
import '@fontsource/jetbrains-mono/latin-700.css';
import {
  InternalDevToolsContext,
  internalJotaiStore,
} from './internal-jotai-store';

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

const DevTools_ = ({
  store,
  isInitialOpen,
  theme: userColorScheme = 'light',
  options,
}: DevToolsProps): JSX.Element => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(userColorScheme);
  const setDevToolsOptions = useSetDevToolsOptions();

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    setColorScheme(userColorScheme);
  }, [userColorScheme]);

  useEffect(() => {
    // Should we consider caching these options in the future instead of allowing users to change these?
    setDevToolsOptions(options);
  }, [setDevToolsOptions, options]);

  const theme_ = {
    ...theme,
    colorScheme,
  };

  return (
    <StrictMode>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider withNormalizeCSS theme={theme_}>
          <InternalDevToolsContext.Provider value={internalJotaiStore}>
            <Extension store={store} isInitialOpen={isInitialOpen} />
          </InternalDevToolsContext.Provider>
        </MantineProvider>
      </ColorSchemeProvider>
    </StrictMode>
  );
};

export const DevTools = (props: DevToolsProps): JSX.Element => {
  if (__DEV__) {
    return <DevTools_ {...props} />;
  }

  return <></>;
};
