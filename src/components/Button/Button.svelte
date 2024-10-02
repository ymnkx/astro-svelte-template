<script lang="ts">
  export let primary = false;
  export let label: string = 'ラベル';
  export let size: 'small' | 'medium' | 'large' | 'full' = 'medium';
  export let as: 'span' | undefined = undefined;
  $: mode = primary ? '-primary' : '-secondary';
  $: classList = ['simple-button', `-${size}`, mode].join(' ');
</script>

{#if as === 'span'}
  <span class={classList}>
    <span class="simple-button_inner">{label}</span>
  </span>
{:else}
  <button type="button" class={classList} on:click>
    <span class="simple-button_inner">{label}</span>
  </button>
{/if}

<style lang="scss">
  @use '@/styles/_develop/+.scss' as *;

  .simple-button {
    --this-color-text: var(--color-gray-1000);
    --this-color-bg: var(--color-gray-300);

    display: inline-block;
    max-width: 100%;
    min-height: rem(44);
    text-decoration: none;

    &.-large {
      min-width: 10em;
    }

    &.-full {
      width: 100%;
      min-width: 10em;
    }

    @media (hover: hover) {
      &:hover {
        --this-color-bg: var(--color-gray-400);
      }
    }
  }

  .simple-button_inner {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: rem(44);
    padding: 0.25rlh 1rem;
    line-height: var(--typo-lh-xxs);
    color: var(--this-color-text);
    text-align: center;
    cursor: pointer;
    background-color: var(--this-color-bg);
    border-radius: var(--radius-midium);

    .simple-button.-small & {
      min-height: auto;
    }

    .simple-button.-full &,
    .simple-button.-large & {
      padding: 1.25lh 1.5rem;
    }
  }
</style>
