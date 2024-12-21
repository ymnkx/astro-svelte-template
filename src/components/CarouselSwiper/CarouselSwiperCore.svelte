<script>
  import { onMount } from 'svelte';
  import { register } from 'swiper/element/bundle';
  import Button from '../Button/Button.svelte';

  register();

  const swiperId = 'js-swiper-core';
  let swiperElement = $state(undefined);
  let current = $state();
  let total = $state();

  const goNext = () => {
    if (swiperElement) swiperElement.swiper.slideNext();
  };

  const goPrev = () => {
    if (swiperElement) swiperElement.swiper.slidePrev();
  };

  onMount(() => {
    swiperElement = document.querySelector(`#${swiperId}`);
    const params = {
      loop: true,
      centeredSlides: true,
      spaceBetween: 10,
      slidesPerView: 3,
    };
    Object.assign(swiperElement, params);
    swiperElement.initialize();
    swiperElement.swiper.on('slideChange', () => {
      current = swiperElement.swiper.realIndex + 1;
      total = swiperElement.swiper.slides.length;
    });
  });
</script>

<swiper-container init="false" Pagination={true} navigation={true} id={swiperId}>
  <swiper-slide><div class="item">Slide 1</div></swiper-slide>
  <swiper-slide><div class="item">Slide 2</div></swiper-slide>
  <swiper-slide><div class="item">Slide 3</div></swiper-slide>
  <swiper-slide><div class="item">Slide 4</div></swiper-slide>
  <swiper-slide><div class="item">Slide 5</div></swiper-slide>
  <swiper-slide><div class="item">Slide 6</div></swiper-slide>
  <swiper-slide><div class="item">Slide 7</div></swiper-slide>
  <swiper-slide><div class="item">Slide 8</div></swiper-slide>
</swiper-container>
<div>
  <Button onclick={goPrev} label="Prev"></Button>
  <span>{current}/{total}</span>
  <Button onclick={goNext} label="Next"></Button>
</div>

<style lang="scss">
  swiper-container {
    width: 100%;
    height: 100%;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1/1;
    border: 1px solid orange;
  }
</style>
