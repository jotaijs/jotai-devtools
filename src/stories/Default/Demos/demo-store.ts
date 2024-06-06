import { createContext } from 'react';
import { createStore, getDefaultStore } from 'jotai/experimental';

export const demoStore = getDefaultStore();
export const DemoJotaiStoreContext =
  createContext<ReturnType<typeof createStore>>(demoStore);

export const demoStoreOptions = { store: demoStore };
