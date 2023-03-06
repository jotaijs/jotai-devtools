import * as React from 'react';
import { Title } from '@mantine/core';
import { atom, useAtom, useAtomValue } from 'jotai';

const baseCountAtom = atom(1);
baseCountAtom.debugLabel = 'baseCountAtom';

const doubleAtom = atom(
  (get) => get(baseCountAtom) * 2,
  (get, set, update: number) => {
    set(baseCountAtom, update / 2);
  },
);
doubleAtom.debugLabel = 'doubleAtom';

const initialAtom = atom((get) => ({
  a: get(baseCountAtom),
}));
initialAtom.debugLabel = 'initialAtom';

const arrayAtoms = atom([initialAtom]);
arrayAtoms.debugLabel = 'arrayAtoms';

export const SomeComponent = () => {
  const [count, setCount] = useAtom(doubleAtom);
  useAtomValue(arrayAtoms);
  const handleOnClick = React.useCallback(() => {
    setCount(count + 1);
  }, [setCount, count]);

  return (
    <div>
      hey there! {count}
      <button onClick={handleOnClick}>Increment</button>
    </div>
  );
};

export const SomeComponentWithToggle = () => {
  const [shouldShow, setShouldShow] = React.useState(true);

  const handleOntoggle = React.useCallback(() => {
    setShouldShow((s) => !s);
  }, [setShouldShow]);

  return (
    <>
      <Title>Toggle</Title>
      {shouldShow ? <SomeComponent /> : null}
      <button onClick={handleOntoggle}>Toggle</button>
    </>
  );
};
