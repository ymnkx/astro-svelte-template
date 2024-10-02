<script lang="ts">
  export let type: string = 'text';
  export let value: string = '';
  export let min: number = 0;
  export let max: number = 0;
</script>

{#if type === 'text'}
  <input type="text" bind:value class="input" />
{:else if type === 'number'}
  <input type="number" bind:value class="input" {min} {max} />
{/if}

<style>
  .input {
    padding: 0.25em 0.75em;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-midium);
  }
</style>
