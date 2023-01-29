// storing this as a constants to reuse it across the Shell
// This could be searched by user on the Atom viewer as well
export const unlabeledAtomLabel = '<unlabeled-atom>';

export const shellStyleDefaults = {
  minHeight: 200, // in px
  maxHeight: '90%',
  defaultHeight: 370, // in px
};

export enum TabKeys {
  AtomViewer = 'atom-viewer',
  TimeTravel = 'time-travel',
  AtomGraph = 'atom-graph',
}
