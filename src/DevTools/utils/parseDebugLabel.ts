import { unlabeledAtomLabel } from '../constants';

export const parseDebugLabel = (label?: string): string => {
  return label || unlabeledAtomLabel;
};
