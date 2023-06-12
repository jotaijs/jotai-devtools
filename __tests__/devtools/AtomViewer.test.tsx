import React, { useMemo } from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as stringifyModule from 'javascript-stringify';
import { useAtomValue } from 'jotai';
import { atom } from 'jotai/vanilla';
import { DevTools } from 'jotai-devtools';
import { AnyAtom } from 'src/types';
import { customRender } from '../custom-render';

const BasicAtomsWithDevTools = () => {
  // Create atoms inside the component so that they are recreated for each test
  const countAtom = useMemo(() => atom(0), []);
  countAtom.debugLabel = 'countAtom';
  const doubleAtom = useMemo(
    () => atom((get) => get(countAtom) * 2),
    [countAtom],
  );

  doubleAtom.debugLabel = 'doubleCountAtom';

  useAtomValue(countAtom);
  useAtomValue(doubleAtom);
  return <DevTools isInitialOpen={true} />;
};

describe('DevTools - AtomViewer', () => {
  describe('List of atoms', () => {
    it('should render atom viewer without any errors if there are no atoms', async () => {
      const { container } = customRender(<DevTools isInitialOpen={true} />);
      await waitFor(() =>
        expect(screen.getByText('👻 Jōtai DevTools')).toBeInTheDocument(),
      );
      expect(screen.getByText('Atom Viewer')).toBeInTheDocument();
      expect(
        screen.getByTestId('atom-list-no-atoms-found-message'),
      ).toHaveTextContent('No Atoms found!');
      expect(screen.getByLabelText('Search')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Select an atom from the left panel to view the details',
        ),
      ).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });

    it('should render atom viewer with correct atoms without provider', async () => {
      const { container } = customRender(<BasicAtomsWithDevTools />);
      expect(screen.getByText('countAtom')).toBeInTheDocument();
      // We did not add `debugLabel` to `doubleAtom` so it should be unlabeled
      expect(screen.getByText('doubleCountAtom')).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });

    describe('private atoms', () => {
      const PrivateAtomsWithDevTools = ({
        markAtomPrivate = true,
        shouldShowPrivateAtoms = false,
      }: {
        markAtomPrivate?: boolean;
        shouldShowPrivateAtoms?: boolean;
      }) => {
        // Create atoms inside the component so that they are recreated for each test
        const countAtom = useMemo(() => atom(0), []);
        countAtom.debugLabel = 'countAtom';

        const privateAtom = useMemo(
          () => atom((get) => get(countAtom) * 0),
          [countAtom],
        );
        privateAtom.debugLabel = 'privateAtom';
        privateAtom.debugPrivate = markAtomPrivate;

        const doubleAtom = useMemo(
          () => atom((get) => get(countAtom) * get(privateAtom)),
          [countAtom, privateAtom],
        );

        doubleAtom.debugLabel = 'doubleCountAtom';

        useAtomValue(countAtom);
        useAtomValue(doubleAtom);
        useAtomValue(privateAtom);

        return (
          <DevTools
            isInitialOpen={true}
            options={{
              shouldShowPrivateAtoms: shouldShowPrivateAtoms,
            }}
          />
        );
      };

      it('should not render private atoms', async () => {
        customRender(<PrivateAtomsWithDevTools />);
        expect(screen.queryByText('privateAtom')).not.toBeInTheDocument();
        expect(screen.getByText('countAtom')).toBeInTheDocument();
        expect(screen.getByText('doubleCountAtom')).toBeInTheDocument();
      });

      it('should render private atoms when shouldShowPrivateAtoms is marked as true', async () => {
        customRender(<PrivateAtomsWithDevTools shouldShowPrivateAtoms />);
        expect(screen.getByText('privateAtom')).toBeInTheDocument();
      });

      it('should hide private atoms from dependents list when shouldShowPrivateAtoms is marked as false', async () => {
        const { container } = customRender(<PrivateAtomsWithDevTools />);

        await act(async () => {
          await userEvent.click(screen.getByText('countAtom'));
        });

        expect(screen.getByText('Atom Details')).toBeInTheDocument();
        expect(screen.getByText('Meta')).toBeInTheDocument();
        expect(screen.getByText('Debug Label')).toBeInTheDocument();
        expect(
          screen.getByTestId('meta-info-value-countAtom'),
        ).toHaveTextContent('countAtom');
        expect(screen.getByText('Value type')).toBeInTheDocument();
        expect(screen.getByText('number')).toBeInTheDocument();
        expect(screen.queryByText('Private')).not.toBeInTheDocument();
        expect(screen.queryByText('Yes')).not.toBeInTheDocument();

        expect(screen.getByText('Raw value')).toBeInTheDocument();
        expect(screen.getByTestId('atom-parsed-value')).toHaveTextContent('0');

        expect(screen.getByText('Dependents')).toBeInTheDocument();
        expect(
          screen.queryByTestId('dependents-list-item-doubleCountAtom-0'),
        ).toBeInTheDocument();
        expect(
          screen.queryByTestId('dependents-list-item-privateAtom-0'),
        ).not.toBeInTheDocument();
        expect(container).toMatchSnapshot();
      });

      it('should mark private atoms in atom details', async () => {
        const { container } = customRender(
          <PrivateAtomsWithDevTools shouldShowPrivateAtoms />,
        );

        await act(async () => {
          await userEvent.click(screen.getByText('privateAtom'));
        });

        expect(screen.getByText('Atom Details')).toBeInTheDocument();
        expect(screen.getByText('Meta')).toBeInTheDocument();
        expect(screen.getByText('Debug Label')).toBeInTheDocument();
        expect(
          screen.getByTestId('meta-info-value-privateAtom'),
        ).toHaveTextContent('privateAtom');
        expect(screen.getByText('Value type')).toBeInTheDocument();
        expect(screen.getByText('number')).toBeInTheDocument();
        expect(screen.getByText('Private')).toBeInTheDocument();
        expect(screen.getByText('Yes')).toBeInTheDocument();

        expect(screen.getByText('Raw value')).toBeInTheDocument();
        expect(screen.getByTestId('atom-parsed-value')).toHaveTextContent('0');

        expect(screen.getByText('Dependents')).toBeInTheDocument();
        expect(
          screen.getByTestId('dependents-list-item-doubleCountAtom-0'),
        ).toBeInTheDocument();
        expect(container).toMatchSnapshot();
      });
    });

    describe('Search', () => {
      it('should search for atoms correctly', async () => {
        const { container } = customRender(<BasicAtomsWithDevTools />);

        await act(async () => {
          await userEvent.type(
            screen.getByLabelText('Search'),
            'doubleCountAtom',
          );
        });

        expect(
          screen.queryByTestId('atom-list-no-atoms-found-message'),
        ).not.toBeInTheDocument();
        expect(screen.queryByText('countAtom')).not.toBeInTheDocument();
        expect(screen.getByText('doubleCountAtom')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
      });

      it('should display an error if no atoms are found', async () => {
        const { container } = customRender(<BasicAtomsWithDevTools />);

        await act(async () => {
          await userEvent.type(screen.getByLabelText('Search'), 'abc 123');
        });
        expect(
          screen.getByTestId('atom-list-no-atoms-found-message'),
        ).toHaveTextContent('No Atoms found!');
        expect(screen.queryByText('countAtom')).not.toBeInTheDocument();
        expect(screen.queryByText('doubleCountAtom')).not.toBeInTheDocument();
        expect(container).toMatchSnapshot();
      });
    });

    describe('auto unmount', () => {
      it('should unselect the atom when an atom is unsubscribed', async () => {
        const BasicAtoms = () => {
          const countAtom = useMemo(() => atom(0), []);
          countAtom.debugLabel = 'countAtom';
          const doubleCountAtom = useMemo(
            () => atom((get) => get(countAtom) * 2),
            [countAtom],
          );
          doubleCountAtom.debugLabel = 'doubleCountAtom';
          useAtomValue(doubleCountAtom);

          return <div data-testid="basic-atoms"></div>;
        };

        const ToggleAbleAtomWithDevTools = () => {
          const [shouldShow, setShouldShow] = React.useState(true);

          const handleOntoggle = React.useCallback(() => {
            setShouldShow((s) => !s);
          }, [setShouldShow]);

          return (
            <>
              {shouldShow ? <BasicAtoms /> : null}
              <button onClick={handleOntoggle}>Toggle</button>
            </>
          );
        };

        const TestComponent = () => {
          return (
            <>
              <DevTools isInitialOpen={true} />
              <ToggleAbleAtomWithDevTools />
            </>
          );
        };

        customRender(<TestComponent />);
        await act(async () => {
          await userEvent.click(screen.getByText('doubleCountAtom'));
        });
        expect(
          screen.getByTestId('meta-info-value-doubleCountAtom'),
        ).toBeInTheDocument();

        await act(async () => {
          await userEvent.click(screen.getByText('Toggle'));
        });

        expect(screen.queryByText('Atom Details')).not.toBeInTheDocument();
        expect(
          screen.queryByText('meta-info-value-doubleCountAtom'),
        ).not.toBeInTheDocument();
        expect(
          screen.getByTestId('atom-list-no-atoms-found-message'),
        ).toHaveTextContent('No Atoms found!');
        expect(screen.getByLabelText('Search')).toBeInTheDocument();
        expect(
          screen.getByText(
            'Select an atom from the left panel to view the details',
          ),
        ).toBeInTheDocument();
      });
    });
  });

  describe('Atom details', () => {
    describe('Raw value', () => {
      it('should display an error when we are not able to parse the value', async () => {
        const stringifySpy = jest
          .spyOn(stringifyModule, 'stringify')
          .mockImplementation(() => {
            throw new Error('some-error');
          });

        const { container } = customRender(<BasicAtomsWithDevTools />);

        await act(async () => {
          await userEvent.click(screen.getByText('countAtom'));
        });

        expect(screen.getByText('Atom Details')).toBeInTheDocument();
        expect(screen.getByText('Meta')).toBeInTheDocument();
        expect(screen.getByText('Debug Label')).toBeInTheDocument();

        expect(screen.getByText('Raw value')).toBeInTheDocument();
        expect(
          screen.getByText('Failed to parse the value of the atom'),
        ).toBeInTheDocument();
        expect(screen.getByText('Dependents')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
        stringifySpy.mockRestore();
      });

      it('should display atom details when an atom is selected', async () => {
        const { container } = customRender(<BasicAtomsWithDevTools />);

        await act(async () => {
          await userEvent.click(screen.getByText('countAtom'));
        });

        expect(screen.getByText('Atom Details')).toBeInTheDocument();
        expect(screen.getByText('Meta')).toBeInTheDocument();
        expect(screen.getByText('Debug Label')).toBeInTheDocument();
        expect(
          screen.getByTestId('meta-info-value-countAtom'),
        ).toHaveTextContent('countAtom');
        expect(screen.getByText('Value type')).toBeInTheDocument();
        expect(screen.getByText('number')).toBeInTheDocument();

        expect(screen.getByText('Raw value')).toBeInTheDocument();
        expect(screen.getByTestId('atom-parsed-value')).toHaveTextContent('0');

        expect(screen.getByText('Dependents')).toBeInTheDocument();
        expect(
          screen.getByTestId('dependents-list-item-doubleCountAtom-0'),
        ).toBeInTheDocument();
        expect(container).toMatchSnapshot();
      });

      it('should display the dependents of the atom correctly', async () => {
        const { container } = render(<BasicAtomsWithDevTools />);

        await act(async () => {
          await userEvent.click(screen.getByText('doubleCountAtom'));
        });

        expect(screen.getByText('Atom Details')).toBeInTheDocument();

        expect(screen.getByText('Dependents')).toBeInTheDocument();
        expect(screen.getByText('No dependents')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
      });

      describe('Supports most primitive value types', () => {
        const AtomRenderer = ({ atom }: { atom: AnyAtom }) => {
          useAtomValue(atom);
          return <DevTools isInitialOpen={true} />;
        };

        const circObj: any = { circObj: null };
        circObj.circObj = circObj;

        it.each`
          type                 | value                    | expected
          ${'string'}          | ${'some-string'}         | ${'some-string'}
          ${'number'}          | ${123}                   | ${123}
          ${'boolean'}         | ${true}                  | ${true}
          ${'boolean'}         | ${false}                 | ${false}
          ${'null'}            | ${null}                  | ${'null'}
          ${'undefined'}       | ${undefined}             | ${'undefined'}
          ${'bigint'}          | ${BigInt(123)}           | ${'123'}
          ${'symbol'}          | ${Symbol('some-symbol')} | ${'Symbol(some-symbol)'}
          ${'function'}        | ${() => () => 'hello'}   | ${"()=>'hello'"}
          ${'object'}          | ${{ foo: 'bar' }}        | ${'{ foo: "bar"}'}
          ${'circular-object'} | ${circObj}               | ${'{}'}
          ${'array'}           | ${[1, 2, 3]}             | ${'[ 1, 2, 3]'}
        `(
          'should parse "$type" value correctly',
          async ({ value, expected }) => {
            const valueAtom = atom(value);
            valueAtom.debugLabel = 'valueAtom';

            customRender(<AtomRenderer atom={valueAtom} />);

            await act(async () => {
              await userEvent.click(screen.getByText('valueAtom'));
            });

            expect(screen.getByTestId('atom-parsed-value')).toHaveTextContent(
              expected,
            );
          },
        );
      });
    });
    describe('JSON value', () => {
      const localStorageSetItemSpy = jest.spyOn(
        window.localStorage.__proto__,
        'setItem',
      );

      const localStorageGetItemSpy = jest.spyOn(
        window.localStorage.__proto__,
        'getItem',
      );

      beforeAll(() => {
        localStorageSetItemSpy.mockImplementation(jest.fn());
        localStorageGetItemSpy.mockImplementation(jest.fn());
      });

      afterAll(() => {
        localStorageSetItemSpy.mockRestore();
        localStorageGetItemSpy.mockRestore();
      });

      it('should display both the options when object is compatible with JSON tree view and defaults to raw value', async () => {
        const ObjectAtomsWithDevTools = () => {
          // Create atoms inside the component so that they are recreated for each test
          const objectAtom = useMemo(() => atom({ x: 0, a: { b: 'c' } }), []);
          objectAtom.debugLabel = 'objectAtom';

          useAtomValue(objectAtom);
          return <DevTools isInitialOpen={true} />;
        };

        customRender(<ObjectAtomsWithDevTools />);

        await act(async () => {
          await userEvent.click(screen.getByText('objectAtom'));
        });

        expect(screen.getByText('Raw value')).toBeInTheDocument();
        expect(screen.getByText('Tree view')).toBeInTheDocument();
        expect(screen.getByTestId('atom-parsed-value')).toBeVisible();
        expect(screen.getByTestId('json-tree-panel')).not.toBeVisible();
      });
      it('should display JSON tree view when user selects from the tab header', async () => {
        const ObjectAtomsWithDevTools = () => {
          // Create atoms inside the component so that they are recreated for each test
          const objectAtom = useMemo(() => atom({ x: 0, a: { b: 'c' } }), []);
          objectAtom.debugLabel = 'objectAtom';

          useAtomValue(objectAtom);
          return <DevTools isInitialOpen={true} />;
        };
        customRender(<ObjectAtomsWithDevTools />);
        await act(async () => {
          await userEvent.click(screen.getByText('objectAtom'));
        });

        expect(screen.getByTestId('json-tree-panel')).not.toBeVisible();

        await act(async () => {
          await userEvent.click(screen.getByText('Tree view'));
        });

        expect(screen.getByTestId('json-tree-panel')).toBeVisible();
        expect(screen.getByTestId('json-tree-panel')).toMatchSnapshot();
        expect(
          screen.queryByTestId('atom-parsed-value'),
        ).not.toBeInTheDocument();

        expect(screen.getByTestId('json-tree-panel')).toHaveTextContent(
          `x:0▶a:{ b: "c" }`,
        );
      });

      it('should display JSON tree view with all the values expanded', async () => {
        const ObjectAtomsWithDevTools = () => {
          // Create atoms inside the component so that they are recreated for each test
          const objectAtom = useMemo(() => atom({ x: 0, a: { b: 'c' } }), []);
          objectAtom.debugLabel = 'objectAtom';

          useAtomValue(objectAtom);
          return (
            <DevTools
              isInitialOpen={true}
              options={{
                shouldExpandJsonTreeViewInitially: true,
              }}
            />
          );
        };

        customRender(<ObjectAtomsWithDevTools />);
        await act(async () => {
          await userEvent.click(screen.getByText('objectAtom'));
        });

        expect(screen.getByTestId('json-tree-panel')).not.toBeVisible();

        await act(async () => {
          await userEvent.click(screen.getByText('Tree view'));
        });

        expect(screen.getByTestId('json-tree-panel')).toMatchSnapshot();
        expect(screen.getByTestId('json-tree-panel')).toHaveTextContent(
          `x:0▶a:{ b: "c" }b:"c"`,
        );
      });
    });
  });
});
