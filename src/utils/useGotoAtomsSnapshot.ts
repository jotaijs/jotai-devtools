import { useCallback } from 'react';
import type { AtomsSnapshot, Options } from '../types';
import { isDevToolsStore, useDevToolsStore } from './hooks/useDevToolsStore';

export function useGotoAtomsSnapshot(options?: Options) {
  const store = useDevToolsStore(options);
  return useCallback(
    (snapshot: AtomsSnapshot) => {
      if (isDevToolsStore(store)) {
        store.restoreAtoms(snapshot.values);
      }
    },
    [store],
  );
}
