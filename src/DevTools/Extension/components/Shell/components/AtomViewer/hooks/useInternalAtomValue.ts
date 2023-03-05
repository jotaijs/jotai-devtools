import { useEffect, useReducer } from 'react';
import type { ReducerWithoutAction } from 'react';
import { useSetAtom, useStore } from 'jotai/react';
import type { Atom, ExtractAtomValue } from 'jotai/vanilla';
import {
  useDevtoolsJotaiStoreOptions,
  useInternalStore,
} from '../../../../../../../DevTools/internal-jotai-store';
import { selectedAtomAtom } from '../atoms';
import { useUserStore } from './../../../../../../hooks/useUserStore';
import { isPromise, use } from './use';

type Store = ReturnType<typeof useStore>;

type AtomSubscribeFunction = {
  (): void;
  isJotaiDevTools: true;
};

const isInternalAtomSubscribeFunction = (
  cb: AtomSubscribeFunction | (() => void),
) => (cb as AtomSubscribeFunction)?.isJotaiDevTools;
// We don't seem to need this right now
const delay = undefined;
export function useInternalAtomValue<Value>(atom: Atom<Value>): Awaited<Value>;

export function useInternalAtomValue<AtomType extends Atom<unknown>>(
  atom: AtomType,
): Awaited<ExtractAtomValue<AtomType>>;

export function useInternalAtomValue<Value>(atom: Atom<Value>) {
  const userStore = useUserStore();
  const internalStore = useInternalStore();
  const setSelectedAtomAtom = useSetAtom(
    selectedAtomAtom,
    useDevtoolsJotaiStoreOptions(),
  );

  const [[valueFromReducer, storeFromReducer, atomFromReducer], rerender] =
    useReducer<
      ReducerWithoutAction<readonly [Value, Store, typeof atom]>,
      undefined
    >(
      (prev) => {
        const nextValue = userStore.get(atom);
        if (
          Object.is(prev[0], nextValue) &&
          prev[1] === userStore &&
          prev[2] === atom
        ) {
          return prev;
        }
        return [nextValue, userStore, atom];
      },
      undefined,
      () => [userStore.get(atom), userStore, atom],
    );

  let value = valueFromReducer;
  if (storeFromReducer !== userStore || atomFromReducer !== atom) {
    rerender();
    value = userStore.get(atom);
  }

  useEffect(() => {
    if (!userStore.dev_subscribe_state) return;

    // FIXME replace this with `store.dev_subscribe_store` check after next minor Jotai 2.1.0?
    let devSubscribeStore = userStore.dev_subscribe_state;

    if (typeof userStore.dev_subscribe_store === 'function') {
      devSubscribeStore = userStore.dev_subscribe_store;
    }

    const atomSubCb = <AtomSubscribeFunction>(() => {
      if (typeof delay === 'number') {
        // delay rerendering to wait a promise possibly to resolve
        setTimeout(rerender, delay);
        return;
      }
      rerender();
    });

    atomSubCb.isJotaiDevTools = true;

    const devSubCb = (
      type?: Parameters<Parameters<typeof userStore.dev_subscribe_store>[0]>[0],
    ) => {
      if (type !== 'unsub') {
        return;
      }

      const activeValue = internalStore.get(selectedAtomAtom);
      if (activeValue) {
        const { l = [], t } =
          userStore.dev_get_mounted?.(activeValue.atom) || {};
        const listenersArray = Array.from(l);
        const areAllCallbacksInternal = listenersArray.every(
          isInternalAtomSubscribeFunction,
        );
        // If all the callbacks are internal, and there is only one listener, then we can assume that the atom is not being used anywhere else in user's app
        // and is safe to deselect
        if (areAllCallbacksInternal && t && t?.size <= 1) {
          return setSelectedAtomAtom(undefined);
        }
      }
    };
    const devUnsubscribeStore = devSubscribeStore?.(devSubCb);

    const unsub = userStore.sub(atom, atomSubCb);
    rerender();
    return () => {
      devUnsubscribeStore?.();
      unsub();
    };
  }, [userStore, setSelectedAtomAtom, internalStore, atom]);

  return isPromise(value) ? use(value) : (value as Awaited<Value>);
}
