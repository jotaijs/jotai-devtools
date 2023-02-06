import { memo, useEffect, useState } from 'react';
import { Box, Text } from '@mantine/core';
import { useAtomValue } from 'jotai/react';
import { AnyAtom } from 'src/types';
import { useUserStore } from '../../../../../../../../../hooks/useUserStore';
import { AtomValueType } from '../../../../../../../../../utils/get-type-of-atom-value';
import { deepParseAtomValue } from '../../../../../../../../../utils/parse-atom-value';
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

  const [nextValue, setNextValue] = useState(() =>
    deepParseAtomValue(atomValue, store),
  );

  useEffect(() => {
    const cb = () => {
      setNextValue(deepParseAtomValue(atomValue, store));
    };

    // Perhaps there is a more efficient way to subscribe more granularly to atom updates?
    // We could explore the store.sub approach and figure out how to unsubscribe
    const unsubscribe = store.dev_subscribe_state?.(cb);
    cb();
    return unsubscribe;
  }, [store, setNextValue, atomValue]);

  return nextValue;
};

// This component assumes that user has picked the "deep-nested" parser
const ParseAndDisplayAtomValue = memo(
  ({ atom }: ParseAndDisplayAtomValueProps): JSX.Element => {
    const nextValue = useAtomValueSubscribe(atom);
    const prismLanguageType = getPrismLanguageType(nextValue);

    return (
      <MemoizedValueRenderer
        value={
          prismLanguageType === 'javascript'
            ? JSON.stringify(nextValue, null, 2)
            : String(nextValue)
        }
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
