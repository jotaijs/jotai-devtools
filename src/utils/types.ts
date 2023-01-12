import type {} from '@redux-devtools/extension';
import type { useStore } from 'jotai/react';
import type { Atom } from 'jotai/vanilla';

// FIXME https://github.com/reduxjs/redux-devtools/issues/1097
// This is an INTERNAL type alias.
export type Message = {
  type: string;
  payload?: any;
  state?: any;
};

export type Options = Parameters<typeof useStore>[0];
export type AnyAtomValue = unknown;
export type AnyAtom = Atom<AnyAtomValue>;
export type AtomsValues = Map<AnyAtom, AnyAtomValue>; // immutable
export type AtomsDependents = Map<AnyAtom, Set<AnyAtom>>; // immutable
export type AtomsSnapshot = Readonly<{
  values: AtomsValues;
  dependents: AtomsDependents;
}>;
