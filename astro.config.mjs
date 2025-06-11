import { defineConfig } from 'astro/config';
import d from './src/data/project.ts';
const { siteUrl, publicDir, baseUrl } = d;
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
    build: {
      assetsInlineLimit: 0,
      // js外部ファイル化のため
      rollupOptions: {
        output: {
          entryFileNames: () => '_assets/js/[name].[hash].js',
          assetFileNames: (assetInfo) => {
            return assetInfo.names[0].endsWith('.css')
              ? '_assets/css/[name].[hash][extname]'
              : assetInfo.names[0].endsWith('.js')
                ? '_assets/js/[name].[hash][extname]'
                : '_assets/image/[name].[hash][extname]';
          },
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
