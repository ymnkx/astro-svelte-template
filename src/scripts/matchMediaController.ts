type CallBack = (match: boolean) => void;
type Props = {
  condition: string;
  callback: CallBack;
};

export const matchMediaController = () => {
  const changeMenuFunction = (e: MediaQueryList, callback: CallBack) => {
    callback(e.matches);
  };

  const elements: {
    mql: MediaQueryList | null;
    callback: CallBack | null;
  } = {
    mql: null,
    callback: null,
  };

  return {
    reset: () => {
      if (!elements.mql) return;
      elements.mql.removeEventListener('change', () => {
        if (elements.mql && elements.callback) changeMenuFunction(elements.mql, elements.callback);
      });
      elements.mql = null;
      elements.callback = null;
    },
    init: (props: Props) => {
      const { condition, callback } = props;
      elements.mql = window.matchMedia(condition);
      elements.callback = callback;
      elements.mql.addEventListener('change', () => {
        if (elements.mql && elements.callback) changeMenuFunction(elements.mql, elements.callback);
      });
      changeMenuFunction(elements.mql, elements.callback);
    },
  };
};
