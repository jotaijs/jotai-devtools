import { Suspense, memo } from 'react';
import { Box, LoaderProps, LoadingOverlay, Sx, Text } from '@mantine/core';
import { useAtomValue } from 'jotai/react';
import { useThemeMode } from '../../../../../../../hooks/useThemeMode';
import { devtoolsJotaiStoreOptions } from '../../../../../../../internal-jotai-store';
import { selectedAtomAtom } from '../../atoms';
import { DisplayAtomDetails } from './components/DisplayAtomDetails';

const messageBoxWrapperStyles: Sx = {
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)',
};

export const AtomDetail = memo((): JSX.Element => {
  const selectedAtomData = useAtomValue(
    selectedAtomAtom,
    devtoolsJotaiStoreOptions,
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
    <Suspense
      fallback={
        <LoadingOverlay
          visible={true}
          overlayBlur={2}
          loaderProps={loaderProps}
        />
      }
    >
      <DisplayAtomDetails atom={selectedAtomData.atom} />
    </Suspense>
  );
});

AtomDetail.displayName = 'AtomDetail';
