import type { Meta, StoryObj } from '@storybook/svelte';
import IconGallery from './IconGallery.svelte';

const meta = {
  title: 'Components/IconGallery',
  component: IconGallery,
  // tags: ['autodocs'],
  argTypes: {
    name: {},
  },
} satisfies Meta<IconGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
