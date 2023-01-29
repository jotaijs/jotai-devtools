import { ValuesAtomTuple } from 'src/types';

export const getAtomByKey = (values: ValuesAtomTuple[], key?: string) => {
  if (typeof key === 'string') {
    return values.find(([atom]) => atom.toString() === key);
  }

  return undefined;
};
