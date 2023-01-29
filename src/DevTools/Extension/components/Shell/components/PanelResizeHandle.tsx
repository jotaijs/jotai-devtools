import { Box } from '@mantine/core';
import { PanelResizeHandle as ReactPanelResizeHandle } from 'react-resizable-panels';

export const PanelResizeHandle = () => {
  return (
    <ReactPanelResizeHandle style={{ display: 'flex', alignItems: 'center' }}>
      <Box
        mah={100}
        h="20%"
        w={5}
        m={5}
        bg="gray.3"
        mih={30}
        sx={{ borderRadius: '2rem', verticalAlign: 'middle' }}
      />
    </ReactPanelResizeHandle>
  );
};
