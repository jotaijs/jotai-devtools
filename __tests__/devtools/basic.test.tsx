import React, { useMemo } from 'react';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { atom, useAtom } from 'jotai';
import { DevTools } from 'jotai-devtools';
import { customRender } from '../custom-render';

describe('DevTools - basic', () => {
  it('should render the trigger button', () => {
    customRender(<DevTools />);
    expect(screen.getByTitle('Open Jotai Devtools')).toBeInTheDocument();
  });

  it('should open the devtools upon clicking the button', async () => {
    customRender(<DevTools />);
    const foundButton = screen.getByTitle('Open Jotai Devtools');
    userEvent.click(foundButton);

    await waitFor(() =>
      expect(screen.getByText('👻 Jōtai DevTools')).toBeInTheDocument(),
    );
    expect(screen.getByText('Atom Viewer')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Select an atom from the left panel to view the details',
      ),
    ).toBeInTheDocument();
  });

  it('should resize the devtools upon dragging the resize bar', async () => {
    customRender(<DevTools isInitialOpen={true} />);

    // Mantine automatically converts the values to `rem` so we test it in rem
    expect(screen.getByTestId('jotai-devtools-shell')).toHaveStyle({
      height: '23.125rem',
    });

    await act(async () => {
      const resizeBar = screen.getByTestId('shell-resize-bar');
      await fireEvent.mouseDown(resizeBar, { clientY: 500 });
      await fireEvent.mouseMove(resizeBar, { clientY: 400 });
      await fireEvent.mouseUp(resizeBar, { clientY: 400 });
    });

    expect(screen.getByTestId('jotai-devtools-shell')).toHaveStyle({
      height: '12.5rem',
    });
  });

  describe('Error boundary', () => {
    const ogConsoleError = console.error;

    beforeEach(() => {
      console.error = jest.fn();
    });

    afterEach(() => {
      console.error = ogConsoleError;
      jest.resetAllMocks();
      jest.restoreAllMocks();
    });

    const ComponentThatThrows = () => {
      const baseErrorAtom = useMemo(() => atom(0), []);

      const triggerErrorAtom = useMemo(
        () =>
          atom(
            (get) => {
              const val = get(baseErrorAtom);
              if (val >= 1) {
                const randomFn = function () {};
                randomFn.toString = () => {
                  throw new Error('Test Error');
                };
                return randomFn;
              }

              return val;
            },
            (get, set) => set(baseErrorAtom, (prev) => prev + 1),
          ),
        [baseErrorAtom],
      );

      triggerErrorAtom.debugLabel = 'triggerErrorAtom';

      const [, triggerError] = useAtom(triggerErrorAtom);
      return (
        <>
          <DevTools isInitialOpen={true} />
          <button onClick={triggerError}>trigger error</button>
        </>
      );
    };

    it('should display an error boundary with stack', async () => {
      const ogErrorSpy = jest.spyOn(global, 'Error');
      ogErrorSpy.mockImplementation((message) => {
        return {
          name: 'Error',
          message,
          stack: 'some-stack',
        } as Error;
      });
      const { container } = customRender(<ComponentThatThrows />);

      await act(async () => {
        await userEvent.click(screen.getByText('triggerErrorAtom'));
        await userEvent.click(screen.getByText('trigger error'));
      });

      expect(
        screen.getByTestId('jotai-devtools-error-boundary'),
      ).toBeInTheDocument();

      expect(
        screen.getByTestId('jotai-devtools-error-boundary'),
      ).toHaveTextContent('some-stack');

      expect(container).toMatchSnapshot();
    });

    it('should display an error boundary with message if stack is not present', async () => {
      const ogErrorSpy = jest.spyOn(global, 'Error');
      ogErrorSpy.mockImplementation((message) => {
        return {
          name: 'Error',
          message,
        } as Error;
      });
      const { container } = customRender(<ComponentThatThrows />);

      await act(async () => {
        await userEvent.click(screen.getByText('triggerErrorAtom'));
        await userEvent.click(screen.getByText('trigger error'));
      });

      expect(
        screen.getByTestId('jotai-devtools-error-boundary'),
      ).toBeInTheDocument();

      expect(
        screen.getByTestId('jotai-devtools-error-boundary'),
      ).toHaveTextContent('Test Error');

      expect(container).toMatchSnapshot();
    });
  });
});
