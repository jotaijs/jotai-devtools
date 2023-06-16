import React, { useCallback } from 'react';
import { Box, Tabs, Title } from '@mantine/core';
import { IconFileCode, IconFileDiff } from '@tabler/icons-react';
import { JSONTree } from '../../../../../../JSONTree';
import { SelectedSnapshotDetail } from '../../../atoms';
import { SnapshotValueViewer, useSnapshotValueViewer } from '../atoms';
import { TreeView } from './TreeView';

type SnapshotValueProps = {
  state: SelectedSnapshotDetail;
};

export const SnapshotValue = (props: SnapshotValueProps): JSX.Element => {
  const [snapshotValueViewer, setSnapshotValueViewer] =
    useSnapshotValueViewer();

  const handleOnTabChange = useCallback(
    (value: SnapshotValueViewer) => {
      if (value) {
        setSnapshotValueViewer(value as SnapshotValueViewer);
      }
    },
    [setSnapshotValueViewer],
  );
  return (
    <Box>
      <Title size="h5" mb={10}>
        Value
      </Title>

      <Tabs
        defaultValue="state"
        keepMounted={false}
        id="jotai-devtools-time-travel-value-tabs"
        value={snapshotValueViewer}
        onTabChange={handleOnTabChange}
      >
        <Tabs.List>
          <Tabs.Tab
            value="state"
            icon={<IconFileCode size="0.9rem" stroke="1.75" />}
          >
            State
          </Tabs.Tab>
          <Tabs.Tab
            value="diff"
            icon={<IconFileDiff size="0.9rem" stroke="1.75" />}
          >
            Diff
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="state" pt="xs">
          <JSONTree data={props.state.displayValues} />
        </Tabs.Panel>

        <Tabs.Panel
          value="diff"
          pt="xs"
          data-testid="jotai-devtools-diff-panel"
        >
          <TreeView diff={props.state.diff} />
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
};
