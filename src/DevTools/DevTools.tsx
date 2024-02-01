import * as React from 'react';
import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import { createStore } from 'jotai/vanilla';
import { Store } from 'src/types';
import {
  DevToolsOptions,
  useSetDevToolsOptions,
} from './atoms/devtools-options';
import { Extension, ExtensionProps } from './Extension';
import './fonts/fonts.module.css';
import './global.css';
import { InternalDevToolsContext } from './internal-jotai-store';

export type DevToolsProps = ExtensionProps & {
  defaultColorScheme?: 'dark' | 'light';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  nonce?: string;
  options?: DevToolsOptions;
};

const DevToolsMain = ({
  store,
  isInitialOpen = false,
  position = 'bottom-left',
  defaultColorScheme = 'dark',
  options,
}: DevToolsProps): JSX.Element => {
  const setDevToolsOptions = useSetDevToolsOptions();

  React.useEffect(() => {
    // Should we consider caching these options in the future instead of allowing users to change these?
    setDevToolsOptions(options);
  }, [setDevToolsOptions, options]);

  const theme: MantineThemeOverride = React.useMemo(() => {
    return {
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
      colors: {
        dark: [
          '#C1C2C5',
          '#A6A7AB',
          '#909296',
          '#5c5f66',
          '#373A40',
          '#2C2E33',
          '#25262b',
          '#1A1B1E',
          '#141517',
          '#101113',
        ],
      },
      components: {
        ShellTriggerButton: {
          defaultProps: {
            position,
          },
        },
      },
    };
  }, [position]);

  return (
    <React.StrictMode>
      <MantineProvider theme={theme} defaultColorScheme={defaultColorScheme}>
        <Extension store={store} isInitialOpen={isInitialOpen} />
      </MantineProvider>
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
