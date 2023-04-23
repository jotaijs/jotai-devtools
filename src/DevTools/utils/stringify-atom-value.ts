import { stringify } from 'javascript-stringify';
import { AnyAtomValue } from 'src/types';
import { getTypeOfAtomValue } from './get-type-of-atom-value';

const stringifyWithDoubleQuotes: Parameters<typeof stringify>[1] = (
  value,
  _,
  stringify,
) => {
  if (typeof value === 'string') {
    return '"' + value.replace(/"/g, '\\"') + '"';
  }

  return stringify(value);
};
const literalStringValues = ['bigint', 'symbol', 'undefined', 'function'];

export const ErrorSymbol = Symbol('parsing-error');

export const stringifyAtomValue = (
  atomValue: AnyAtomValue,
): string | typeof ErrorSymbol => {
  const type = getTypeOfAtomValue(atomValue);

  if (literalStringValues.includes(type)) {
    return String(atomValue);
  }

  try {
    const result = stringify(atomValue, stringifyWithDoubleQuotes, 2);

    // Perhaps a value that we couldn't serialize?
    if (typeof result === 'undefined') {
      return String(atomValue);
    }

    return result;
  } catch (e) {
    return ErrorSymbol;
  }
};
