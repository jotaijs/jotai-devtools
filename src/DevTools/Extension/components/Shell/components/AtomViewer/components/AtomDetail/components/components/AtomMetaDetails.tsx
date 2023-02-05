import { memo } from 'react';
import { Box, Code, Text, Title } from '@mantine/core';
import { unlabeledAtomLabel } from '../../../../../../../../../constants';
import { AtomValueType } from '../../../../../../../../../utils/get-type-of-atom-value';
import { parseDebugLabel } from '../../../../../../../../../utils/parse-debug-label';

type AtomDetailItemProps = {
  label: string;
  value: string;
};

const DisplayAtomDetailsItem = ({ label, value }: AtomDetailItemProps) => {
  return (
    <Box mb={10}>
      <Text tt="uppercase" fz={10} fw="bold" color="gray">
        {label}
      </Text>
      <Code>{value}</Code>
    </Box>
  );
};

type AtomMetaDetailsProps = {
  debugLabel?: string;
  atomValueType: AtomValueType;
};

export const AtomMetaDetails = memo(
  ({
    debugLabel = unlabeledAtomLabel,
    atomValueType,
  }: AtomMetaDetailsProps): JSX.Element => {
    return (
      <Box>
        <Title size="h3" mb={10}>
          Atom Details
        </Title>
        <Text fw="bold" mb={10}>
          Meta
        </Text>
        <DisplayAtomDetailsItem
          label="Debug Label"
          value={parseDebugLabel(debugLabel)}
        />
        <DisplayAtomDetailsItem label="Value type" value={atomValueType} />
      </Box>
    );
  },
);

AtomMetaDetails.displayName = 'AtomMetaDetails';
