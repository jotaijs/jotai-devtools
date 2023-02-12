import * as React from 'react';
import { Box, LoaderProps, LoadingOverlay, Sx, Text } from '@mantine/core';
import { useAtomValue } from 'jotai/react';
import { useThemeMode } from '../../../../../../../hooks/useThemeMode';
import { useDevtoolsJotaiStoreOptions } from '../../../../../../../internal-jotai-store';
import { selectedAtomAtom } from '../../atoms';
import { DisplayAtomDetails } from './components/DisplayAtomDetails';

const messageBoxWrapperStyles: Sx = {
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)',
};

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
      <Box sx={messageBoxWrapperStyles}>
        <Text w="100%" ta="center">
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
          overlayBlur={2}
          loaderProps={loaderProps}
        />
      }
    >
      <DisplayAtomDetails atom={selectedAtomData.atom} />
    </React.Suspense>
  );
});

AtomDetail.displayName = 'AtomDetail';
