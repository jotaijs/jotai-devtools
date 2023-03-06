import { useStore } from 'jotai/react';
import { Options } from 'src/types';
import { useUserCustomStoreValue } from '../atoms/user-custom-store';

export const useUserStore = () => {
  const possibleUserStore = useUserCustomStoreValue();

  const userStore = useStore(
    // This defaults to user's default store in a `provider-less` mode
    possibleUserStore ? { store: possibleUserStore } : undefined,
  );

  return userStore;
};

export const useUserStoreOptions = (): Options => {
  const store = useUserStore();
  return { store: store };
};
