export type ReduxExtension = NonNullable<
  typeof window.__REDUX_DEVTOOLS_EXTENSION__
> & {
  disconnect?: () => void;
};

/** Returns the global redux extension object if available
 *  https://github.com/reduxjs/redux-devtools/blob/main/extension/docs/API/Arguments.md
 */
export const getReduxExtension = (
  enabled = __DEV__,
): ReduxExtension | undefined => {
  if (!enabled) {
    return undefined;
  }

  const reduxExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
  if (!reduxExtension && __DEV__) {
    console.warn('Please install/enable Redux devtools extension');
    return undefined;
  }

  return reduxExtension;
};
