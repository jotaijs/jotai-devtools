import { SnapshotHistory } from '../atoms';

export const filterSnapshotHistoryByString = (
  searchString: string,
  defaultSnapshots: SnapshotHistory[],
) => {
  const normalizedStr = searchString.trim().toLocaleLowerCase();
  if (!normalizedStr) {
    return defaultSnapshots;
  }

  return defaultSnapshots.filter(({ label }) => {
    const snapshotLabel = String(label);
    return snapshotLabel.includes(normalizedStr);
  });
};
