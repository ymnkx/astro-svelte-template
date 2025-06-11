<script>
  import { registerSwiper, setupCarousel } from './CarouselCore';
  let { id, props } = $props();
  registerSwiper();
  const carousel = setupCarousel(id, props);
  $effect(() => {
    carousel.initializeSwiper();
  });
</script>

<div class="wrapper">
  <swiper-container {id} init={false}>
    <swiper-slide class="item">Slide SPV1</swiper-slide>
    <swiper-slide class="item">Slide SPV2</swiper-slide>
    <swiper-slide class="item">Slide SPV3</swiper-slide>
    <swiper-slide class="item">Slide SPV4</swiper-slide>
    <swiper-slide class="item">Slide SPV5</swiper-slide>
    <swiper-slide class="item">Slide SPV6</swiper-slide>
    <swiper-slide class="item">Slide SPV7</swiper-slide>
    <swiper-slide class="item">Slide SPV8</swiper-slide>
    <swiper-slide class="item">Slide SPV9</swiper-slide>
  </swiper-container>
</div>

<style lang="scss">
  .item {
    width: 20rem;
    aspect-ratio: 1/1;
    border: 1px solid yellowgreen;
  }

  .wrapper {
    position: relative;
    height: 100%;
  }
</style>
