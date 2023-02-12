import React, { act, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

    expect(document.body).toHaveStyle({
      paddingBottom: '370px',
    });

    expect(screen.getByTestId('jotai-devtools-shell')).toHaveStyle({
      height: '370px',
    });

    await act(async () => {
      const resizeBar = screen.getByTestId('shell-resize-bar');
      await fireEvent.mouseDown(resizeBar, { clientY: 500 });
      await fireEvent.mouseMove(resizeBar, { clientY: 400 });
      await fireEvent.mouseUp(resizeBar, { clientY: 400 });
    });

    expect(screen.getByTestId('jotai-devtools-shell')).toHaveStyle({
      height: '200px',
    });

    expect(document.body).toHaveStyle({
      paddingBottom: '200px',
    });
  });
});
