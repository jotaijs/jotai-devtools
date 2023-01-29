import { atom } from 'jotai/vanilla';
import { shellStyleDefaults } from '../constants';

type ShellStyleAtomData = {
  height: number;
  isDragging: boolean;
};

export const shellStylesAtom = atom<ShellStyleAtomData>({
  height: shellStyleDefaults.defaultHeight,
  isDragging: false,
});
