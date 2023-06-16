import React from 'react';
import { Stack, Title } from '@mantine/core';
import { AnyAtom } from 'src/types';
import {
  atomToPrintable,
  getTypeOfAtomValue,
} from '../../../../../../../../utils';
import { useInternalAtomValue } from '../../../hooks/useInternalAtomValue';
import { AtomDependentsList } from './AtomDependentsList';
import { AtomMetaDetails } from './AtomMetaDetails';
import { AtomValue } from './AtomValue';

type DisplayAtomDetailsProps = {
  atom: AnyAtom;
};

export const DisplayAtomDetails = ({ atom }: DisplayAtomDetailsProps) => {
  const atomValue = useInternalAtomValue(atom);
  const atomValueType = getTypeOfAtomValue(atomValue);

  return (
    <Stack h="auto">
      <Title size="h3">Atom Details</Title>
      <AtomMetaDetails
        debugLabel={atomToPrintable(atom)}
        atomValueType={atomValueType}
        isAtomPrivate={atom?.debugPrivate}
      />

      <AtomValue atomValue={atomValue} />

      {/* TODO add dependencies list */}

      <AtomDependentsList atom={atom} />
    </Stack>
  );
};
