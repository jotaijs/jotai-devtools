import * as React from 'react';
import { NavLink, Text } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { useThemeMode } from '../../../../hooks/useThemeMode';
import './ActionListItem.css';

type ActionListItemProps = {
  label?: string | undefined;
  id: string | number;
  onClick: (id: string | number) => void;
  isActive: boolean;
};

export const ActionListItem = React.memo(
  React.forwardRef<HTMLButtonElement, ActionListItemProps>(
    ({ label, onClick, id, isActive, ...rest }, ref) => {
      const handleOnClick = React.useCallback(() => onClick(id), [onClick, id]);

      return (
        <NavLink
          component="button"
          {...rest}
          ref={ref}
          label={React.useMemo(
            () => (
              <Text className={'internal-jotai-devtools-monospace-font'}>
                {label}
              </Text>
            ),
            [label],
          )}
          variant="filled"
          className="internal-jotai-devtools-navlink"
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
