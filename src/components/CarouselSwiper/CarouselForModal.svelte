<script lang="ts">
  import { registerSwiper, setupCarousel } from './CarouselCore';
  let {
    id,
    props,
    currentIndex = $bindable(0),
    onIndexChange,
  }: {
    id: string;
    props: unknown;
    currentIndex: number;
    onIndexChange: (index: number) => void;
  } = $props();
  registerSwiper();
  const carousel = setupCarousel(id, props);
  let activeIndex = $state(0);

  $effect(() => {
    console.log('currentIndex:b', currentIndex);
    carousel.initializeSwiper();
    const swiperElement = carousel.getSwiperElement();
    if (swiperElement?.swiper) {
      swiperElement.swiper.slideToLoop(currentIndex, 0);
    }
    swiperElement.swiper.on('slideChange', () => {
      activeIndex = swiperElement.swiper.activeIndex;
      onIndexChange(swiperElement.swiper.activeIndex);
    });
  });
</script>

<div class="wrapper">
  <swiper-container {id} init={false}>
    <swiper-slide class="item">Slide 1({activeIndex})</swiper-slide>
    <swiper-slide class="item">Slide 2({activeIndex})</swiper-slide>
    <swiper-slide class="item">Slide 3({activeIndex})</swiper-slide>
    <swiper-slide class="item">Slide 4({activeIndex})</swiper-slide>
    <swiper-slide class="item">Slide 5({activeIndex})</swiper-slide>
    <swiper-slide class="item">Slide 6({activeIndex})</swiper-slide>
    <swiper-slide class="item">Slide 7({activeIndex})</swiper-slide>
    <swiper-slide class="item">Slide 8({activeIndex})</swiper-slide>
    <swiper-slide class="item">Slide 9({activeIndex})</swiper-slide>
  </swiper-container>
</div>

<style lang="scss">
  .item {
    aspect-ratio: 1/1;
    border: 1px solid orange;
  }

  .wrapper {
    position: relative;
    height: 100%;
  }
</style>
