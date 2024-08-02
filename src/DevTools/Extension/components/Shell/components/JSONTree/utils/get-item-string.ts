import type { GetItemString } from 'react-json-tree';

export default function isIterable(obj: any) {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    !Array.isArray(obj) &&
    typeof obj[window.Symbol.iterator] === 'function'
  );
}

function getShortTypeString(val: unknown, isForDiff?: boolean) {
  if (isForDiff && Array.isArray(val)) {
    val = val[val.length === 2 ? 1 : 0];
  }

  if (isIterable(val)) {
    return '(…)';
  }

  if (Array.isArray(val)) {
    return val.length > 0 ? '[…]' : '[]';
  }

  if (val === null) {
    return 'null';
  }

  if (val === undefined) {
    return 'undef';
  }

  if (typeof val === 'object') {
    return Object.keys(val as Record<string, unknown>).length > 0
      ? '{…}'
      : '{}';
  }

  if (typeof val === 'function') {
    return 'fn';
  }

  if (typeof val === 'string') {
    return `"${val.substring(0, 10) + (val.length > 10 ? '…' : '')}"`;
  }

  if (typeof val === 'symbol') {
    return 'symbol';
  }

  return val;
}

// Inspired by Redux DevTools Inspector Monitor
// Source: https://github.com/reduxjs/redux-devtools/blob/main/packages/redux-devtools-inspector-monitor/src/tabs/getItemString.tsx
export const getItemStringWithDiff = (
  nodeType: string,
  data: any,
  isForDiff: boolean,
) => {
  // We could make this configurable in the future
  const previewContent = true;

  if (nodeType === 'Object') {
    const keys = Object.keys(data as object);
    if (!previewContent) return keys.length ? '{…}' : '{}';

    const str = keys
      .slice(0, 3)
      .map(
        (key) =>
          `${key}: ${getShortTypeString(data[key], isForDiff) as string}`,
      )
      .concat(keys.length > 3 ? ['…'] : [])
      .join(', ');

    return `{ ${str} }`;
  }

  if (nodeType === 'Array') {
    if (!previewContent) return data.length ? '[…]' : '[]';

    const str = data
      .slice(0, 4)
      .map((val: any) => getShortTypeString(val), isForDiff)
      .concat(data.length > 3 ? ['…'] : [])
      .join(', ');

    return `[${str as string}]`;
  }

  return nodeType;
};

export const getItemString: GetItemString = (nodeType: string, data: any) =>
  getItemStringWithDiff(nodeType, data, false);

export const getItemStringWithDiffEnabled: GetItemString = (
  nodeType: string,
  data: any,
) => getItemStringWithDiff(nodeType, data, true);
