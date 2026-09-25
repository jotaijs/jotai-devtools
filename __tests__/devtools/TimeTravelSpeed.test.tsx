import React, { useMemo } from 'react';
import { act, fireEvent, screen } from '@testing-library/react';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { DevTools } from 'jotai-devtools';
import { customRender } from '../custom-render';

// Mantine's popover does not settle in jsdom after opening. Keep the Select
// onChange contract while testing our playback behavior with a native control.
jest.mock('@mantine/core', () => ({
  ...jest.requireActual('@mantine/core'),
  Select: ({ data, value, onChange, ...props }: any) => (
    <select
      data-testid={props['data-testid']}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {data.map((option: string) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  ),
}));

const BasicAtomsWithDevTools = () => {
  const countAtom = useMemo(() => atom(0), []);
  const count = useAtomValue(countAtom);
  const setCount = useSetAtom(countAtom);
  return (
    <div>
      <span data-testid="count-atom-value">{count}</span>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <DevTools isInitialOpen={true} />
    </div>
  );
};

beforeEach(() => window.localStorage.clear());
afterEach(() => jest.useRealTimers());

// The interval is the default 750ms divided by the selected speed.
it.each`
  speed      | interval
  ${'0.5x'}  | ${1500}
  ${'1x'}    | ${750}
  ${'1.5x'}  | ${500}
  ${'1.75x'} | ${428.5}
  ${'2x'}    | ${375}
`('plays snapshots at $speed ($interval ms)', ({ speed, interval }) => {
  customRender(<BasicAtomsWithDevTools />);

  fireEvent.click(screen.getByText('Time travel'));
  fireEvent.click(screen.getByLabelText('Record snapshot history'));
  fireEvent.click(screen.getByText('Increment'));
  fireEvent.click(screen.getByText('Increment'));

  const select = screen.getByTestId('jotai-devtools-playback-speed-dropdown');
  fireEvent.change(select, { target: { value: speed } });
  expect(select).toHaveValue(speed);

  jest.useFakeTimers();
  fireEvent.click(screen.getByTitle('Start time travel'));
  act(() => jest.advanceTimersByTime(interval));
  expect(screen.getByTestId('count-atom-value')).toHaveTextContent('1');
  act(() => jest.advanceTimersByTime(interval));
  expect(screen.getByTestId('count-atom-value')).toHaveTextContent('2');
});
