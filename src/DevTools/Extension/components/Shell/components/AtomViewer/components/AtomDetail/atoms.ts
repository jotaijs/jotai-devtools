import { atomWithStorage, useAtom } from 'jotai/react';
import { useDevtoolsJotaiStoreOptions } from '../../../../../../../internal-jotai-store';
import { generateLocalStorageKey } from './../../../../../../../utils/generate-local-storage-key';

export type AtomValueViewer = 'raw-value' | 'json-tree';

const key = generateLocalStorageKey('atom-value-viewer', 0);
export const atomValueViewer = atomWithStorage<AtomValueViewer>(
  key,
  'raw-value',
);

export const useAtomValueViewer = () =>
  useAtom(atomValueViewer, useDevtoolsJotaiStoreOptions());
