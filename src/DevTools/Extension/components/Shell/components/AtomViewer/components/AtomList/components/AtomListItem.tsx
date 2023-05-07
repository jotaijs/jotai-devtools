import * as React from 'react';
import { NavLink, Sx, Text } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { useThemeMode } from '../../../../../../../../hooks/useThemeMode';
import { parseDebugLabel } from '../../../../../../../../utils/parse-debug-label';

type AtomListItemProps = {
  label?: string | undefined;
  onClick: (pos: number) => void;
  atomKey: string;
  pos: number;
  isActive: boolean;
};

const monoSpaceFonts: Sx = (theme) => ({
  fontFamily: theme.fontFamilyMonospace || 'JetBrains Mono',
});

const navLinkStyles: Sx = (theme) => ({
  borderRadius: theme.radius.md,
});

export const AtomListItem = React.memo(
  ({ label, onClick, pos, isActive }: AtomListItemProps) => {
    return (
      <NavLink
        label={React.useMemo(
          () => (
            <Text sx={monoSpaceFonts}>{parseDebugLabel(label)}</Text>
          ),
          [label],
        )}
        variant="filled"
        sx={navLinkStyles}
        active={isActive}
        color={useThemeMode('dark', 'gray')}
        onClick={React.useCallback(() => onClick(pos), [onClick, pos])}
        rightSection={React.useMemo(
          () => (
            <IconChevronRight size={12} stroke={1.5} />
          ),
          [],
        )}
      />
    );
  },
);

AtomListItem.displayName = 'AtomListItem';
