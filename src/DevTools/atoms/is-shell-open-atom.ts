import { atomWithStorage } from 'jotai/vanilla/utils';
import { generateLocalStorageKey } from '../utils/generate-local-storage-key';

const key = generateLocalStorageKey('is-shell-open', 0);
export const isShellOpenAtom = atomWithStorage<boolean | null>(key, null);
