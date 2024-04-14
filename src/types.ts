import { useStore } from 'jotai/react';
import type {
  Atom,
  WritableAtom,
  createStore as createStoreV1,
} from 'jotai/vanilla';
import type {
  INTERNAL_DevStoreRev4,
  INTERNAL_PrdStore,
} from 'jotai/vanilla/store2';

export type StoreV1 = ReturnType<typeof createStoreV1>;
export type StoreV2 = INTERNAL_DevStoreRev4 & INTERNAL_PrdStore;

export type Store = StoreV1 | StoreV2;

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
