import React from 'react';
import { Box, Button, Text, Title } from '@mantine/core';
import { useAtom, useAtomValue } from 'jotai/react';
import { atom } from 'jotai/vanilla';

const delayedPromise = (data: any) =>
  new Promise((resolve) => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      resolve(data);
    }, 1000);
  });

const getRandomNumberBetweenMinAndMax = (min = 1, max = 100) => {
  return Math.round(Math.random() * max) + min;
};

const makeRandomFetchReq = async () => {
  const id = getRandomNumberBetweenMinAndMax();
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(
    (res) => {
      return delayedPromise(res.json());
    },
  );
};
// const asyncAtom = atom<Promise<any>>(Promise.resolve(null));
const asyncAtom = atom(Promise.resolve<any>(null));
asyncAtom.debugLabel = 'asyncAtom';

const derivedAsyncAtom = atom(async (get) => {
  const result = await get(asyncAtom);
  return result?.userId || 'No user';
});

export const Async = () => {
  const [request, setRequest] = useAtom(asyncAtom);
  const userId = useAtomValue(derivedAsyncAtom);
  // const setRequest = useSetAtom(asyncAtom, demoStoreOptions);

  const handleFetchClick = async () => {
    setRequest(makeRandomFetchReq); // Will suspend until request resolves
  };

  return (
    <Box>
      <Title size="h5">Async</Title>
      <Text component="div" mb={10} c="dark.2">
        Out-of-the-box Suspense support. <i>Timeout: 8000 ms</i>
      </Text>
      User: {userId}
      <Text component="div">
        Request status: {!request ? 'Ready' : '✅ Success'}{' '}
      </Text>
      <Button onClick={handleFetchClick} size="xs" mt={5}>
        Fetch
      </Button>
    </Box>
  );
};
