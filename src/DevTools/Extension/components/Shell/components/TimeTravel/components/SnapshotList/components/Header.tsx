import React from 'react';
import { Group, Stack } from '@mantine/core';
import { ClearHistory } from './ClearHistory';
import classes from './Header.module.css';
import { RecordHistory } from './RecordHistory';
import { SnapshotListNavigation } from './SnapshotListNavigation';
import { SnapshotSearchInput } from './SnapshotSearchInput';

export const Header = () => {
  return (
    <Stack className={classes.header} gap="sm">
      <Group className={classes.headerContent} p="xs">
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
