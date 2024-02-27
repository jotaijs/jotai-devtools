import * as React from 'react';
import { Box, Code, List, Text } from '@mantine/core';
import { AnyAtom } from 'src/types';
import { useAtomsSnapshots } from '../../../../../../../../hooks/useAtomsSnapshots';
import { atomToPrintable } from '../../../../../../../../utils/';

type AtomDependentsListProps = {
  atom: AnyAtom;
};

export const AtomDependentsList = ({
  atom,
}: AtomDependentsListProps): JSX.Element => {
  const { dependents } = useAtomsSnapshots();

  const depsForAtom = React.useMemo(() => {
    const arr = Array.from(dependents.get(atom) || []);
    const filteredCurrentAtom = arr.filter(
      (a) => a.toString() !== atom.toString(),
    );

    return filteredCurrentAtom;
  }, [dependents, atom]);

  const listOfDependents = React.useMemo(
    () =>
      depsForAtom.map((atom, i) => {
        const parsedDebugLabel = atomToPrintable(atom);
        return (
          <List.Item key={`${i}-${atom.toString()}-dependents-list`}>
            <Code data-testid={`dependents-list-item-${parsedDebugLabel}-${i}`}>
              {parsedDebugLabel}
            </Code>
          </List.Item>
        );
      }),
    [depsForAtom],
  );

  return (
    <Box>
      <Text component="div" fw="bold" mb={10} mt={20}>
        Dependents
      </Text>
      {listOfDependents.length ? (
        <List type="ordered" mb={10}>
          {listOfDependents}
        </List>
      ) : (
        <Text component="div" size="sm" mb={10}>
          No dependents
        </Text>
      )}
    </Box>
  );
};
