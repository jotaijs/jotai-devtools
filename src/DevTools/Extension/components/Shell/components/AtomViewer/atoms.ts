import { atom } from 'jotai/vanilla';
import { atomWithDefault } from 'jotai/vanilla/utils';
import { AnyAtom, ValuesAtomTuple } from 'src/types';
import { valuesAtom } from '../../../../../atoms/values-atom';
import { filterAtomsByString } from './utils/filter-atoms-by-string';

type SelectedAtomAtomData = { atomKey: string; atom: AnyAtom };

export const selectedAtomAtom = atom<SelectedAtomAtomData | undefined>(
  undefined,
);

// used to preserve search input across tab switch
const searchInputInternalValueAtom = atom('');

export const filteredValuesAtom = atomWithDefault<ValuesAtomTuple[]>((get) => {
  const filteredByString = filterAtomsByString(
    get(searchInputInternalValueAtom),
    get(valuesAtom),
  );

  return filteredByString;
});

export const searchInputAtom = atom(
  (get) => get(searchInputInternalValueAtom),
  (_, set, searchInput: string) => {
    set(searchInputInternalValueAtom, searchInput);
  },
);
