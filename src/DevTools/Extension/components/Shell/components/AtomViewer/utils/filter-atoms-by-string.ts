import { ValuesAtomTuple } from 'src/types';
import { atomToPrintable } from '../../../../../../utils';

export const filterAtomsByString = (
  searchString: string,
  defaultAtoms: ValuesAtomTuple[],
) => {
  const normalizedStr = searchString.trim().toLocaleLowerCase();
  if (!normalizedStr) {
    return defaultAtoms;
  }

  return defaultAtoms.filter(([atomTuple]) => {
    const parsedDebugLabel = atomToPrintable(atomTuple);
    const normalizedLabel = parsedDebugLabel.toLocaleLowerCase();
    return normalizedLabel.includes(normalizedStr);
  });
};
