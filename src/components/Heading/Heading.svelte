<script lang="ts">
  import { untrack } from 'svelte';

  interface Props {
    level: 1 | 2 | 3 | 4 | 5 | 6;
    isSpan: boolean;
    children: unknown;
  }
  let { level = 2, isSpan = false, children }: Props = $props();
  const tag = untrack(() =>
    isSpan
      ? 'span'
      : level === 1
        ? 'h1'
        : level === 2
          ? 'h2'
          : level === 3
            ? 'h3'
            : level === 4
              ? 'h4'
              : level === 5
                ? 'h5'
                : 'h6',
  );
  let classList: string = $derived(['heading-component', `-level-${level}`].join(' '));
</script>

<svelte:element this={tag} class={classList}>{@render children?.()}</svelte:element>

<style lang="scss">
  @use '@/styles/_develop/+.scss' as *;

  .heading-component {
    &.-level-1 {
      @include heading-level-1;
    }

    &.-level-2 {
      @include heading-level-2;
    }

    &.-level-3 {
      @include heading-level-3;
    }

    &.-level-4 {
      @include heading-level-4;
    }

    &.-level-5 {
      @include heading-level-5;
    }

    &.-level-6 {
      @include heading-level-6;
    }
  }
</style>
