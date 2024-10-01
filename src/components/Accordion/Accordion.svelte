<script>
  import { slide } from 'svelte/transition';
  let isSlide = false;
  let isOpen = false;
  let timer = null;
  const duration = 300;
  const clickHandler = (ev) => {
    ev.preventDefault();
    timer && clearTimeout(timer);
    isSlide = !isSlide;
    if (isSlide) {
      isOpen = true;
    } else {
      timer = setTimeout(() => {
        isOpen = false;
      }, duration);
    }
  };
</script>

<details class="accordion-menu" open={isOpen}>
  <summary class="accordion-menu_summary" data-role="summary" aria-label="summary" on:click={clickHandler}>
    <span class="accordion-menu_label">
      <slot name="label">Label</slot>
    </span>
    <span class="accordion-menu_icon"></span>
  </summary>
  {#if isSlide}
    <div class="accordion-menu_contents" data-role="contents" transition:slide={{ delay: 0, duration: duration }}>
      <slot name="contents">Contents</slot>
    </div>
  {/if}
</details>

<style lang="scss">
  .accordion-menu {
    --this-color-icon: var(--accordion-color-icon, #333333);
    --this-size-icon: var(--accordion-icon-size, 0.625rem);

    margin-block-start: -1px;
    border: 1px solid var(--color-border);
  }

  .accordion-menu_summary {
    position: relative;
    display: block;
    width: 100%;
    background-color: transparent;

    .accordion-menu[open] & {
      background-color: var(--color-gray-1000);
    }

    // For Safari
    &::-webkit-details-marker {
      display: none;
    }
  }

  .accordion-menu_label {
    display: block;
    padding: 1rem;
  }

  .accordion-menu_icon {
    position: absolute;
    top: 50%;
    right: 1em;
    transform: translateY(-75%) rotate(135deg);

    &::after {
      display: block;
      width: 1em;
      height: 1em;
      font-size: var(--this-size-icon);
      content: '';
      border-color: var(--this-color-icon);
      border-style: solid;
      border-width: 1px 1px 0 0;
    }

    .accordion-menu[open] & {
      transform: translateY(-25%) rotate(-45deg);
    }
  }

  .accordion-menu_contents {
    padding: 1rem;
    background-color: rgb(0 0 0 / 5%);
    border-top: 1px solid var(--color-border);
  }
</style>
