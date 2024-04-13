import { useComputedColorScheme } from '@mantine/core';

export const useThemeMode = <L, T>(light: L, dark: T) => {
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  return computedColorScheme === 'light' ? light : dark;
};
