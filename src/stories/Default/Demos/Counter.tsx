import { useCallback } from 'react';
import { Box, Button, Code, Title } from '@mantine/core';
import { useAtom } from 'jotai/react';
import { atom } from 'jotai/vanilla';
import { demoStoreOptions } from './demo-store';

const countAtom = atom(0);
countAtom.debugLabel = 'countAtom';

export const Counter = () => {
  const [count, setCount] = useAtom(countAtom, demoStoreOptions);

  return (
    <Box maw="500px">
      <Title size="h5">Counter</Title>
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
