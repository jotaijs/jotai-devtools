import * as React from 'react';
import { Indicator, Tabs } from '@mantine/core';
import { IconLayoutList, IconTimeline } from '@tabler/icons-react';
import { TabKeys } from '../../../../constants';
import { useShouldRecordSnapshotHistoryValue } from './TimeTravel/atoms';

export const TabsHeader = React.memo(() => {
  const isSnapshotRecordingOn = useShouldRecordSnapshotHistoryValue();
  return (
    <Tabs.List>
      <Tabs.Tab
        value={TabKeys.AtomViewer}
        leftSection={<IconLayoutList size={14} />}
      >
        Atom Viewer
      </Tabs.Tab>

      <Tabs.Tab
        value={TabKeys.TimeTravel}
        leftSection={<IconTimeline size={14} />}
        pr={isSnapshotRecordingOn ? 'xl' : 'md'}
      >
        {isSnapshotRecordingOn ? (
          <Indicator
            withBorder
            inline
            processing
            size={8}
            offset={-12}
            color="red"
            position="middle-end"
            data-testid="jotai-devtools-time-travel-recording-indicator"
          >
            Time travel
          </Indicator>
        ) : (
          'Time travel'
        )}
      </Tabs.Tab>
      {/* TODO Add these features */}
      {/* <Tabs.Tab
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
