<script>
  import SvelteStack from './SvelteStack.svelte';
  import SvelteValue from './SvelteValue.svelte';

  let colors = ['red', 'green', 'blue'];
  $: selected = '';
</script>

<SvelteStack>
  <div class="colors">
    {#each colors as color, i}
      <button type="button" style="background-color: {color}" class="color" on:click={() => (selected = color)}>
        {i + 1}
      </button>
    {/each}
  </div>
  <div class="result">
    {#if selected}
      <p>Selected color is <SvelteValue color={selected}>{selected.toUpperCase()}</SvelteValue>.</p>
    {:else}
      <p>Color is not selected.</p>
    {/if}
  </div>
</SvelteStack>

<style lang="scss">
  .colors {
    display: flex;
  }

  .color {
    flex: 1;
    padding: 0.75lh 2em;
    color: var(--color-gray-1000);

    @media (hover: hover) {
      &:hover {
        border-color: var(--color-border);
      }
    }
  }

  .result {
    margin-block-start: 0.25lh;
  }
</style>
