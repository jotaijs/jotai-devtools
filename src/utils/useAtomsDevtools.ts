import { useEffect, useRef } from 'react';
import { Connector, createReduxConnector } from './createReduxConnector';
import { getReduxExtension } from './getReduxExtension';
import { AnyAtom, AnyAtomValue, AtomsSnapshot, Options } from '../types';
import { useAtomsSnapshot } from './useAtomsSnapshot';
import { useGotoAtomsSnapshot } from './useGotoAtomsSnapshot';

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

  // This an exception, we don't usually use utils in themselves!
  const atomsSnapshot = useAtomsSnapshot(options);
  const goToSnapshot = useGotoAtomsSnapshot(options);

  const isTimeTraveling = useRef(false);
  const isRecording = useRef(true);
  const devtools = useRef<Connector>();

  const snapshots = useRef<AtomsSnapshot[]>([]);

  useEffect(() => {
    const extension = getReduxExtension(enabled);
    devtools.current = createReduxConnector(extension, name);
    return () => {
      extension?.disconnect?.();
    };
  }, [enabled, name]);

  useEffect(() => {
    const connector = devtools.current;
    if (!connector) return;

    const getSnapshotAt = (index = snapshots.current.length - 1) => {
      // index 0 is @@INIT, so we need to return the next action (0)
      const snapshot = snapshots.current[index >= 0 ? index : 0];
      if (!snapshot) {
        throw new Error('snaphost index out of bounds');
      }
      return snapshot;
    };

    const devtoolsUnsubscribe = connector.subscribe((message) => {
      switch (message.type) {
        case 'DISPATCH':
          switch (message.payload?.type) {
            case 'RESET':
              // TODO
              break;

            case 'COMMIT':
              devtools.current?.init(getDevtoolsState(getSnapshotAt()));
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

    return devtoolsUnsubscribe;
  }, [goToSnapshot]);

  useEffect(() => {
    const connector = devtools.current;
    if (!connector) return;

    if (connector.shouldInit) {
      connector.init(undefined);
      connector.shouldInit = false;
      return;
    }
    if (isTimeTraveling.current) {
      isTimeTraveling.current = false;
    } else if (isRecording.current) {
      snapshots.current.push(atomsSnapshot);
      connector.send(
        {
          type: `${snapshots.current.length}`,
          updatedAt: new Date().toLocaleString(),
        } as any,
        getDevtoolsState(atomsSnapshot),
      );
    }
  }, [atomsSnapshot]);
}
