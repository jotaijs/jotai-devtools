import React, { useCallback } from 'react';
import { Box } from '@mantine/core';
import { JSONTree as ReactJSONTree, ValueRenderer } from 'react-json-tree';
import { useDevToolsOptionsValue } from '../../../../../atoms/devtools-options';
import { ErrorSymbol, stringifyAtomValue } from '../../../../../utils/';
import classes from './JSONTree.module.css';
import { getItemString } from './utils/get-item-string';
import { useJSONTreeStyling } from './utils/use-JSON-tree-styling';

export { getItemStringWithDiffEnabled } from './utils/get-item-string';
export { useJSONTreeStyling } from './utils/use-JSON-tree-styling';

const defaultValueRenderer: ValueRenderer = (_, value) => {
  const parsedValue = stringifyAtomValue(value);
  if (parsedValue === ErrorSymbol) {
    return 'Failed to parse the value';
  }
  return parsedValue;
};

export const JSONTree: typeof ReactJSONTree = (props) => {
  const JSONTreeStyling = useJSONTreeStyling();
  const { shouldExpandJsonTreeViewInitially } = useDevToolsOptionsValue();

  const memoizedShouldExpandNodeInitially = useCallback(
    () => !!shouldExpandJsonTreeViewInitially,
    [shouldExpandJsonTreeViewInitially],
  );

  return (
    <Box
      className={classes.monoSpaceFonts}
      data-testid="json-tree-view-container"
    >
      <ReactJSONTree
        hideRoot
        shouldExpandNodeInitially={memoizedShouldExpandNodeInitially}
        theme={JSONTreeStyling.theme}
        getItemString={getItemString}
        valueRenderer={defaultValueRenderer}
        {...props}
      />
    </Box>
  );
};
