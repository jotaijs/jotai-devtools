import React from 'react';
import { MantineProvider } from '@mantine/core';
import { Meta, StoryObj } from '@storybook/react';
import { DevTools, DevToolsProps } from '../../../DevTools';
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
  'options.atomValueParser': 'raw' | 'deep-nested';
  'options.shouldShowPrivateAtoms': boolean;
};

type Story = StoryObj<CustomStorybookProps>;

export const Default: Story = {
  render: ({ ...args }) => {
    const nextOptions = {
      ...args.options,
      atomValueParser: args['options.atomValueParser'],
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
    'options.atomValueParser': 'raw',
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
    'options.atomValueParser': {
      label: 'Atom Value Parser',
      options: ['raw', 'deep-nested'],
      control: {
        type: 'radio',
      },
    },
  },
};
