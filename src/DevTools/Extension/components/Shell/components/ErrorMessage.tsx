import * as React from 'react';
import { Sx, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';
import { useThemeMode } from '../../../../hooks/useThemeMode';
type ErrorMessageProps = {
  message: string;
};

const textStyles: Sx = {
  display: 'flex',
  alignItems: 'center',
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  const themedRedColor = useThemeMode('red.8', 'red.5');

  return (
    <Text size="sm" fw="500" color={themedRedColor} sx={textStyles}>
      <Text mr={5} sx={textStyles}>
        <IconAlertCircle size={16} />
      </Text>
      {message}
    </Text>
  );
};
