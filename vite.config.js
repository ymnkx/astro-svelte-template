import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@/': `${__dirname}/src/`,
      '@scss/': `${__dirname}/src/styles/`,
    },
  },
});
