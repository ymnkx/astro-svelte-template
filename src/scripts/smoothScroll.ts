import { getEasingMathFunction } from './getEasingFunction';

export const smoothScrollToId = (target_id: string) => {
  const target = document.querySelector(target_id);
  if (!target) return;
  const rect = target.getBoundingClientRect();
  smoothScroll(rect.top + window.pageYOffset);
};

let startScrollY = 0;
let endScrollY = 0;
let startTime = 0;
const duration = 1000;

let isScrolling = false;

const scrollAnimation = () => {
  const progress = Math.min(1, (performance.now() - startTime) / duration);
  const scrollY = endScrollY + (startScrollY - endScrollY) * (1 - getEasingMathFunction('easeOutExpo')(progress));
  window.scrollTo(0, scrollY);
  if (!isScrolling) return;
  if (progress < 1) {
    requestAnimationFrame(scrollAnimation);
  } else {
    isScrolling = false;
  }
};

const animateFunc = (scrollTop: number) => {
  startScrollY = window.scrollY;
  endScrollY = scrollTop;
  startTime = performance.now();
  isScrolling = true;
  scrollAnimation();
};

const setScrollCanceller = () => {
  window.addEventListener('wheel', () => {
    if (isScrolling) {
      isScrolling = false;
    }
  });
  window.addEventListener('touchstart', () => {
    if (isScrolling) {
      isScrolling = false;
    }
  });
};

export const smoothScroll = (target: number) => {
  animateFunc(target);
  setScrollCanceller();
};

type Props = {
  selector: string;
};
export const smoothScrollInPage = (props: Props) => {
  const { selector } = props;
  const links = Array.from(document.querySelectorAll(`${selector} a[href^="#"]`));
  if (links.length === 0) return;

  links.forEach((link) => {
    link.addEventListener('click', (ev) => {
      ev.preventDefault();
      const target_id = link.getAttribute('href');
      if (!target_id) return;
      const targetElement: HTMLElement | null = document.querySelector(target_id);
      if (!targetElement) return;

      const { scrollMarginTop } = getComputedStyle(targetElement);

      animateFunc(targetElement.offsetTop - Number(scrollMarginTop.replace('px', '')));
    });
  });
  setScrollCanceller();
};
