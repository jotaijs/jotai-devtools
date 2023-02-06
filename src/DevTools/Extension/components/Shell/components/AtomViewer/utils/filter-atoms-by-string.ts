import { ValuesAtomTuple } from 'src/types';
import { parseDebugLabel } from './../../../../../../utils/parse-debug-label';

export const filterAtomsByString = (
  searchString: string,
  defaultAtoms: ValuesAtomTuple[],
) => {
  const normalizedStr = searchString.trim().toLocaleLowerCase();
  if (!normalizedStr) {
    return defaultAtoms;
  }

  return defaultAtoms.filter((atomTuple) => {
    const parsedDebugLabel = parseDebugLabel(atomTuple[0].debugLabel);
    const normalizedLabel = parsedDebugLabel.toLocaleLowerCase();
    return normalizedLabel.includes(normalizedStr);
  });
};
