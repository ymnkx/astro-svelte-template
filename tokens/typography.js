const pxToRem = (px) => `${px / 16}rem`;

const primitive = {
  fonts: {
    $type: 'fontFamily',
    serif: {
      $value: 'Times New Roman, serif',
    },
    sans: {
      $value: 'Open Sans, sans-serif',
    },
  },
  sizes: {
    type: 'fontSize',
    100: {
      $value: pxToRem(16),
      comment: '16px',
    },
  },
};

export default { typo: { ...primitive } };
