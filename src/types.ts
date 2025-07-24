import { useStore } from 'jotai/react';
import type { Atom, WritableAtom, createStore } from 'jotai/vanilla';
import type {
  INTERNAL_AtomState,
  INTERNAL_Store,
  INTERNAL_getBuildingBlocksRev1,
} from 'jotai/vanilla/internals';

export type DevStore = {
  get_internal_weak_map: () => {
    get: (atom: Atom<unknown>) => INTERNAL_AtomState | undefined;
  };
  get_mounted_atoms: () => Set<Atom<unknown>>;
  restore_atoms: (values: Iterable<readonly [Atom<unknown>, unknown]>) => void;
};

export type StoreWithoutDevMethods = ReturnType<typeof createStore>;
export type StoreWithDevMethods = INTERNAL_Store & DevStore;

export type Store = StoreWithoutDevMethods | StoreWithDevMethods;
type Mutable<T> = { -readonly [P in keyof T]: T[P] };
export type BuildingBlocks = Mutable<
  ReturnType<typeof INTERNAL_getBuildingBlocksRev1>
>;

export type Options = Parameters<typeof useStore>[0];

export type AnyAtomValue = unknown;
export type AnyAtomError = unknown;
export type AnyAtom = Atom<AnyAtomValue>;
export type AnyWritableAtom = WritableAtom<AnyAtomValue, unknown[], unknown>;

export type AtomsValues = Map<AnyAtom, AnyAtomValue>; // immutable
export type AtomsDependents = Map<AnyAtom, Set<AnyAtom>>; // immutable
export type AtomsSnapshot = Readonly<{
  values: AtomsValues;
  dependents: AtomsDependents;
}>;

export type WithInitialValue<Value = AnyAtomValue> = {
  init: Value;
};

export type ValuesAtomTuple = [AnyAtom, AnyAtomValue];
