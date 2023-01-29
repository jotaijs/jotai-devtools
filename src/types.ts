import type { Atom, createStore } from 'jotai/vanilla';

export type Store = ReturnType<typeof createStore>;

export type Options = {
  store?: Store;
};

export type AnyAtomValue = unknown;
export type AnyAtom = Atom<AnyAtomValue>;
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
