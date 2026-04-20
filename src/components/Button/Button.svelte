<script lang="ts">
  import { untrack } from 'svelte';

  interface Props {
    primary?: boolean;
    size?: 'small' | 'medium' | 'large';
    as?: 'span' | 'button' | 'a';
    onclick?: () => void;
    children?: unknown;
  }
  let { primary = false, size = 'medium', as = 'span', onclick, children, ...restProps }: Props = $props();
  let mode = $derived((() => (primary ? '-primary' : '-secondary'))());
  let classList: string = $derived(['button-component', `-${size}`, mode].join(' '));

  untrack(() => {
    if (as === 'a' && !('href' in restProps)) {
      throw new Error('href is required when using anchor tag');
    }
    if (as === 'button' && !('type' in restProps)) {
      throw new Error('type is required when using button tag');
    }
  });
</script>

<svelte:element this={as} class={classList} {onclick} {...restProps}>
  <span class="button-component_inner">{@render children?.()}</span>
</svelte:element>

<style lang="scss">
  @use '@/styles/_develop/+.scss' as *;

  .button-component {
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

  .button-component_inner {
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

    .button-component.-small & {
      min-height: auto;
    }

    .button-component.-full &,
    .button-component.-large & {
      padding: 1.25lh 1.5rem;
    }
  }
</style>
