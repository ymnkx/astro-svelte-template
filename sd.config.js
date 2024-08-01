export default {
  source: [`tokens/**/*.js`],
  platforms: {
    css: {
      transformGroup: 'scss',
      buildPath: 'src/styles/_token/',
      files: [
        {
          destination: '_variables.scss',
          format: 'css/variables',
        },
      ],
    },
  },
};
