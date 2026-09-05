import { atom, useAtomValue, useSetAtom } from 'jotai';
import { Store } from 'src/types';
import { useDevtoolsJotaiStoreOptions } from '../internal-jotai-store';

const userStore = atom<Store | undefined>(undefined);

export const useUserStoreValue = () =>
  useAtomValue(userStore, useDevtoolsJotaiStoreOptions());

export const useSetUserStore = () =>
  useSetAtom(userStore, useDevtoolsJotaiStoreOptions());
