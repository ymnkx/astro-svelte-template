import StyleDictionary from 'style-dictionary';

StyleDictionary.registerTransform({
  type: `value`,
  transitive: true,
  name: `remTransformer`,
  filter: (token) => {
    return token.attributes.type === 'font-size';
  },
  transform: (token) => {
    const thisValue = token.original.value ? token.original.value : token.original.$value;
    return thisValue / 16 + `rem`;
  },
});

StyleDictionary.registerTransform({
  type: `value`,
  transitive: true,
  name: `stringTransformer`,
  filter: (token) => {
    return token.attributes.type === 'font-family';
  },
  transform: (token) => {
    const thisValue = token.original.value ? token.original.value : token.original.$value;
    return `'${thisValue}'`;
  },
});

export default {
  source: [`tokens/**/*.json`],
  platforms: {
    scss: {
      transforms: ['remTransformer', 'stringTransformer'],
      transformGroup: 'scss',
      buildPath: 'tokens/', // 'src/styles/_token/',
      files: [
        {
          destination: '_variables.scss',
          format: 'css/variables',
        },
      ],
    },
  },
};
