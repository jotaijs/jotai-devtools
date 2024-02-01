import * as React from 'react';
import { Flex } from '@mantine/core';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { PanelResizeHandle } from '../PanelResizeHandle';
import { PlayBar } from './components/PlayBar';
import { SnapshotDetail } from './components/SnapshotDetail';
import { SnapshotList } from './components/SnapshotList';
import classes from './TimeTravel.module.css';

export const TimeTravel = React.memo(() => {
  return (
    <>
      <PanelGroup
        direction="horizontal"
        className={classes.panelGroup}
        id="jotai-devtools-time-travel-panel-group"
      >
        <Panel
          defaultSize={45}
          minSize={30}
          className={classes.panel}
          id="jotai-devtools-time-travel-panel-left"
        >
          <Flex
            p={10}
            pt={0}
            h="100%"
            direction="column"
            className={classes.atomListWrapper}
            data-testid="jotai-devtools-time-travel-panel-left-content"
          >
            <SnapshotList />
          </Flex>
        </Panel>
        <PanelResizeHandle />
        <Panel
          defaultSize={55}
          minSize={40}
          className={classes.panel}
          id="jotai-devtools-time-travel-panel-right"
        >
          <Flex p={10} h="100%" direction="column" pos="relative">
            <SnapshotDetail />
          </Flex>
        </Panel>
      </PanelGroup>
      <PlayBar />
    </>
  );
});
