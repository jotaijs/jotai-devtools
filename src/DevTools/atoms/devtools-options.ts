import { useAtomValue, useSetAtom } from 'jotai/react';
import { atom } from 'jotai/vanilla';
import { useDevtoolsJotaiStoreOptions } from '../internal-jotai-store';

export type DevToolsOptions = {
  /**
   * Parsing strategy for AtomViewer. Defaults to `raw`
   */
  // FIXME: There is a bug in Jotai core that prevents us from subscribing to nested atom value properly
  // atomValueParser?: /**
  //  *  parses the top level atom value but doesn't parse values of atoms within atoms
  //  */
  // | 'raw'
  //   /**
  //    *  parses values of atoms within atoms. Comes with linear performance curve
  //    *  the bigger the object, the slower the performance
  //    */
  //   | 'deep-nested';
  /**
   * Defaults to `false`
   *
   * Private are atoms that are used by Jotai libraries internally to manage state.
   * They're often used internally in atoms like `atomWithStorage` or `atomWithLocation`, etc. to manage state.
   */
  shouldShowPrivateAtoms?: boolean;
};

const defaultDevToolsOptions: DevToolsOptions = {
  shouldShowPrivateAtoms: false,
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
