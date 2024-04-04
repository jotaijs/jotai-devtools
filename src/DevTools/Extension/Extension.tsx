import * as React from 'react';
import { ActionIcon } from '@mantine/core';
import clsx from 'clsx';
import { useAtom, useSetAtom } from 'jotai/react';
import { Store } from '../../types';
import { isShellOpenAtom } from '../atoms/is-shell-open-atom';
import { useSetCustomStore } from '../atoms/user-custom-store';
import { useThemeMode } from '../hooks/useThemeMode';
import { useDevtoolsJotaiStoreOptions } from '../internal-jotai-store';
import { logo } from './assets/logo';
import { Shell } from './components/Shell';
import useSyncSnapshotHistory from './components/Shell/components/TimeTravel/useSyncSnapshotHistory';
import './ShellTriggerButton.css';

type ShellTriggerButtonProps = {
  position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | undefined;
};

const ShellTriggerButton = React.forwardRef<
  HTMLButtonElement,
  ShellTriggerButtonProps
>((props, ref) => {
  const { position = 'bottom-left' } = props;

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
      pos="fixed"
      radius="50%"
      w="4rem"
      h="4rem"
      style={{
        borderWidth: 0,
        zIndex: 99999,
      }}
      left={position?.includes('left') ? '0.2rem' : 'unset'}
      right={position?.includes('right') ? '0.2rem' : 'unset'}
      top={position?.includes('top') ? '0.2rem' : 'unset'}
      bottom={position?.includes('bottom') ? '0.2rem' : 'unset'}
      className={clsx(
        'internal-jotai-devtools-trigger-button',
        'jotai-devtools-trigger-button',
      )}
    >
      <img src={logo} alt="Jotai Mascot" />
    </ActionIcon>
  );
});

export type ExtensionProps = ShellTriggerButtonProps & {
  store?: Store | undefined;
  // false by default
  isInitialOpen?: boolean;
};

export const Extension = ({
  isInitialOpen = false,
  store,
  position,
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

  return (
    <>{isShellOpen ? <Shell /> : <ShellTriggerButton position={position} />}</>
  );
};
