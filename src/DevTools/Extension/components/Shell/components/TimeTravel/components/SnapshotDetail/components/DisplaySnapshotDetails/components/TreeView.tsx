import React, { ReactNode, useCallback } from 'react';
import { Code } from '@mantine/core';
import {
  ErrorSymbol,
  stringifyAtomValue,
} from '../.././../../../../../../../../utils/stringify-atom-value';
import {
  JSONTree,
  getItemStringWithDiffEnabled,
  useJSONTreeStyling,
} from '../../../../../../JSONTree';
import { STATES_EQUAL_SYMBOL, SelectedSnapshotDetail } from '../../../atoms';

type TreeViewProps = {
  diff: SelectedSnapshotDetail['diff'];
};

function stringifyAndShrink(val: any) {
  if (val === null) {
    return 'null';
  }

  const str = stringifyAtomValue(val);
  if (str === ErrorSymbol) {
    return 'UNABLE_TO_PARSE';
  }

  return str.length > 42 ? str.substring(0, 30) + '…' + str.slice(-10) : str;
}

// Copied from Redux DevTools
// Source: https://github.com/reduxjs/redux-devtools/blob/58a8135b085cd2b04a688c639ff62f782da14b8d/packages/redux-devtools-inspector-monitor/src/tabs/JSONDiff.tsx#L116
const valueRenderer = (
  valueAsString: unknown,
  value: unknown,
  styling: ReturnType<typeof useJSONTreeStyling>['styling'],
): ReactNode => {
  function renderSpan(name: string, body: string) {
    return (
      <span key={name} {...styling(['diff', name])}>
        {body}
      </span>
    );
  }

  if (Array.isArray(value)) {
    switch (value.length) {
      case 1:
        return renderSpan('diffAdd', stringifyAndShrink(value[0]));
      case 2:
        return (
          <>
            {renderSpan('diffUpdateFrom', stringifyAndShrink(value[0]))}
            {renderSpan('diffUpdateArrow', ' => ')}
            {renderSpan('diffUpdateTo', stringifyAndShrink(value[1]))}
          </>
        );
      case 3:
        return renderSpan('diffRemove', stringifyAndShrink(value[0]));
    }
  }

  return <>{valueAsString}</>;
};

// Copied by Redux DevTools
// Source: https://github.com/reduxjs/redux-devtools/blob/58a8135b085cd2b04a688c639ff62f782da14b8d/packages/redux-devtools-inspector-monitor/src/tabs/JSONDiff.tsx#L29-L47
const prepareDelta = (value: any) => {
  if (value && value._t === 'a') {
    const res: { [key: string]: any } = {};
    for (const key in value) {
      if (key !== '_t') {
        if (key[0] === '_' && !value[key.substring(1)]) {
          res[key.substring(1)] = value[key];
        } else if (value['_' + key]) {
          res[key] = [value['_' + key][0], value[key][0]];
        } else if (!value['_' + key] && key[0] !== '_') {
          res[key] = value[key];
        }
      }
    }
    return res;
  }

  return value;
};

export const TreeView = (props: TreeViewProps) => {
  const JSONTreeStyling = useJSONTreeStyling();
  const memoizedValueRenderer = useCallback(
    (valueAsString: unknown, value: unknown) =>
      valueRenderer(valueAsString, value, JSONTreeStyling.styling),
    [JSONTreeStyling.styling],
  );

  if (props.diff === STATES_EQUAL_SYMBOL) {
    return <Code>(states are equal)</Code>;
  }

  return (
    <JSONTree
      data={props.diff}
      valueRenderer={memoizedValueRenderer}
      postprocessValue={prepareDelta}
      getItemString={getItemStringWithDiffEnabled}
      isCustomNode={Array.isArray}
    />
  );
};
