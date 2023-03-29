import React, { useEffect, useRef } from 'react';
import { Tabs } from '@mantine/core';
import { useAtomValue } from 'jotai/react';
import { Store } from 'src/types';
import { shellStylesAtom } from '../../../atoms/shell-styles';
import { useSetCustomStore } from '../../../atoms/user-custom-store';
import { TabKeys, shellStyleDefaults } from '../../../constants';
import { useDevtoolsJotaiStoreOptions } from '../../../internal-jotai-store';
import { AtomViewer } from './components/AtomViewer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { ShellResizeBar } from './components/ShellResizeBar';
import { TabsHeader } from './components/TabsHeader';
import { shellStyles } from './styles';

export type ShellProps = {
  store?: Store | undefined;
};

export const Shell = ({ store }: ShellProps) => {
  const setUserStore = useSetCustomStore();
  useEffect(() => {
    setUserStore(store);
  }, [setUserStore, store]);

  const shellRef = useRef<HTMLDivElement>(null);
  const { height } = useAtomValue(
    shellStylesAtom,
    useDevtoolsJotaiStoreOptions(),
  );

  return (
    <Tabs
      keepMounted={false}
      variant="default"
      defaultValue={TabKeys.AtomViewer}
      m={10}
      sx={shellStyles}
      h={height}
      mah={shellStyleDefaults.maxHeight}
      ref={shellRef}
      className="jotai-devtools-shell"
      data-testid="jotai-devtools-shell"
      id="jotai-devtools-shell"
    >
      <ShellResizeBar shellRef={shellRef} />
      <Header />
      <ErrorBoundary>
        <TabsHeader />
        <Tabs.Panel
          value={TabKeys.AtomViewer}
          h="100%"
          sx={{
            overflow: 'hidden',
            // Hide the overlap of this div's bg
            borderBottomLeftRadius: '7px',
            borderBottomRightRadius: '7px',
          }}
        >
          <AtomViewer />
        </Tabs.Panel>
      </ErrorBoundary>
    </Tabs>
  );
};
