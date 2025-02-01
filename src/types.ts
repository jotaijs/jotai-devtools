import { useStore } from 'jotai/react';
import type { Atom, WritableAtom, createStore } from 'jotai/vanilla';
import { INTERNAL_DevStoreRev4, INTERNAL_PrdStore } from 'jotai/vanilla/store';

export type StoreWithoutDevMethods = ReturnType<typeof createStore>;
export type StoreWithDevMethods = INTERNAL_DevStoreRev4 & INTERNAL_PrdStore;

export type Store = StoreWithoutDevMethods | StoreWithDevMethods;

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
