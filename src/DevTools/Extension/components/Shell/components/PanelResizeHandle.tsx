import { Box, Sx } from '@mantine/core';
import { PanelResizeHandle as ReactPanelResizeHandle } from 'react-resizable-panels';
import { useThemeMode } from '../../../../hooks/useThemeMode';

const reactPanelResizeHandleStyles = {
  display: 'flex',
  alignItems: 'center',
  '._jotai-devtools-internal-panel-resize-handle': {
    transition: 'max-height, min-height, height, 0.2s ease-out',
  },
  '[data-resize-handle-active] &, &:hover': {
    '._jotai-devtools-internal-panel-resize-handle': {
      height: '90%',
      minHeight: '90%',
      maxHeight: '90%',
    },
  },
};
const innerContainerStyles: Sx = {
  borderRadius: '2rem',
  verticalAlign: 'middle',
};

export const PanelResizeHandle = () => {
  return (
    <ReactPanelResizeHandle>
      <Box p="5" h="100%" sx={reactPanelResizeHandleStyles}>
        <Box
          className="_jotai-devtools-internal-panel-resize-handle"
          mah={100}
          mih={50}
          h="20%"
          w={5}
          m={5}
          bg={useThemeMode('gray.3', 'gray.7')}
          sx={innerContainerStyles}
        />
      </Box>
    </ReactPanelResizeHandle>
  );
};
