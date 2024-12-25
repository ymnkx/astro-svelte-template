<script>
  import { onMount } from 'svelte';
  import { register } from 'swiper/element/bundle';

  register();

  let swiperElement = $state(undefined);
  onMount(() => {
    swiperElement = document.querySelector('#js-swiper-visible');
    const params = {
      spaceBetween: 10,
      slidesPerView: 3,
      injectStyles: [
        `
          .swiper {
            overflow: visible;
          }
      `,
      ],
    };
    Object.assign(swiperElement, params);
    swiperElement.initialize();
  });
</script>

<swiper-container init="false" Pagination={true} navigation={true} id="js-swiper-visible">
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
