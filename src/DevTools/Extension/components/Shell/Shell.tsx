import React, { useEffect, useRef } from 'react';
import { Tabs } from '@mantine/core';
import { useAtomValue } from 'jotai/react';
import { Store } from 'src/types';
import { shellStylesAtom } from '../../../atoms/shell-styles';
import { useSetCustomStore } from '../../../atoms/user-custom-store';
import { TabKeys, shellStyleDefaults } from '../../../constants';
import { devtoolsJotaiStoreOptions } from '../../../internal-jotai-store';
import { AtomViewer } from './components/AtomViewer';
import { Header } from './components/Header';
import { ShellResizeBar } from './components/ShellResizeBar';
import { shellStyles } from './styles';

type ShellProps = {
  store?: Store;
};

export const Shell = ({ store }: ShellProps) => {
  const setUserStore = useSetCustomStore();

  useEffect(() => {
    setUserStore(store);
  }, [setUserStore, store]);

  const shellRef = useRef<HTMLDivElement>(null);
  const { height } = useAtomValue(shellStylesAtom, devtoolsJotaiStoreOptions);

  useEffect(() => {
    // Allocating more height at the end of the content allows users to scroll down fully
    // FIXME should we handle a use-case where there is padding set around `body`?
    document.body.style.paddingBottom = height + 'px';

    return () => {
      document.body.style.paddingBottom = `0px`;
    };
  }, [height]);

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
    >
      <ShellResizeBar shellRef={shellRef} />
      <Header />

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
    </Tabs>
  );
};
