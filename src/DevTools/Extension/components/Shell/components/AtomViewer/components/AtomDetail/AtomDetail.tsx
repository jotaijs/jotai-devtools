import * as React from 'react';
import {
  Box,
  LoaderProps,
  LoadingOverlay,
  MantineStyleProp,
  OverlayProps,
  Text,
} from '@mantine/core';
import { useAtomValue } from 'jotai/react';
import { useThemeMode } from '../../../../../../../hooks/useThemeMode';
import { useDevtoolsJotaiStoreOptions } from '../../../../../../../internal-jotai-store';
import { selectedAtomAtom } from '../../atoms';
import { DisplayAtomDetails } from './components/DisplayAtomDetails';

const messageBoxWrapperStyles: MantineStyleProp = {
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)',
};

const loadingOverlayOverlayProps: OverlayProps = {
  blur: 2,
  backgroundOpacity: 0,
};

export const AtomDetail = React.memo((): JSX.Element => {
  const selectedAtomData = useAtomValue(
    selectedAtomAtom,
    useDevtoolsJotaiStoreOptions(),
  );

  const loaderProps: LoaderProps = {
    color: useThemeMode('dark', 'white'),
    size: 24,
  };

  if (!selectedAtomData) {
    return (
      <Box style={messageBoxWrapperStyles}>
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
          overlayProps={loadingOverlayOverlayProps}
          loaderProps={loaderProps}
        />
      }
    >
      <DisplayAtomDetails atom={selectedAtomData.atom} />
    </React.Suspense>
  );
});

AtomDetail.displayName = 'AtomDetail';
