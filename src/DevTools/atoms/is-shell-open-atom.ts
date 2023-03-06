import { atomWithStorage } from 'jotai/vanilla/utils';

export const isShellOpenAtom = atomWithStorage<boolean | null>(
  'jotai-devtools-is-shell-open',
  null,
);
