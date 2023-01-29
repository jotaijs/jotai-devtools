import { Meta, Story } from '@storybook/react';
import { DevTools, DevToolsProps } from '../DevTools';
import { DemoApp } from './Demos/DemoApp';

export default {
  component: DevTools,
  title: 'Devtools',
  argTypes: {
    store: {
      control: {
        type: false,
      },
    },
  },
} as Meta;

const Template: Story<DevToolsProps> = (args) => <DemoApp {...args} />;

export const Default = Template.bind({});

Default.args = {
  isInitialOpen: true,
};
