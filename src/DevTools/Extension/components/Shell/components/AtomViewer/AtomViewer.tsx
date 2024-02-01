import * as React from 'react';
import { Flex } from '@mantine/core';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { PanelResizeHandle } from '../PanelResizeHandle';
import classes from './AtomViewer.module.css';
import { AtomDetail } from './components/AtomDetail';
import { AtomList } from './components/AtomList';

export const AtomViewer = React.memo(() => {
  return (
    <PanelGroup direction="horizontal">
      <Panel defaultSize={50} minSize={30} className={classes.panel}>
        <Flex
          p={10}
          pt={0}
          h="100%"
          direction="column"
          className={classes.atomListWrapper}
        >
          <AtomList />
        </Flex>
      </Panel>
      <PanelResizeHandle />
      <Panel defaultSize={50} minSize={30} className={classes.panel}>
        <Flex p={10} h="100%" direction="column" pos="relative">
          <AtomDetail />
        </Flex>
      </Panel>
    </PanelGroup>
  );
});
