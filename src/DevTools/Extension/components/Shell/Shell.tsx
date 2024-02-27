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
import classes from './Shell.module.css';

export const Shell = () => {
  const [selectedShellTab, setSelectedShellTab] = useSelectedShellTab();

  const shellRef = useRef<HTMLDivElement>(null);

  // TODO move this to a custom hook
  const { height } = useAtomValue(
    shellStylesAtom,
    useDevtoolsJotaiStoreOptions(),
  );

  const handleOnTabChange = (value: string | null) =>
    setSelectedShellTab(value as TabKeys);
  return (
    <Tabs
      keepMounted={false}
      variant="default"
      defaultValue={TabKeys.AtomViewer}
      className={`${classes.root} jotai-devtools-shell`}
      h={height}
      mah={shellStyleDefaults.maxHeight}
      ref={shellRef}
      data-testid="jotai-devtools-shell"
      id="jotai-devtools-shell"
      value={selectedShellTab}
      onChange={handleOnTabChange}
    >
      <ShellResizeBar shellRef={shellRef} />
      <Header />
      <ErrorBoundary>
        <TabsHeader />
        <Tabs.Panel
          value={TabKeys.AtomViewer}
          h="100%"
          className={classes.tabPanel}
        >
          <AtomViewer />
        </Tabs.Panel>
        <Tabs.Panel
          value={TabKeys.TimeTravel}
          h="100%"
          className={classes.tabPanel}
        >
          <TimeTravel />
        </Tabs.Panel>
      </ErrorBoundary>
    </Tabs>
  );
};
