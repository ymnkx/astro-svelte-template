<script>
  import SvelteValue from './SvelteValue.svelte';
  let { textValue = 'props', htmlValue = '<b>html</b> props' } = $$props;
</script>

<p>
  This is <SvelteValue>{textValue}</SvelteValue> data. This is <SvelteValue>{@html htmlValue}</SvelteValue> data.<br />
  You can pass some data to Svelte Component.
</p>
