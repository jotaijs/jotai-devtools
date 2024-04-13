import * as React from 'react';
import {
  MantineProvider,
  createTheme,
  localStorageColorSchemeManager,
} from '@mantine/core';
import { createStore } from 'jotai/vanilla';
import { Store } from 'src/types';
import {
  DevToolsOptions,
  useSetDevToolsOptions,
} from './atoms/devtools-options';
import { Extension, ExtensionProps } from './Extension';
import { InternalDevToolsContext } from './internal-jotai-store';

import './styles.css';
import './fonts/fonts.css';

export type DevToolsProps = ExtensionProps & {
  theme?: 'dark' | 'light';
  nonce?: string;
  options?: DevToolsOptions;
};

// TODO move the id to a common place as a const
const getRootElement = () => {
  const value =
    typeof window === 'undefined'
      ? undefined
      : document.getElementById('jotai-devtools-root') || undefined;

  return value;
};

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'jotai-devtools-color-scheme',
});

const theme = createTheme({
  primaryColor: 'dark',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe, sans-serif',
  fontFamilyMonospace:
    'JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
  headings: {
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
  },
  defaultRadius: 'md',
  activeClassName: 'jotai-devtools-active',
  focusClassName: 'jotai-devtools-focus',
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
});

const DevToolsMain = ({
  store,
  isInitialOpen = false,
  theme: userColorScheme,
  position = 'bottom-left',
  nonce = '',
  options,
}: DevToolsProps): JSX.Element => {
  const setDevToolsOptions = useSetDevToolsOptions();

  React.useEffect(() => {
    // Should we consider caching these options in the future instead of allowing users to change these?
    setDevToolsOptions(options);
  }, [setDevToolsOptions, options]);

  const conditionalProps = React.useMemo(() => {
    if (typeof userColorScheme === 'string') {
      return { forceColorScheme: userColorScheme };
    }
    return {};
  }, [userColorScheme]);

  return (
    <React.StrictMode>
      <span id="jotai-devtools-root">
        <MantineProvider
          theme={theme}
          colorSchemeManager={colorSchemeManager}
          defaultColorScheme="light"
          classNamesPrefix="jotai-devtools"
          withStaticClasses={false}
          withGlobalClasses={false}
          getRootElement={getRootElement}
          cssVariablesSelector="#jotai-devtools-root"
          getStyleNonce={() => nonce}
          {...conditionalProps}
        >
          <Extension
            store={store}
            isInitialOpen={isInitialOpen}
            position={position}
          />
        </MantineProvider>
      </span>
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
