<script lang="ts">
  interface Props {
    label: string;
    level: 2 | 3 | 4 | 5 | 6;
  }
  let { label = 'ラベル', level = 2 }: Props = $props();
</script>

{#if level === 2}
  <h2 class="h2">{label}</h2>
{/if}

<style lang="scss">
  .h2 {
    padding-block-end: 1lh; // これを許すかが課題
    font-family: var(--typo-font-roboto);
    font-size: var(--typo-size-900);
    font-weight: var(--typo-weight-normal);
    text-transform: capitalize;
  }
</style>
