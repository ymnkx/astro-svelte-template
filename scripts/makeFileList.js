import fs from 'node:fs';
import tree from 'tree-node-cli';

const string = tree('./build/htdocs');

fs.writeFile('./build/filelist.txt', string, (err) => {
  if (err) console.error(err);
  console.log('filelist.txtを生成しました。');
});
