import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/vanilla/utils';
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
