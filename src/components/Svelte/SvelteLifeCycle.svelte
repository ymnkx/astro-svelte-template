<script>
  import { afterUpdate, beforeUpdate, onMount } from 'svelte';
  import SvelteStack from './SvelteStack.svelte';

  let isOnMount = false;
  let isBeforeUpdate = false;
  let isAfterUpdate = false;

  onMount(() => {
    isOnMount = true;
  });

  beforeUpdate(() => {
    isBeforeUpdate = true;
  });

  afterUpdate(() => {
    isAfterUpdate = true;
  });
</script>

<SvelteStack>
  <p>onMouount: {isOnMount}</p>
  <p>beforeUpdate: {isBeforeUpdate}</p>
  <p>--- Something update ---</p>
  <p>afterUpdate: {isAfterUpdate}</p>
</SvelteStack>
