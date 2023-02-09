import { Box, Text } from '@mantine/core';
import { AnyAtomValue } from 'src/types';
import {
  AtomValueType,
  stringifyAtomValue,
} from '../../../../../../../../utils/';
import {
  MemoizedValueRenderer,
  getPrismLanguageType,
} from './MemoizedValueRenderer';

type AtomParseRawValueValueProps = {
  atomValue: AnyAtomValue;
  atomValueType: AtomValueType;
};

export const AtomParseRawValueValue = ({
  atomValue,
  atomValueType,
}: AtomParseRawValueValueProps): JSX.Element => {
  const prismLanguageType = getPrismLanguageType(atomValue);

  return (
    <Box>
      <Text fw="bold" mb="sm">
        Raw value
      </Text>
      {/* TODO investigate if this could ever be the case given that the parent component is wrapped with suspense */}
      {atomValueType === 'promise' ? (
        <Text>No Preview available</Text>
      ) : (
        <MemoizedValueRenderer
          value={stringifyAtomValue(atomValue)}
          prismLanguageType={prismLanguageType}
        />
      )}
    </Box>
  );
};
