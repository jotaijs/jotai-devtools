import * as React from 'react';
import { Title } from '@mantine/core';
import { atom } from 'jotai';
import {
  atomWithDefault,
  atomWithObservable,
  loadable,
  splitAtom,
  unstable_unwrap as unwrap,
} from 'jotai/vanilla/utils';
import { interval } from 'rxjs';
import { count, map } from 'rxjs/operators';

const baseCountAtom = atom(1);
baseCountAtom.debugLabel = 'baseCountAtom';

const countAtomWithDefaultAtom = atomWithDefault(
  (get) => get(baseCountAtom) * 2,
);
countAtomWithDefaultAtom.debugLabel = 'countAtomWithDefaultAtom';

const counterSubject = interval(1000).pipe(map((i) => `#${i}`));
const counterAtom = atomWithObservable(() => counterSubject);
counterAtom.debugLabel = 'counterAtom';

const asyncAtom = atom(async (get) => {
  return new Promise((resolve) => {
    const timer = window.setTimeout(() => {
      clearTimeout(timer);
      resolve('Resolved data');
    }, 1000);
  });
});

asyncAtom.debugLabel = 'asyncAtom';

const loadableAtom = loadable(asyncAtom);
loadableAtom.debugLabel = 'loadableAtom';

const someRandomArray = [
  {
    id: 1,
    name: 'John',
  },
  {
    id: 2,
    name: 'Jane',
  },
];

const arrayAtom = atom(someRandomArray);
arrayAtom.debugLabel = 'arrayAtom';

const splitAtomAtom = splitAtom(arrayAtom);
splitAtomAtom.debugLabel = 'splitAtomAtom';

const asyncArrayAtom = atom(async () => someRandomArray);
asyncArrayAtom.debugLabel = 'asyncArrayAtom';

const splitAsyncAtom = splitAtom(unwrap(asyncArrayAtom, () => []));
splitAsyncAtom.debugLabel = 'splitAsyncAtom';

export const Playground = () => {
  return (
    <>
      <Title>Playground</Title>
      {count}
    </>
  );
};
