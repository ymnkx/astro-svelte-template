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
    <swiper-slide class="item">Slide 1</swiper-slide>
    <swiper-slide class="item">Slide 2</swiper-slide>
    <swiper-slide class="item">Slide 3</swiper-slide>
    <swiper-slide class="item">Slide 4</swiper-slide>
    <swiper-slide class="item">Slide 5</swiper-slide>
    <swiper-slide class="item">Slide 6</swiper-slide>
    <swiper-slide class="item">Slide 7</swiper-slide>
    <swiper-slide class="item">Slide 8</swiper-slide>
    <swiper-slide class="item">Slide 9</swiper-slide>
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
