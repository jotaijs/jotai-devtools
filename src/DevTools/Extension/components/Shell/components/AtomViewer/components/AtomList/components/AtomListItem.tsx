import { memo, useCallback, useMemo } from 'react';
import { NavLink, Sx, Text } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons';
import { useThemeMode } from '../../../../../../../../hooks/useThemeMode';
import { parseDebugLabel } from '../../../../../../../../utils/parseDebugLabel';

type AtomListItemProps = {
  label?: string;
  onClick: (pos: number) => void;
  atomKey: string;
  pos: number;
  isActive: boolean;
};

const navLinkStyles: Sx = {
  fontFamily: 'JetBrains Mono',
  borderRadius: 5,
};

export const AtomListItem = memo(
  ({ label, onClick, pos, isActive }: AtomListItemProps) => {
    return (
      <NavLink
        label={useMemo(
          () => (
            <Text ff="JetBrains Mono">{parseDebugLabel(label)}</Text>
          ),
          [label],
        )}
        variant="filled"
        sx={navLinkStyles}
        active={isActive}
        color={useThemeMode('dark', 'gray')}
        onClick={useCallback(() => onClick(pos), [onClick, pos])}
        rightSection={useMemo(
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
