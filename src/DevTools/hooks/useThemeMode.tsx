import { useMantineColorScheme } from '@mantine/core';

export const useThemeMode = <L, T>(light: L, dark: T) => {
  const { colorScheme } = useMantineColorScheme();
  return colorScheme === 'light' ? light : dark;
};
