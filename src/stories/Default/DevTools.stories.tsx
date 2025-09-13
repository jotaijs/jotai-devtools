import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { DevTools, DevToolsProps } from '../../';
import { DemoApp } from './Demos/DemoApp';

export default {
  component: DevTools,
  title: 'Devtools',
} as Meta<typeof DevTools>;

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
    return <DemoApp {...props} />;
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
