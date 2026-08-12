import { atomWithStorage, useAtom } from 'jotai';
import { useDevtoolsJotaiStoreOptions } from './../../../../../../../../../internal-jotai-store';
import { generateLocalStorageKey } from './../../../../../../../../../utils/generate-local-storage-key';

export type SnapshotValueViewer = 'state' | 'diff';

const key = generateLocalStorageKey('snapshot-value-viewer', 0);

export const snapshotValueViewer = atomWithStorage<SnapshotValueViewer>(
  key,
  'diff',
);

export const useSnapshotValueViewer = () =>
  useAtom(snapshotValueViewer, useDevtoolsJotaiStoreOptions());
