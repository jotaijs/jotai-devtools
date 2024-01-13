import React, { useRef } from 'react';
import { Tabs } from '@mantine/core';
import { useAtom, useAtomValue } from 'jotai/react';
import { flushSync } from 'react-dom';
import Moveable from 'react-moveable';
import { shellStylesAtom } from '../../../atoms/shell-styles';
import { TabKeys, shellStyleDefaults } from '../../../constants';
import { useDevtoolsJotaiStoreOptions } from '../../../internal-jotai-store';
import { useSelectedShellTab } from './atoms';
import { AtomViewer } from './components/AtomViewer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { TabsHeader } from './components/TabsHeader';
import { TimeTravel } from './components/TimeTravel';
import { shellStyles } from './styles';

export const Shell = () => {
  const [selectedShellTab, setSelectedShellTab] = useSelectedShellTab();

  const shellRef = useRef<HTMLDivElement>(null);

  // TODO move this to a custom hook
  const [{ height, width, transform }, setShellStyles] = useAtom(
    shellStylesAtom,
    useDevtoolsJotaiStoreOptions(),
  );

  const handleOnTabChange = (value: TabKeys) => setSelectedShellTab(value);
  return (
    <>
      <Tabs
        keepMounted={false}
        variant="default"
        defaultValue={TabKeys.AtomViewer}
        sx={(theme) => {
          return {
            ...(typeof shellStyles === 'function'
              ? shellStyles(theme)
              : shellStyles),
            transform,
          };
        }}
        mah={shellStyleDefaults.maxHeight}
        maw={shellStyleDefaults.maxWidth}
        mih={shellStyleDefaults.minHeight}
        miw={shellStyleDefaults.minWidth}
        h={height}
        w={width}
        ref={shellRef}
        className="jotai-devtools-shell"
        data-testid="jotai-devtools-shell"
        id="jotai-devtools-shell"
        value={selectedShellTab}
        onTabChange={handleOnTabChange}
      >
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
      <Moveable
        target={shellRef}
        flushSync={flushSync}
        hideDefaultLines={true}
        draggable={true}
        throttleDrag={1}
        edgeDraggable={false}
        startDragRotate={0}
        throttleDragRotate={0}
        resizable={true}
        keepRatio={false}
        snappable={true}
        bounds={{ left: 0, top: 0, right: 0, bottom: 0, position: 'css' }}
        edge={[]}
        onDrag={(e) => {
          e.target.style.transform = e.transform;
          setShellStyles((prev) => ({
            ...prev,
            transform: e.transform,
          }));
        }}
        onResize={(e) => {
          e.target.style.width = `${e.width}px`;
          e.target.style.height = `${e.height}px`;
          e.target.style.transform = e.drag.transform;
          setShellStyles((prev) => ({
            ...prev,
            width: e.width,
            height: e.height,
            transform: e.drag.transform,
          }));
        }}
      />
    </>
  );
};
