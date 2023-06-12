import * as React from 'react';
import { NavLink, Sx, Text } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { useThemeMode } from '../../../../hooks/useThemeMode';

type ActionListItemProps = {
  label?: string | undefined;
  id: string | number;
  onClick: (id: string | number) => void;
  isActive: boolean;
};

const monoSpaceFonts: Sx = (theme) => ({
  fontFamily: theme.fontFamilyMonospace || 'JetBrains Mono',
});

const navLinkStyles: Sx = (theme) => ({
  borderRadius: theme.radius.md,
});

export const ActionListItem = React.memo(
  React.forwardRef<HTMLButtonElement, ActionListItemProps>(
    ({ label, onClick, id, isActive, ...rest }, ref) => {
      const handleOnClick = React.useCallback(() => onClick(id), [onClick, id]);

      return (
        <NavLink
          {...rest}
          ref={ref}
          label={React.useMemo(
            () => (
              <Text sx={monoSpaceFonts}>{label}</Text>
            ),
            [label],
          )}
          variant="filled"
          sx={navLinkStyles}
          active={isActive}
          color={useThemeMode('dark', 'gray')}
          onClick={handleOnClick}
          rightSection={React.useMemo(
            () => (
              <IconChevronRight size={12} stroke={1.5} />
            ),
            [],
          )}
        />
      );
    },
  ),
);

ActionListItem.displayName = 'ActionListItem';
