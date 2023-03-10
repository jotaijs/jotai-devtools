import { serialize } from 'superjson';
import { AnyAtomValue } from 'src/types';
import { getTypeOfAtomValue } from './get-type-of-atom-value';

const literalStringValues = ['bigint', 'symbol', 'undefined', 'function'];
export const ErrorSymbol = Symbol('parsing-error');

export const stringifyAtomValue = (
  atomValue: AnyAtomValue,
): string | typeof ErrorSymbol => {
  const type = getTypeOfAtomValue(atomValue);

  if (literalStringValues.includes(type)) {
    return String(atomValue);
  }

  const { json } = serialize(atomValue);
  try {
    const result = JSON.stringify(json, null, 2);

    // Perhaps a value that we couldn't serialize?
    if (typeof result === 'undefined') {
      return String(atomValue);
    }

    return result;
  } catch (e) {
    return ErrorSymbol;
  }
};
