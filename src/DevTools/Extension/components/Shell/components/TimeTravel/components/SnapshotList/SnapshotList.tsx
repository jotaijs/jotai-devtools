import React, { useCallback, useEffect, useMemo } from 'react';
import { Box, Group, Text } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { IconAlertCircle } from '@tabler/icons-react';
import { ActionListItem } from '../../../ActionListItem';
import {
  useFilteredSnapshotHistoryAtomValue,
  useSelectedSnapshotIdValue,
  useSetSelectedSnapshotId,
  useShouldAutoScroll,
  useSnapshotSearchInputValue,
} from '../../atoms';
import { Header } from './components/Header';
import classes from './SnapshotList.module.css';

export const SnapshotList = () => {
  const historyList = useFilteredSnapshotHistoryAtomValue();
  const selectedSnapshotValue = useSelectedSnapshotIdValue();
  const setSelectedSnapshot = useSetSelectedSnapshotId();
  const searchInput = useSnapshotSearchInputValue();
  const [shouldAutoScroll, setShouldAutoScroll] = useShouldAutoScroll();

  const { cancel, scrollIntoView, targetRef, scrollableRef } =
    useScrollIntoView<HTMLAnchorElement, HTMLDivElement>({
      cancelable: true,
      isList: true,
      duration: 200,
      onScrollFinish: () => {
        setShouldAutoScroll(false);
      },
    });

  useEffect(() => {
    if (shouldAutoScroll && selectedSnapshotValue) {
      scrollIntoView({ alignment: shouldAutoScroll });
    }

    return cancel;
  }, [shouldAutoScroll, selectedSnapshotValue, scrollIntoView, cancel]);

  const handleOnClick = useCallback(
    (id: string | number) => {
      // Should never occur since we're passing
      if (typeof id !== 'string') {
        throw new Error('Invalid snapshot id supplied, must be a string');
      }

      setSelectedSnapshot((prev) => {
        if (id === prev) {
          return undefined;
        }
        return id;
      });
    },
    [setSelectedSnapshot],
  );

  const snapshotHistoryList = useMemo(
    () =>
      historyList.map(({ id, label }) => {
        const isActive = selectedSnapshotValue === id;
        return (
          <ActionListItem
            key={`snapshot-${id}`}
            label={String(label)}
            onClick={handleOnClick}
            id={id}
            isActive={isActive}
            ref={isActive ? targetRef : undefined}
            data-testid={`jotai-devtools-snapshot-${label}`}
          />
        );
      }),
    [handleOnClick, historyList, selectedSnapshotValue, targetRef],
  );

  const noResultsFound = !historyList.length && searchInput.trim();

  return (
    <>
      <Header />
      <Box
        className={classes.snapshotHistoryListWrapper}
        ref={scrollableRef}
        data-testid="jotai-devtools-snapshot-history-list"
      >
        {snapshotHistoryList}
      </Box>
      {noResultsFound && (
        <Group mt={20} justify="center">
          <IconAlertCircle size={16} />
          <Text
            component="span"
            fz="sm"
            ml={0}
            data-testid="jotai-devtools-no-snapshot-found-message"
          >
            No snapshots found!
          </Text>
        </Group>
      )}
    </>
  );
};
