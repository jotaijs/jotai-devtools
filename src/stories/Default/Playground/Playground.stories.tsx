import React from 'react';
import { MantineProvider } from '@mantine/core';
import { Meta, StoryObj } from '@storybook/react';
import { DevTools, DevToolsProps } from '../../../';
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
};

type Story = StoryObj<CustomStorybookProps>;

export const Default: Story = {
  render: ({ ...args }) => {
    const nextOptions = {
      ...args.options,
      shouldShowPrivateAtoms: args['options.shouldShowPrivateAtoms'],
    };
    const props = {
      ...args,
      options: nextOptions,
    };
    return (
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{
          primaryColor: 'dark',
          cursorType: 'pointer',
        }}
      >
        <DevTools {...props} />
        <Playground />
      </MantineProvider>
    );
  },
  args: {
    isInitialOpen: true,
    'options.shouldShowPrivateAtoms': false,
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
