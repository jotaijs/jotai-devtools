import { MantineTheme, useMantineTheme } from '@mantine/core';
import type { Base16Theme } from 'base16';
import { getJsonTreeTheme } from './get-json-tree-theme';

/**
 *  Guide on what each color code means:
 *
 * base00 - Default Background
 * base01 - Lighter Background (Used for status bars, line number and folding marks)
 * base02 - Selection Background
 * base03 - Comments, Invisibles, Line Highlighting
 * base04 - Dark Foreground (Used for status bars)
 * base05 - Default Foreground, Caret, Delimiters, Operators
 * base06 - Light Foreground (Not often used)
 * base07 - Light Background (Not often used)
 * base08 - Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted
 * base09 - Integers, Boolean, Constants, XML Attributes, Markup Link Url
 * base0A - Classes, Markup Bold, Search Text Background
 * base0B - Strings, Inherited Class, Markup Code, Diff Inserted
 * base0C - Support, Regular Expressions, Escape Characters, Markup Quotes
 * base0D - Functions, Methods, Attribute IDs, Headings
 * base0E - Keywords, Storage, Selector, Markup Italic, Diff Changed
 * base0F - Deprecated, Opening/Closing Embedded Language Tags, e.g. <?php ?>
 */

const createJSONTreeTheme = (
  theme: MantineTheme,
): { light: Base16Theme; dark: Base16Theme } => {
  const light = {
    scheme: 'Jotai DevTools Light',
    author: 'Jotai DevTools',
    base00: theme.fn.rgba(theme.colors.gray[0], 0.65),
    base01: '#ffffff', // ?? unused
    base02: '#ffffff', // ?? unused
    base03: theme.colors.dark[2], // expanded string
    base04: '#ffffff', // ?? unused
    base05: '#ffffff', // ?? unused
    base06: '#ffffff', // ?? unused // reserved for diff add
    base07: '#ffffff', // ?? unused // reserved for diff remove
    base08: '#ffffff', // ?? unused
    base09: theme.colors.blue[8], // boolean, symbol, numbers, constants
    base0A: theme.colors.violet[9], // function
    base0B: theme.colors.teal[8], // string, date
    base0C: '#ffffff', // ?? unused
    base0D: theme.colors.gray[8], // label and arrow color
    base0E: '#ffffff', // ?? unused
    base0F: '#ffffff', // ?? unused
  };

  const dark = {
    scheme: 'Jotai DevTools Dark',
    author: 'Jotai DevTools',
    base00: theme.colors.dark[8],
    base01: '#ffffff', // ?? unused
    base02: '#ffffff', // ?? unused
    base03: theme.colors.dark[3], // expanded string
    base04: '#ffffff', // ?? unused
    base05: '#ffffff', // ?? unused
    base06: '#ffffff', // ?? unused // reserved for diff add
    base07: '#ffffff', // ?? unused // reserved for diff remove
    base08: '#ffffff', // ?? unused
    base09: theme.colors.blue[4], // boolean, symbol, numbers, constants
    base0A: theme.colors.violet[4], // function
    base0B: theme.colors.teal[4], // string, date
    base0C: '#ffffff', // ?? unused
    base0D: theme.colors.gray[4], // label and arrow color
    base0E: '#ffffff', // ?? unused
    base0F: '#ffffff', // ?? unused
  };

  return { light, dark };
};

export const useGetJSONTreeStyling = () => {
  const theme = useMantineTheme();
  const base16Theme = createJSONTreeTheme(theme)[theme.colorScheme];
  return getJsonTreeTheme(theme, base16Theme);
};
