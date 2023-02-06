import { createContext } from 'react';
import { createStore } from 'jotai/vanilla';

export const demoStore = createStore();
export const DemoJotaiStoreContext =
  createContext<ReturnType<typeof createStore>>(demoStore);

export const demoStoreOptions = { store: demoStore };
