import { useCallback, useEffect, useState } from 'react';
import { useInterval } from '@mantine/hooks';
import { useAtom, useAtomValue, useSetAtom } from 'jotai/react';
import { ExtractAtomArgs, atom } from 'jotai/vanilla';
import { atomWithDefault, atomWithStorage } from 'jotai/vanilla/utils';
import { useGotoAtomsSnapshot } from 'jotai-devtools/utils';
import { AtomsSnapshot } from '../../../../../../types';
import { useDevToolsOptionsValue } from '../../../../../atoms/devtools-options';
import { useUserStoreOptions } from '../../../../../hooks/useUserStore';
import { useDevtoolsJotaiStoreOptions } from '../../../../../internal-jotai-store';
import { generateLocalStorageKey } from '../../../../../utils';
import { filterSnapshotHistoryByString } from './utils/filter-snapshot-history-by-string';
import { findSnapshotById } from './utils/find-snapshot-by-id';

export type SnapshotHistory = {
  id: string;
  label: number;
  value: AtomsSnapshot;
  displayValues: Record<string, unknown>;
  // We mark last item as "hidden" when user deletes the snapshot history
  // This allows us to still show the "diff" for the last item
  isHidden: boolean;
  timestamp: string;
};

export const snapshotHistoryAtom = atom<SnapshotHistory[]>([]);

export const useSnapshotHistoryValue = () =>
  useAtomValue(snapshotHistoryAtom, useDevtoolsJotaiStoreOptions());

export const useSetSnapshotHistory = () =>
  useSetAtom(snapshotHistoryAtom, useDevtoolsJotaiStoreOptions());

export const useSnapshotHistory = () =>
  useAtom(snapshotHistoryAtom, useDevtoolsJotaiStoreOptions());

/**
 * Should record snapshot history
 */
const shouldRecordSnapshotHistoryKey = generateLocalStorageKey(
  'should-record-snapshot-history',
  0,
);

const shouldRecordSnapshotHistoryAtom = atomWithStorage(
  shouldRecordSnapshotHistoryKey,
  false,
);

export const useShouldRecordSnapshotHistoryValue = () =>
  useAtomValue(shouldRecordSnapshotHistoryAtom, useDevtoolsJotaiStoreOptions());

export const useSetShouldRecordSnapshotHistory = () =>
  useSetAtom(shouldRecordSnapshotHistoryAtom, useDevtoolsJotaiStoreOptions());

export const useShouldRecordSnapshotHistory = () =>
  useAtom(shouldRecordSnapshotHistoryAtom, useDevtoolsJotaiStoreOptions());

/**
 * Selected Snapshot Id
 */
const selectedSnapshotIdHolderAtom = atom<string | undefined>(undefined);

export const selectedSnapshotIdAtom = atom(
  (get) => {
    const snapshotHistory = get(snapshotHistoryAtom);
    const selectedSnapshotId = get(selectedSnapshotIdHolderAtom);
    if (snapshotHistory && selectedSnapshotId) {
      const findSnapshotByIdResult = findSnapshotById(
        snapshotHistory,
        selectedSnapshotId,
      );

      // Unselect snapshot if it is hidden
      return findSnapshotByIdResult?.id && !findSnapshotByIdResult.isHidden
        ? findSnapshotByIdResult.id
        : undefined;
    }
    return undefined;
  },
  (_, set, nextId: ExtractAtomArgs<typeof selectedSnapshotIdHolderAtom>[0]) => {
    set(selectedSnapshotIdHolderAtom, nextId);
  },
);

export const useSelectedSnapshotIdValue = () =>
  useAtomValue(selectedSnapshotIdAtom, useDevtoolsJotaiStoreOptions());

export const useSetSelectedSnapshotId = () =>
  useSetAtom(selectedSnapshotIdAtom, useDevtoolsJotaiStoreOptions());

export const useSelectedSnapshotId = () =>
  useAtom(selectedSnapshotIdAtom, useDevtoolsJotaiStoreOptions());

/**
 * Filtered snapshots
 */

// used to preserve search input across tab switch
const searchInputInternalValueAtom = atom('');

export const filteredSnapshotHistoryAtom = atomWithDefault<SnapshotHistory[]>(
  (get) => {
    const filteredByString = filterSnapshotHistoryByString(
      get(searchInputInternalValueAtom),
      get(snapshotHistoryAtom),
    );

    const filteredByHidden = filteredByString.filter(
      (snapshot) => !snapshot.isHidden,
    );

    return filteredByHidden;
  },
);

