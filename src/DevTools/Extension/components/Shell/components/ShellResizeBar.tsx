import { MouseEventHandler, RefObject } from 'react';
import { Box } from '@mantine/core';
import { useSetAtom } from 'jotai/react';
import { shellStylesAtom } from '../../../../atoms/shell-styles';
import { shellStyleDefaults } from '../../../../constants';
import { devtoolsJotaiStoreOptions } from '../../../../internal-jotai-store';

type ShellResizeBarProps = {
  // element: HTMLDivElement | null;
  shellRef?: RefObject<HTMLDivElement> | null;
};

export const ShellResizeBar = ({ shellRef }: ShellResizeBarProps) => {
  const setShellStyle = useSetAtom(shellStylesAtom, devtoolsJotaiStoreOptions);
  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (
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
      sx={{
        width: '100%',
        height: 5,
        cursor: 'row-resize',
        zIndex: 2,
        position: 'absolute',
        // offset it by 2px as user might try to lift it from the edge
        top: -2,
      }}
      onMouseDown={handleMouseDown}
    />
  );
};