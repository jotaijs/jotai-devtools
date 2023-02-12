import * as React from 'react';
import { Box, Text } from '@mantine/core';
import { useAtomValue } from 'jotai/react';
import { AnyAtom } from 'src/types';
import { useUserStore } from '../../../../../../../../hooks/useUserStore';
import {
  AtomValueType,
  deepParseAtomValue,
  stringifyAtomValue,
} from '../../../../../../../../utils';
import {
  MemoizedValueRenderer,
  getPrismLanguageType,
} from './MemoizedValueRenderer';

type ParseAndDisplayAtomValueProps = {
  atom: AnyAtom;
};

const useAtomValueSubscribe = (atom: AnyAtom) => {
  const store = useUserStore();
  // We use `useAtomValue` because it supports async atoms too
  // Should we support nested async atoms?
  const atomValue = useAtomValue(atom, { store });

  // Using an object to hold a value allows us to store values like functions
  const [nextValue, setNextValue] = React.useState(() => ({
    value: deepParseAtomValue(atomValue, store),
  }));

  React.useEffect(() => {
    const cb = () => {
      setNextValue({ value: deepParseAtomValue(atomValue, store) });
    };

    // Perhaps there is a more efficient way to subscribe more granularly to atom updates?
    // We could explore the store.sub approach and figure out how to unsubscribe
    const unsubscribe = store.dev_subscribe_state?.(cb);
    cb();
    return unsubscribe;
  }, [store, setNextValue, atomValue]);

  return nextValue.value;
};

// This component assumes that user has picked the "deep-nested" parser
const ParseAndDisplayAtomValue = React.memo(
  ({ atom }: ParseAndDisplayAtomValueProps): JSX.Element => {
    const nextValue = useAtomValueSubscribe(atom);
    const prismLanguageType = getPrismLanguageType(nextValue);

    return (
      <MemoizedValueRenderer
        value={stringifyAtomValue(nextValue)}
        prismLanguageType={prismLanguageType}
      />
    );
  },
);

type AtomParseDeepNestedValueProps = {
  atom: AnyAtom;
  atomValueType: AtomValueType;
};

export const AtomParseDeepNestedValue = ({
  atom,
  atomValueType,
}: AtomParseDeepNestedValueProps): JSX.Element => {
  return (
    <Box>
      <Text fw="bold" mb="sm">
        Parsed value
      </Text>
      {/* TODO investigate if this could ever be the case given that the parent component is wrapped with suspense */}
      {atomValueType === 'promise' ? (
        <Text>No Preview available</Text>
      ) : (
        <ParseAndDisplayAtomValue atom={atom} />
      )}
    </Box>
  );
};
