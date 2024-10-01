<script lang="ts">
  export let label: string = 'ラベル';
  export let level: 2 | 3 | 4 | 5 | 6 = 2;
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
