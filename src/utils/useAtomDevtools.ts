import { useEffect, useRef } from 'react';
import { useAtom } from 'jotai/react';
import { Atom, WritableAtom } from 'jotai/vanilla';
import { useReduxConnector } from './redux-extension';
import { useDidMount } from './useDidMount';

type DevtoolOptions = Parameters<typeof useAtom>[1] & {
  name?: string;
  enabled?: boolean;
};

export function useAtomDevtools<Value, Result>(
  anAtom: WritableAtom<Value, [Value], Result> | Atom<Value>,
  options?: DevtoolOptions,
): void {
  const didMount = useDidMount();
  const { enabled, name } = options || {};

  const [value, setValue] = useAtom(anAtom, options);

  const lastValue = useRef(value);
  const isTimeTraveling = useRef(false);

  const atomName = name || anAtom.debugLabel || anAtom.toString();

  const connector = useReduxConnector({
    name: atomName,
    enabled,
    initialValue: value,
  });

  const subscriptionCleanup = useRef<() => void>();
  useEffect(() => {
    // Only subscribe once.
    // If there is an existing subscription, we don't want to create a second one.
    if (subscriptionCleanup.current) return subscriptionCleanup.current;

    if (!connector.current) return;

    const setValueIfWritable = (value: Value) => {
      if (typeof setValue === 'function') {
        (setValue as (value: Value) => void)(value);
        return;
      }
      console.warn(
        '[Warn] you cannot do write operations (Time-travelling, etc) in read-only atoms\n',
        anAtom,
      );
    };

    subscriptionCleanup.current = connector.current.subscribe((message) => {
      if (message.type === 'ACTION' && message.payload) {
        try {
          setValueIfWritable(JSON.parse(message.payload));
        } catch (e) {
          console.error(
            'please dispatch a serializable value that JSON.parse() support\n',
            e,
          );
        }
      } else if (message.type === 'DISPATCH' && message.state) {
        if (
          message.payload?.type === 'JUMP_TO_ACTION' ||
          message.payload?.type === 'JUMP_TO_STATE'
        ) {
          isTimeTraveling.current = true;

          setValueIfWritable(JSON.parse(message.state));
        }
      } else if (
        message.type === 'DISPATCH' &&
        message.payload?.type === 'COMMIT'
      ) {
        connector.current?.init(lastValue.current);
      } else if (
        message.type === 'DISPATCH' &&
        message.payload?.type === 'IMPORT_STATE'
      ) {
        const computedStates =
          message.payload.nextLiftedState?.computedStates || [];

        computedStates.forEach(({ state }: { state: Value }, index: number) => {
          if (index === 0) {
            connector.current?.init(state);
          } else {
            setValueIfWritable(state);
          }
        });
      }
    });

    return subscriptionCleanup.current;
  }, [anAtom, connector, setValue]);

  useEffect(() => {
    const connection = connector.current;
    if (!connection || !didMount) return;

    lastValue.current = value;
    if (isTimeTraveling.current) {
      isTimeTraveling.current = false;
    } else {
      connection.send(
        `${atomName} - ${new Date().toLocaleString()}` as any,
        value,
      );
    }
  }, [atomName, connector, didMount, value]);
}
