import { ReduxExtension } from './getReduxExtension';
import { Message } from './types';

type ConnectResponse = ReturnType<NonNullable<ReduxExtension>['connect']>;
export type Connector = ConnectResponse & {
  // FIXME https://github.com/reduxjs/redux-devtools/issues/1097
  subscribe: (listener: (message: Message) => void) => (() => void) | undefined;
};

/** Wrapper for creating connections to the redux extension
 *  https://github.com/reduxjs/redux-devtools/blob/main/extension/docs/API/Methods.md#connectoptions
 **/
export const createReduxConnector = (
  extension: ReduxExtension,
  name: string,
) => {
  const connector = extension.connect({ name });
  return connector as Connector;
};
