import * as React from 'react';
import { Box } from '@mantine/core';
import { useSetAtom } from 'jotai/react';
import { shellStylesAtom } from '../../../../atoms/shell-styles';
import { shellStyleDefaults } from '../../../../constants';
import { useDevtoolsJotaiStoreOptions } from '../../../../internal-jotai-store';
import classes from './ShellResizeBar.module.css';

type ShellResizeBarProps = {
  shellRef?: React.RefObject<HTMLDivElement> | null;
};

export const ShellResizeBar = ({ shellRef }: ShellResizeBarProps) => {
  const setShellStyle = useSetAtom(
    shellStylesAtom,
    useDevtoolsJotaiStoreOptions(),
  );

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (
    mouseDownEvent,
  ) => {
    const startY = mouseDownEvent.clientY;
    const { height = 500 } = shellRef?.current?.getBoundingClientRect() || {};
    const updateDimensions = (event: MouseEvent) => {
      event.preventDefault();
      const nextHeight = height + startY - event.clientY;

      setShellStyle((prev) => ({
        ...prev,
        isDragging: true,
        height: Math.max(nextHeight, shellStyleDefaults.minHeight),
      }));
    };

    const unsub = () => {
      setShellStyle((prev) => ({ ...prev, isDragging: false }));
      document.removeEventListener('mousemove', updateDimensions, false);
      document.removeEventListener('mouseUp', unsub, false);
    };

    document.addEventListener('mousemove', updateDimensions, false);
    document.addEventListener('mouseup', unsub, false);
  };

  return (
    <Box
      className={classes.root}
      h={5}
      onMouseDown={handleMouseDown}
      data-testid="shell-resize-bar"
    />
  );
};
