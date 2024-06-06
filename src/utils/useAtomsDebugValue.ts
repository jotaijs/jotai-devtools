import {
  useDebugValue,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useStore } from 'jotai/react';
import type { Atom } from 'jotai/vanilla';
import { Store } from '../types';
import { isDevToolsStore, useDevToolsStore } from './hooks/useDevToolsStore';

const atomToPrintable = (atom: Atom<unknown>) =>
  atom.debugLabel || atom.toString();

const stateToPrintable = ([store, atoms]: [Store, Atom<unknown>[]]) =>
  Object.fromEntries(
    atoms.flatMap((atom) => {
      const mounted = isDevToolsStore(store) && store.getMountedAtomState(atom);
      if (!mounted) {
        return [];
      }
      const dependents = mounted.t;
      const atomState = store.getAtomState(atom) || {};
      return [
        [
          atomToPrintable(atom),
          {
            ...('e' in atomState && { error: atomState.e }),
            ...('v' in atomState && { value: atomState.v }),
            dependents: Array.from(dependents).map(atomToPrintable),
          },
        ],
      ];
    }),
  );

type Options = Parameters<typeof useStore>[0] & {
  enabled?: boolean;
};

// We keep a reference to the atoms,
// so atoms aren't garbage collected by the WeakMap of mounted atoms
export const useAtomsDebugValue = (options?: Options) => {
  const enabled = options?.enabled ?? __DEV__;
  const store = useDevToolsStore(options);
  const [atoms, setAtoms] = useState<Atom<unknown>[]>([]);
  const duringReactRenderPhase = useRef(true);
  duringReactRenderPhase.current = true;
  useLayoutEffect(() => {
    duringReactRenderPhase.current = false;
  });
  useEffect(() => {
    if (!enabled || !isDevToolsStore(store)) {
      return;
    }

    const callback = () => {
      const deferrableAtomSetAction = () =>
        setAtoms(Array.from(store.getMountedAtoms() || []));
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
  }, [enabled, store]);

  useDebugValue([store, atoms], stateToPrintable);
};
