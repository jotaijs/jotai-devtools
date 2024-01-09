import React, { useRef } from 'react';
import { Tabs } from '@mantine/core';
import { useAtomValue } from 'jotai/react';
import { shellStylesAtom } from '../../../atoms/shell-styles';
import { TabKeys, shellStyleDefaults } from '../../../constants';
import { useDevtoolsJotaiStoreOptions } from '../../../internal-jotai-store';
import { useSelectedShellTab } from './atoms';
import { AtomViewer } from './components/AtomViewer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { ShellResizeBar } from './components/ShellResizeBar';
import { TabsHeader } from './components/TabsHeader';
import { TimeTravel } from './components/TimeTravel';
import { shellStyles } from './styles';

export const Shell = () => {
  const [selectedShellTab, setSelectedShellTab] = useSelectedShellTab();

  const shellRef = useRef<HTMLDivElement>(null);

  // TODO move this to a custom hook
  const { height } = useAtomValue(
    shellStylesAtom,
    useDevtoolsJotaiStoreOptions(),
  );

  const handleOnTabChange = (value: TabKeys) => setSelectedShellTab(value);
  return (
    <Tabs
      keepMounted={false}
      variant="default"
      defaultValue={TabKeys.AtomViewer}
      sx={shellStyles}
      h={height}
      mah={shellStyleDefaults.maxHeight}
      ref={shellRef}
      className="jotai-devtools-shell"
      data-testid="jotai-devtools-shell"
      id="jotai-devtools-shell"
      value={selectedShellTab}
      onTabChange={handleOnTabChange}
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
        <Tabs.Panel
          value={TabKeys.TimeTravel}
          h="100%"
          sx={{
            overflow: 'hidden',
            // Hide the overlap of this div's bg
            borderBottomLeftRadius: '7px',
            borderBottomRightRadius: '7px',
          }}
        >
          <TimeTravel />
        </Tabs.Panel>
      </ErrorBoundary>
    </Tabs>
  );
};
