import fs from 'node:fs';
import path from 'path';
import SVGSpriter from 'svg-sprite';
import { globSync } from 'glob';

const directory = {
  src: 'src/icons',
  dest: 'public/assets/svg',
};

const config = {
  dest: directory.dest,
  mode: {
    symbol: {
      dest: '.',
      sprite: 'icons',
    },
  },
};

const spriter = new SVGSpriter(config);

const svgImages = globSync(`${directory.src}/*.svg`);
svgImages.forEach((path) => {
  spriter.add(path, null, fs.readFileSync(path, 'utf-8'));
});

spriter.compile((error, result) => {
  if (error) {
    console.log(error);
    return;
  }

  for (const mode in result) {
    for (const resource in result[mode]) {
      fs.mkdirSync(path.dirname(result[mode][resource].path), { recursive: true });
      fs.writeFileSync(result[mode][resource].path, result[mode][resource].contents);
    }
  }
});
