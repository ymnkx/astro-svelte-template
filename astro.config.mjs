import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import d from './src/data/project.ts';
const { siteUrl, publicDir, baseUrl } = d;
import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';
import { webpConverter } from './plugins/webp-converter.ts';
import { svgSprite } from './plugins/svg-sprite.ts';

const assetsDir = '_assets';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base: baseUrl,
  trailingSlash: 'always',
  outDir: `./dist${baseUrl}`,
  publicDir: publicDir,
  integrations: [
    mdx(),
    svelte(),
    webpConverter({
      quality: 75,
    }),
  ],
  server: {
    host: true,
    port: 3000,
  },
  build: {
    assets: assetsDir,
    inlineStylesheets: 'never', // css外部ファイル化のため
  },
  vite: {
    plugins: [svgSprite()],
    resolve: {
      alias: {
        '@/image': fileURLToPath(new URL('./src/image', import.meta.url)),
        '@/icons': fileURLToPath(new URL('./src/icons', import.meta.url)),
      },
    },
    build: {
      assetsInlineLimit: 0,
      // js外部ファイル化のため
      rollupOptions: {
        output: {
          entryFileNames: () => `${assetsDir}/js/[name].[hash].js`,
          assetFileNames: (assetInfo) => {
            return assetInfo.names[0].endsWith('.css')
              ? `${assetsDir}/css/[name].[hash][extname]`
              : assetInfo.names[0].endsWith('.js')
                ? `${assetsDir}/js/[name].[hash][extname]`
                : `${assetsDir}/image/[name].[hash][extname]`;
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
