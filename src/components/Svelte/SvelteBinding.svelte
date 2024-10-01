<script>
  import SvelteInput from './SvelteInput.svelte';
  import SvelteStack from './SvelteStack.svelte';
  import SvelteValue from './SvelteValue.svelte';

  let name = 'value';
</script>

<SvelteStack>
  <SvelteInput bind:value={name} />
  <p class="result">You can Change <SvelteValue>{name}</SvelteValue> in Component reactively.</p>
</SvelteStack>
