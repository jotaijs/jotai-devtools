import React from 'react';
import { Box, Code, CodeProps, DefaultMantineColor, Text } from '@mantine/core';

type MetaInfoProps = Pick<CodeProps, 'color'> & {
  label: string;
  value: string;
};

export const MetaInfo = ({ label, value, color }: MetaInfoProps) => {
  return (
    <Box mb={10}>
      <Text
        tt="uppercase"
        fz={10}
        fw="bold"
        c="dimmed"
        data-testid={`meta-info-label-${label}`}
      >
        {label}
      </Text>
      <Code
        data-testid={`meta-info-value-${value}`}
        // Intentional disable, eslint doesn't like it otherwise due to "exactOptionalPropertyTypes"
        color={color as DefaultMantineColor}
      >
        {value}
      </Code>
    </Box>
  );
};
