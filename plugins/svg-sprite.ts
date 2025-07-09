import fs from 'node:fs';
import path from 'node:path';
import { globSync } from 'glob';
import SVGSpriter from 'svg-sprite';
import type { Plugin } from 'vite';

interface SVGSpriteOptions {
  srcDir?: string;
  destDir?: string;
  spriteName?: string;
}

export function svgSprite(options: SVGSpriteOptions = {}): Plugin {
  const { srcDir = 'src/icons/materials', destDir = 'src/icons', spriteName = 'icons' } = options;

  const config = {
    dest: destDir,
    mode: {
      symbol: {
        dest: '.',
        sprite: spriteName,
      },
    },
  };

  function generateSprite() {
    const spriter = new (SVGSpriter as any)(config);
    const svgImages = globSync(`${srcDir}/*.svg`);

    if (svgImages.length === 0) {
      console.log(`[svg-sprite] No SVG files found in ${srcDir}`);
      return;
    }

    svgImages.forEach((filePath) => {
      spriter.add(filePath, null, fs.readFileSync(filePath, 'utf-8'));
    });

    spriter.compile((error, result) => {
      if (error) {
        console.error('[svg-sprite] Error:', error);
        return;
      }

      for (const mode in result) {
        for (const resource in result[mode]) {
          const resourcePath = result[mode][resource].path;
          fs.mkdirSync(path.dirname(resourcePath), { recursive: true });
          fs.writeFileSync(resourcePath, result[mode][resource].contents);
          console.log(`[svg-sprite] Generated: ${resourcePath}`);
        }
      }
    });
  }

  return {
    name: 'svg-sprite',
    buildStart() {
      // ビルド開始時にスプライトを生成
      generateSprite();
    },
    configureServer(server) {
      // 開発サーバーでファイル監視
      const watcher = server.watcher;

      watcher.on('add', (filePath) => {
        if (filePath.includes(srcDir) && filePath.endsWith('.svg')) {
          console.log(`[svg-sprite] SVG added: ${filePath}`);
          generateSprite();
        }
      });

      watcher.on('change', (filePath) => {
        if (filePath.includes(srcDir) && filePath.endsWith('.svg')) {
          console.log(`[svg-sprite] SVG changed: ${filePath}`);
          generateSprite();
        }
      });

      watcher.on('unlink', (filePath) => {
        if (filePath.includes(srcDir) && filePath.endsWith('.svg')) {
          console.log(`[svg-sprite] SVG removed: ${filePath}`);
          generateSprite();
        }
      });
    },
  };
}
