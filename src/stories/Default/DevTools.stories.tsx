import { Meta, StoryObj } from '@storybook/react';
import { DevTools, DevToolsProps } from '../../DevTools';
import { DemoApp } from './Demos/DemoApp';

export default {
  component: DevTools,
  title: 'Devtools',
} as Meta<typeof DevTools>;

type CustomStorybookProps = DevToolsProps & {
  'options.atomValueParser': 'raw' | 'deep-nested';
};

type Story = StoryObj<CustomStorybookProps>;

export const Default: Story = {
  render: ({ ...args }) => {
    const nextOptions = {
      ...args.options,
      atomValueParser: args['options.atomValueParser'],
    };
    const props = {
      ...args,
      options: nextOptions,
    };
    return <DemoApp {...props} />;
  },
  args: {
    isInitialOpen: true,
    'options.atomValueParser': 'raw',
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
