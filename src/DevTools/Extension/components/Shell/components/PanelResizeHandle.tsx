import React from 'react';
import { Box, MantineStyleProp } from '@mantine/core';
import { PanelResizeHandle as ReactPanelResizeHandle } from 'react-resizable-panels';
import { useThemeMode } from '../../../../hooks/useThemeMode';
import './PanelResizeHandle.css';

const innerContainerStyles: MantineStyleProp = {
  borderRadius: '2rem',
  verticalAlign: 'middle',
};

export const PanelResizeHandle = () => {
  return (
    <ReactPanelResizeHandle id="jotai-devtools-panel-resize-handle">
      <Box
        p="5"
        className="internal-jotai-devtools-panel-resize-handle-wrapper"
      >
        <Box
          className="internal-jotai-devtools-panel-resize-handle-content"
          mah={100}
          mih={50}
          h="20%"
          w={5}
          m={5}
          bg={useThemeMode('gray.3', 'gray.7')}
          style={innerContainerStyles}
        />
      </Box>
    </ReactPanelResizeHandle>
  );
};
