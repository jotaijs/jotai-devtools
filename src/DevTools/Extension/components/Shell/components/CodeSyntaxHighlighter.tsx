import * as React from 'react';
import { Prism, PrismProps } from '@mantine/prism';

// Omit "getPrismTheme" prop because we'll apply a custom component-wide theme here
export type CodeSyntaxHighlighterProps = Omit<PrismProps, 'getPrismTheme'>;

export const CodeSyntaxHighlighter = ({
  children,
  ...rest
}: React.PropsWithChildren<CodeSyntaxHighlighterProps>) => {
  return <Prism {...rest}>{children}</Prism>;
};
