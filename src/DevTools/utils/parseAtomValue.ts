import type { AnyAtom, AnyAtomValue, Store } from 'src/types';
import { getTypeOfAtomValue } from './getTypeOfAtomValue';

const deepParseArrayAtom = (
  atomValue: AnyAtomValue[],
  userStore: Store,
): AnyAtomValue[] => {
  const values = atomValue.map((value: AnyAtomValue) => {
    return deepParseAtomValue(value, userStore);
  });

  return values;
};

const deepParseObjectAtom = (
  atomValue: Record<any, any>,
  userStore: Store,
): Record<any, any> => {
  const nextValueMap: Record<string, AnyAtomValue> = {};
  for (const property in atomValue) {
    const value = atomValue[property];
    nextValueMap[property] = deepParseAtomValue(value, userStore);
  }
  return nextValueMap;
};

// Only call this if `atomValue` type has been identified as Atom
const deepParseAtomAtom = (
  atomValue: AnyAtom,
  userStore: Store,
): AnyAtomValue => {
  const parsedValue = userStore.get(atomValue);
  return deepParseAtomValue(parsedValue, userStore);
};

// FIXME replace `type === 'something'` checks with TS guards?
// Don't call this fn recursively, it'll result in an infinite loop
export const deepParseAtomValue = (
  atomValue: AnyAtom | AnyAtomValue,
  userStore: Store,
) => {
  const type = getTypeOfAtomValue(atomValue);

  if (type === 'atom') {
    return deepParseAtomAtom(atomValue as AnyAtom, userStore);
  }

  if (type === 'object') {
    return deepParseObjectAtom(atomValue as object, userStore);
  }

  if (type === 'array') {
    return deepParseArrayAtom(
      atomValue as unknown as AnyAtomValue[],
      userStore,
    );
  }

  return atomValue;
};
