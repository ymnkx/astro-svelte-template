<script>
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import CarouselPrevNext from './CarouselPrevNext.svelte';
  import CarouselPagination from './CarouselPagination.svelte';

  let emblaInstance = $state(null);

  const handleEmblaInit = (event) => {
    emblaInstance = event.detail;
  };
</script>

<div class="wrapper">
  <div class="embla" use:emblaCarouselSvelte onemblaInit={handleEmblaInit}>
    <div class="embla__container">
      <div class="embla__slide"><div class="item">Slide 1</div></div>
      <div class="embla__slide"><div class="item">Slide 2</div></div>
      <div class="embla__slide"><div class="item">Slide 3</div></div>
      <div class="embla__slide"><div class="item">Slide 4</div></div>
      <div class="embla__slide"><div class="item">Slide 5</div></div>
      <div class="embla__slide"><div class="item">Slide 6</div></div>
      <div class="embla__slide"><div class="item">Slide 7</div></div>
      <div class="embla__slide"><div class="item">Slide 8</div></div>
      <div class="embla__slide"><div class="item">Slide 9</div></div>
    </div>
  </div>
  <CarouselPrevNext embla={emblaInstance} />
  <CarouselPagination embla={emblaInstance} />
</div>

<style lang="scss">
  @use '@/styles/_develop/+' as *;

  .embla {
    overflow: hidden;
  }

  .embla__container {
    display: flex;
  }

  .embla__slide {
    flex: 0 0 100%;
    min-width: 0;
  }

  .item {
    aspect-ratio: 1/1;
    border: 1px solid orange;

    @include min-screen(md) {
      aspect-ratio: 2/1;
    }
  }

  .wrapper {
    position: relative;
    height: 100%;
  }
</style>
