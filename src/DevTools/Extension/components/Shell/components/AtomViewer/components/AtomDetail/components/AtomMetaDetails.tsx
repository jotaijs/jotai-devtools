import * as React from 'react';
import { Box, Code, MantineColor, Text, Title, Tooltip } from '@mantine/core';
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
    return (
      <Box>
        <Text fw="bold" mb={10}>
          Meta
        </Text>
        <MetaInfo label="Debug Label" value={debugLabel} />
        <MetaInfo label="Value type" value={atomValueType} />
        {isAtomPrivate && (
          <MetaInfo label="Private" value={'Yes'} color={'red'} />
        )}
      </Box>
    );
  },
);

AtomMetaDetails.displayName = 'AtomMetaDetails';
