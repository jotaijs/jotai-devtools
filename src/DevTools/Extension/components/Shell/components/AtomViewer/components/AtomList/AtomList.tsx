import {
  ChangeEventHandler,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { Box, Group, Sx, Text, TextInput } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';
import { useAtom, useAtomValue } from 'jotai/react';
import { useSyncSnapshotValuesToAtom } from '../../../../../../../hooks/useAtomsSnapshots';
import { useDevtoolsJotaiStoreOptions } from '../../../../../../../internal-jotai-store';
import {
  filteredValuesAtom,
  searchInputAtom,
  selectedAtomAtom,
} from '../../atoms';
import { AtomListItem } from './components/AtomListItem';

const textStyles: Sx = {
  position: 'sticky',
  top: 0,
};

const SearchAtoms = memo(() => {
  const [userInput, setUserInput] = useAtom(
    searchInputAtom,
    useDevtoolsJotaiStoreOptions(),
  );

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      target: { value },
    } = event;
    setUserInput(value);
  };

  return (
    <TextInput
      label="Search"
      placeholder="atom debug label"
      pt={5}
      pb={10}
      sx={textStyles}
      value={userInput}
      onChange={handleOnChange}
    />
  );
});

const atomItemsWrapperStyle = { overflow: 'auto' };

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

  const valuesRef = useRef(values);

  useEffect(() => {
    valuesRef.current = values;
  }, [values]);

  const handleOnClick = useCallback(
    (pos: number) => {
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

  const atomItems = useMemo(
    () =>
      values.map(([atom], i) => {
        return (
          <AtomListItem
            key={`atom-list-item-${atom.toString() + i}`}
            label={atom.debugLabel}
            onClick={handleOnClick}
            pos={i}
            isActive={selectedAtomData?.atomKey === atom.toString()}
            atomKey={atom.toString()}
          />
        );
      }),
    [values, selectedAtomData, handleOnClick],
  );

  const noResultsFound = !values.length;

  return (
    <>
      <SearchAtoms />
      <Box sx={atomItemsWrapperStyle}>{atomItems}</Box>
      {noResultsFound && (
        <Group mt={20} position="center">
          <IconAlertCircle size={16} />
          <Text fz="sm" ml={0}>
            No Atoms found!
          </Text>
        </Group>
      )}
    </>
  );
};
