import { InternalDevTools } from './DevTools';
export type { DevToolsProps } from './DevTools';

// This is a workaround to make DevTools tree-shakable in production builds
// This is due to a limitation in tsup where it does not support preserving signatures
// of exports or generating seperate chunks for exports
export const DevTools: typeof InternalDevTools = __DEV__
  ? InternalDevTools
  : () => null;

export * from './utils';
