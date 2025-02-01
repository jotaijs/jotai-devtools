import { createContext, useContext } from 'react';
import type { Store } from 'src/types';

export const InternalDevToolsContext = createContext<Store | undefined>(
  undefined,
);

export const useInternalStore = (): Store => {
  const store = useContext(InternalDevToolsContext);
  if (!store) {
    throw new Error(
      `Unable to find internal Jotai store, Did you wrap the component within DevToolsProvider?`,
    );
  }
  return store;
};

export const useDevtoolsJotaiStoreOptions = () => ({
  store: useInternalStore(),
});
