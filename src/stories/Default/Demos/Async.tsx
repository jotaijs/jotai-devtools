import { Box, Button, Text, Title } from '@mantine/core';
import { useAtom } from 'jotai/react';
import { atom } from 'jotai/vanilla';
import { demoStoreOptions } from './demo-store';

const delayedPromise = (data: any) =>
  new Promise((resolve) => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      resolve(data);
    }, 8000);
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

export const Async = () => {
  const [request, setRequest] = useAtom(asyncAtom, demoStoreOptions);
  // const setRequest = useSetAtom(asyncAtom, demoStoreOptions);

  const handleFetchClick = async () => {
    setRequest(makeRandomFetchReq); // Will suspend until request resolves
  };

  return (
    <Box>
      <Title size="h5">Async</Title>
      <Text mb={10} color="dark.2">
        Out-of-the-box Suspense support. <i>Timeout: 8000 ms</i>
      </Text>
      <Text>Request status: {!request ? 'Ready' : '✅ Success'} </Text>
      <Button onClick={handleFetchClick} size="xs" uppercase mt={5}>
        Fetch
      </Button>
    </Box>
  );
};
