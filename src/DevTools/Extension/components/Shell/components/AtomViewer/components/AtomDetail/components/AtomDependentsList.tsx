import * as React from 'react';
import { Box, Code, List, Text } from '@mantine/core';
import { AnyAtom } from 'src/types';
import { useDevToolsOptionsValue } from '../../../../../../../../atoms/devtools-options';
import { useAtomsSnapshots } from '../../../../../../../../hooks/useAtomsSnapshots';
import { atomToPrintable } from '../../../../../../../../utils/';

type AtomDependentsListProps = {
  atom: AnyAtom;
};

export const AtomDependentsList = ({
  atom,
}: AtomDependentsListProps): JSX.Element => {
  const { dependents } = useAtomsSnapshots();
  const devtoolsOptions = useDevToolsOptionsValue();

  const depsForAtom = React.useMemo(() => {
    const arr = Array.from(dependents.get(atom) || []);
    const filteredCurrentAtom = arr.filter(
      (a) => a.toString() !== atom.toString(),
    );

    if (!devtoolsOptions.shouldShowPrivateAtoms) {
      const filteredPrivateAtoms = filteredCurrentAtom.filter(
        (a) => !a?.debugPrivate,
      );
      return filteredPrivateAtoms;
    }

    return filteredCurrentAtom;
  }, [dependents, devtoolsOptions.shouldShowPrivateAtoms, atom]);

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
      <Text fw="bold" mb={10} mt={20}>
        Dependents
      </Text>
      {listOfDependents.length ? (
        <List type="ordered" mb={10}>
          {listOfDependents}
        </List>
      ) : (
        <Text size="sm" mb={10}>
          No dependents
        </Text>
      )}
    </Box>
  );
};
