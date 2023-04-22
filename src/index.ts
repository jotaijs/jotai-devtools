// export * from './DevTools'
import { InternalDevTools } from './DevTools';
export type { DevToolsProps } from './DevTools';

export const DevTools: typeof InternalDevTools = __DEV__
  ? InternalDevTools
  : () => null;

export * from './utils';
