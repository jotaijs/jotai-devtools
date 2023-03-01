import { ValuesAtomTuple } from '../../../../../../../types';

export const filterPrivateAtoms = (atoms: ValuesAtomTuple[]) => {
  return atoms.filter(([atom]) => !atom?.debugPrivate);
};
