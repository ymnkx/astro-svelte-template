import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const targetDir = path.join(__dirname, '../dist');
const ngWords = [
  { word: 'NG_WORD1', message: 'Message for NG_WORD1' },
  { word: 'NG_WORD2', message: 'Message for NG_WORD2' },
  { word: '<body', message: '〇〇は××を使用してください！（テスト用）' },
];

function checkFiles(dir, callback) {
  let hasError = false;
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return callback(err);
    }

    let pending = files.length;
    if (!pending) return callback(null, hasError);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error getting stats of file: ${err}`);
          if (!--pending) callback(null, hasError);
          return;
        }

        if (stats.isDirectory()) {
          checkFiles(filePath, (err, subDirHasError) => {
            if (subDirHasError) hasError = true;
            if (!--pending) callback(null, hasError);
          });
        } else {
          fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
              console.error(`Error reading file: ${err}`);
              if (!--pending) callback(null, hasError);
              return;
            }

            ngWords.forEach((ngWord) => {
              if (data.includes(ngWord.word)) {
                if (!hasError) hasError = true;
                console.error(`Error: File ${filePath} contains the word "${ngWord.word}"`);
                console.log('\x1b[33m%s\x1b[0m', `Message: ${ngWord.message}`);
              }
            });

            if (!--pending) callback(null, hasError);
          });
        }
      });
    });
  });
}

checkFiles(targetDir, (err, hasError) => {
  if (err) {
    console.error('An error occurred:', err);
  } else if (!hasError) {
    console.log('\x1b[32m%s\x1b[0m', `No error found in ${targetDir}`);
  } else {
    console.log('\x1b[31m%s\x1b[0m', `Errors were found in ${targetDir}`);
  }
});
