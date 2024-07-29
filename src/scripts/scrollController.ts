type Props = {
  positionRightProperty?: string;
};

export const ScrollController = () => {
  const elements: {
    body: HTMLElement | null;
    root: HTMLElement | null;
  } = {
    body: null,
    root: null,
  };
  // const states = {};
  const options = {
    positionRightProperty: '--layout-position-right',
  };

  return {
    init: (props?: Props) => {
      if (props?.positionRightProperty) options.positionRightProperty = props.positionRightProperty;
      elements.body = document.querySelector('body');
      elements.root = document.querySelector(':root');
    },
    lock: () => {
      if (!elements.body || !elements.root) return;
      const scrollbarWidth = window.innerWidth - document.body.clientWidth;
      elements.body.style.paddingRight = `${scrollbarWidth}px`;
      elements.root.style.setProperty(options.positionRightProperty, `${scrollbarWidth}px`);
      elements.body.style.overflow = 'hidden';
    },
    release: () => {
      if (!elements.body || !elements.root) return;
      elements.body.setAttribute('style', '');
      elements.root.style.removeProperty(options.positionRightProperty);
    },
  };
};