export const useSnapshotSearchInput = () =>
  useAtom(searchInputInternalValueAtom, useDevtoolsJotaiStoreOptions());

export const useSnapshotSearchInputValue = () =>
  useAtomValue(searchInputInternalValueAtom, useDevtoolsJotaiStoreOptions());

export const useFilteredSnapshotHistoryAtomValue = () =>
  useAtomValue(filteredSnapshotHistoryAtom, useDevtoolsJotaiStoreOptions());

/**
 * Navigation
 */
export const shouldAutoScrollAtom = atom<false | 'start' | 'end' | 'center'>(
  false,
);

export const useShouldAutoScroll = () =>
  useAtom(shouldAutoScrollAtom, useDevtoolsJotaiStoreOptions());

/**
 * Time Travel state
 */

export const isTimeTravelingAtom = atom(false);

export const useIsTimeTravelingValue = () =>
  useAtomValue(isTimeTravelingAtom, useDevtoolsJotaiStoreOptions());

export const useIsTimeTraveling = () =>
  useAtom(isTimeTravelingAtom, useDevtoolsJotaiStoreOptions());

const getStepFromArrayLength = (arrayLength: number): number => {
  const START = 0;
  const END = 100;
  if (!arrayLength) return 0;
  if (arrayLength === 1) return 100;
  return (END - START) / (arrayLength - 1);
};

const snapshotSliderCurrentStepValueHolderAtom = atom(0);

const snapshotSliderCurrentStepAtom = atom(
  (get) => get(snapshotSliderCurrentStepValueHolderAtom),
  (
    get,
    set,
    nextStep: number,
    gotoAtomsSnapshot: ReturnType<typeof useGotoAtomsSnapshot>,
  ) => {
    const idx = Math.round(nextStep / get(snapshotSliderAtom).step - 1);
    const snapshotHistory = get(filteredSnapshotHistoryAtom);
    const foundSnapshotHistory = snapshotHistory[idx];

    if (foundSnapshotHistory) {
      set(selectedSnapshotIdAtom, foundSnapshotHistory.id);
      set(shouldAutoScrollAtom, 'center');
      if (get(isTimeTravelingAtom)) {
        gotoAtomsSnapshot(foundSnapshotHistory.value);
      } else {
        set(isTimeTravelingAtom, true);
        gotoAtomsSnapshot(foundSnapshotHistory.value);
        set(isTimeTravelingAtom, false);
      }
    } else {
      set(selectedSnapshotIdAtom, undefined);
    }

    set(snapshotSliderCurrentStepValueHolderAtom, nextStep);
  },
);

export const snapshotSliderAtom = atom(
  (get) => {
    const filteredSnapshotHistory = get(filteredSnapshotHistoryAtom);
    const step = getStepFromArrayLength(filteredSnapshotHistory.length);
    const max = filteredSnapshotHistory.length * step;

    return {
      value: get(snapshotSliderCurrentStepAtom),
      step,
      isSlidePossible: filteredSnapshotHistory.length !== 0,
      min: 0,
      max,
    };
  },
  (_, set, ...args: ExtractAtomArgs<typeof snapshotSliderCurrentStepAtom>) => {
    return set(snapshotSliderCurrentStepAtom, ...args);
  },
);

export const useSnapshotSlider = () =>
  useAtom(snapshotSliderAtom, useDevtoolsJotaiStoreOptions());

export const useSnapshotSliderValue = () =>
  useAtomValue(snapshotSliderAtom, useDevtoolsJotaiStoreOptions());

/**
 * Manual time travel
 */

const manualTimeTravelAtom = atom(
  (get) => {
    const { value, min, max, step } = get(snapshotSliderAtom);
    return {
      prev: {
        isPossible: value !== min,
        value: Math.max(value - step, min),
      },
      next: {
        isPossible: value !== max,
        value: Math.min(value + step, max),
      },
      initial: min,
    };
  },
  (_, set, ...args: ExtractAtomArgs<typeof snapshotSliderAtom>) => {
    return set(snapshotSliderAtom, ...args);
  },
);

