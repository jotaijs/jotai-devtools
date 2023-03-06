import React from 'react';
import { Box, Text } from '@mantine/core';
import { AnyAtomValue } from 'src/types';
import {
  ErrorSymbol,
  stringifyAtomValue,
} from '../../../../../../../../utils/';
import { ErrorMessage } from '../../../../ErrorMessage';
import {
  MemoizedValueRenderer,
  getPrismLanguageType,
} from './MemoizedValueRenderer';

type AtomParseRawValueValueProps = {
  atomValue: AnyAtomValue;
};

export const AtomParseRawValueValue = ({
  atomValue,
}: AtomParseRawValueValueProps): JSX.Element => {
  const prismLanguageType = getPrismLanguageType(atomValue);
  const parsedValue = stringifyAtomValue(atomValue);

  return (
    <Box>
      <Text fw="bold" mb="sm">
        Raw value
      </Text>
      {/* TODO investigate if this could ever be the case given that the parent component is wrapped with suspense */}
      {parsedValue === ErrorSymbol ? (
        <ErrorMessage message="Failed to parse the value of the atom" />
      ) : (
        <MemoizedValueRenderer
          value={parsedValue}
          prismLanguageType={prismLanguageType}
        />
      )}
    </Box>
  );
};
