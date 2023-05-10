import { AnyAtom } from '../../types';

/**
 * We label atoms with debugLabel to make it easier to identify them in the DevTools + avoid the naming collisions
 * when showing multiple atoms that are not labeled
 *
 * @param atom AnyAtom
 * @returns printable string based on the atom's debugLabel or a default string
 */
export const atomToPrintable = (atom: AnyAtom): string => {
  return atom.debugLabel ? atom.debugLabel : `<unlabeled-${atom}>`;
};
