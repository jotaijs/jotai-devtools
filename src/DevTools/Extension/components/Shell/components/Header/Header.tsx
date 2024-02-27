import * as React from 'react';
import { ActionIcon, Badge, Box, Flex, Group, Title } from '@mantine/core';
import { IconMinus } from '@tabler/icons-react';
import { useSetAtom } from 'jotai/react';
import { isShellOpenAtom } from '../../../../../atoms/is-shell-open-atom';
import { useThemeMode } from '../../../../../hooks/useThemeMode';
import { useDevtoolsJotaiStoreOptions } from '../../../../../internal-jotai-store';
import { ThemeToggle } from './components/ThemeToggle';
import classes from './Header.module.css';

export const Header = React.memo(() => {
  const themedColor = useThemeMode('dark', 'gray');
  const setIsShellOpen = useSetAtom(
    isShellOpenAtom,
    useDevtoolsJotaiStoreOptions(),
  );
  return (
    <Box className={classes.header}>
      <Flex justify="space-between" align="center" p={10}>
        <Group mr={10}>
          <Title size="h4" className={classes.logo}>
            👻&nbsp;Jōtai DevTools
          </Title>
          <Badge color="orange" variant="light" size="xs">
            Alpha
          </Badge>
        </Group>
        <Flex align="center">
          <ThemeToggle />

          <ActionIcon
            ml={10}
            title="Minimize panel"
            radius="md"
            variant="subtle"
            color={themedColor}
            onClick={() => setIsShellOpen(false)}
          >
            <IconMinus size={16} />
          </ActionIcon>
        </Flex>
      </Flex>
    </Box>
  );
});
Header.displayName = 'Header';
