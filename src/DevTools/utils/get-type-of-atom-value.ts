import { WritableAtom } from 'jotai/vanilla';
import { AnyAtom, AnyAtomValue, WithInitialValue } from 'src/types';

const isValueAtom = (value: AnyAtomValue): value is AnyAtom => {
  return (
    typeof (value as Partial<AnyAtom>)?.read === 'function' ||
    typeof (value as WritableAtom<any, any, any>)?.write === 'function' ||
    !!(value as WithInitialValue)?.init ||
    !!(value as Partial<AnyAtom>)?.debugLabel
  );
};

type TypeOfReturn =
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function';

export type AtomValueType =
  | 'promise'
  | 'array'
  | 'null'
  | 'atom'
  | TypeOfReturn;

export const getTypeOfAtomValue = (value: AnyAtomValue): AtomValueType => {
  if (value instanceof Promise) {
    return 'promise';
  }

  if (Array.isArray(value)) {
    return 'array';
  }

  if (value === null) {
    return 'null';
  }

  if (isValueAtom(value)) {
    return 'atom';
  }

  const result = typeof value;
  return result;
};