export const useTimeTravelNavigateActions = () => {
  const [{ prev, next, initial }, setSliderValueRaw] = useAtom(
    manualTimeTravelAtom,
    useDevtoolsJotaiStoreOptions(),
  );

  const gotoAtomsSnapshot = useGotoAtomsSnapshot(useUserStoreOptions());

  const setSliderValue = useCallback(
    (nextStep: number) => {
      setSliderValueRaw(nextStep, gotoAtomsSnapshot);
    },
    [setSliderValueRaw, gotoAtomsSnapshot],
  );
  const { isSlidePossible } = useSnapshotSliderValue();

  const reset = useCallback(() => {
    if (isSlidePossible) {
      setSliderValue(initial);
    }
  }, [initial, isSlidePossible, setSliderValue]);

  const onPrevClick = useCallback(() => {
    if (isSlidePossible) {
      setSliderValue(prev.value);
    }
  }, [prev, isSlidePossible, setSliderValue]);

  const onNextClick = useCallback(() => {
    if (isSlidePossible) {
      setSliderValue(next.value);
    }
  }, [next, isSlidePossible, setSliderValue]);

  return {
    prev: {
      isPossible: prev.isPossible,
      onClick: onPrevClick,
    },
    next: {
      isPossible: next.isPossible,
      onClick: onNextClick,
    },
    reset,
    setSliderValue,
  };
};

const calculatePlaybackInterval = (distance: number, speed: number) =>
  distance / speed;

export type PlaybackSpeedOptions = Record<
  '0.5x' | '1x' | '1.5x' | '1.75x' | '2x',
  number
>;

export const defaultPlaybackOptions: PlaybackSpeedOptions = {
  '0.5x': 0.5,
  '1x': 1,
  '1.5x': 1.5,
  '1.75x': 1.75,
  '2x': 2,
};

const playbackSpeedKey = generateLocalStorageKey('playback-speed', 0);

export const playbackSpeedOptionInternalAtom = atomWithStorage<
  keyof PlaybackSpeedOptions
>(playbackSpeedKey, '1x');

export const usePlaybackSpeedOption = () =>
  useAtom(playbackSpeedOptionInternalAtom, useDevtoolsJotaiStoreOptions());

export const usePlaybackSpeedOptionValue = () =>
  useAtomValue(playbackSpeedOptionInternalAtom, useDevtoolsJotaiStoreOptions());

const usePlaybackSpeed = () => {
  const { timeTravelPlaybackInterval } = useDevToolsOptionsValue();
  const playbackSpeedOption = usePlaybackSpeedOptionValue();

  const playbackSpeed = defaultPlaybackOptions[playbackSpeedOption];
  const nextSpeed = calculatePlaybackInterval(
    timeTravelPlaybackInterval,
    playbackSpeed,
  );

  return Math.max(nextSpeed, 0);
};

export const useIntervalNavigation = (enabled: boolean, cb: () => void) => {
  const playbackSpeed = usePlaybackSpeed();

  const interval = useInterval(cb, playbackSpeed);

  useEffect(() => {
    if (enabled) {
      interval.start();
    }

    return interval.stop();
  }, [enabled, interval, cb]);

  return interval;
};

export const useTimeTravel = () => {
  const { value, max, isSlidePossible } = useSnapshotSliderValue();
  const [isTimeTraveling, setIsTimeTraveling] = useIsTimeTraveling();
  const { next, reset } = useTimeTravelNavigateActions();

  // This state controls the play/pause UI
  // This is because `isTimeTraveling` could also be true when the user is manually sliding
  const [isPlaying, setIsPlaying] = useState(false);

  const onFinish = useCallback(() => {
    setIsTimeTraveling(false);
    setIsPlaying(false);
  }, [setIsTimeTraveling]);

  const interval = useIntervalNavigation(isPlaying, next.onClick);

  const triggerReset = useCallback(() => {
    // Reset the state back to initial if the user is not sliding, the value is at the end
    const canReset = isSlidePossible && value === max && !interval.active;
    if (canReset) {
      reset();
    }
  }, [isSlidePossible, value, max, interval.active, reset]);

  useEffect(() => {
    if (!isSlidePossible || (value === max && isTimeTraveling)) {
      interval.stop();
      onFinish();
    }
  }, [value, max, isTimeTraveling, onFinish, interval, isSlidePossible]);

  const onTimeTravelToggle = useCallback(() => {
    setIsPlaying((prev) => !prev);

    setIsTimeTraveling((prev) => {
      if (!prev) {
        // We reset the slider to the initial value if the time travel was completed and the value is the end of the slider
        triggerReset();
        return true;
      }

      return false;
    });
  }, [triggerReset, setIsTimeTraveling]);

  return {
    isTimeTraveling: isPlaying,
    onTimeTravelToggle,
  };
};
