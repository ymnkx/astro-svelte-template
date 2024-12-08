<script lang="ts">
  let { color = '#bd3300', children } = $props();
</script>

<span class="value" style="background-color: {color}">
  {@render children?.()}
</span>

<style>
  .value {
    display: inline-block;
    padding: 0 0.5em;
    color: var(--color-gray-1000);
    border-radius: var(--radius-small);
  }
</style>
