import { useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/vanilla/utils';
import { useDevtoolsJotaiStoreOptions } from '../internal-jotai-store';

export const isShellOpenAtom = atomWithStorage<boolean | null>(
  'jotai-devtools-is-shell-open',
  null,
);

export const useIsShellOpenValue = () =>
  useAtomValue(isShellOpenAtom, useDevtoolsJotaiStoreOptions());

export const useSetIsShellOpen = () =>
  useSetAtom(isShellOpenAtom, useDevtoolsJotaiStoreOptions());
