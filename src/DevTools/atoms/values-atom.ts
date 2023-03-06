import { useAtom, useAtomValue } from 'jotai/react';
import { atom } from 'jotai/vanilla';
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
