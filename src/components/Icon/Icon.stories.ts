import type { Meta, StoryObj } from '@storybook/svelte';
import Icon from './Icon.svelte';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  // tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'select' },
      options: ['check', 'chevron-right', 'x-mark', 'code-bracket', 'exclamation-circle'],
    },
  },
} satisfies Meta<Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: 'check',
  },
};
