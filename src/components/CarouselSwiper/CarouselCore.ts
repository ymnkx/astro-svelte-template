import { register } from 'swiper/element/bundle';

// Swiperの登録
export const registerSwiper = () => {
  register();
};

// CarouselMinimumのロジックを管理する関数
export const setupCarousel = (swiperId: string, props: unknown) => {
  let swiperElement: any;
  let currentIndex = 0;

  // Swiperの初期化
  const initializeSwiper = () => {
    swiperElement = document.querySelector(`#${swiperId}`);
    const params = props;
    Object.assign(swiperElement, params);
    swiperElement.initialize();
    updateCurrentIndex();
    swiperElement.swiper.on('slideChangeTransitionEnd', updateCurrentIndex);
  };

  // 現在のインデックスを更新
  const updateCurrentIndex = () => {
    currentIndex = swiperElement?.swiper?.realIndex + 1 || 1;
    return currentIndex;
  };

  // 現在のインデックスを取得
  const getCurrentIndex = () => currentIndex;

  // Swiperエレメントの取得
  const getSwiperElement = () => swiperElement;

  return {
    initializeSwiper,
    updateCurrentIndex,
    getCurrentIndex,
    getSwiperElement,
  };
};
