import React from 'react';
import { ActionIcon, Box, Group, Slider } from '@mantine/core';
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
import classes from './PlayBar.module.css';

export const PlayBar = () => {
  const { step, isSlidePossible, max, value } = useSnapshotSliderValue();

  const { prev, next, setSliderValue } = useTimeTravelNavigateActions();

  const { isTimeTraveling, onTimeTravelToggle } = useTimeTravel();

  const handleOnSliderChange = (value: number) => {
    setSliderValue(value);
  };

  const isDisabled = !isSlidePossible;

  return (
    <Box className={classes.playBarWrapper}>
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
        classNames={{
          bar: classes.bar,
          thumb: classes.thumb,
          markLabel: classes.markLabel,
          root: classes.root,
        }}
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
