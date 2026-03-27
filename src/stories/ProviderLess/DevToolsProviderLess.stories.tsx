import React from 'react';
import { Meta, StoryFn } from '@storybook/react-webpack5';
import { DevTools, DevToolsProps } from '../../';
import { Counter } from './Counter';

export default {
  component: DevTools,
  title: 'DevtoolsProviderLess',
  argTypes: {
    store: {
      control: false,
    },
    options: {
      control: false,
    },
  },
} as Meta<typeof DevTools>;

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
