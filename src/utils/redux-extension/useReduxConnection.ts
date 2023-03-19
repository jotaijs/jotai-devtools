import { useEffect, useRef } from 'react';
import { Connection, createReduxConnection } from './createReduxConnection';
import { getReduxExtension } from './getReduxExtension';

interface ConnectionConfig<T> {
  name: string;
  enabled: boolean | undefined;
  initialValue: T;
  disconnectAllOnCleanup?: boolean;
}

export const useReduxConnection = <T>({
  name,
  initialValue,
  enabled,
  disconnectAllOnCleanup,
}: ConnectionConfig<T>) => {
  const connectionRef = useRef<Connection>();
  const firstValue = useRef(initialValue);

  useEffect(() => {
    const extension = getReduxExtension(enabled);

    const connection = createReduxConnection(extension, name);
    connection?.init(firstValue.current);
    connectionRef.current = connection;

    return () => {
      if (disconnectAllOnCleanup) extension?.disconnect?.();
    };
  }, [name, enabled, disconnectAllOnCleanup]);

  return connectionRef;
};
