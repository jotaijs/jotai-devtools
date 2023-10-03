import { useEffect, useRef } from 'react';
import { useAtom } from 'jotai/react';
import type { Atom, WritableAtom } from 'jotai/vanilla';
import { useReduxConnection } from './redux-extension/useReduxConnection';
import { useDidMount } from './useDidMount';

type DevtoolOptions = Parameters<typeof useAtom>[1] & {
  name?: string;
  enabled?: boolean;
};

export function useAtomDevtools<Value, Result>(
  anAtom: WritableAtom<Value, [Value], Result> | Atom<Value>,
  options?: DevtoolOptions,
): void {
  const { enabled, name } = options || {};
  const didMount = useDidMount();

  const [value, setValue] = useAtom(anAtom, options);

  const lastValue = useRef(value);
  const isTimeTraveling = useRef(false);

  const atomName = name || anAtom.debugLabel || anAtom.toString();

  const connection = useReduxConnection({
    name: atomName,
    enabled,
    initialValue: value,
  });

  useEffect(() => {
    if (!connection.current) return;

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

    const unsubscribe = connection.current.subscribe((message) => {
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
        connection.current?.init(lastValue.current);
      } else if (
        message.type === 'DISPATCH' &&
        message.payload?.type === 'IMPORT_STATE'
      ) {
        const computedStates =
          message.payload.nextLiftedState?.computedStates || [];

        computedStates.forEach(({ state }: { state: Value }, index: number) => {
          if (index === 0) {
            connection.current?.init(state);
          } else {
            setValueIfWritable(state);
          }
        });
      }
    });

    return unsubscribe;
  }, [anAtom, connection, setValue]);

  useEffect(() => {
    if (!connection.current || !didMount) return;

    lastValue.current = value;
    if (isTimeTraveling.current) {
      isTimeTraveling.current = false;
    } else {
      connection.current.send(
        `${atomName} - ${new Date().toLocaleString()}` as any,
        value,
      );
    }
  }, [atomName, connection, didMount, value]);
}
