<script>
  let { id, carousel, prevLabel = 'Prev', nextLabel = 'Next', showCounter = true } = $props();
  let currentIndex = $state(0);
  let isDisablePrev = $state(false);
  let isDisableNext = $state(false);
  let swiperElement = $state(null);

  const goNext = () => {
    if (swiperElement) swiperElement.swiper.slideNext();
  };

  const goPrev = () => {
    if (swiperElement) swiperElement.swiper.slidePrev();
  };

  $effect(() => {
    swiperElement = carousel.getSwiperElement();

    if (carousel && swiperElement) {
      // pagination
      const updateIndex = () => {
        currentIndex = carousel.getCurrentIndex();
      };
      updateIndex();
      swiperElement.swiper.on('slideChangeTransitionEnd', updateIndex);

      // navigation
      swiperElement.swiper.on('reachBeginning', () => {
        isDisablePrev = true;
      });
      swiperElement.swiper.on('fromEdge', () => {
        isDisablePrev = false;
        isDisableNext = false;
      });
      swiperElement.swiper.on('reachEnd', () => {
        isDisableNext = true;
      });
      isDisablePrev = swiperElement.swiper.isBeginning;
      isDisableNext = swiperElement.swiper.isEnd;
    }
  });
</script>

<div class="custom-ui" id={`${id}-ui`}>
  <button type="button" disabled={isDisablePrev} class="custom-ui_button" onclick={goPrev}>
    {prevLabel}
  </button>
  {#if showCounter}
    <span class="custom-ui_index">
      {currentIndex}
    </span>
  {/if}
  <button type="button" disabled={isDisableNext} class="custom-ui_button" onclick={goNext}>
    {nextLabel}
  </button>
</div>

<style lang="scss">
  .custom-ui {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    padding-block: 0.5rem;
  }

  .custom-ui_button {
    &[disabled] {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
</style>
