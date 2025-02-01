import { Atom } from 'jotai';
import {
  AnyAtom,
  AnyAtomError,
  AnyAtomValue,
  Store,
  StoreWithDevMethods,
} from '../../types';

type DevSubscribeStoreListener = (action: {
  type: 'async-get' | 'set' | 'sub' | 'unsub' | 'restore';
}) => void;

type DevToolsStoreMethods = {
  subscribeStore: (l: DevSubscribeStoreListener) => () => void;
  getMountedAtoms: () => Iterable<Atom<unknown>>;
  getAtomState: (
    atom: Atom<unknown>,
  ) =>
    | { readonly v: AnyAtomValue; readonly d: Iterable<AnyAtom> }
    | { readonly e: AnyAtomError; readonly d: Iterable<AnyAtom> }
    | undefined;
  getMountedAtomState: (atom: Atom<unknown>) =>
    | {
        // Atom's listeners
        readonly l: Set<() => void>;
        // Atom's dependents. Atoms that depend on this atom
        readonly t: Set<Atom<unknown>>;
      }
    | undefined;
  restoreAtoms: (values: Iterable<readonly [AnyAtom, AnyAtomValue]>) => void;
};

type WithDevToolsStore<S extends Store> = S & DevToolsStoreMethods;

const isDevStore = (store: Store | undefined): store is StoreWithDevMethods => {
  return store ? 'dev4_get_internal_weak_map' in store : false;
};

export const isDevToolsStore = (
  store: Store | WithDevToolsStore<Store>,
): store is WithDevToolsStore<Store> => {
  return 'subscribeStore' in store;
};

const __composeDevTools = (
  store: StoreWithDevMethods,
): WithDevToolsStore<StoreWithDevMethods> => {
  const { sub, set, get } = store;
  const storeListeners: Set<DevSubscribeStoreListener> = new Set();

  // Map to keep track of how many times an atom was set recently
  // We mostly use this to re-collect the values for history tracking for async atoms
  // Async atoms call `get` once they finish fetching the value, so we verify if the atom was set recently and then trigger the history tracking
  // I hope there is a better way to do this
  const recentlySetAtomsMap = new WeakMap<Atom<unknown>, number>();

  const reduceCountOrRemoveRecentlySetAtom = (
    atom: Atom<unknown>,
    onFound?: () => void,
  ) => {
    const foundCount = recentlySetAtomsMap.get(atom);
    if (typeof foundCount === 'number') {
      if (foundCount > 1) {
        recentlySetAtomsMap.set(atom, foundCount - 1);
      } else {
        recentlySetAtomsMap.delete(atom);
      }
      onFound?.();
    }
  };

  const increaseCountRecentlySetAtom = (atom: Atom<unknown>) => {
    const foundCount = recentlySetAtomsMap.get(atom);
    recentlySetAtomsMap.set(atom, (foundCount || 0) + 1);
  };

  store.sub = (...args) => {
    const unsub = sub(...args);
    storeListeners.forEach((l) => l({ type: 'sub' }));
    return () => {
      unsub();

      // We remove the atom from the recently set map if it was set recently when it is unsubscribed
      reduceCountOrRemoveRecentlySetAtom(args[0]);

      storeListeners.forEach((l) => l({ type: 'unsub' }));
    };
  };

  store.get = (...args) => {
    const value = get(...args);

    reduceCountOrRemoveRecentlySetAtom(args[0], () => {
      if (value instanceof Promise) {
        value.then(() => {
          // We wait for a tick to ensure that if there are any derived atoms then we wait for them to be flushed out as well
          Promise.resolve().then(() => {
            storeListeners.forEach((l) => l({ type: 'async-get' }));
          });
        });
      }
    });

    return value;
  };

  store.set = (...args) => {
    const value = set(...args);
    increaseCountRecentlySetAtom(args[0]);
    storeListeners.forEach((l) => l({ type: 'set' }));
    return value;
  };

  (store as WithDevToolsStore<typeof store>).subscribeStore = (l) => {
    storeListeners.add(l);
    return () => {
      storeListeners.delete(l);
    };
  };

  (store as WithDevToolsStore<typeof store>).getMountedAtoms = () => {
    return store.dev4_get_mounted_atoms();
  };

  (store as WithDevToolsStore<typeof store>).getAtomState = (atom) => {
    const aState = store.dev4_get_internal_weak_map().get(atom);

    if (aState) {
      return { v: aState.v, e: aState.e, d: new Set(aState.d.keys()) };
    }

    return undefined;
  };

  (store as WithDevToolsStore<typeof store>).getMountedAtomState = (atom) => {
    const aState = store.dev4_get_internal_weak_map().get(atom);

    if (aState && aState.m) {
      return {
        l: aState.m.l,
        t: aState.m.t,
      };
    }

    return undefined;
  };

  (store as WithDevToolsStore<typeof store>).restoreAtoms = (values) => {
    store.dev4_restore_atoms(values);
    storeListeners.forEach((l) => l({ type: 'restore' }));
  };

  return store as typeof store & DevToolsStoreMethods;
};

export const composeWithDevTools = (
  store: Store,
): typeof store | WithDevToolsStore<typeof store> => {
  // Check if the store is already composed with DevTools
  if (isDevToolsStore(store)) {
    return store;
  }

  if (isDevStore(store)) {
    return __composeDevTools(store);
  }

  return store;
};
