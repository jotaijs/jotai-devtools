import * as React from 'react';
import { Box, Group, Text, TextInput } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useAtom, useAtomValue } from 'jotai/react';
import { useSyncSnapshotValuesToAtom } from '../../../../../../../hooks/useAtomsSnapshots';
import { useDevtoolsJotaiStoreOptions } from '../../../../../../../internal-jotai-store';
import { atomToPrintable } from '../../../../../../../utils';
import { ActionListItem } from '../../../ActionListItem';
import {
  filteredValuesAtom,
  searchInputAtom,
  selectedAtomAtom,
} from '../../atoms';
import classes from './AtomList.module.css';

const SearchAtoms = React.memo(() => {
  const [userInput, setUserInput] = useAtom(
    searchInputAtom,
    useDevtoolsJotaiStoreOptions(),
  );

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const {
      target: { value },
    } = event;
    setUserInput(value);
  };

  return (
    <TextInput
      label="Search"
      placeholder="atom debug label"
      pt={10}
      pb={10}
      className={classes.text}
      value={userInput}
      onChange={handleOnChange}
      id="jotai-devtools-atom-debug-search-input"
    />
  );
});

export const AtomList = () => {
  useSyncSnapshotValuesToAtom();

  const values = useAtomValue(
    filteredValuesAtom,
    useDevtoolsJotaiStoreOptions(),
  );
  const [selectedAtomData, setSelectedAtomAtom] = useAtom(
    selectedAtomAtom,
    useDevtoolsJotaiStoreOptions(),
  );

  const valuesRef = React.useRef(values);

  React.useEffect(() => {
    valuesRef.current = values;
  }, [values]);

  const handleOnClick = React.useCallback(
    (pos: string | number) => {
      if (typeof pos === 'string') {
        throw new Error('Invalid atom position, must be a number');
      }

      if (!valuesRef.current[pos]) {
        // This should almost never occur
        // Atom pos and valuesRef.current are out-of-sync if it occurs
        throw new Error(`Unable to find atom at ${pos} index`);
      }

      setSelectedAtomAtom((currValue) => {
        // TODO Should we find this by atom key instead?
        const foundAtom = valuesRef.current[pos]?.[0];

        if (!foundAtom || currValue?.atomKey === foundAtom?.toString()) {
          return undefined;
        }

        return { atomKey: foundAtom?.toString(), atom: foundAtom };
      });
    },
    [setSelectedAtomAtom],
  );

  const atomItems = React.useMemo(
    () =>
      values.map(([atom], i) => {
        const atomKey = atom.toString();
        return (
          <ActionListItem
            key={`atom-list-item-${atomKey + i}`}
            label={atomToPrintable(atom)}
            onClick={handleOnClick}
            id={i}
            isActive={selectedAtomData?.atomKey === atomKey}
          />
        );
      }),
    [values, selectedAtomData, handleOnClick],
  );

  const noResultsFound = !values.length;

  return (
    <>
      <SearchAtoms />
      <Box className={classes.atomItemsWrapper}>{atomItems}</Box>
      {noResultsFound && (
        <Group mt={20} justify="center">
          <IconAlertCircle size={16} />
          <Text fz="sm" ml={0} data-testid="atom-list-no-atoms-found-message">
            No Atoms found!
          </Text>
        </Group>
      )}
    </>
  );
};
