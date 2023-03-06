import * as React from 'react';
import { Box, Code, MantineColor, Text, Title, Tooltip } from '@mantine/core';
import { AtomValueType } from '../../../../../../../../utils/get-type-of-atom-value';
import { parseDebugLabel } from '../../../../../../../../utils/parse-debug-label';

type AtomDetailItemProps = {
  label: string;
  value: string;
  color?: MantineColor;
};

const DisplayAtomDetailsItem = ({
  label,
  value,
  color,
}: AtomDetailItemProps) => {
  return (
    <Box mb={10}>
      <Text
        tt="uppercase"
        fz={10}
        fw="bold"
        color="gray"
        data-testid={`display-detail-item-label-${label}`}
      >
        {label}
      </Text>
      <Code data-testid={`display-detail-item-value-${value}`} color={color}>
        {value}
      </Code>
    </Box>
  );
};

type AtomMetaDetailsProps = {
  debugLabel?: string | undefined;
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
        {isAtomPrivate && (
          <DisplayAtomDetailsItem label="Private" value={'Yes'} color={'red'} />
        )}
      </Box>
    );
  },
);

AtomMetaDetails.displayName = 'AtomMetaDetails';
