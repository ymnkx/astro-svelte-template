import type { Plugin } from 'vite';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

interface WebpConverterOptions {
  inputDir?: string;
  supportedFormats?: string[];
  quality?: number;
}

export const webpConverter = (options: WebpConverterOptions = {}): Plugin => {
  // デフォルト値を設定
  const { inputDir = './src/image', supportedFormats = ['.jpg', '.jpeg', '.png'], quality = 80 } = options;

  // Function to get all files in a directory, including subdirectories
  const getAllFiles = (dirPath: string, arrayOfFiles: string[] = []): string[] => {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      const fullPath = path.join(dirPath, file);
      if (fs.statSync(fullPath).isDirectory()) {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
      } else {
        arrayOfFiles.push(fullPath);
      }
    });

    return arrayOfFiles;
  };

  const convertImagesToWebp = async (): Promise<void> => {
    const inputDirPath = path.resolve(inputDir);

    // Check if input directory exists
    if (!fs.existsSync(inputDirPath)) {
      console.log('Input directory does not exist:', inputDirPath);
      return;
    }

    try {
      let files = getAllFiles(inputDirPath);

      // Filter out non-image files
      files = files.filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return supportedFormats.includes(ext);
      });

      if (files.length === 0) {
        console.log(`No ${supportedFormats.join('/')} images found in`, inputDirPath);
        return;
      }

      console.log(`Found ${files.length} images to convert to WebP`);

      // Convert images to webp format
      const promises = files.map((file) => {
        const inputFilePath = file;
        const outputFilePath = `${path.parse(file).dir}/${path.parse(file).name}.webp`;

        return sharp(inputFilePath)
          .webp({ quality })
          .toFile(outputFilePath)
          .then(() => {
            console.log(`✓ Converted ${path.relative(inputDirPath, inputFilePath)} to WebP`);
          })
          .catch((err) => {
            console.error(`✗ Error converting ${path.relative(inputDirPath, inputFilePath)}:`, err);
          });
      });

      await Promise.all(promises);
      console.log('WebP conversion completed');
    } catch (error) {
      console.error('Error during WebP conversion:', error);
    }
  };

  return {
    name: 'vite-plugin-webp-converter',
    apply: 'build',
    buildStart: async () => {
      console.log('Starting WebP conversion...');
      await convertImagesToWebp();
    },
    transform: async (code, id) => {
      if (id.endsWith('.astro') || id.endsWith('.svelte')) {
        // @/image/パス内の画像のみを対象とする
        const extensionPattern = supportedFormats.map((ext) => ext.replace('.', '').replace('jpeg', 'jpe?g')).join('|');
        const regex = new RegExp(`(@/image/[^"]*\\.(${extensionPattern}))`, 'g');
        const updatedCode = code.replace(regex, (match) => {
          return match.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        });
        return {
          code: updatedCode,
          map: null,
        };
      }
      return null;
    },
  };
};
