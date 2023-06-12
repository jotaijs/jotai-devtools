import { SnapshotHistory } from '../atoms';

export const findSnapshotById = (
  snapshots: SnapshotHistory[],
  id: SnapshotHistory['id'],
) => {
  return snapshots.find((snapshot) => snapshot.id === id);
};
