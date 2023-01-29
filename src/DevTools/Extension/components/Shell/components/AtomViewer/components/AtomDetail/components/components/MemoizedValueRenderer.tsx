import { memo } from 'react';
import { Code } from '@mantine/core';
import { Prism, PrismProps } from '@mantine/prism';
import { AnyAtomValue } from 'src/types';
import { getTypeOfAtomValue } from '../../../../../../../../../utils';

// List of types to render in JavaScript syntax
const javaScriptLanguageTypes = ['object', 'array', 'null'];

export const getPrismLanguageType = (
  atomValue: AnyAtomValue,
): PrismProps['language'] | 'text' => {
  const type = getTypeOfAtomValue(atomValue);

  if (javaScriptLanguageTypes.includes(type)) {
    return 'javascript';
  }

  return 'text';
};

type MemoizedValueRendererProps = {
  value: string;
  prismLanguageType: ReturnType<typeof getPrismLanguageType>;
};

export const MemoizedValueRenderer = memo(
  ({ prismLanguageType, value }: MemoizedValueRendererProps): JSX.Element => {
    if (prismLanguageType === 'text') {
      return <Code block>{value}</Code>;
    }

    return (
      <Prism language={prismLanguageType} mb={10} noCopy>
        {value}
      </Prism>
    );
  },
);
