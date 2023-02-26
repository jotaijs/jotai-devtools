import { useEffect, useRef } from 'react';
import { useAtom } from 'jotai/react';
import type { Atom, WritableAtom } from 'jotai/vanilla';
import { Connector, createReduxConnector } from './createReduxConnector';
import { getReduxExtension } from './getReduxExtension';

type DevtoolOptions = Parameters<typeof useAtom>[1] & {
  name?: string;
  enabled?: boolean;
};

export function useAtomDevtools<Value, Result>(
  anAtom: WritableAtom<Value, [Value], Result> | Atom<Value>,
  options?: DevtoolOptions,
): void {
  const { enabled, name } = options || {};

  const [value, setValue] = useAtom(anAtom, options);

  const lastValue = useRef(value);
  const isTimeTraveling = useRef(false);
  const devtools = useRef<Connector>();

  const atomName = name || anAtom.debugLabel || anAtom.toString();

  useEffect(() => {
    const extension = getReduxExtension(enabled);
    devtools.current = createReduxConnector(extension, atomName);
  }, [atomName, enabled]);

  useEffect(() => {
    const connector = devtools.current;
    if (!connector) return;

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

    const unsubscribe = connector.subscribe((message) => {
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
        devtools.current?.init(lastValue.current);
      } else if (
        message.type === 'DISPATCH' &&
        message.payload?.type === 'IMPORT_STATE'
      ) {
        const computedStates =
          message.payload.nextLiftedState?.computedStates || [];

        computedStates.forEach(({ state }: { state: Value }, index: number) => {
          if (index === 0) {
            devtools.current?.init(state);
          } else {
            setValueIfWritable(state);
          }
        });
      }
    });

    return unsubscribe;
  }, [anAtom, setValue]);

  useEffect(() => {
    const connector = devtools.current;
    if (!connector) return;

    lastValue.current = value;
    if (connector.shouldInit) {
      connector.init(value);
      connector.shouldInit = false;
    } else if (isTimeTraveling.current) {
      isTimeTraveling.current = false;
    } else {
      connector.send(
        `${atomName} - ${new Date().toLocaleString()}` as any,
        value,
      );
    }
  }, [atomName, value]);
}
