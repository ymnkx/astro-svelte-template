<script>
  import SvelteStack from './SvelteStack.svelte';

  let isChecked = false;
</script>

<SvelteStack>
  <div>
    <label>
      <input type="checkbox" bind:checked={isChecked} class="checkbox" />
      <span>How are you doing?</span>
    </label>
  </div>
  <p>{isChecked ? 'yes' : 'no'}</p>
</SvelteStack>

<style>
  .checkbox {
    margin-inline-end: 0.125em;
    vertical-align: baseline;
  }
</style>
