import React from 'react';
import {
  ActionIcon,
  Box,
  Group,
  Slider,
  SliderProps,
  Sx,
  rem,
} from '@mantine/core';
import {
  IconChevronLeft,
  IconChevronRight,
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from '@tabler/icons-react';
import { useThemeMode } from '../../../../../../hooks/useThemeMode';
import {
  useSnapshotSliderValue,
  useTimeTravel,
  useTimeTravelNavigateActions,
} from '../atoms';
import { PlaybackSpeedDropdown } from './PlaybackSpeedDropdown';

const sliderStyles: SliderProps['styles'] = (theme) => ({
  root: {
    flexGrow: 1,
  },
  markLabel: { display: 'none' },
  bar: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[6]
        : theme.colors.dark[4],
  },
  track: {
    '&:before': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[3],
    },
  },
  mark: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[5]
        : theme.colors.gray[7],
    borderWidth: rem(0),
  },
  thumb: {
    height: rem(14),
    width: rem(14),
    borderWidth: rem(3),
    borderColor:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[6]
        : theme.colors.dark[4],
  },
});

const playBarWrapperStyles: Sx = (theme) => ({
  height: 56,
  borderTop: `0.09rem solid ${
    theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
  }`,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing.sm,
  gap: '12px',
});

export const PlayBar = () => {
  const { step, isSlidePossible, max, value } = useSnapshotSliderValue();

  const { prev, next, setSliderValue } = useTimeTravelNavigateActions();

  const { isTimeTraveling, onTimeTravelToggle } = useTimeTravel();

  const handleOnSliderChange = (value: number) => {
    setSliderValue(value);
  };

  const isDisabled = !isSlidePossible;

  return (
    <Box sx={playBarWrapperStyles}>
      <ActionIcon
        variant="filled"
        color={useThemeMode('dark', 'gray')}
        disabled={isDisabled}
        onClick={onTimeTravelToggle}
        title={isTimeTraveling ? 'Pause time travel' : 'Start time travel'}
      >
        {isTimeTraveling ? (
          <IconPlayerPauseFilled size={16} />
        ) : (
          <IconPlayerPlayFilled size={16} />
        )}
      </ActionIcon>
      <Slider
        value={value}
        label={null}
        size="xs"
        max={max}
        disabled={isDisabled}
        step={step}
        onChange={handleOnSliderChange}
        styles={sliderStyles}
      />
      <Group>
        <ActionIcon
          variant="default"
          color={useThemeMode('dark', 'gray')}
          aria-label="Restore previous snapshot"
          title="Restore previous snapshot"
          disabled={isDisabled || isTimeTraveling || !prev.isPossible}
          onClick={prev.onClick}
        >
          <IconChevronLeft size={16} />
        </ActionIcon>
        <ActionIcon
          variant="default"
          color={useThemeMode('dark', 'gray')}
          aria-label="Restore next snapshot"
          title="Restore next snapshot"
          disabled={isDisabled || isTimeTraveling || !next.isPossible}
          onClick={next.onClick}
        >
          <IconChevronRight size={16} />
        </ActionIcon>
      </Group>
      <PlaybackSpeedDropdown />
    </Box>
  );
};
