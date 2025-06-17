<script lang="ts">
  let { children } = $props();
</script>

<div class="stack">
  {@render children?.()}
</div>

<style>
  .stack {
    display: flex;
    flex-direction: column;
    gap: 0.5lh;
    align-items: center;
  }
</style>
