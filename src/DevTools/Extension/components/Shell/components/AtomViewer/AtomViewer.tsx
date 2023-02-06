import { memo } from 'react';
import { Flex, Sx } from '@mantine/core';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { PanelResizeHandle } from '../PanelResizeHandle';
import { AtomDetail } from './components/AtomDetail';
import { AtomList } from './components/AtomList';

const panelStyles = { overflow: 'auto' };
const atomListWrapperStyles: Sx = (theme) => ({
  background:
    theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2],
});

export const AtomViewer = memo(() => {
  return (
    <PanelGroup direction="horizontal">
      <Panel defaultSize={50} minSize={30} style={panelStyles}>
        <Flex
          p={10}
          pt={0}
          h="100%"
          direction="column"
          sx={atomListWrapperStyles}
        >
          <AtomList />
        </Flex>
      </Panel>
      <PanelResizeHandle />
      <Panel defaultSize={50} minSize={30} style={panelStyles}>
        <Flex p={10} h="100%" direction="column" pos="relative">
          <AtomDetail />
        </Flex>
      </Panel>
    </PanelGroup>
  );
});
