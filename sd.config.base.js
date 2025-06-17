import StyleDictionary from 'style-dictionary';

StyleDictionary.registerTransform({
  type: `value`,
  transitive: true,
  name: `remTransformer`,
  filter: (token) => {
    return (
      token.attributes.type === 'font-size' ||
      token.attributes.type === 'border-radius' ||
      token.attributes.category === 'rounded' ||
      token.attributes.category === 'spacing'
    );
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

StyleDictionary.registerTransform({
  type: `value`,
  transitive: true,
  name: `letterSpacingTransformer`,
  filter: (token) => {
    return token.attributes.type === 'letter-spacing';
  },
  transform: (token) => {
    const thisValue = token.original.value ? token.original.value : token.original.$value;
    return Number(thisValue.replace('%', '')) / 100 + 'em';
  },
});

export default {
  source: [`tokens/figma/**/*.json`, `tokens/other/**/*.json`],
  platforms: {
    scss: {
      transforms: ['remTransformer', 'stringTransformer', 'letterSpacingTransformer'],
      transformGroup: 'scss',
      buildPath: 'tokens/',
      files: [
        {
          destination: 'design-tokens.scss',
          format: 'css/variables',
        },
      ],
    },
  },
};
