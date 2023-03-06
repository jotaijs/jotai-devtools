import { useEffect, useMemo } from 'react';
import { Options } from 'src/types';
import { useAtomsSnapshot as useJotaiAtomsSnapshot } from '../../utils';
import { useSnapshotValues } from '../atoms/values-atom';
import { useUserStore } from './useUserStore';

export const useAtomsSnapshots = () => {
  const store = useUserStore();
  const opts: Options = { store };

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
