import { memo } from 'react';
import { Prism, PrismProps } from '@mantine/prism';
import { AnyAtomValue } from 'src/types';
import { getTypeOfAtomValue } from '../../../../../../../../../utils';

// List of types to render in JavaScript syntax
const javaScriptLanguageTypes = ['object', 'array', 'null'];

export const getPrismLanguageType = (
  atomValue: AnyAtomValue,
): PrismProps['language'] => {
  const type = getTypeOfAtomValue(atomValue);

  if (javaScriptLanguageTypes.includes(type)) {
    return 'javascript';
  }

  return 'git';
};

type MemoizedValueRendererProps = {
  value: string;
  prismLanguageType: ReturnType<typeof getPrismLanguageType>;
};

export const MemoizedValueRenderer = memo(
  ({ prismLanguageType, value }: MemoizedValueRendererProps): JSX.Element => {
    return (
      <Prism language={prismLanguageType} mb={10} copyLabel="Copy value">
        {value}
      </Prism>
    );
  },
);
