import type { GetItemString } from 'react-json-tree';

export default function isIterable(obj: any) {
  return (
    obj !== null &&
    typeof obj === 'object' &&
    !Array.isArray(obj) &&
    typeof obj[window.Symbol.iterator] === 'function'
  );
}

function getShortTypeString(val: unknown) {
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
export const getItemString: GetItemString = (
  nodeType: string,
  data: any,
  previewContent = true,
) => {
  if (nodeType === 'Object') {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const keys = Object.keys(data as {});
    if (!previewContent) return keys.length ? '{…}' : '{}';

    const str = keys
      .slice(0, 3)
      .map((key) => `${key}: ${getShortTypeString(data[key]) as string}`)
      .concat(keys.length > 3 ? ['…'] : [])
      .join(', ');

    return `{ ${str} }`;
  }

  if (nodeType === 'Array') {
    if (!previewContent) return data.length ? '[…]' : '[]';

    const str = data
      .slice(0, 4)
      .map((val: any) => getShortTypeString(val))
      .concat(data.length > 3 ? ['…'] : [])
      .join(', ');

    return `[${str as string}]`;
  }

  return nodeType;
};
