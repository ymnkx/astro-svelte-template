import type { Meta, StoryObj } from '@storybook/svelte';
import Button from './Button.svelte';
const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    primary: {
      control: { type: 'boolean' },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'full'],
    },
    as: {
      control: { type: 'select' },
      options: ['span', undefined],
    },
  },
} satisfies Meta<Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};

export const Full: Story = {
  args: {
    size: 'full',
    label: 'Button',
  },
};

export const Span: Story = {
  args: {
    label: 'Button',
    as: 'span',
  },
};
