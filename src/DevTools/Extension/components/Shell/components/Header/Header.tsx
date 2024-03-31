import * as React from 'react';
import {
  ActionIcon,
  Badge,
  Box,
  Flex,
  Group,
  MantineStyleProp,
  Title,
} from '@mantine/core';
import { IconMinus } from '@tabler/icons-react';
import { useSetAtom } from 'jotai/react';
import { isShellOpenAtom } from '../../../../../atoms/is-shell-open-atom';
import { useDevtoolsJotaiStoreOptions } from '../../../../../internal-jotai-store';
import { ThemeToggle } from './components/ThemeToggle';

const headerStyles: MantineStyleProp = {
  position: 'sticky',
  top: 0,
  zIndex: 1,
  width: '100%',
};

const logoStyles: MantineStyleProp = { userSelect: 'none' };

export const Header = React.memo(() => {
  const setIsShellOpen = useSetAtom(
    isShellOpenAtom,
    useDevtoolsJotaiStoreOptions(),
  );

  return (
    <Box style={headerStyles}>
      <Flex justify="space-between" align="center" p={10}>
        <Group mr={10}>
          <Title size="h4" style={logoStyles}>
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
            variant="subtle"
            title="Minimize panel"
            radius="md"
            color="gray"
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
