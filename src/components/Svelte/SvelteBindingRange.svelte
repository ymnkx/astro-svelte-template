<script>
  import SvelteInput from './SvelteInput.svelte';
  import SvelteStack from './SvelteStack.svelte';

  let a = 0;
  let b = 0;
  $: result = a * b;
</script>

<SvelteStack>
  <div>
    <label>
      <SvelteInput type="number" bind:value={a} min={0} max={10} />
      <input type="range" bind:value={a} min="0" max="10" />
    </label>
  </div>
  <div>
    <label>
      <SvelteInput type="number" bind:value={b} min={0} max={10} />
      <input type="range" bind:value={b} min="0" max="10" />
    </label>
  </div>
  <p class="result">{a} x {b} = {result}</p>
</SvelteStack>
