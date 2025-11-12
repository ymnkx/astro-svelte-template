<script>
  let { embla, prevLabel = 'Prev', nextLabel = 'Next' } = $props();

  let canScrollPrev = $state(false);
  let canScrollNext = $state(false);

  const goPrev = () => {
    if (embla) embla.scrollPrev();
  };

  const goNext = () => {
    if (embla) embla.scrollNext();
  };

  $effect(() => {
    if (!embla) return;

    const updateButtons = () => {
      canScrollPrev = embla.canScrollPrev();
      canScrollNext = embla.canScrollNext();
    };

    updateButtons();
    embla.on('select', updateButtons);
    embla.on('reInit', updateButtons);

    return () => {
      embla.off('select', updateButtons);
      embla.off('reInit', updateButtons);
    };
  });
</script>

<div class="carousel-prevNext">
  <button
    type="button"
    disabled={!canScrollPrev}
    class="carousel-prevNext_button"
    onclick={goPrev}
  >
    {prevLabel}
  </button>
  <button
    type="button"
    disabled={!canScrollNext}
    class="carousel-prevNext_button"
    onclick={goNext}
  >
    {nextLabel}
  </button>
</div>

<style lang="scss">
  @use '@/styles/_develop/+' as *;

  .carousel-prevNext {
    display: flex;
    gap: #{rem(16)};
    align-items: center;
    justify-content: center;
    padding-block: #{rem(8)};
  }

  .carousel-prevNext_button {
    &[disabled] {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
</style>
