// TODO: 随時増やす

type EasingName = 'easeOutCirc' | 'easeOutExpo' | 'easeOutCubic' | 'easeOutQuint' | 'easeOutQuad';

export const getEasingFunction = (type: EasingName) => {
  switch (type) {
    case 'easeOutCirc':
      return 'cubic-bezier(0, 0.55, 0.45, 1)';
    case 'easeOutQuad':
      return 'cubic-bezier(0.5, 1, 0.89, 1)';
  }
};

export const getEasingMathFunction = (type: EasingName) => {
  switch (type) {
    case 'easeOutCirc':
      return (x: number): number => {
        return Math.sqrt(1 - Math.pow(x - 1, 2));
      };
    case 'easeOutExpo':
      return (x: number): number => {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
      };

    case 'easeOutCubic':
      return (x: number): number => {
        return 1 - Math.pow(1 - x, 3);
      };
    case 'easeOutQuint':
      return (x: number): number => {
        return 1 - Math.pow(1 - x, 5);
      };
    case 'easeOutQuad':
      return (x: number): number => {
        return 1 - (1 - x) * (1 - x);
      };
  }
};
