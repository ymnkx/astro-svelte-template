<script>
  import Button from '@/components/Button/Button.svelte';
  import SvelteStack from './SvelteStack.svelte';

  let count = 0;

  $: double = count * 2;
  $: if (count > 10) {
    alert('You clicked more than 10 times!');
  }

  const handleClick = (event) => {
    count += 1;
  };
</script>

<SvelteStack>
  <Button on:click={handleClick} label={`Clicked: ${count}`} />
  <div class="result">
    <p>{count} x 2 = {double}</p>
    <p>If you click more than 10 times...</p>
  </div>
</SvelteStack>

<style lang="scss">
  .result {
    text-align: center;
  }
</style>
