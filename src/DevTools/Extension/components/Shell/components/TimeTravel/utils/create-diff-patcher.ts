/**
 * Disclaimer: This code is copied from Redux DevTools
 * Source: https://github.com/reduxjs/redux-devtools/blob/58a8135b085cd2b04a688c639ff62f782da14b8d/packages/redux-devtools-inspector-monitor/src/createDiffPatcher.ts
 */

import { Delta, DiffContext, DiffPatcher } from 'jsondiffpatch';
export type { Delta };

const defaultObjectHash = (o: Record<any, any>, idx: number) =>
  (o === null && '$$null') ||
  (o && (o.id || o.id === 0) && `$$id:${JSON.stringify(o.id)}`) ||
  (o && (o._id || o._id === 0) && `$$_id:${JSON.stringify(o._id)}`) ||
  `$$index:${idx}`;

const defaultPropertyFilter = (name: string, context: DiffContext) =>
  typeof context.left[name] !== 'function' &&
  typeof context.right[name] !== 'function';

const defaultDiffPatcher = new DiffPatcher({
  arrays: { detectMove: false } as {
    detectMove: boolean;
    includeValueOnMove: boolean;
  },
  objectHash: defaultObjectHash,
  propertyFilter: defaultPropertyFilter,
});

// TODO Make these configurable via props in the future
export function createDiffPatcher(
  objectHash?: ((item: unknown, index: number) => string) | undefined,
  propertyFilter?:
    | ((name: string, context: DiffContext) => boolean)
    | undefined,
) {
  if (!objectHash && !propertyFilter) {
    return defaultDiffPatcher;
  }

  return new DiffPatcher({
    arrays: { detectMove: false } as {
      detectMove: boolean;
      includeValueOnMove: boolean;
    },
    objectHash: objectHash || defaultObjectHash,
    propertyFilter: propertyFilter || defaultPropertyFilter,
  });
}
