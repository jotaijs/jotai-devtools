import * as React from 'react';
import { AnyAtomValue } from 'src/types';
import { getTypeOfAtomValue } from '../../../../../../../../utils';
import {
  CodeSyntaxHighlighter,
  CodeSyntaxHighlighterProps,
} from '../../../../CodeSyntaxHighlighter';

// List of types to render in JavaScript syntax
const javaScriptLanguageTypes = [
  'object',
  'array',
  'null',
  'undefined',
  'function',
  'symbol',
];

export const getPrismLanguageType = (
  atomValue: AnyAtomValue,
): CodeSyntaxHighlighterProps['language'] => {
  const type = getTypeOfAtomValue(atomValue);

  if (javaScriptLanguageTypes.includes(type)) {
    return 'javascript';
  }

  return 'markdown';
};

type MemoizedValueRendererProps = {
  value: string;
  prismLanguageType: ReturnType<typeof getPrismLanguageType>;
};

export const MemoizedValueRenderer = React.memo(
  ({ prismLanguageType, value }: MemoizedValueRendererProps): JSX.Element => {
    return (
      <CodeSyntaxHighlighter
        language={prismLanguageType}
        mb={10}
        copyLabel="Copy value"
        data-testid="atom-parsed-value"
      >
        {value}
      </CodeSyntaxHighlighter>
    );
  },
);
