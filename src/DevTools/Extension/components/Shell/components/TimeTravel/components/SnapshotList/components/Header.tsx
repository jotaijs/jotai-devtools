import React from 'react';
import { Group, Stack } from '@mantine/core';
import { ClearHistory } from './ClearHistory';
import styles from './Header.module.css';
import { RecordHistory } from './RecordHistory';
import { SnapshotListNavigation } from './SnapshotListNavigation';
import { SnapshotSearchInput } from './SnapshotSearchInput';

export const Header = () => {
  return (
    <Stack className={styles['jotai-devtools-header-wrapper']} gap="sm">
      <Group
        className={styles['jotai-devtools-header-content']}
        justify="space-between"
        p="xs"
      >
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
