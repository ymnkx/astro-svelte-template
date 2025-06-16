import '@/styles/base.scss';
import '@/styles/storybook.scss';

import type { Preview } from '@storybook/svelte';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
