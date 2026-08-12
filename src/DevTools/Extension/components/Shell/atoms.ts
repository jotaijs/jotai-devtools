import { atomWithStorage, useAtom } from 'jotai/react';
import { TabKeys } from '../../../constants';
import { useDevtoolsJotaiStoreOptions } from '../../../internal-jotai-store';
import { generateLocalStorageKey } from '../../../utils/';

const selectedShellTabKey = generateLocalStorageKey('selected-shell-tab', 0);

const selectedShellTab = atomWithStorage<TabKeys>(
  selectedShellTabKey,
  TabKeys.AtomViewer,
);

export const useSelectedShellTab = () =>
  useAtom(selectedShellTab, useDevtoolsJotaiStoreOptions());
