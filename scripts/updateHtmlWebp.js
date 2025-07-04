import fs from 'fs/promises';
import path from 'path';

async function findHtmlFiles(dir) {
  const files = [];
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

async function updateHtmlWebpReferences() {
  console.log('Updating HTML files with WebP references...');

  const distDir = 'dist';

  try {
    // distディレクトリ内のすべてのHTMLファイルを探す
    const htmlFiles = await findHtmlFiles(distDir);
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
        console.log(`✓ Updated ${path.relative(distDir, htmlFile)}`);
      }
    }

    console.log(`\nHTML update completed: ${totalReplacements} image references updated`);
  } catch (error) {
    console.error('Error updating HTML files:', error);
    process.exit(1);
  }
}

// スクリプトを実行
updateHtmlWebpReferences();
