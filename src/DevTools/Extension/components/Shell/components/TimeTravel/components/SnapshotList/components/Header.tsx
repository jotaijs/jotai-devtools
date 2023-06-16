import React from 'react';
import { Group, Stack, Sx } from '@mantine/core';
import { ClearHistory } from './ClearHistory';
import { RecordHistory } from './RecordHistory';
import { SnapshotListNavigation } from './SnapshotListNavigation';
import { SnapshotSearchInput } from './SnapshotSearchInput';

const headerStyles: Sx = (theme) => ({
  position: 'sticky',
  top: 0,
  marginTop: theme.spacing.sm,
});

const headerContentStyles: Sx = (theme) => ({
  backgroundColor:
    theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  borderRadius: theme.radius.md,
  justifyContent: 'space-between',
});

export const Header = () => {
  return (
    <Stack sx={headerStyles} spacing="sm">
      <Group sx={headerContentStyles} p="xs">
        <Group>
          <RecordHistory />
          <ClearHistory />
        </Group>
        <SnapshotListNavigation />
      </Group>
      <SnapshotSearchInput />
    </Stack>
  );
};
