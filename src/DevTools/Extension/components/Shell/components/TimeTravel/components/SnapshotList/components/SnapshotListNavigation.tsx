import React from 'react';
import { ActionIcon, Group } from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useThemeMode } from '../../../../../../../../hooks/useThemeMode';
import { useSnapshotHistoryNavigation } from '../atoms';

export const SnapshotListNavigation = () => {
  const { prev, next } = useSnapshotHistoryNavigation();
  return (
    <Group>
      <ActionIcon
        variant="default"
        color={useThemeMode('dark', 'gray')}
        aria-label="Select previous snapshot"
        title="Select previous snapshot"
        disabled={!prev.isPossible}
        onClick={prev.onClick}
      >
        <IconChevronUp size={16} />
      </ActionIcon>
      <ActionIcon
        variant="default"
        color={useThemeMode('dark', 'gray')}
        aria-label="Select next snapshot"
        title="Select next snapshot"
        disabled={!next.isPossible}
        onClick={next.onClick}
      >
        <IconChevronDown size={16} />
      </ActionIcon>
    </Group>
  );
};
