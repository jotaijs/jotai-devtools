import React from 'react';
import { Box } from '@mantine/core';
import { PanelResizeHandle as ReactPanelResizeHandle } from 'react-resizable-panels';
import { useThemeMode } from '../../../../hooks/useThemeMode';
import classes from './PanelResizeHandle.module.css';

export const PanelResizeHandle = () => {
  return (
    <ReactPanelResizeHandle id="jotai-devtools-panel-resize-handle">
      <Box p="5" h="100%" className={classes.reactPanelResizeHandle}>
        <Box
          className={classes.innerContainer}
          mah={100}
          mih={50}
          h="20%"
          w={5}
          m={5}
          bg={useThemeMode('gray.3', 'gray.7')}
        />
      </Box>
    </ReactPanelResizeHandle>
  );
};
