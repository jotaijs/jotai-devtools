import { useComputedColorScheme } from '@mantine/core';

export const useThemeMode = <L, T>(light: L, dark: T) => {
  const theme = useComputedColorScheme('dark', {
    getInitialValueInEffect: true,
  });
  return theme === 'light' ? light : dark;
};
