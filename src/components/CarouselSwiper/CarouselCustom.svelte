<script>
  import { registerSwiper, setupCarousel } from './CarouselCore';
  import CarouselUi from './CarouselUi.svelte';
  let { id, props } = $props();
  registerSwiper();
  const carousel = setupCarousel(id, props);
  $effect(() => {
    carousel.initializeSwiper();
  });
</script>

<div class="wrapper">
  <swiper-container {id} init={false}>
    <swiper-slide class="item">Slide C1</swiper-slide>
    <swiper-slide class="item">Slide C2</swiper-slide>
    <swiper-slide class="item">Slide C3</swiper-slide>
    <swiper-slide class="item">Slide C4</swiper-slide>
    <swiper-slide class="item">Slide C5</swiper-slide>
    <swiper-slide class="item">Slide C6</swiper-slide>
    <swiper-slide class="item">Slide C7</swiper-slide>
    <swiper-slide class="item">Slide C8</swiper-slide>
    <swiper-slide class="item">Slide C9</swiper-slide>
  </swiper-container>
  <CarouselUi {id} {carousel} />
</div>

<style lang="scss">
  .item {
    aspect-ratio: 1/1;
    border: 1px solid orange;
  }

  .wrapper {
    height: 100%;
  }
</style>
