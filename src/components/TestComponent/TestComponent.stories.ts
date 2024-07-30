import type { Meta, StoryObj } from '@storybook/svelte';
import Button from './TestComponent.svelte';

const meta = {
  title: 'Example/TestComponent',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
  },
} satisfies Meta<Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: 'Button',
  },
};
