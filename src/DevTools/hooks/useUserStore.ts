import { Options } from 'src/types';
import { useDevToolsStore } from '../../utils/hooks/useDevToolsStore';
import { useUserStoreValue } from '../atoms/user-custom-store';
import { isDevToolsStore } from './../../utils/internals/compose-with-devtools';

export const useUserStore = (): ReturnType<typeof useDevToolsStore> => {
  const possibleUserStore = useUserStoreValue();

  const userStore = useDevToolsStore(
    // This defaults to user's default store in a `provider-less` mode
    possibleUserStore ? { store: possibleUserStore } : undefined,
  );

  return userStore;
};

export { isDevToolsStore };

export const useUserStoreOptions = (): Options => {
  const store = useUserStore();
  return { store: store };
};
