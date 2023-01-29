import { useMemo } from 'react';
import { Box, Code, List, Text } from '@mantine/core';
import { AnyAtom } from 'src/types';
import { useAtomsSnapshots } from '../../../../../../../../../hooks/useAtomsSnapshots';
import { parseDebugLabel } from '../../../../../../../../../utils/parseDebugLabel';

type AtomDependentsListProps = {
  atom: AnyAtom;
};

export const AtomDependentsList = ({
  atom,
}: AtomDependentsListProps): JSX.Element => {
  const { dependents } = useAtomsSnapshots();

  const depsForAtom = useMemo(() => {
    const arr = Array.from(dependents.get(atom) || []);
    return arr.filter((a) => a.toString() !== atom.toString());
  }, [dependents, atom]);

  const listOfDependents = useMemo(
    () =>
      depsForAtom.map((value, i) => {
        const key = `${i}-${value.toString()}-dependents-list`;
        return (
          <List.Item key={key}>
            <Code>{parseDebugLabel(value?.debugLabel)}</Code>
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
