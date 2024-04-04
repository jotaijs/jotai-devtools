import * as React from 'react';
import { Flex } from '@mantine/core';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { PanelResizeHandle } from '../PanelResizeHandle';
import './AtomViewer.css';
import { AtomDetail } from './components/AtomDetail';
import { AtomList } from './components/AtomList';

const panelStyles = { overflow: 'auto' };

export const AtomViewer = React.memo(() => {
  return (
    <PanelGroup direction="horizontal">
      <Panel defaultSize={50} minSize={30} style={panelStyles}>
        <Flex
          p={10}
          pt={0}
          h="100%"
          direction="column"
          className="internal-jotai-devtools-atom-viewer-wrapper"
        >
          <AtomList />
        </Flex>
      </Panel>
      <PanelResizeHandle />
      <Panel defaultSize={50} minSize={30} style={panelStyles}>
        <Flex p={10} pl={0} h="100%" direction="column" pos="relative">
          <AtomDetail />
        </Flex>
      </Panel>
    </PanelGroup>
  );
});
