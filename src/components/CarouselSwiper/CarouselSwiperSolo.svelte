<script>
  import { register } from 'swiper/element/bundle';
  register();

  const spaceBetween = 10;
  const onProgress = (e) => {
    const [swiper, progress] = e.detail;
    console.log(progress);
  };
  const onSlideChange = (e) => {
    console.log('slide changed');
  };
</script>

<div class="wrapper">
  <swiper-container
    space-between={spaceBetween}
    centered-slides={true}
    slidesPerView={1}
    navigation={true}
    pagination={{
      hideOnClick: false,
    }}
    onswiperprogress={onProgress}
    onswiperslidechange={onSlideChange}
  >
    <swiper-slide><div class="item">Slide 1</div></swiper-slide>
    <swiper-slide><div class="item">Slide 2</div></swiper-slide>
    <swiper-slide><div class="item">Slide 3</div></swiper-slide>
  </swiper-container>
</div>

<style lang="scss">
  .wrapper {
    width: 100%;
  }

  .item {
    aspect-ratio: 3/1;
    border: 1px solid orange;
  }
</style>
