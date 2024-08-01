const primitive = {
  $type: 'color',
  black: {
    $value: '#0f0f0f',
  },
  white: {
    $value: '#ffffff',
  },
  gray: {
    100: {
      $value: '#f0f0f0',
    },
    300: {
      $value: '#cccccc',
    },
    500: {
      $value: '#aaaaaa',
    },
    700: {
      $value: '#555555',
    },
    900: {
      $value: '#333333',
    },
  },
  orange: {
    $value: 'hsl(16deg 100% 50%)',
  },
};

const context = {
  primary: {
    $value: primitive.orange.$value,
  },
  text: {
    base: {
      $value: primitive.black.$value,
    },
    onDark: {
      $value: primitive.white.$value,
    },
  },
  background: {
    base: {
      $value: primitive.white.$value,
    },
    dark: {
      $value: primitive.gray[900].$value,
    },
  },
  border: {
    $value: primitive.gray[500].$value,
  },
};

export default { color: { ...primitive, ...context } };
