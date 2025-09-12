<script lang="ts">
  import { onMount } from 'svelte';
  import { count } from './stores';
  import Button from '../Button/Button.svelte';
  import SvelteStack from './SvelteStack.svelte';

  onMount(() => {
    // ここじゃないと、localStorageにアクセスできない
    const savedCount = Number(localStorage.getItem('count'));
    count.set(savedCount || 0);
    count.subscribe((value) => localStorage.setItem('count', value + ''));
  });
</script>

<SvelteStack>
  <div class="value">{$count !== null ? $count : ''}</div>
  <div>
    <Button onclick={count.increment}>+</Button>
    <Button onclick={count.decrement}>-</Button>
    <Button onclick={count.reset}>Reset</Button>
  </div>
</SvelteStack>

<style lang="scss">
  .value {
    font-size: var(--typo-size-500);
    text-align: center;
  }
</style>
