<script lang="ts">
  export let color: string = '#bd3300';
</script>

<span class="value" style="background-color: {color}"><slot /></span>

<style>
  .value {
    display: inline-block;
    padding: 0 0.5em;
    color: var(--color-gray-1000);
    border-radius: var(--radius-small);
  }
</style>
