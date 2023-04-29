import { MantineTheme } from '@mantine/core';
import type { Base16Theme } from 'base16';
import type { StylingConfig } from 'react-base16-styling';

export const getJsonTreeTheme = (
  theme: MantineTheme,
  base16Theme: Base16Theme,
): StylingConfig => {
  const valueColorMap = {
    String: base16Theme.base0B,
    Date: base16Theme.base0B,
    Number: base16Theme.base09,
    BigInt: base16Theme.base09,
    Boolean: base16Theme.base09,
    Null: base16Theme.base09,
    Undefined: base16Theme.base09,
    Symbol: base16Theme.base09,
    Function: base16Theme.base0A,
  };
  return {
    extend: base16Theme,
    tree: ({ style }) => {
      return {
        style: {
          ...style,
          padding: theme.spacing.xs,
          margin: 0,
        },
      };
    },
    nestedNode: ({ style }, keyPath, nodeType, expanded) => ({
      style: {
        ...style,
      },
    }),
    nestedNodeItemString: ({ style }, keyPath, nodeType, expanded) => ({
      style: {
        ...style,
        cursor: 'pointer',
        color: base16Theme.base03,
        display: expanded ? 'none' : 'inline',
      },
    }),
    arrowSign: ({ style }) => ({
      style: {
        ...style,
        paddingLeft: '0.2em',
      },
    }),

    valueText: ({ style }, nodeType) => ({
      style: {
        ...style,
        color: valueColorMap[nodeType as keyof typeof valueColorMap],
      },
    }),
  };
};
