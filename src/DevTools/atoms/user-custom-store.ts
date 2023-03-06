import { useAtomValue, useSetAtom } from 'jotai/react';
import { atom } from 'jotai/vanilla';
import { Store } from 'src/types';
import { useDevtoolsJotaiStoreOptions } from '../internal-jotai-store';

const userCustomStoreAtom = atom<Store | undefined>(undefined);

export const useUserCustomStoreValue = () =>
  useAtomValue(userCustomStoreAtom, useDevtoolsJotaiStoreOptions());

export const useSetCustomStore = () =>
  useSetAtom(userCustomStoreAtom, useDevtoolsJotaiStoreOptions());
