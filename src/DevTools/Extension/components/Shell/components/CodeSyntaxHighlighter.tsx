import * as React from 'react';
import { CodeHighlight, CodeHighlightProps } from '@mantine/code-highlight';
import clsx from 'clsx';
import styles from './CodeSyntaxHighlighter.module.css';

export type CodeSyntaxHighlighterProps = Omit<CodeHighlightProps, 'code'> & {
  children: CodeHighlightProps['code'];
};

export const CodeSyntaxHighlighter = ({
  children,
  ...rest
}: React.PropsWithChildren<CodeSyntaxHighlighterProps>) => {
  return (
    <CodeHighlight
      {...rest}
      code={children}
      className={clsx(
        styles['jotai-devtools-code-syntax-highlighter'],
        rest.className,
      )}
    />
  );
};
