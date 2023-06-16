import { Sx } from '@mantine/core';

export const shellStyles: Sx = (theme) => ({
  position: 'fixed',
  // subtract margins
  width: 'calc(100% - 1.25rem)',
  left: '50%',
  bottom: '0.625rem',
  transform: 'translate(-50%, 0%)',
  // TODO Do we need this
  //   userSelect: isDragging ? 'none' : 'auto',
  borderColor:
    theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
  borderWidth: 1,
  borderStyle: 'solid',
  // Changing this may cause overlaps of bg in nested divs
  borderRadius: '8px',
  background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  display: 'flex',
  flexDirection: 'column',
  zIndex: 99999,
});
