import type { AtomsDependents, AtomsSnapshot, AtomsValues } from '../../types';

export const isEqualAtomsValues = (left: AtomsValues, right: AtomsValues) =>
  left.size === right.size &&
  Array.from(left).every(([left, value]) => Object.is(right.get(left), value));

export const isEqualAtomsDependents = (
  left: AtomsDependents,
  right: AtomsDependents,
) =>
  left.size === right.size &&
  Array.from(left).every(([atom, leftDependents]) => {
    const rightDependents = right.get(atom);
    return (
      rightDependents &&
      leftDependents.size === rightDependents.size &&
      Array.from(leftDependents).every((dependent) =>
        rightDependents.has(dependent),
      )
    );
  });

export const isEqualAtomsSnapshot = (
  left: AtomsSnapshot,
  right: AtomsSnapshot,
) =>
  isEqualAtomsValues(left.values, right.values) &&
  isEqualAtomsDependents(left.dependents, right.dependents);
