import { atomWithStorage } from 'jotai/vanilla/utils';
import { shellStyleDefaults } from '../constants';
import { generateLocalStorageKey } from '../utils/generate-local-storage-key';

type ShellStyleAtomData = {
  height: number;
  width: number;
  transform: string;
  isDragging: boolean;
};
const key = generateLocalStorageKey('shell-height', 0);

export const shellStylesAtom = atomWithStorage<ShellStyleAtomData>(key, {
  height: shellStyleDefaults.defaultHeight,
  width: shellStyleDefaults.defaultWidth,
  transform: 'none',
  isDragging: false,
});
