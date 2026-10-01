/**
 * Disclaimer: This code is copied from Redux DevTools
 * Source: https://github.com/reduxjs/redux-devtools/blob/ecec85b71a38407597fcec64e511e3833924a234/packages/redux-devtools-inspector-monitor/src/createDiffPatcher.ts
 */

import { DiffPatcher } from 'jsondiffpatch';
import type { Delta, DiffContext } from 'jsondiffpatch';
export type { Delta };

const defaultObjectHash = (obj: object, idx: number | undefined) => {
  const o = obj as Record<string, unknown>;
  return (
    (o === null && '$$null') ||
    (o && (o.id || o.id === 0) && `$$id:${JSON.stringify(o.id)}`) ||
    (o && (o._id || o._id === 0) && `$$_id:${JSON.stringify(o._id)}`) ||
    `$$index:${idx}`
  );
};

const defaultPropertyFilter = (name: string, context: DiffContext) =>
  typeof (context.left as Record<string, unknown>)[name] !== 'function' &&
  typeof (context.right as Record<string, unknown>)[name] !== 'function';

const defaultDiffPatcher = new DiffPatcher({
  arrays: { detectMove: false },
  objectHash: defaultObjectHash,
  propertyFilter: defaultPropertyFilter,
});

// TODO Make these configurable via props in the future
export function createDiffPatcher(
  objectHash?:
    | ((item: unknown, index: number | undefined) => string)
    | undefined,
  propertyFilter?:
    | ((name: string, context: DiffContext) => boolean)
    | undefined,
) {
  if (!objectHash && !propertyFilter) {
    return defaultDiffPatcher;
  }

  return new DiffPatcher({
    arrays: { detectMove: false },
    objectHash: objectHash || defaultObjectHash,
    propertyFilter: propertyFilter || defaultPropertyFilter,
  });
}
