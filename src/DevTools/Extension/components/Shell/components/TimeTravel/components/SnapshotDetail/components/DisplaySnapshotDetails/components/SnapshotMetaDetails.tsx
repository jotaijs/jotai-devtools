import React from 'react';
import { Box, Title } from '@mantine/core';
import { MetaInfo } from '../../../../../../MetaInfo';

type SnapshotMetaDetailsProps = {
  timestamp: string;
};

export const SnapshotMetaDetails = (props: SnapshotMetaDetailsProps) => {
  return (
    <Box>
      <Title size="h5" mb={10}>
        Meta
      </Title>
      <MetaInfo label="Timestamp" value={props.timestamp} />
    </Box>
  );
};
