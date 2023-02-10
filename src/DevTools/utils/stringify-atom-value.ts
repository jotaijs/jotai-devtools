import { serialize } from 'superjson';
import { AnyAtomValue } from 'src/types';
import { getTypeOfAtomValue } from './get-type-of-atom-value';

export const stringifyAtomValue = (atomValue: AnyAtomValue): string => {
  const type = getTypeOfAtomValue(atomValue);

  if (type === 'undefined') {
    return 'undefined';
  }

  if (type === 'bigint') {
    return String(atomValue);
  }

  const { json } = serialize(atomValue);
  return JSON.stringify(json, null, 2);
};
