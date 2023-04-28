import * as React from 'react';
import { ActionIcon, Sx } from '@mantine/core';
import {
  useIsShellOpenValue,
  useSetIsShellOpen,
} from '../atoms/is-shell-open-atom';
import { useThemeMode } from '../hooks/useThemeMode';
import { logo } from './assets/logo';
import { Shell, ShellProps } from './components/Shell';

const shellTriggerButtonStyles: Sx = () => ({
  position: 'fixed',
  left: 10,
  bottom: 10,
  borderRadius: '50%',
  width: '4rem',
  height: '4rem',
  zIndex: 99999,
  img: {
    height: '2rem',
  },
});

const ShellTriggerButton = React.forwardRef<HTMLButtonElement>((_, ref) => {
  const setIsShellOpen = useSetIsShellOpen();

  return (
    <ActionIcon
      variant="filled"
      color={useThemeMode('dark', 'gray.3')}
      onClick={() => setIsShellOpen(true)}
      sx={shellTriggerButtonStyles}
      ref={ref}
      title="Open Jotai Devtools"
      className="jotai-devtools-trigger-button"
    >
      <img src={logo} alt="Jotai Mascot" />
    </ActionIcon>
  );
});

export type ExtensionProps = ShellProps & {
  // false by default
  isInitialOpen?: boolean;
};

export const Extension = ({
  isInitialOpen = false,
  store,
}: ExtensionProps): JSX.Element => {
  const isShellOpen = useIsShellOpenValue();

  const isShellOpenSafe =
    typeof isShellOpen !== 'boolean' ? isInitialOpen : isShellOpen;

  return (
    <>{isShellOpenSafe ? <Shell store={store} /> : <ShellTriggerButton />}</>
  );
};
