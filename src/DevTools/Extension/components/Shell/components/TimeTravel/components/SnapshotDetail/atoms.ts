import { useAtomValue } from 'jotai/react';
import { atom } from 'jotai/vanilla';
import { useDevtoolsJotaiStoreOptions } from '../../../../../../../internal-jotai-store';
import {
  SnapshotHistory,
  selectedSnapshotIdAtom,
  snapshotHistoryAtom,
} from '../../atoms';
import { Delta, createDiffPatcher } from '../../utils/create-diff-patcher';

export const STATES_EQUAL_SYMBOL = Symbol('STATES_EQUAL_SYMBOL');

export type SelectedSnapshotDetail = Pick<
  SnapshotHistory,
  'id' | 'displayValues' | 'timestamp' | 'value'
> & {
  label: SnapshotHistory['label'] | undefined;
  diff: typeof STATES_EQUAL_SYMBOL | Delta;
  isRestorable: boolean;
};

export const selectedSnapshotDetailAtom = atom<
  SelectedSnapshotDetail | undefined
>((get) => {
  const selectedSnapshotId = get(selectedSnapshotIdAtom);
  const snapshotHistory = get(snapshotHistoryAtom);
  if (snapshotHistory.length) {
    const selectedSnapshotIdx = selectedSnapshotId
      ? snapshotHistory.findIndex(
          (snapshot) => snapshot.id === selectedSnapshotId,
        )
      : snapshotHistory.length - 1;
    if (selectedSnapshotIdx >= 0) {
      const fromState =
        snapshotHistory[selectedSnapshotIdx > 0 ? selectedSnapshotIdx - 1 : 0];
      const toState = snapshotHistory[selectedSnapshotIdx];

      if (fromState && toState) {
        const deltaState = createDiffPatcher().diff(
          fromState.displayValues,
          toState.displayValues,
        );
        const diff = deltaState || STATES_EQUAL_SYMBOL;
        return {
          id: toState.id,
          label: selectedSnapshotId ? toState.label : undefined,
          displayValues: toState.displayValues,
          diff,
          isRestorable:
            diff !== STATES_EQUAL_SYMBOL &&
            selectedSnapshotIdx !== snapshotHistory.length - 1,
          timestamp: toState.timestamp,
          value: toState.value,
        };
      }
    }
  }
  return undefined;
});

export const useSelectedSnapshotDetailValue = () =>
  useAtomValue(selectedSnapshotDetailAtom, useDevtoolsJotaiStoreOptions());
