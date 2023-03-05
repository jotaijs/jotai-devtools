import * as React from 'react';
import { Box, Text } from '@mantine/core';
import { AnyAtom } from 'src/types';
import { useUserStore } from '../../../../../../../../hooks/useUserStore';
import {
  AtomValueType,
  deepParseAtomValue,
  stringifyAtomValue,
} from '../../../../../../../../utils';
import { useInternalAtomValue } from '../../../hooks/useInternalAtomValue';
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
  const atomValue = useInternalAtomValue(atom);

  // Using an object to hold a value allows us to store values like functions
  const [nextValue, setNextValue] = React.useState(() => ({
    value: deepParseAtomValue(atomValue, store),
  }));

  React.useEffect(() => {
    if (!store.dev_subscribe_state) return;
    // FIXME replace this with `store.dev_subscribe_store` check after next minor Jotai 2.1.0?
    let devSubscribeStore = store.dev_subscribe_state;
    if (typeof store.dev_subscribe_store === 'function') {
      devSubscribeStore = store.dev_subscribe_store;
    }

    const cb = (
      type?: Parameters<Parameters<typeof store.dev_subscribe_store>[0]>[0],
    ) => {
      setNextValue({ value: deepParseAtomValue(atomValue, store) });
    };

    // Perhaps there is a more efficient way to subscribe more granularly to atom updates?
    // We could explore the store.sub approach and figure out how to unsubscribe
    const unsubscribe = devSubscribeStore?.(cb);
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
