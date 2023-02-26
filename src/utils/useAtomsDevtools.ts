import { useEffect, useRef } from 'react';
import { AnyAtom, AnyAtomValue, AtomsSnapshot, Options } from '../types';
import { useAtomsSnapshot } from './useAtomsSnapshot';
import { useDidMount } from './useDidMount';
import { useGotoAtomsSnapshot } from './useGotoAtomsSnapshot';
import { useReduxConnector } from './useReduxConnector';

const atomToPrintable = (atom: AnyAtom) =>
  atom.debugLabel ? `${atom}:${atom.debugLabel}` : `${atom}`;

const getDevtoolsState = (atomsSnapshot: AtomsSnapshot) => {
  const values: Record<string, AnyAtomValue> = {};
  atomsSnapshot.values.forEach((v, atom) => {
    values[atomToPrintable(atom)] = v;
  });
  const dependents: Record<string, string[]> = {};
  atomsSnapshot.dependents.forEach((d, atom) => {
    dependents[atomToPrintable(atom)] = Array.from(d).map(atomToPrintable);
  });
  return {
    values,
    dependents,
  };
};

type DevtoolsOptions = Options & {
  enabled?: boolean;
};

export function useAtomsDevtools(
  name: string,
  options?: DevtoolsOptions,
): void {
  const { enabled } = options || {};
  const didMount = useDidMount();

  // This an exception, we don't usually use utils in themselves!
  const atomsSnapshot = useAtomsSnapshot(options);
  const goToSnapshot = useGotoAtomsSnapshot(options);

  const isTimeTraveling = useRef(false);
  const isRecording = useRef(true);

  const snapshots = useRef<AtomsSnapshot[]>([]);

  const connector = useReduxConnector({
    name,
    enabled,
    initialValue: getDevtoolsState(atomsSnapshot),
  });

  const subscriptionCleanup = useRef<() => void>();
  useEffect(() => {
    // Only subscribe once.
    // If there is an existing subscription, we don't want to create a second one.
    if (subscriptionCleanup.current) subscriptionCleanup.current();

    if (!connector.current) return;

    const getSnapshotAt = (index = snapshots.current.length - 1) => {
      // index 0 is @@INIT, so we need to return the next action (0)
      const snapshot = snapshots.current[index >= 0 ? index : 0];
      if (!snapshot) {
        throw new Error('snaphost index out of bounds');
      }
      return snapshot;
    };

    subscriptionCleanup.current = connector.current.subscribe((message) => {
      switch (message.type) {
        case 'DISPATCH':
          switch (message.payload?.type) {
            case 'RESET':
              // TODO
              break;

            case 'COMMIT':
              connector.current?.init(getDevtoolsState(getSnapshotAt()));
              snapshots.current = [];
              break;

            case 'JUMP_TO_ACTION':
            case 'JUMP_TO_STATE':
              isTimeTraveling.current = true;
              goToSnapshot(getSnapshotAt(message.payload.actionId - 1));
              break;

            case 'PAUSE_RECORDING':
              isRecording.current = !isRecording.current;
              break;
          }
      }
    });

    return subscriptionCleanup.current;
  }, [connector, goToSnapshot]);

  useEffect(() => {
    const connection = connector.current;
    if (!connection || !didMount) return;

    if (isTimeTraveling.current) {
      isTimeTraveling.current = false;
    } else if (isRecording.current) {
      snapshots.current.push(atomsSnapshot);
      connection.send(
        {
          type: `${snapshots.current.length}`,
          updatedAt: new Date().toLocaleString(),
        } as any,
        getDevtoolsState(atomsSnapshot),
      );
    }
  }, [atomsSnapshot, connector, didMount]);
}
