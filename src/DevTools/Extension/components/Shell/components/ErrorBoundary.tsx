import * as React from 'react';
import { Anchor, Box, Flex, Text } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import {
  FallbackProps,
  ErrorBoundary as ReactErrorBoundary,
} from 'react-error-boundary';
import { useThemeMode } from '../../../../hooks/useThemeMode';
import { CodeSyntaxHighlighter } from './CodeSyntaxHighlighter';
import classes from './ErrorBoundary.module.css';

const ErrorFallback = ({ error }: FallbackProps) => {
  if (Error?.stackTraceLimit) {
    Error.stackTraceLimit = 5;
  }

  Error?.captureStackTrace?.(error);

  const themedRedColor = useThemeMode('red.8', 'red.5');

  return (
    <Flex
      role="alert"
      justify="center"
      align="center"
      h="90%"
      className={classes.alert}
      data-testid="jotai-devtools-error-boundary"
    >
      <Box w="100%" maw="80%" mah="80%">
        <Text
          component="div"
          size="md"
          fw="500"
          c={themedRedColor}
          className={classes.text}
          mb={5}
        >
          <Text component="span" mr={5} className={classes.text}>
            <IconAlertCircle size={16} />
          </Text>
          Uh-oh, something went wrong.
        </Text>

        <Text component="span" size="sm" c={themedRedColor} mb="sm">
          If you believe this to be a bug, please file an issue on{' '}
          <Anchor
            href="https://github.com/jotaijs/jotai-devtools/issues"
            c={themedRedColor}
            td="underline"
            target="_blank"
            rel="noreferrer noopener"
          >
            Jotai DevTool's GitHub repo
          </Anchor>{' '}
          with a minimal reproduction and the following error
        </Text>
        <CodeSyntaxHighlighter
          code={error.stack?.toString() || error.message}
          language="javascript"
        />
      </Box>
    </Flex>
  );
};

export const ErrorBoundary = ({ children }: React.PropsWithChildren) => {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
};
