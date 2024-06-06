import { useEffect } from 'react';
import {
  AtomsDependents,
  AtomsSnapshot,
  AtomsValues,
} from '../../../../../../types';
import { useDevToolsOptionsValue } from '../../../../../atoms/devtools-options';
import {
  isDevToolsStore,
  useUserStore,
} from '../../../../../hooks/useUserStore';
import { useInternalStore } from '../../../../../internal-jotai-store';
import { atomToPrintable } from '../../../../../utils';
import { createTimestamp } from '../../../../../utils/create-timestamp';
import {
  SnapshotHistory,
  isTimeTravelingAtom,
  useSetSnapshotHistory,
  useShouldRecordSnapshotHistoryValue,
} from './atoms';

// Do we need to worry about collisions here?
const generateShortId = () =>
  Date.now().toString(36).substring(5) +
  Math.random().toString(36).substring(8);

type PromiseWithMeta = Promise<unknown> & {
  status?: 'pending' | 'fulfilled' | 'rejected';
  value?: unknown;
  reason?: unknown;
};

export const isPromiseWithMeta = (x: unknown): x is PromiseWithMeta =>
  x instanceof Promise;

export default function useSyncSnapshotHistory() {
  const userStore = useUserStore();
  const store = useInternalStore();
  const setHistory = useSetSnapshotHistory();
  const shouldRecordSnapshotHistory = useShouldRecordSnapshotHistoryValue();
  const { snapshotHistoryLimit, shouldShowPrivateAtoms } =
    useDevToolsOptionsValue();

  useEffect(() => {
    if (!isDevToolsStore(userStore)) return;

    const addToHistoryStack = (
      nextSnapshot: AtomsSnapshot,
      displayValues: SnapshotHistory['displayValues'],
    ) => {
      setHistory((prev) => {
        const prevSnapshot = prev[prev.length - 1];
        const nextSnapshotHistoryItem: SnapshotHistory = {
          id: generateShortId(),
          value: nextSnapshot,
          displayValues,
          label: (prevSnapshot?.label || 0) + 1,
          isHidden: false,
          timestamp: createTimestamp(),
        };

        if (!prevSnapshot) {
          return [nextSnapshotHistoryItem];
        }
        const nextSnapshotHistory = prev.slice(-snapshotHistoryLimit);
        if (
          nextSnapshotHistory.length >= snapshotHistoryLimit &&
          nextSnapshotHistory[0]
        ) {
          nextSnapshotHistory[0].isHidden = true;
        }
        return [...nextSnapshotHistory, nextSnapshotHistoryItem];
      });
    };

    const collectValues = () => {
      const values: AtomsValues = new Map();
      const displayValues: SnapshotHistory['displayValues'] = {};
      const dependents: AtomsDependents = new Map();
      for (const atom of userStore.getMountedAtoms() || []) {
        const atomState = userStore.getAtomState(atom);
        if (atomState) {
          if ('v' in atomState) {
            values.set(atom, atomState.v);
            // if atom is not private, we'll add it to displayValues
            if (!atom.debugPrivate) {
              if (isPromiseWithMeta(atomState.v)) {
                if (atomState.v.status === 'pending') {
                  displayValues[atomToPrintable(atom)] = {
                    status: 'pending',
                  };
                } else if (atomState.v.status === 'rejected') {
                  displayValues[atomToPrintable(atom)] = {
                    status: atomState.v.status,
                    reason: atomState.v.reason,
                  };
                } else if (atomState.v.status === 'fulfilled') {
                  displayValues[atomToPrintable(atom)] = {
                    status: atomState.v.status,
                    value: atomState.v.value,
                  };
                } else {
                  displayValues[atomToPrintable(atom)] = {
                    status: 'pending',
                  };
                }
              } else {
                displayValues[atomToPrintable(atom)] = atomState.v;
              }
            }
          }
        }
        const mounted = userStore.getMountedAtomState(atom);
        if (mounted) {
          dependents.set(atom, mounted.t);
        }
      }
      addToHistoryStack({ values, dependents }, displayValues);
    };
    const cb = (
      action: Parameters<Parameters<typeof userStore.subscribeStore>[0]>[0],
    ) => {
      const isWrite = action.type === 'set' || action.type === 'async-get';
      if (
        isWrite &&
        shouldRecordSnapshotHistory &&
        !store.get(isTimeTravelingAtom)
      ) {
        collectValues();
      }
    };

    const unsub = userStore.subscribeStore(cb);
    return unsub;
  }, [
    store,
    userStore,
    setHistory,
    shouldRecordSnapshotHistory,
    shouldShowPrivateAtoms,
    snapshotHistoryLimit,
  ]);
}
