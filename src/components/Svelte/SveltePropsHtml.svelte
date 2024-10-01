<script>
  import SvelteValue from './SvelteValue.svelte';

  export let text = '<b>html</b> props';
</script>

<p>
  This is <SvelteValue>{@html text}</SvelteValue>.<br />
  You can use html tags in props.
</p>
