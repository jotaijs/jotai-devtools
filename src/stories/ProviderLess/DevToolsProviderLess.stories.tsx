import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { DevTools, DevToolsProps } from '../../';
import { Counter } from './Counter';

export default {
  component: DevTools,
  title: 'DevtoolsProviderLess',
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

const Template: StoryFn<DevToolsProps> = (args) => (
  <>
    <DevTools {...args} />
    <Counter />
  </>
);

export const Default = Template.bind({});

Default.args = {
  isInitialOpen: true,
};
