import * as React from 'react';
import { CodeHighlight, CodeHighlightProps } from '@mantine/code-highlight';

export type CodeSyntaxHighlighterProps = CodeHighlightProps;

export const CodeSyntaxHighlighter = ({
  children,
  ...rest
}: React.PropsWithChildren<CodeSyntaxHighlighterProps>) => {
  return <CodeHighlight {...rest}>{children}</CodeHighlight>;
};
