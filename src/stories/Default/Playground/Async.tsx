import React, { useState } from 'react';
import { Box, Button, Flex, Text, Title } from '@mantine/core';
import { useAtom, useAtomValue } from 'jotai/react';
import { atom } from 'jotai/vanilla';

const delayedPromise = (data: any) =>
  new Promise((resolve, reject) => {
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
const asyncAtom = atom<Promise<any> | null>(null);
asyncAtom.debugLabel = 'asyncAtom';

const derivedAsyncAtom = atom(async (get) => {
  const result = await get(asyncAtom);
  return result?.userId || 'No user';
});

const ConditionalAsync = () => {
  const userId = useAtomValue(derivedAsyncAtom);
  return <Text>User: {userId}</Text>;
};

export const Async = () => {
  const [request, setRequest] = useAtom(asyncAtom);
  const [showResult, setShowResult] = useState(false);

  const handleFetchClick = async () => {
    setRequest(makeRandomFetchReq); // Will suspend until request resolves
  };

  const handleShowResultClick = () => {
    setShowResult((v) => !v);
  };

  return (
    <Box>
      <Title size="h5">Async</Title>
      <Text mb={10} c="dark.2">
        Out-of-the-box Suspense support. <i>Timeout: 8000 ms</i>
      </Text>
      {/* User: {userId} */}
      {showResult && <ConditionalAsync />}
      <Text>Request status: {!request ? 'Ready' : '✅ Success'} </Text>
      <Flex>
        <Button onClick={handleFetchClick} size="xs" tt="uppercase" mt={5}>
          Fetch
        </Button>

        <Button
          onClick={handleShowResultClick}
          size="xs"
          tt="uppercase"
          mt={5}
          ml={5}
          color="green"
        >
          Toggle result
        </Button>
      </Flex>
    </Box>
  );
};
