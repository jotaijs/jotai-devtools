import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type {
  AtomsDependents,
  AtomsSnapshot,
  AtomsValues,
  Options,
} from '../types';
import { isDevToolsStore, useDevToolsStore } from './hooks/useDevToolsStore';

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

export type SnapshotOptions = Options & {
  /**
   * Defaults to `false`
   *
   * Private are atoms that are used by Jotai libraries internally to manage state.
   * They're often used internally in atoms like `atomWithStorage` or `atomWithLocation`, etc. to manage state.
   */
  shouldShowPrivateAtoms?: boolean;
};

export function useAtomsSnapshot({
  shouldShowPrivateAtoms = false,
  ...options
}: SnapshotOptions = {}): AtomsSnapshot {
  const store = useDevToolsStore(options);

  const [atomsSnapshot, setAtomsSnapshot] = useState<AtomsSnapshot>(() => ({
    values: new Map(),
    dependents: new Map(),
  }));

  const duringReactRenderPhase = useRef(true);
  duringReactRenderPhase.current = true;
  useLayoutEffect(() => {
    duringReactRenderPhase.current = false;
  });

  useEffect(() => {
    if (!isDevToolsStore(store)) return;

    let prevValues: AtomsValues = new Map();
    let prevDependents: AtomsDependents = new Map();

    const callback = () => {
      const values: AtomsValues = new Map();
      const dependents: AtomsDependents = new Map();
      for (const atom of store.getMountedAtoms() || []) {
        if (!shouldShowPrivateAtoms && atom.debugPrivate) {
          // Skip private atoms
          continue;
        }

        const atomState = store.getAtomState(atom);
        if (atomState) {
          if ('v' in atomState) {
            values.set(atom, atomState.v);
          }
        }
        const mounted = store.getMountedAtomState(atom);
        if (mounted) {
          let atomDependents = mounted.t;

          if (!shouldShowPrivateAtoms) {
            // Filter private dependent atoms
            atomDependents = new Set(
              Array.from(atomDependents.values()).filter(
                /* NOTE: This just removes private atoms from the dependents list,
                  instead of hiding them from the dependency chain and showing
                  the nested dependents of the private atoms. */
                (dependent) => !dependent.debugPrivate,
              ),
            );
          }

          dependents.set(atom, atomDependents);
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
      const deferrableAtomSetAction = () =>
        setAtomsSnapshot({ values, dependents });
      if (duringReactRenderPhase.current) {
        // avoid set action when react is rendering components
        Promise.resolve().then(deferrableAtomSetAction);
      } else {
        deferrableAtomSetAction();
      }
    };

    const unsubscribe = store.subscribeStore(callback);
    callback();
    return unsubscribe;
  }, [store, shouldShowPrivateAtoms]);

  return atomsSnapshot;
}
