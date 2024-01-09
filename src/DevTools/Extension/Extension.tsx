import * as React from 'react';
import { ActionIcon } from '@mantine/core';
import { useAtom, useSetAtom } from 'jotai/react';
import { Store } from '../../types';
import { isShellOpenAtom } from '../atoms/is-shell-open-atom';
import { useSetCustomStore } from '../atoms/user-custom-store';
import { useThemeMode } from '../hooks/useThemeMode';
import { useDevtoolsJotaiStoreOptions } from '../internal-jotai-store';
import { logo } from './assets/logo';
import { Shell } from './components/Shell';
import useSyncSnapshotHistory from './components/Shell/components/TimeTravel/useSyncSnapshotHistory';

export const shellTriggerButtonClassName = 'jotai-devtools-trigger-button';

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
      ref={ref}
      title="Open Jotai Devtools"
      className={shellTriggerButtonClassName}
    >
      <img src={logo} alt="Jotai Mascot" />
    </ActionIcon>
  );
});

export type ExtensionProps = {
  store?: Store | undefined;
  // false by default
  isInitialOpen?: boolean;
  className?: string;
};

export const Extension = ({
  isInitialOpen = false,
  store,
}: ExtensionProps): JSX.Element => {
  const [isShellOpen, setIsShellOpen] = useAtom(
    isShellOpenAtom,
    useDevtoolsJotaiStoreOptions(),
  );

  const setUserStore = useSetCustomStore();

  React.useEffect(() => {
    setUserStore(store);
  }, [setUserStore, store]);

  useSyncSnapshotHistory();

  React.useEffect(() => {
    // Avoid setting the initial value if the value is found in the local storage
    if (typeof isShellOpen !== 'boolean') {
      setIsShellOpen(isInitialOpen);
    }
    // Intentionally disabled
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{isShellOpen ? <Shell /> : <ShellTriggerButton />}</>;
};
