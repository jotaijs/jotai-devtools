import { atomWithStorage } from 'jotai/vanilla/utils';
import { shellStyleDefaults } from '../constants';

type ShellStyleAtomData = {
  height: number;
  isDragging: boolean;
};

export const shellStylesAtom = atomWithStorage<ShellStyleAtomData>(
  'jotai-devtools-shell-height',
  {
    height: shellStyleDefaults.defaultHeight,
    isDragging: false,
  },
);
