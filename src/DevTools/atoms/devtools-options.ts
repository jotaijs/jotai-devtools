import { useAtomValue, useSetAtom } from 'jotai/react';
import { atom } from 'jotai/vanilla';
import { useDevtoolsJotaiStoreOptions } from '../internal-jotai-store';

export type DevToolsOptions = {
  /**
   * Parsing strategy for AtomViewer. Defaults to `raw`
   */
  atomValueParser?: /**
   *  parses the top level atom value but doesn't parse values of atoms within atoms
   */
  | 'raw'
    /**
     *  parses values of atoms within atoms. Comes with linear performance curve
     *  the bigger the object, the slower the performance
     */
    | 'deep-nested';
};

const defaultDevToolsOptions: DevToolsOptions = {
  atomValueParser: 'raw',
};

const internalDevToolsOptions = atom<DevToolsOptions>(defaultDevToolsOptions);

export const devToolsOptionsAtom = atom<
  DevToolsOptions,
  [DevToolsOptions | undefined],
  void
>(
  (get) => {
    return get(internalDevToolsOptions);
  },
  (_, set, options) => {
    const patchWithDefaultsDevToolsOptions = {
      ...defaultDevToolsOptions,
      ...options,
    };

    set(internalDevToolsOptions, patchWithDefaultsDevToolsOptions);
  },
);

export const useSetDevToolsOptions = () =>
  useSetAtom(devToolsOptionsAtom, useDevtoolsJotaiStoreOptions());

export const useDevToolsOptionsValue = () =>
  useAtomValue(devToolsOptionsAtom, useDevtoolsJotaiStoreOptions());
