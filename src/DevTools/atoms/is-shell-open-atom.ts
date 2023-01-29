import { atomWithStorage } from 'jotai/vanilla/utils';

export const isShellOpenAtom = atomWithStorage(
  'jotai-devtools-is-shell-open',
  false,
);
