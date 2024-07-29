import { input } from '@inquirer/prompts';
import fs from 'node:fs';

const packageJsonFile = 'package.json';
const packageJsonData = JSON.parse(fs.readFileSync(packageJsonFile, 'utf8'));
const currentName = packageJsonData.name;

if (currentName === '') {
  const projectName = await input({ message: 'プロジェクト名を半角英数字で入力してください：', default: currentName });
  packageJsonData.name = projectName ? projectName : currentName;
  fs.writeFileSync(packageJsonFile, JSON.stringify(packageJsonData, null, 2));
}
