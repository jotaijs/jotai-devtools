import React from 'react';
import { Stack } from '@mantine/core';
import { AnyAtom } from 'src/types';
import { getTypeOfAtomValue } from '../../../../../../../../utils/get-type-of-atom-value';
import { useInternalAtomValue } from '../../../hooks/useInternalAtomValue';
import { AtomDependentsList } from './AtomDependentsList';
import { AtomMetaDetails } from './AtomMetaDetails';
import { AtomParseRawValueValue } from './AtomParseRawValue';

type DisplayAtomDetailsProps = {
  atom: AnyAtom;
};

export const DisplayAtomDetails = ({ atom }: DisplayAtomDetailsProps) => {
  const atomValue = useInternalAtomValue(atom);
  const atomValueType = getTypeOfAtomValue(atomValue);

  return (
    <Stack h="auto">
      <AtomMetaDetails
        debugLabel={atom?.debugLabel}
        atomValueType={atomValueType}
        isAtomPrivate={atom?.debugPrivate}
      />

      <AtomParseRawValueValue atomValue={atomValue} />

      {/* FIXME: Bug in core jotai prevents us from subscribing deeply nested atoms properly*/}
      {/* {shouldDisplayDeepNestedValue && (
        <AtomParseDeepNestedValue atom={atom} atomValueType={atomValueType} />
      )} */}

      {/* TODO add dependencies list */}

      <AtomDependentsList atom={atom} />
    </Stack>
  );
};
