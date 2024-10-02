<script>
  import SvelteValue from './SvelteValue.svelte';
  export let textValue = 'props';
  export let htmlValue = '<b>html</b> props';
</script>

<p>
  This is <SvelteValue>{textValue}</SvelteValue> data. This is <SvelteValue>{@html htmlValue}</SvelteValue> data.<br />
  You can pass some data to Svelte Component.
</p>
