import * as React from 'react';
import {
  Box,
  LoaderProps,
  LoadingOverlay,
  MantineStyleProp,
  OverlayProps,
  Text,
} from '@mantine/core';
import { useThemeMode } from '../../../../../../../hooks/useThemeMode';
import { useSelectedSnapshotDetailValue } from './atoms';
import { DisplaySnapshotDetails } from './components/DisplaySnapshotDetails';

const messageBoxWrapperStyles: MantineStyleProp = {
  position: 'relative',
  top: '50%',
  transform: 'translateY(-50%)',
};

const loadingOverlayOverlayProps: OverlayProps = { blur: 2 };

export const SnapshotDetail = React.memo((): JSX.Element => {
  const selectedSnapshotDetail = useSelectedSnapshotDetailValue();

  const loaderProps: LoaderProps = {
    color: useThemeMode('dark', 'white'),
    size: 24,
  };

  if (!selectedSnapshotDetail) {
    return (
      <Box style={messageBoxWrapperStyles}>
        <Text w="100%" ta="center">
          Select a snapshot from the left panel to view the details
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
      <DisplaySnapshotDetails details={selectedSnapshotDetail} />
    </React.Suspense>
  );
});

SnapshotDetail.displayName = 'SnapshotDetail';
