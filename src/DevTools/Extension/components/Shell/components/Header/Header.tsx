import * as React from 'react';
import { ActionIcon, Badge, Box, Flex, Group, Sx, Title } from '@mantine/core';
import { IconMinus } from '@tabler/icons-react';
import { useSetAtom } from 'jotai/react';
import { isShellOpenAtom } from '../../../../../atoms/is-shell-open-atom';
import { useDevtoolsJotaiStoreOptions } from '../../../../../internal-jotai-store';
import { ThemeToggle } from './components/ThemeToggle';

const headerStyles: Sx = {
  position: 'sticky',
  top: 0,
  zIndex: 1,
  width: '100%',
};

const logoStyles: Sx = { userSelect: 'none' };

export const Header = React.memo(() => {
  const setIsShellOpen = useSetAtom(
    isShellOpenAtom,
    useDevtoolsJotaiStoreOptions(),
  );

  return (
    <Box sx={headerStyles}>
      <Flex justify="space-between" align="center" p={10}>
        <Group mr={10}>
          <Title size="h4" sx={logoStyles}>
            👻&nbsp;Jōtai DevTools
          </Title>
          <Badge color="orange" size="xs">
            Alpha
          </Badge>
        </Group>
        <Flex align="center">
          <ThemeToggle />

          <ActionIcon
            ml={10}
            title="Minimize panel"
            radius="md"
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
