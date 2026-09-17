import { atom, useAtom, useAtomValue } from 'jotai';
import { ValuesAtomTuple } from 'src/types';
import { useDevtoolsJotaiStoreOptions } from '../internal-jotai-store';

export const valuesAtom = atom<ValuesAtomTuple[]>([]);

/**
 * @internal
 *
 * @returns [ValuesAtomTuple, Setter]
 */
export const useSnapshotValues = () =>
  useAtom(valuesAtom, useDevtoolsJotaiStoreOptions());

export const useSnapshotValuesValue = () =>
  useAtomValue(valuesAtom, useDevtoolsJotaiStoreOptions());
