import type { Base16Theme } from 'base16';
import type { StylingConfig } from 'react-base16-styling';

export const getJsonTreeTheme = (base16Theme: Base16Theme): StylingConfig => {
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
    diff: {
      position: 'relative',
      padding: '2px 3px',
      borderRadius: '3px',
    },
    diffAdd: {
      backgroundColor: base16Theme.base06,
    },
    diffRemove: {
      textDecoration: 'line-through',
      backgroundColor: base16Theme.base07,
    },
    diffUpdateFrom: {
      textDecoration: 'line-through',
      backgroundColor: base16Theme.base07,
    },

    diffUpdateTo: {
      backgroundColor: base16Theme.base06,
    },

    diffUpdateArrow: {
      color: base16Theme.base03,
    },

    diffUpdate: () => {
      return {
        style: {
          backgroundColor: 'blue',
        },
      };
    },
    tree: ({ style }) => {
      return {
        style: {
          ...style,
          padding: '0.625rem',
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
