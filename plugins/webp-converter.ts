import type { Plugin } from 'vite';
import type { AstroIntegration } from 'astro';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

interface WebpConverterOptions {
  supportedFormats?: string[];
  quality?: number;
}

export const webpConverter = (options: WebpConverterOptions = {}): AstroIntegration => {
  // デフォルト値を設定
  const { supportedFormats = ['.jpg', '.jpeg', '.png'], quality = 80 } = options;

  return {
    name: 'webp-converter',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        // Viteプラグインとして画像変換機能を追加
        updateConfig({
          vite: {
            plugins: [
              {
                name: 'webp-converter',
                apply: 'build',
                generateBundle: async (options, bundle) => {
                  console.log('Starting WebP conversion for src images...');

                  let convertedCount = 0;
                  const filesToDelete: string[] = [];

                  // バンドル内のアセットを処理
                  for (const [fileName, asset] of Object.entries(bundle)) {
                    if (asset.type === 'asset') {
                      const ext = path.extname(fileName).toLowerCase();

                      // _assets/image/内の画像のみを対象（src/imageからビルドされた画像）
                      if (supportedFormats.includes(ext) && fileName.includes('_assets/image/')) {
                        const webpFileName = fileName.replace(/\.(jpg|jpeg|png)$/i, '.webp');

                        try {
                          // 画像データを取得
                          const imageBuffer = Buffer.isBuffer(asset.source)
                            ? asset.source
                            : Buffer.from(asset.source as string);

                          // WebPに変換
                          const webpBuffer = await sharp(imageBuffer).webp({ quality }).toBuffer();

                          // WebP版をバンドルに追加
                          bundle[webpFileName] = {
                            type: 'asset',
                            fileName: webpFileName,
                            source: webpBuffer,
                            needsCodeReference: false,
                            name: webpFileName,
                            names: [webpFileName],
                            originalFileName: fileName,
                            originalFileNames: [fileName],
                          };

                          // 削除対象として記録
                          filesToDelete.push(fileName);

                          convertedCount++;
                          console.log(`✓ Converted ${fileName} to WebP`);
                        } catch (err) {
                          console.error(`✗ Error converting ${fileName}:`, err);
                        }
                      }
                    }
                  }

                  // 元の画像ファイルをバンドルから削除
                  for (const fileName of filesToDelete) {
                    delete bundle[fileName];
                    console.log(`✗ Deleted original file: ${fileName}`);
                  }

                  console.log(
                    `WebP conversion completed: ${convertedCount} images converted, ${filesToDelete.length} original files deleted`,
                  );
                },
              } as Plugin,
            ],
          },
        });
      },
      'astro:build:done': async ({ dir }) => {
        console.log('Starting HTML image reference update...');

        const outputDir = dir.pathname;

        try {
          // HTMLファイルを再帰的に探す
          const htmlFiles = await findHtmlFiles(outputDir);
          console.log(`Found ${htmlFiles.length} HTML files to process`);

          let totalReplacements = 0;

          // 各HTMLファイルで画像参照を更新
          for (const htmlFile of htmlFiles) {
            let htmlContent = await fs.readFile(htmlFile, 'utf-8');
            let hasChanges = false;

            // _assets/image/内の画像パスを.webpに変換
            const imageRegex = /(\/_assets\/image\/[^"']*)\.(png|jpg|jpeg)(?=["'])/g;

            const updatedContent = htmlContent.replace(imageRegex, (match, basePath, ext) => {
              hasChanges = true;
              totalReplacements++;
              console.log(`  Replacing ${match} → ${basePath}.webp`);
              return `${basePath}.webp`;
            });

            if (hasChanges) {
              await fs.writeFile(htmlFile, updatedContent);
              console.log(`✓ Updated ${path.relative(outputDir, htmlFile)}`);
            }
          }

          console.log(`HTML update completed: ${totalReplacements} image references updated`);
        } catch (error) {
          console.error('Error updating HTML files:', error);
        }
      },
    },
  };
};

// HTMLファイルを再帰的に探す関数
async function findHtmlFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await findHtmlFiles(fullPath)));
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }

  return files;
}
