<script lang="ts">
  export let label: string = 'ラベル';
  export let size: 'small' | 'medium' | 'large' | 'full' = 'medium';
  export let tag: 'button' | 'a' = 'button';
  export let href: string = '#';

  const classList = ['simple-button'];
  if (size === 'small') {
    classList.push('-small');
  } else if (size === 'medium') {
    classList.push('-medium');
  } else if (size === 'large') {
    classList.push('-large');
  } else if (size === 'full') {
    classList.push('-full');
  }
</script>

{#if tag === 'button'}
  <button type="button" class={classList.join(' ')}>
    <span class="simple-button_inner">{label}</span>
  </button>
{:else if tag === 'a'}
  <a {href} class={classList.join(' ')}>
    <span class="simple-button_inner">{label}</span>
  </a>
{/if}

<style lang="scss">
  @use '@/styles/_develop/+.scss' as *;

  .simple-button {
    --this-color-text: var(--color-white);
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
    line-height: 1;
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
