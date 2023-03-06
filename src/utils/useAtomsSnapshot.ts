import { useEffect, useState } from 'react';
import { useStore } from 'jotai/react';
import type {
  AtomsDependents,
  AtomsSnapshot,
  AtomsValues,
  Options,
} from '../types';

const isEqualAtomsValues = (left: AtomsValues, right: AtomsValues) =>
  left.size === right.size &&
  Array.from(left).every(([left, v]) => Object.is(right.get(left), v));

const isEqualAtomsDependents = (
  left: AtomsDependents,
  right: AtomsDependents,
) =>
  left.size === right.size &&
  Array.from(left).every(([a, dLeft]) => {
    const dRight = right.get(a);
    return (
      dRight &&
      dLeft.size === dRight.size &&
      Array.from(dLeft).every((d) => dRight.has(d))
    );
  });

export function useAtomsSnapshot(options?: Options): AtomsSnapshot {
  const store = useStore(options);

  const [atomsSnapshot, setAtomsSnapshot] = useState<AtomsSnapshot>(() => ({
    values: new Map(),
    dependents: new Map(),
  }));

  useEffect(() => {
    // FIXME replace this with `store.dev_subscribe_store` check after next minor Jotai 2.1.0?
    if (!store.dev_subscribe_state) return;

    let prevValues: AtomsValues = new Map();
    let prevDependents: AtomsDependents = new Map();

    let devSubscribeStore = store.dev_subscribe_state;

    if (typeof store?.dev_subscribe_store !== 'function') {
      console.warn(
        "[DEPRECATION-WARNING] Jotai version you're using contains deprecated dev-only properties that will be removed soon. Please update to the latest version of Jotai.",
      );
    } else {
      devSubscribeStore = store.dev_subscribe_store;
    }

    const callback = () => {
      const values: AtomsValues = new Map();
      const dependents: AtomsDependents = new Map();
      for (const atom of store.dev_get_mounted_atoms() || []) {
        const atomState = store.dev_get_atom_state(atom);
        if (atomState) {
          if ('v' in atomState) {
            values.set(atom, atomState.v);
          }
        }
        const mounted = store.dev_get_mounted(atom);
        if (mounted) {
          dependents.set(atom, mounted.t);
        }
      }
      if (
        isEqualAtomsValues(prevValues, values) &&
        isEqualAtomsDependents(prevDependents, dependents)
      ) {
        // not changed
        return;
      }
      prevValues = values;
      prevDependents = dependents;
      setAtomsSnapshot({ values, dependents });
    };
    const unsubscribe = devSubscribeStore?.(callback);
    callback();
    return unsubscribe;
  }, [store]);

  return atomsSnapshot;
}
