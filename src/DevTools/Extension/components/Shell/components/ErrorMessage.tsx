import * as React from 'react';
import { Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useThemeMode } from '../../../../hooks/useThemeMode';
import classes from './ErrorMessage.module.css';

type ErrorMessageProps = {
  message: string;
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  const themedRedColor = useThemeMode('red.8', 'red.5');

  return (
    <Text
      component="span"
      size="sm"
      fw="500"
      c={themedRedColor}
      className={classes.text}
    >
      <Text component="span" mr={5} className={classes.text}>
        <IconAlertCircle size={16} />
      </Text>
      {message}
    </Text>
  );
};
