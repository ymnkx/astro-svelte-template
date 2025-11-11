<script lang="ts">
  let { type = 'text', value = $bindable(''), min = 0, max = 0 } = $props();
</script>

{#if type === 'text'}
  <input type="text" bind:value class="input" />
{:else if type === 'number'}
  <input type="number" bind:value class="input" {min} {max} />
{/if}

<style>
  .input {
    padding: 0.25em 0.75em;
    background-color: var(--color-background-base);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-midium);
  }
</style>
