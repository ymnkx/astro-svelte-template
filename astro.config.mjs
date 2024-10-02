import { defineConfig } from 'astro/config';
import imports from 'vituum/plugins/imports.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import d from './src/data/project.ts';
const { siteUrl, publicDir, baseUrl } = d;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base: baseUrl,
  trailingSlash: 'always',
  outDir: `./dist${baseUrl}`,
  publicDir: publicDir,
  integrations: [mdx(), svelte()],
  server: {
    host: true,
    port: 3000,
  },
  build: {
    assets: '_assets',
    inlineStylesheets: 'never', // css外部ファイル化のため
  },
  vite: {
    plugins: [
      imports({
        filenamePattern: {
          '+.css': [],
          '+.scss': 'src/styles',
          '+.js': [],
          '+.ts': 'src/scripts',
        },
      }),
    ],
    resolve: {
      alias: {
        '@/': `${path.resolve(__dirname, 'src')}/`,
        '@scss/': `${path.resolve(__dirname, 'src')}/styles/`,
      },
    },
    build: {
      assetsInlineLimit: 0,
      // js外部ファイル化のため
      rollupOptions: {
        output: {
          entryFileNames: () => '_assets/js/[name].[hash].js',
          assetFileNames: ({ name }) =>
            name.endsWith('.css')
              ? '_assets/css/[name].[hash][extname]'
              : name.endsWith('.js')
                ? '_assets/js/[name].[hash][extname]'
                : '_assets/image/[name].[hash][extname]',
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
});
