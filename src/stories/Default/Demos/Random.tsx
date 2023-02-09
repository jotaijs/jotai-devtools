import { useCallback } from 'react';
import { Box, Button, Code, Title } from '@mantine/core';
import { useAtom, useAtomValue } from 'jotai/react';
import { atom } from 'jotai/vanilla';
import { demoStoreOptions } from './demo-store';

const countAtom = atom(1);
countAtom.debugLabel = 'countAtom';

const textAtom = atom('hello');
textAtom.debugLabel = 'textAtom';

// Try out a really long big int - 2n ** 999n
const bigintAtom = atom(BigInt(Number.MAX_SAFE_INTEGER));
bigintAtom.debugLabel = 'bigintAtom';

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
// const circularAtom = atom({ foo: atom({ bar: atom(1) }) });
// circularAtom.debugLabel = 'circularAtom';

export const Random = () => {
  const [count, setCount] = useAtom(countAtom, demoStoreOptions);
  // We're not displaying these values on the UI
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const nestedObject = useAtomValue(nestedObjectAtom, demoStoreOptions);
  const _text = useAtomValue(textAtom, demoStoreOptions);
  const _bigint = useAtomValue(bigintAtom, demoStoreOptions);
  // const circular = useAtomValue(circularAtom, demoStoreOptions);
  // console.log(circular);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const atomsInAtomsCount = useAtomValue(
    atomsInAtomsCountAtom,
    demoStoreOptions,
  );

  return (
    <Box maw="500px">
      <Title size="h5">Random</Title>
      <Code color="gray" block>
        {count}
      </Code>

      <Button
        display="block"
        mt={5}
        onClick={useCallback(() => setCount((c) => c + 1), [setCount])}
        size="xs"
        uppercase
        color="dark"
      >
        Add 1
      </Button>
    </Box>
  );
};
