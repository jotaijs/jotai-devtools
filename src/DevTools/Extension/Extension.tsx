import * as React from 'react';
import { ActionIcon, Sx } from '@mantine/core';
import { useAtom, useSetAtom } from 'jotai/react';
import { Store } from 'src/types';
import { isShellOpenAtom } from '../atoms/is-shell-open-atom';
import { useThemeMode } from '../hooks/useThemeMode';
import { useDevtoolsJotaiStoreOptions } from '../internal-jotai-store';
import { logo } from './assets/logo';
import { Shell } from './components/Shell';

const shellTriggerButtonStyles: Sx = () => ({
  position: 'fixed',
  left: 10,
  bottom: 10,
  borderRadius: '50%',
  padding: '2rem',
  zIndex: 99999,
  img: {
    height: '2rem',
  },
});

const ShellTriggerButton = React.forwardRef<HTMLButtonElement>((_, ref) => {
  const setIsShellOpen = useSetAtom(
    isShellOpenAtom,
    useDevtoolsJotaiStoreOptions(),
  );

  return (
    <ActionIcon
      variant="filled"
      color={useThemeMode('dark', 'gray.3')}
      onClick={() => setIsShellOpen(true)}
      sx={shellTriggerButtonStyles}
      ref={ref}
      title="Open Jotai Devtools"
    >
      <img src={logo} alt="Jotai Mascot" />
    </ActionIcon>
  );
});

export type ExtensionProps = {
  // false by default
  isInitialOpen?: boolean;
  store?: Store;
};

export const Extension = ({
  isInitialOpen = false,
  store,
}: ExtensionProps): JSX.Element => {
  const [isShellOpen, setIsShellOpen] = useAtom(
    isShellOpenAtom,
    useDevtoolsJotaiStoreOptions(),
  );

  React.useEffect(() => {
    // Avoid setting the initial value if the value is found in the local storage
    if (typeof isShellOpen !== 'boolean') {
      setIsShellOpen(isInitialOpen);
    }
    // Intentionally disabled
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{isShellOpen ? <Shell store={store} /> : <ShellTriggerButton />}</>;
};
