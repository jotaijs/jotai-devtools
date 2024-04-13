import * as React from 'react';
import { MantineStyleProp, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useThemeMode } from '../../../../hooks/useThemeMode';
type ErrorMessageProps = {
  message: string;
};

const textStyles: MantineStyleProp = {
  display: 'flex',
  alignItems: 'center',
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  const themedRedColor = useThemeMode('red.8', 'red.5');

  return (
    <Text size="sm" fw="500" color={themedRedColor} style={textStyles}>
      <Text component="span" mr={5} style={textStyles}>
        <IconAlertCircle size={16} />
      </Text>
      {message}
    </Text>
  );
};
