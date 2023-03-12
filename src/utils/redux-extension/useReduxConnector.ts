import { useEffect, useRef } from 'react';
import { Connector, createReduxConnector } from './createReduxConnector';
import { ReduxExtension, getReduxExtension } from './getReduxExtension';

type Connection = {
  activeConnections: number;
  connector: Connector;
};
const connections: Record<string, Connection> = {};

const hasActiveConnections = () => Object.keys(connections).length > 0;

const getConnector = (name: string, extension: ReduxExtension) => {
  const existing = connections[name];
  if (existing) {
    existing.activeConnections += 1;
    return { connector: existing.connector, shouldInit: false };
  }

  const connector = createReduxConnector(extension, name);
  connections[name] = { activeConnections: 1, connector: connector };
  return { connector, shouldInit: true };
};

const removeConnection = (name: string, extension: ReduxExtension) => {
  const existing = connections[name];
  if (!existing) return;

  existing.activeConnections -= 1;
  if (existing.activeConnections === 0) {
    delete connections[name];
  }
  if (!hasActiveConnections()) extension.disconnect?.();
};

interface ConnectorOptions<T> {
  name: string;
  enabled: boolean | undefined;
  initialValue: T;
}

export const useReduxConnector = <T>({
  name,
  enabled = __DEV__,
  initialValue,
}: ConnectorOptions<T>) => {
  const connectorRef = useRef<Connector>();
  const firstValue = useRef(initialValue);

  useEffect(() => {
    const extension = getReduxExtension(enabled);
    if (!extension) return;

    const cleanup = () => {
      connectorRef.current = undefined;
      removeConnection(name, extension);
    };

    if (connectorRef.current) return cleanup;

    const { connector, shouldInit } = getConnector(name, extension);
    if (shouldInit) connector.init(firstValue.current);
    connectorRef.current = connector;

    return cleanup;
  }, [enabled, name]);

  return connectorRef;
};
