import { useAtomValue, useSetAtom } from 'jotai/react';
import { atom } from 'jotai/vanilla';
import { Store } from 'src/types';
import { useDevtoolsJotaiStoreOptions } from '../internal-jotai-store';

const userStore = atom<Store | undefined>(undefined);

export const useUserStoreValue = () =>
  useAtomValue(userStore, useDevtoolsJotaiStoreOptions());

export const useSetUserStore = () =>
  useSetAtom(userStore, useDevtoolsJotaiStoreOptions());
