import type { Plugin } from 'vite';
import sharp from 'sharp';
import path from 'path';

interface WebpConverterOptions {
  supportedFormats?: string[];
  quality?: number;
}

export const webpConverter = (options: WebpConverterOptions = {}): Plugin => {
  // デフォルト値を設定
  const { supportedFormats = ['.jpg', '.jpeg', '.png'], quality = 80 } = options;

  return {
    name: 'vite-plugin-webp-converter',
    apply: 'build',

    // generateBundleフックでWebP画像を生成
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
              const imageBuffer = Buffer.isBuffer(asset.source) ? asset.source : Buffer.from(asset.source as string);

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
  };
};
