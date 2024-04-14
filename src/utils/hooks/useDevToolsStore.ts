import { useStore } from 'jotai';
import { Options } from '../../types';
import {
  composeWithDevTools,
  isDevToolsStore,
} from '../internals/compose-with-devtools';

export const useDevToolsStore = (
  options: Options,
): ReturnType<typeof composeWithDevTools> => {
  const store = useStore(options);

  return composeWithDevTools(store);
};

export { isDevToolsStore };
