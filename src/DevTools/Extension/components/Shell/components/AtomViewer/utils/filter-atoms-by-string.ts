import { ValuesAtomTuple } from 'src/types';
import { unlabeledAtomLabel } from '../../../../../../constants';

export const filterAtomsByString = (
  searchString: string,
  defaultAtoms: ValuesAtomTuple[],
) => {
  const normalizedStr = searchString.trim().toLocaleLowerCase();
  if (!normalizedStr) {
    return defaultAtoms;
  }

  return defaultAtoms.filter((atomTuple) => {
    const normalizedLabel = (
      atomTuple[0].debugLabel || unlabeledAtomLabel
    ).toLocaleLowerCase();

    return normalizedLabel.includes(normalizedStr);
  });
};
