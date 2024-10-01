<script>
  import Icon from '../Icon/Icon.svelte';
  import SvelteStack from './SvelteStack.svelte';
  import SvelteValue from './SvelteValue.svelte';
</script>

<SvelteStack>
  <p>
    <SvelteValue><slot>Slot</slot></SvelteValue>
  </p>
  <p>
    <span class="icon">
      <Icon name="exclamation-circle" />
    </span>
    <a href="https://svelte-5-preview.vercel.app/docs/snippets#snippets-and-slots" target="_blank"
      >Slots are deprecated in Svelte 5</a
    >.
  </p>
</SvelteStack>

<style>
  .icon {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
  }
</style>
