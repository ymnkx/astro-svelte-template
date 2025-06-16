import type { Meta, StoryObj } from '@storybook/svelte';
import Accordion from './Accordion.svelte';
const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
} satisfies Meta<Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
