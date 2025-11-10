import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import tree from 'tree-node-cli';
import { input, confirm, select } from '@inquirer/prompts';

/**
 * 2つのコミット間の差分ファイルを抽出
 * @param {string} fromCommit - 比較元コミット(古い方)
 * @param {string} toCommit - 比較先コミット(新しい方)
 * @param {string} outputDir - 出力先ディレクトリ
 */
function extractDiffFiles(fromCommit, toCommit, outputDir) {
  try {
    // 差分があるファイルのリストを取得
    const diffFiles = execSync(`git diff --name-only ${fromCommit} ${toCommit}`, { encoding: 'utf-8' })
      .trim()
      .split('\n')
      .filter((file) => file.length > 0);

    console.log(`差分ファイル数: ${diffFiles.length}件`);
    console.log('---');

    // 出力ディレクトリを作成
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const copiedFiles = [];
    const deletedFiles = [];

    diffFiles.forEach((file) => {
      const srcPath = path.resolve(file);
      const destPath = path.join(outputDir, file);
      const destDir = path.dirname(destPath);

      // ファイルが存在する場合(削除されていない場合)
      if (fs.existsSync(srcPath)) {
        // 出力先ディレクトリを作成
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }

        // ファイルをコピー
        fs.copyFileSync(srcPath, destPath);
        copiedFiles.push(file);
        console.log(`✓ ${file}`);
      } else {
        deletedFiles.push(file);
        console.log(`✗ ${file} (削除されたファイル)`);
      }
    });

    console.log('---');
    console.log(`コピー完了: ${copiedFiles.length}件`);
    if (deletedFiles.length > 0) {
      console.log(`削除済み: ${deletedFiles.length}件`);
    }

    // tree-node-cliを使ってディレクトリツリーを生成
    const treeString = tree(outputDir, {
      allFiles: true,
      maxDepth: 10,
    });

    // ファイルリストを出力
    const filelistPath = path.join(outputDir, 'filelist.md');
    const filelistContent = `# 差分ファイル一覧

## コミット情報
- From: \`${fromCommit}\`
- To: \`${toCommit}\`
- 生成日時: ${new Date().toLocaleString('ja-JP')}

## ディレクトリツリー

\`\`\`
${treeString}
\`\`\`

## 変更されたファイル (${copiedFiles.length}件)

${copiedFiles.map((file) => `- ${file}`).join('\n')}

${
  deletedFiles.length > 0
    ? `## 削除されたファイル (${deletedFiles.length}件)

${deletedFiles.map((file) => `- ${file}`).join('\n')}`
    : ''
}
`;

    fs.writeFileSync(filelistPath, filelistContent);
    console.log(`\nファイルリストを出力: ${filelistPath}`);
  } catch (error) {
    console.error('エラーが発生しました:', error.message);
    process.exit(1);
  }
}

/**
 * コミット履歴を取得してオプション形式に変換
 */
function getCommitOptions() {
  try {
    const recentCommits = execSync('git log --oneline -15', { encoding: 'utf-8' })
      .trim()
      .split('\n')
      .filter((line) => line.length > 0);

    const options = recentCommits.map((commit) => {
      const [hash, ...messageParts] = commit.split(' ');
      const message = messageParts.join(' ');
      return {
        name: `${hash} - ${message}`,
        value: hash,
        description: message,
      };
    });

    // よく使われるオプションを追加
    options.unshift(
      { name: 'HEAD (最新)', value: 'HEAD', description: '最新のコミット' },
      { name: 'HEAD~1 (1つ前)', value: 'HEAD~1', description: '1つ前のコミット' },
      { name: 'HEAD~5 (5つ前)', value: 'HEAD~5', description: '5つ前のコミット' },
      { name: 'HEAD~10 (10つ前)', value: 'HEAD~10', description: '10つ前のコミット' },
      { name: '--- 最近のコミット ---', value: 'separator', disabled: true },
    );

    // 手動入力オプションを追加
    options.push({
      name: '✏️ 手動で入力',
      value: 'manual',
      description: 'コミットハッシュやブランチ名を手動入力',
    });

    return options;
  } catch (error) {
    console.log('⚠️ コミット履歴の取得に失敗しました');
    return [
      { name: 'HEAD (最新)', value: 'HEAD', description: '最新のコミット' },
      { name: 'HEAD~1 (1つ前)', value: 'HEAD~1', description: '1つ前のコミット' },
      { name: 'HEAD~5 (5つ前)', value: 'HEAD~5', description: '5つ前のコミット' },
      { name: '✏️ 手動で入力', value: 'manual', description: 'コミットハッシュやブランチ名を手動入力' },
    ];
  }
}

/**
 * コミットを選択または入力
 */
async function selectCommit(message, defaultValue = 'HEAD') {
  const commitOptions = getCommitOptions();

  const selectedCommit = await select({
    message,
    choices: commitOptions,
    default: defaultValue,
  });

  if (selectedCommit === 'manual') {
    return await input({
      message: 'コミットハッシュまたはブランチ名を入力してください:',
      validate: (value) => {
        if (!value.trim()) return 'コミットを入力してください';
        return true;
      },
    });
  }

  return selectedCommit;
}

/**
 * インタラクティブにコミット情報を取得
 */
async function getCommitInfo() {
  console.log('🔍 Git差分ファイル抽出ツール\n');

  const fromCommit = await selectCommit('比較元コミット (古い方) を選択してください:', 'HEAD~5');

  const toCommit = await selectCommit('比較先コミット (新しい方) を選択してください:', 'HEAD');

  const outputDir = await input({
    message: '出力先ディレクトリを入力してください:',
    default: './diff-output',
  });

  // 確認
  console.log('\n📝 設定内容:');
  console.log(`  比較元: ${fromCommit}`);
  console.log(`  比較先: ${toCommit}`);
  console.log(`  出力先: ${outputDir}`);

  const shouldProceed = await confirm({
    message: 'この設定で実行しますか?',
    default: true,
  });

  if (!shouldProceed) {
    console.log('❌ 処理をキャンセルしました');
    process.exit(0);
  }

  return { fromCommit, toCommit, outputDir };
}

// メイン処理
async function main() {
  try {
    const { fromCommit, toCommit, outputDir } = await getCommitInfo();
    extractDiffFiles(fromCommit, toCommit, outputDir);
  } catch (error) {
    if (error.name === 'ExitPromptError') {
      console.log('\n❌ 処理をキャンセルしました');
      process.exit(0);
    }
    console.error('エラーが発生しました:', error.message);
    process.exit(1);
  }
}

main();
