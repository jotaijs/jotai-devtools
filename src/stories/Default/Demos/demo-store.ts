import { createContext } from 'react';
import { createStore, getDefaultStore } from 'jotai/vanilla';

export const demoStore = getDefaultStore();
export const DemoJotaiStoreContext =
  createContext<ReturnType<typeof createStore>>(demoStore);

export const demoStoreOptions = { store: demoStore };
