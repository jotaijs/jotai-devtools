import { useAtomValue, useSetAtom } from 'jotai/react';
import { atom } from 'jotai/vanilla';
import { useDevtoolsJotaiStoreOptions } from '../internal-jotai-store';

export type DevToolsOptions = {
  /**
   * Defaults to `false`
   *
   * Private are atoms that are used by Jotai libraries internally to manage state.
   * They're often used internally in atoms like `atomWithStorage` or `atomWithLocation`, etc. to manage state.
   */
  shouldShowPrivateAtoms?: boolean;
  /**
   * Defaults to `false`
   *
   * Expands the JSON tree view fully on Atom Viewer, Timeline, etc.
   */
  shouldExpandJsonTreeViewInitially?: boolean;
  /**
   * Defaults to 750ms
   *
   * Disables the snapshot recording on mount.
   * This is useful when you want to record snapshots manually.
   */
  timeTravelPlaybackInterval?: number;
  /**
   * Defaults to Infinity
   *
   * The maximum number of snapshots to keep in the history.
   * The higher the number the more memory it will consume.
   *
   * We recommend setting it to around ~30
   */
  snapshotHistoryLimit?: number;
};

const defaultDevToolsOptions: Required<DevToolsOptions> = {
  shouldShowPrivateAtoms: false,
  shouldExpandJsonTreeViewInitially: false,
  timeTravelPlaybackInterval: 750,
  snapshotHistoryLimit: Infinity,
};

const internalDevToolsOptions = atom<Required<DevToolsOptions>>(
  defaultDevToolsOptions,
);

export const devToolsOptionsAtom = atom<
  Required<DevToolsOptions>,
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
