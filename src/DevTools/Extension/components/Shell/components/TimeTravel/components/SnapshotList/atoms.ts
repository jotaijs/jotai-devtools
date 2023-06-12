import { useCallback } from 'react';
import { useAtom } from 'jotai/react';
import { ExtractAtomValue, atom } from 'jotai/vanilla';
import {
  filteredSnapshotHistoryAtom,
  selectedSnapshotIdAtom,
  shouldAutoScrollAtom,
} from '../../atoms';
import { useDevtoolsJotaiStoreOptions } from './../../../../../../../internal-jotai-store';

const snapshotHistoryNavigationAtom = atom(
  (get) => {
    const snapshotHistory = get(filteredSnapshotHistoryAtom);
    const selectedSnapshotId = get(selectedSnapshotIdAtom);
    if (selectedSnapshotId) {
      const foundIndex = snapshotHistory.findIndex(
        (snapshot) => snapshot.id === selectedSnapshotId,
      );
      return {
        prevId:
          foundIndex > 0 ? snapshotHistory[foundIndex - 1]?.id : undefined,
        nextId:
          foundIndex < snapshotHistory.length - 1
            ? snapshotHistory[foundIndex + 1]?.id
            : undefined,
      };
    }
    return {
      prevId: undefined,
      nextId: undefined,
    };
  },
  (
    _,
    set,
    nextSelectedSnapshotIdAtom: ExtractAtomValue<typeof selectedSnapshotIdAtom>,
    shouldAutoScroll: ExtractAtomValue<typeof shouldAutoScrollAtom>,
  ) => {
    set(selectedSnapshotIdAtom, nextSelectedSnapshotIdAtom);
    set(shouldAutoScrollAtom, shouldAutoScroll);
  },
);

export const useSnapshotHistoryNavigation = () => {
  const [{ prevId, nextId }, selectSnapshot] = useAtom(
    snapshotHistoryNavigationAtom,
    useDevtoolsJotaiStoreOptions(),
  );
  const isPreviousPossible = !!prevId;
  const isNextPossible = !!nextId;

  const onPrevious = useCallback(() => {
    if (isPreviousPossible) {
      selectSnapshot(prevId, 'start');
    }
  }, [prevId, selectSnapshot, isPreviousPossible]);

  const onNext = useCallback(() => {
    if (isNextPossible) {
      selectSnapshot(nextId, 'end');
    }
  }, [nextId, selectSnapshot, isNextPossible]);

  return {
    prev: {
      isPossible: isPreviousPossible,
      onClick: onPrevious,
    },
    next: {
      isPossible: isNextPossible,
      onClick: onNext,
    },
  };
};
