import { getEasingFunction } from './getEasingFunction';

type Props = {
  element: HTMLElement;
  duration?: number;
  callback?: () => void;
};

const options = {
  duration: 250,
  easingFunction: getEasingFunction('easeOutCirc'),
};

/* SLIDE UP */
export const slideUp = (props: Props): void => {
  const { element, duration = options.duration, callback } = props;
  const elementHeight = element.offsetHeight;

  element.animate([{ height: elementHeight + 'px' }, { height: 0 }], {
    duration,
    easing: options.easingFunction,
  }).onfinish = () => {
    if (callback) callback();
  };
};

/* SLIDE DOWN */
export const slideDown = (props: Props): void => {
  const { element, duration = options.duration, callback } = props;
  element.style.removeProperty('display');
  const elementHeight = element.offsetHeight;

  element.animate([{ height: 0 }, { height: elementHeight + 'px' }], {
    duration,
    easing: options.easingFunction,
  }).onfinish = () => {
    if (callback) callback();
  };
};
