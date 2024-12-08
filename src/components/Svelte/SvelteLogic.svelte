<script>
  import Button from '@/components/Button/Button.svelte';
  import SvelteStack from './SvelteStack.svelte';

  let count = 1;

  const onclick = (event) => {
    count += 1;
  };
</script>

<SvelteStack>
  <Button {onclick} label={`Clicked: ${count}`} />
  <p>
    {#if count % 2 === 0}
      Even
    {:else}
      Odd
    {/if}
  </p>
</SvelteStack>
