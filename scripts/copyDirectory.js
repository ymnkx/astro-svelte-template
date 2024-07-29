import fse from 'fs-extra';

const directory = {
  from: 'dist',
  to_root: 'build',
  to: 'build/htdocs',
};

fse.remove(directory.to_root, (err) => {
  if (err) throw err;
  console.log(`${directory.to_root} ディレクトリを削除しました`);

  fse.copySync(directory.from, directory.to);
  console.log(`${directory.to} にファイルをコピーしました`);
});
