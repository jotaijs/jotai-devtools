import * as React from 'react';
import { Box, Text } from '@mantine/core';
import { useThemeMode } from '../../../../../../../../hooks/useThemeMode';
import { AtomValueType } from '../../../../../../../../utils/get-type-of-atom-value';
import { MetaInfo } from '../../../../MetaInfo';

type AtomMetaDetailsProps = {
  debugLabel: string;
  atomValueType: AtomValueType;
  isAtomPrivate?: boolean | undefined;
};

export const AtomMetaDetails = React.memo(
  ({
    debugLabel,
    atomValueType,
    isAtomPrivate,
  }: AtomMetaDetailsProps): JSX.Element => {
    const privateColor = useThemeMode('red.1', 'red.7');

    return (
      <Box>
        <Text fw="bold" mb={10}>
          Meta
        </Text>
        <MetaInfo label="Debug Label" value={debugLabel} />
        <MetaInfo label="Value type" value={atomValueType} />
        {isAtomPrivate && (
          <MetaInfo label="Private" value="Yes" color={privateColor} />
        )}
      </Box>
    );
  },
);

AtomMetaDetails.displayName = 'AtomMetaDetails';
