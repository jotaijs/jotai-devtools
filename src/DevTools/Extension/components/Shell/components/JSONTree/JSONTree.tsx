import React, { useCallback } from 'react';
import { Box, Sx } from '@mantine/core';
import { JSONTree as ReactJSONTree, ValueRenderer } from 'react-json-tree';
import { useDevToolsOptionsValue } from '../../../../../atoms/devtools-options';
import { ErrorSymbol, stringifyAtomValue } from '../../../../../utils/';
import { getItemString } from './utils/get-item-string';
import { useJSONTreeStyling } from './utils/use-JSON-tree-styling';

export { getItemStringWithDiffEnabled } from './utils/get-item-string';
export { useJSONTreeStyling } from './utils/use-JSON-tree-styling';

const monoSpaceFonts: Sx = (theme) => ({
  fontFamily: theme.fontFamilyMonospace || 'JetBrains Mono',
  fontSize: '13px',
  'ul:first-of-type': {
    borderRadius: theme.radius.md,
  },
});

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
    <Box sx={monoSpaceFonts} data-testid="json-tree-view-container">
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
