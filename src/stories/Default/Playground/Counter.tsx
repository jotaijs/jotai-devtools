import * as React from 'react';
import { Box, Button, Code, Title } from '@mantine/core';
import { useTimeout } from '@mantine/hooks';
import { useAtom, useAtomValue } from 'jotai/react';
import { atom } from 'jotai/vanilla';

const countAtom = atom(0);
countAtom.debugLabel = 'countAtom';

const doubleCountAtom = atom((get) => get(countAtom) * 2);
doubleCountAtom.debugLabel = 'doubleCountAtom';

const doubleCountInNestedObjectAtom = atom((get) => {
  return {
    doubleCount: {
      nested: {
        value: get(doubleCountAtom),
      },
    },
  };
});
doubleCountInNestedObjectAtom.debugLabel = 'doubleCountInNestedObjectAtom';

export const Counter = () => {
  const [count, setCount] = useAtom(countAtom);

  useAtomValue(doubleCountAtom);
  useAtomValue(doubleCountInNestedObjectAtom);

  const add = React.useCallback(() => setCount((c) => c + 1), [setCount]);
  useTimeout(
    () => {
      const emptyArray = Array.from({ length: 0 });
      emptyArray.forEach(add);
    },
    200,
    { autoInvoke: true },
  );
  return (
    <Box maw="500px">
      <Title size="h5">Counter</Title>
      <Code block>{count}</Code>

      <Button
        display="block"
        mt={5}
        onClick={add}
        size="xs"
        color="dark"
        tt="uppercase"
      >
        Add 1
      </Button>
    </Box>
  );
};
