import { useAtom } from 'jotai/react';
import { atomWithStorage } from 'jotai/vanilla/utils';
import { useDevtoolsJotaiStoreOptions } from '../../../../../../../internal-jotai-store';

export type AtomValueViewer = 'raw-value' | 'json-tree';

export const atomValueViewer = atomWithStorage<AtomValueViewer>(
  'jotai-devtools-atom-value-viewer',
  'raw-value',
);

export const useAtomValueViewer = () =>
  useAtom(atomValueViewer, useDevtoolsJotaiStoreOptions());
