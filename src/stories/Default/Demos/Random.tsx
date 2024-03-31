import * as React from 'react';
import { Box, Button, Code, Divider, Title } from '@mantine/core';
import { useAtom, useAtomValue } from 'jotai/react';
import { atom } from 'jotai/vanilla';
import { demoStoreOptions } from './demo-store';

const countAtom = atom(1);
countAtom.debugLabel = 'randomCountAtom';

const textAtom = atom('hello');
textAtom.debugLabel = 'textAtom';

// Try out a really long big int - 2n ** 999n
const bigintAtom = atom(BigInt(Number.MAX_SAFE_INTEGER));
bigintAtom.debugLabel = 'bigintAtom';

const atomReturnsUndefined = atom(undefined);
atomReturnsUndefined.debugLabel = 'atomReturnsUndefined';

const atomWithSomeSymbol = atom(Symbol('hello'));
atomWithSomeSymbol.debugLabel = 'atomWithSomeSymbol';

const atomWithFunction = atom(() => () => 'hello');
atomWithFunction.debugLabel = 'atomWithFunction';

const nestedObjectAtom = atom((get) => {
  return {
    nestedObject: {
      doubleCount: get(countAtom) * 2,
      tripleCount: get(countAtom) * 3,
    },
    foo: 'bar',
  };
});

nestedObjectAtom.debugLabel = 'nestedObjectAtom';

const atomsInAtomsCountAtom = atom(atom(atom((get) => get(countAtom))));
atomsInAtomsCountAtom.debugLabel = 'atomsInAtomsCountAtom';

const baseErrorAtom = atom(0);
const triggerErrorAtom = atom(
  (get) => {
    const val = get(baseErrorAtom);
    if (val >= 1) {
      const randomFn = function () {};
      randomFn.toString = () => {
        throw new Error('Random error');
      };
      return randomFn;
    }

    return val;
  },
  (get, set) => {
    return set(baseErrorAtom, (prev) => prev + 1);
  },
);
triggerErrorAtom.debugLabel = 'triggerErrorAtom';
export const Random = () => {
  const [count, setCount] = useAtom(countAtom, demoStoreOptions);
  const [, setError] = useAtom(triggerErrorAtom, demoStoreOptions);
  // We're not displaying these values on the UI
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useAtomValue(nestedObjectAtom, demoStoreOptions);
  useAtomValue(textAtom, demoStoreOptions);
  useAtomValue(bigintAtom, demoStoreOptions);
  useAtomValue(atomReturnsUndefined, demoStoreOptions);
  useAtomValue(atomWithSomeSymbol, demoStoreOptions);
  useAtomValue(atomWithFunction, demoStoreOptions);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const atomsInAtomsCount = useAtomValue(
    atomsInAtomsCountAtom,
    demoStoreOptions,
  );

  return (
    <Box maw="500px">
      <Title size="h5">Random</Title>
      <Code block>{count}</Code>

      <Button
        display="block"
        mt={5}
        onClick={React.useCallback(() => setCount((c) => c + 1), [setCount])}
        size="xs"
        color="dark"
        tt="uppercase"
      >
        Add 1
      </Button>
      <Divider size="sm" my="lg" />
      <Button
        display="block"
        mt={5}
        onClick={setError}
        size="xs"
        color="red.8"
        tt="uppercase"
      >
        Trigger error 💥
      </Button>
    </Box>
  );
};
