import * as ResizeObserverModule from 'resize-observer-polyfill';

(global as any).ResizeObserver = ResizeObserverModule.default;

export default async () => {
  process.env.TZ = 'UTC';
};
