import * as React from 'react';
import { Box, LoaderProps, LoadingOverlay, Text } from '@mantine/core';
import { useAtomValue } from 'jotai/react';
import { useThemeMode } from '../../../../../../../hooks/useThemeMode';
import { useDevtoolsJotaiStoreOptions } from '../../../../../../../internal-jotai-store';
import { selectedAtomAtom } from '../../atoms';
import classes from './AtomDetail.module.css';
import { DisplayAtomDetails } from './components/DisplayAtomDetails';

export const AtomDetail = React.memo((): JSX.Element => {
  const selectedAtomData = useAtomValue(
    selectedAtomAtom,
    useDevtoolsJotaiStoreOptions(),
  );

  const loaderProps: LoaderProps = {
    color: useThemeMode('dark', 'white'),
  };

  if (!selectedAtomData) {
    return (
      <Box className={classes.messageBoxWrapper}>
        <Text component="div" w="100%" ta="center">
          Select an atom from the left panel to view the details{' '}
        </Text>
      </Box>
    );
  }

  return (
    <React.Suspense
      fallback={
        <LoadingOverlay
          visible={true}
          overlayProps={{
            blur: 2,
          }}
          loaderProps={loaderProps}
        />
      }
    >
      <DisplayAtomDetails atom={selectedAtomData.atom} />
    </React.Suspense>
  );
});

AtomDetail.displayName = 'AtomDetail';
