import * as React from 'react';
import { Tabs } from '@mantine/core';
import { IconLayoutList } from '@tabler/icons-react';
import { TabKeys } from '../../../../constants';

export const TabsHeader = React.memo(() => {
  return (
    <Tabs.List>
      <Tabs.Tab value={TabKeys.AtomViewer} icon={<IconLayoutList size={14} />}>
        Atom Viewer
      </Tabs.Tab>

      {/* TODO Add these features */}
      {/* <Tabs.Tab
        value={TabKeys.TimeTravel}
        icon={<IconTimeline size={14} />}
        disabled
      >
        Time travel
      </Tabs.Tab>
      <Tabs.Tab
        value={TabKeys.AtomGraph}
        icon={<IconVectorTriangle size={14} />}
        disabled
      >
        Atom Graph
      </Tabs.Tab> */}
    </Tabs.List>
  );
});

TabsHeader.displayName = 'TabsHeader';
