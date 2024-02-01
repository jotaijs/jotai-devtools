import * as React from 'react';
import { Box, Button, Code, Title } from '@mantine/core';
import { useTimeout } from '@mantine/hooks';
import { useAtom } from 'jotai/react';
import { atom } from 'jotai/vanilla';
import { demoStoreOptions } from './demo-store';

const countAtom = atom(0);
countAtom.debugLabel = 'countAtom';

export const Counter = () => {
  const [count, setCount] = useAtom(countAtom, demoStoreOptions);
  const add = React.useCallback(() => setCount((c) => c + 1), [setCount]);

  useTimeout(
    () => {
      // automatically trigger updates when testing time travel feature
      const emptyArray = Array.from({ length: 0 });
      emptyArray.forEach(add);
    },
    200,
    { autoInvoke: true },
  );
  return (
    <Box maw="500px">
      <Title size="h5">Counter</Title>
      <Code color="gray" block>
        {count}
      </Code>

      <Button display="block" mt={5} onClick={add} size="xs" color="dark">
        Add 1
      </Button>
    </Box>
  );
};
