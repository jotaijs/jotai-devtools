import * as React from 'react';
import { CodeSyntaxHighlighter } from '../../../../CodeSyntaxHighlighter';

type MemoizedValueRendererProps = {
  value: string;
};

export const MemoizedValueRenderer = React.memo(
  ({ value }: MemoizedValueRendererProps): JSX.Element => {
    return (
      <CodeSyntaxHighlighter
        language="javascript"
        mb={10}
        copyLabel="Copy value"
        data-testid="atom-parsed-value"
      >
        {value}
      </CodeSyntaxHighlighter>
    );
  },
);
