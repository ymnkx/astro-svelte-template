<script>
  let { embla } = $props();

  let selectedIndex = $state(0);
  let scrollSnaps = $state([]);

  const goToSlide = (index) => {
    if (embla) embla.scrollTo(index);
  };

  $effect(() => {
    if (!embla) return;

    const updatePagination = () => {
      selectedIndex = embla.selectedScrollSnap();
      scrollSnaps = embla.scrollSnapList();
    };

    updatePagination();
    embla.on('select', updatePagination);
    embla.on('reInit', updatePagination);

    return () => {
      embla.off('select', updatePagination);
      embla.off('reInit', updatePagination);
    };
  });
</script>

<div class="carousel-pagination">
  {#each scrollSnaps as _, index}
    <button
      type="button"
      class="carousel-pagination_button"
      class:-is-active={selectedIndex === index}
      onclick={() => goToSlide(index)}
      aria-label={`Go to slide ${index + 1}`}
    >
      <span class="carousel-pagination_dot"></span>
    </button>
  {/each}
</div>

<style lang="scss">
  @use '@/styles/_develop/+' as *;

  .carousel-pagination {
    display: flex;
    gap: #{rem(8)};
    align-items: center;
    justify-content: center;
    padding-block: #{rem(8)};
  }

  .carousel-pagination_button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: #{rem(4)};
    cursor: pointer;
    background: transparent;
    border: none;

    @media (any-hover: hover) {
      &:hover {
        .carousel-pagination_dot {
          opacity: 0.7;
        }
      }
    }
  }

  .carousel-pagination_dot {
    width: #{rem(8)};
    height: #{rem(8)};
    background-color: gray;
    border-radius: 50%;
    transition:
      opacity var(--easing-standard) var(--animation-duration),
      background-color var(--easing-standard) var(--animation-duration);

    .carousel-pagination_button.-is-active & {
      background-color: var(--color-orange);
    }
  }
</style>
