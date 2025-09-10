import React from 'react';
import { MantineProvider } from '@mantine/core';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { Provider } from 'jotai/react';
import { DevTools, DevToolsProps, useAtomsDevtools } from '../../../';
import { Playground } from './Playground';

export default {
  component: DevTools,
  title: 'DevtoolsPlayground',
  argTypes: {
    store: {
      control: {
        type: false,
      },
    },
    options: {
      control: {
        type: false,
      },
    },
  },
} as Meta;

type CustomStorybookProps = DevToolsProps & {
  'options.shouldShowPrivateAtoms': boolean;
  'options.snapshotHistoryLimit': number;
  'options.shouldExpandJsonTreeViewInitially': boolean;
};

type Story = StoryObj<CustomStorybookProps>;

const ReduxDevTools = () => {
  useAtomsDevtools('playground');

  return null;
};

export const Default: Story = {
  render: ({ ...args }) => {
    const nextOptions = {
      ...args.options,
      shouldShowPrivateAtoms: args['options.shouldShowPrivateAtoms'],
      snapshotHistoryLimit: args['options.snapshotHistoryLimit'],
      shouldExpandJsonTreeViewInitially:
        args['options.shouldExpandJsonTreeViewInitially'],
    };
    const props = {
      ...args,
      options: nextOptions,
    };
    return (
      <MantineProvider
        theme={{
          primaryColor: 'blue',
          cursorType: 'pointer',
        }}
      >
        <DevTools {...props} />
        <ReduxDevTools />
        <Playground />
      </MantineProvider>
    );
  },
  args: {
    isInitialOpen: true,
    'options.shouldShowPrivateAtoms': false,
    'options.snapshotHistoryLimit': Infinity,
    'options.shouldExpandJsonTreeViewInitially': false,
  },
  argTypes: {
    store: {
      control: {
        type: false,
      },
    },
    options: {
      control: {
        type: false,
      },
    },
  },
};
