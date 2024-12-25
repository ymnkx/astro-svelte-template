<script>
  import { register } from 'swiper/element/bundle';
  register();

  const spaceBetween = 10;
  const breakpoints = JSON.stringify({
    640: {
      navigation: true,
      slidesPerView: 1,
    },
    768: {
      navigation: true,
      slidesPerView: 3,
    },
  });
</script>

<swiper-container
  space-between={spaceBetween}
  pagination={{
    hideOnClick: false,
  }}
  navigation={true}
  {breakpoints}
>
  <swiper-slide><div class="item">Slide 1</div></swiper-slide>
  <swiper-slide><div class="item">Slide 2</div></swiper-slide>
  <swiper-slide><div class="item">Slide 3</div></swiper-slide>
  <swiper-slide><div class="item">Slide 4</div></swiper-slide>
  <swiper-slide><div class="item">Slide 5</div></swiper-slide>
  <swiper-slide><div class="item">Slide 6</div></swiper-slide>
  <swiper-slide><div class="item">Slide 7</div></swiper-slide>
  <swiper-slide><div class="item">Slide 8</div></swiper-slide>
</swiper-container>

<style lang="scss">
  swiper-container {
    width: 100%;
  }

  .item {
    aspect-ratio: 1/1;
    border: 1px solid orange;
  }
</style>
