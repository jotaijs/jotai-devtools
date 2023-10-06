import { useEffect, useMemo } from 'react';
import { useAtomsSnapshot as useJotaiAtomsSnapshot } from '../../utils';
import { useDevToolsOptionsValue } from '../atoms/devtools-options';
import { useSnapshotValues } from '../atoms/values-atom';
import { useUserStore } from './useUserStore';

type SnapshotOptions = Parameters<typeof useJotaiAtomsSnapshot>[0];

export const useAtomsSnapshots = () => {
  const { shouldShowPrivateAtoms } = useDevToolsOptionsValue();
  const store = useUserStore();
  const opts: SnapshotOptions = { store, shouldShowPrivateAtoms };

  const currentSnapshots = useJotaiAtomsSnapshot(opts);
  return currentSnapshots;
};

// We're doing this to to prevent creating multiple
// copies for values array and share it via DevtoolsJotaiStore
// The idea is for the entire Shell to share values atom
export const useSyncSnapshotValuesToAtom = () => {
  const currentSnapshots = useAtomsSnapshots();
  const [values, setValues] = useSnapshotValues();

  const valuesArr = useMemo(() => {
    const nextValues = Array.from(currentSnapshots.values);

    return nextValues;
  }, [currentSnapshots.values]);

  useEffect(() => {
    setValues(valuesArr);
  }, [setValues, valuesArr]);

  return values;
};
