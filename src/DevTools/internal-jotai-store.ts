import { createContext, useContext } from 'react';
import { createStore } from 'jotai/vanilla';
import { Store } from 'src/types';

// Don't use this directly in your components
// use `useDevtoolsJotaiStoreOptions` instead
export const internalJotaiStore = createStore();
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
