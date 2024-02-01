import * as React from 'react';
import { ActionIcon, useProps } from '@mantine/core';
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

export type DevToolsTriggerButtonPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left';

interface DevToolsTriggerButtonProps {
  position?: DevToolsTriggerButtonPosition;
}

const defaultProps: Partial<DevToolsTriggerButtonProps> = {
  position: 'bottom-left',
};

const ShellTriggerButton = React.forwardRef<HTMLButtonElement>((_, ref) => {
  const { position } = useProps<DevToolsTriggerButtonProps>(
    'ShellTriggerButton',
    defaultProps,
    {},
  );
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
      left={position?.includes('left') ? '0.2rem' : 'unset'}
      right={position?.includes('right') ? '0.2rem' : 'unset'}
      top={position?.includes('top') ? '0.2rem' : 'unset'}
      bottom={position?.includes('bottom') ? '0.2rem' : 'unset'}
    >
      <img src={logo} alt="Jotai Mascot" />
    </ActionIcon>
  );
});

export type ExtensionProps = {
  store?: Store | undefined;
  // false by default
  isInitialOpen?: boolean;
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
