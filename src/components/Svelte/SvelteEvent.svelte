<script>
  import Button from '@/components/Button/Button.svelte';
  import SvelteStack from './SvelteStack.svelte';

  let count = $state(0);
  let double = $derived(count * 2);
  $effect(() => {
    if (count > 5) {
      alert('You clicked more than 10 times!');
    }
  });

  const onclick = () => {
    count += 1;
  };
</script>

<SvelteStack>
  <Button {onclick}>{`Clicked: ${count}`}</Button>
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
