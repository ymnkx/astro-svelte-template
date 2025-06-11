import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputDir = path.join(__dirname, '../convert/input');
const outputDir = path.join(__dirname, '../convert/output');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Function to get all files in a directory, including subdirectories
const getAllFiles = (dirPath, arrayOfFiles) => {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });

  return arrayOfFiles;
};

const convert = () => {
  let files = getAllFiles(inputDir);

  // Filter out non-image files
  files = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png'].includes(ext);
  });

  files.forEach((file) => {
    const inputFilePath = file;

    const relativePath = path.relative(inputDir, path.dirname(file));
    const outputFilePath = path.join(outputDir, relativePath, `${path.parse(file).name}.webp`);

    // Ensure the output subdirectory exists
    if (!fs.existsSync(path.dirname(outputFilePath))) {
      fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });
    }

    // Convert image to webp format
    sharp(inputFilePath)
      .webp()
      .toFile(outputFilePath, (err, info) => {
        if (err) {
          console.error('Error converting image:', err);
        } else {
          console.log(`Converted ${file} to ${outputFilePath}`);
        }
      });
  });
};
convert();
